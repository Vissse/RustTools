import { NextResponse } from 'next/server';
import nodemailer, { type Transporter } from 'nodemailer';

// nodemailer needs the Node runtime — it opens a raw TLS socket, which Edge can't.
export const runtime = 'nodejs';
// WebGlobe enables GeoIP protection on outgoing mail by default and only permits
// PL/CZ/SK/AT/HU/DE. Frankfurt keeps the SMTP login inside that allowlist —
// Vercel's default region (iad1, Washington DC) would be rejected.
export const preferredRegion = 'fra1';
export const dynamic = 'force-dynamic';

const MAX_EMAIL = 254;
const MAX_SHORT = 200;
const MAX_LONG = 4000;
const MAX_FILENAMES = 20;

// Deliberately loose — the mailbox, not a regex, is the real deliverability test.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Trimmed non-empty string within `max`, or null if the field is unusable. */
function text(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > max) return null;
  return trimmed;
}

/** CR/LF in a header value lets a submitter inject extra headers. */
function header(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

function filenames(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((n): n is string => typeof n === 'string' && n.trim().length > 0)
    .slice(0, MAX_FILENAMES)
    .map((n) => n.trim().slice(0, MAX_SHORT));
}

let transporter: Transporter | null = null;

function getTransporter(pass: string): Transporter {
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT ?? 465);
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? 'mail.webglobe.cz',
      port,
      secure: port === 465, // 465 is implicit SSL; 587 upgrades via STARTTLS
      auth: { user: process.env.SMTP_USER, pass },
    });
  }
  return transporter;
}

export async function POST(request: Request) {
  const pass = process.env.SMTP_PASS;
  const user = process.env.SMTP_USER;
  if (!pass || !user) {
    // Same shape as the PostHog gate (§11): missing credentials disable the
    // feature instead of crashing local dev and preview builds.
    console.warn('[contact] SMTP_USER/SMTP_PASS unset — contact form disabled');
    return NextResponse.json({ error: 'Contact form is not configured.' }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  const from = text(data.email, MAX_EMAIL);
  if (!from || !EMAIL_RE.test(from)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  const attachments = filenames(data.attachmentNames);
  let subject: string;
  let lines: string[];

  if (data.type === 'bug') {
    const issueType = text(data.issueType, MAX_SHORT);
    const description = text(data.description, MAX_LONG);
    if (!issueType || !description) {
      return NextResponse.json({ error: 'Please fill in every required field.' }, { status: 400 });
    }
    subject = `[Bug] ${issueType} — ${from}`;
    lines = [`Issue type: ${issueType}`, `From: ${from}`, '', description];
  } else if (data.type === 'general') {
    const userSubject = text(data.subject, MAX_SHORT);
    const message = text(data.message, MAX_LONG);
    if (!userSubject || !message) {
      return NextResponse.json({ error: 'Please fill in every required field.' }, { status: 400 });
    }
    subject = `[Contact] ${userSubject}`;
    lines = [`From: ${from}`, '', message];
  } else {
    return NextResponse.json({ error: 'Unknown form type.' }, { status: 400 });
  }

  if (attachments.length > 0) {
    // Files aren't uploaded yet — the names tell us what to ask for in the reply.
    lines.push('', `Attachments the sender selected: ${attachments.join(', ')}`);
  }

  try {
    await getTransporter(pass).sendMail({
      // Must be the authenticated mailbox. Putting the visitor's address here
      // fails SPF/DMARC and gets the domain flagged as a spoofer.
      from: user,
      to: process.env.CONTACT_TO ?? user,
      replyTo: header(from),
      subject: header(subject),
      text: lines.join('\n'),
    });
  } catch (error) {
    console.error('[contact] send failed', error);
    return NextResponse.json({ error: 'Could not send your message. Please try again.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
