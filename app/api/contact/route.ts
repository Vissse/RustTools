import { NextResponse } from 'next/server';
import nodemailer, { type Transporter } from 'nodemailer';

// nodemailer needs the Node runtime — it opens a raw TLS socket, which Edge can't.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// The region this runs in is load-bearing: WebGlobe enables GeoIP protection on
// outgoing mail and permits only PL/CZ/SK/AT/HU/DE, so Vercel's default region
// (iad1, Washington DC) gets `550 Sending mail from your country (us) is not
// allowed`. Frankfurt is pinned via `regions` in vercel.json — the Next.js
// `preferredRegion` export does NOT work here, it only applies to the Edge runtime.

const MAX_EMAIL = 254;
const MAX_SHORT = 200;
const MAX_LONG = 4000;
const MAX_FILENAMES = 20;

// Deliberately loose — the mailbox, not a regex, is the real deliverability test.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Every line is prefixed `[contact <id>]` so a single submission can be followed
 * end to end in the Vercel log stream — filter on the id to isolate one request,
 * or on `[contact` to see all traffic. Never log SMTP_PASS or the message body.
 */
function log(id: string, step: string, extra?: Record<string, unknown>) {
  console.log(`[contact ${id}] ${step}`, extra ? JSON.stringify(extra) : '');
}

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

function getTransporter(id: string, pass: string): Transporter {
  if (transporter) {
    log(id, 'transport: reusing cached transport (warm lambda)');
    return transporter;
  }
  const port = Number(process.env.SMTP_PORT ?? 465);
  const host = process.env.SMTP_HOST ?? 'mail.webglobe.cz';
  const secure = port === 465; // 465 is implicit SSL; 587 upgrades via STARTTLS
  log(id, 'transport: creating', { host, port, secure, user: process.env.SMTP_USER });
  transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user: process.env.SMTP_USER, pass },
  });
  return transporter;
}

export async function POST(request: Request) {
  const id = crypto.randomUUID().slice(0, 8);
  const startedAt = Date.now();
  // Vercel sets these; they're the fastest way to confirm the function actually
  // ran in fra1 when WebGlobe rejects the sender's country.
  log(id, 'request received', {
    region: process.env.VERCEL_REGION ?? 'local',
    env: process.env.VERCEL_ENV ?? 'development',
  });

  const pass = process.env.SMTP_PASS;
  const user = process.env.SMTP_USER;
  if (!pass || !user) {
    // Same shape as the PostHog gate (§11): missing credentials disable the
    // feature instead of crashing local dev and preview builds.
    console.warn(`[contact ${id}] config: SMTP_USER/SMTP_PASS unset — form disabled`);
    return NextResponse.json({ error: 'Contact form is not configured.' }, { status: 503 });
  }
  log(id, 'config: ok', { user, to: process.env.CONTACT_TO ?? user });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    console.warn(`[contact ${id}] parse: body is not valid JSON`);
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  const formType = typeof data.type === 'string' ? data.type : 'unknown';
  const from = text(data.email, MAX_EMAIL);
  if (!from || !EMAIL_RE.test(from)) {
    console.warn(`[contact ${id}] validation: rejected — invalid email`, { formType });
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  const attachments = filenames(data.attachmentNames);
  let subject: string;
  let lines: string[];

  if (data.type === 'bug') {
    const issueType = text(data.issueType, MAX_SHORT);
    const description = text(data.description, MAX_LONG);
    if (!issueType || !description) {
      console.warn(`[contact ${id}] validation: rejected — missing bug fields`, {
        hasIssueType: Boolean(issueType),
        hasDescription: Boolean(description),
      });
      return NextResponse.json({ error: 'Please fill in every required field.' }, { status: 400 });
    }
    subject = `[Bug] ${issueType} — ${from}`;
    lines = [`Issue type: ${issueType}`, `From: ${from}`, '', description];
  } else if (data.type === 'general') {
    const userSubject = text(data.subject, MAX_SHORT);
    const message = text(data.message, MAX_LONG);
    if (!userSubject || !message) {
      console.warn(`[contact ${id}] validation: rejected — missing general fields`, {
        hasSubject: Boolean(userSubject),
        hasMessage: Boolean(message),
      });
      return NextResponse.json({ error: 'Please fill in every required field.' }, { status: 400 });
    }
    subject = `[Contact] ${userSubject}`;
    lines = [`From: ${from}`, '', message];
  } else {
    console.warn(`[contact ${id}] validation: rejected — unknown form type`, { formType });
    return NextResponse.json({ error: 'Unknown form type.' }, { status: 400 });
  }

  if (attachments.length > 0) {
    // Files aren't uploaded yet — the names tell us what to ask for in the reply.
    lines.push('', `Attachments the sender selected: ${attachments.join(', ')}`);
  }

  // Body length rather than the body itself — never log what the visitor wrote.
  log(id, 'validation: ok', {
    formType,
    replyTo: from,
    bodyChars: lines.join('\n').length,
    attachments: attachments.length,
  });

  try {
    log(id, 'smtp: sending');
    const sendStartedAt = Date.now();
    const info = await getTransporter(id, pass).sendMail({
      // Must be the authenticated mailbox. Putting the visitor's address here
      // fails SPF/DMARC and gets the domain flagged as a spoofer.
      from: user,
      to: process.env.CONTACT_TO ?? user,
      replyTo: header(from),
      subject: header(subject),
      text: lines.join('\n'),
    });
    log(id, 'smtp: accepted', {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response,
      smtpMs: Date.now() - sendStartedAt,
    });
  } catch (error) {
    // nodemailer attaches the SMTP conversation to the error — surfacing the
    // response code is what turns "it didn't work" into an actionable log line
    // (e.g. 550 = GeoIP block, 535 = bad credentials).
    const smtp = error as { code?: string; responseCode?: number; command?: string; response?: string };
    console.error(`[contact ${id}] smtp: FAILED`, {
      code: smtp.code,
      responseCode: smtp.responseCode,
      command: smtp.command,
      response: smtp.response,
      region: process.env.VERCEL_REGION ?? 'local',
      totalMs: Date.now() - startedAt,
    });
    console.error(`[contact ${id}] smtp: raw error`, error);
    return NextResponse.json({ error: 'Could not send your message. Please try again.' }, { status: 500 });
  }

  log(id, 'done: sent', { formType, totalMs: Date.now() - startedAt });
  return NextResponse.json({ ok: true });
}
