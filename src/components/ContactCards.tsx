"use client";

import { useState } from "react";
import { ContactEvent, trackContact } from "@/lib/analytics";

type FormState = "idle" | "submitting" | "success" | "error";

const ISSUE_TYPES = [
  { id: "bug", label: "Bug / Glitch" },
  { id: "calculation", label: "Wrong Calculation" },
  { id: "feature", label: "Feature Request" },
  { id: "other", label: "Other" },
];

/** `error` is null on success. `status` is 0 when the request never landed. */
type SubmitResult = { error: string | null; status: number };

async function submitContact(
  payload: Record<string, unknown>,
): Promise<SubmitResult> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) return { error: null, status: res.status };
    const body = await res.json().catch(() => null);
    const error =
      typeof body?.error === "string"
        ? body.error
        : "Something went wrong. Please try again.";
    return { error, status: res.status };
  } catch {
    return {
      error: "Could not reach the server. Check your connection and try again.",
      status: 0,
    };
  }
}

export function ContactCards() {
  const [isBugFormOpen, setIsBugFormOpen] = useState(false);
  const [bugFormState, setBugFormState] = useState<FormState>("idle");
  const [bugError, setBugError] = useState("");
  const [issueType, setIssueType] = useState("bug");
  const [customIssueType, setCustomIssueType] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const [isEmailFormOpen, setIsEmailFormOpen] = useState(false);
  const [emailFormState, setEmailFormState] = useState<FormState>("idle");
  const [emailError, setEmailError] = useState("");
  const [emailFiles, setEmailFiles] = useState<File[]>([]);

  const closeBugForm = () => {
    setIsBugFormOpen(false);
    setBugFormState("idle");
    setBugError("");
    setIssueType("bug");
    setCustomIssueType("");
    setFiles([]);
  };

  const closeEmailForm = () => {
    setIsEmailFormOpen(false);
    setEmailFormState("idle");
    setEmailError("");
    setEmailFiles([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
    // reset input so the same file can be selected again if removed
    e.target.value = "";
  };

  const handleRemoveFile = (indexToRemove: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const handleBugSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setBugFormState("submitting");
    setBugError("");

    const label =
      ISSUE_TYPES.find((t) => t.id === issueType)?.label ?? issueType;
    trackContact(ContactEvent.submitted, {
      form: "bug",
      issueType,
      attachments: files.length,
    });

    const { error, status } = await submitContact({
      type: "bug",
      email: form.get("email"),
      issueType: issueType === "other" ? customIssueType : label,
      description: form.get("description"),
      attachmentNames: files.map((f) => f.name),
    });

    if (error) {
      trackContact(ContactEvent.failed, { form: "bug", status });
      setBugError(error);
      setBugFormState("error");
      return;
    }
    trackContact(ContactEvent.succeeded, { form: "bug", issueType });
    setBugFormState("success");
    setTimeout(closeBugForm, 2000);
  };

  const handleEmailFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setEmailFiles((prev) => [...prev, ...newFiles]);
    }
    e.target.value = "";
  };

  const handleRemoveEmailFile = (indexToRemove: number) => {
    setEmailFiles((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setEmailFormState("submitting");
    setEmailError("");

    trackContact(ContactEvent.submitted, {
      form: "general",
      attachments: emailFiles.length,
    });

    const { error, status } = await submitContact({
      type: "general",
      email: form.get("general-email"),
      subject: form.get("subject"),
      message: form.get("message"),
      attachmentNames: emailFiles.map((f) => f.name),
    });

    if (error) {
      trackContact(ContactEvent.failed, { form: "general", status });
      setEmailError(error);
      setEmailFormState("error");
      return;
    }
    trackContact(ContactEvent.succeeded, { form: "general" });
    setEmailFormState("success");
    setTimeout(closeEmailForm, 2000);
  };

  return (
    <>
      {/* Authors - BIG */}
      <h3 className="text-sm font-display text-text-dim uppercase tracking-widest mb-4">
        Authors
      </h3>
      <div className="max-w-4xl animate-fade-in-up grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <a
          href="https://github.com/Vissse"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-5 p-6 rounded-xl bg-panel border border-white/5 hover:border-rust/40 hover:bg-white/[0.04] transition-all duration-300 relative overflow-hidden"
        >
          <img
            src="https://github.com/Vissse.png"
            alt="Vissse"
            className="w-16 h-16 rounded-full group-hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
          />
          <div className="flex flex-col">
            <span className="font-display text-3xl uppercase tracking-wider text-text-bright font-bold leading-none">
              Vissse
            </span>
            <span className="text-sm text-text-dim mt-1">
              Creator & Developer
            </span>
          </div>
        </a>
        <a
          href="https://github.com/7abar1n"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-5 p-6 rounded-xl bg-panel border border-white/5 hover:border-rust/40 hover:bg-white/[0.04] transition-all duration-300 relative overflow-hidden"
        >
          <img
            src="https://github.com/7abar1n.png"
            alt="7abar1n"
            className="w-16 h-16 rounded-full group-hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] bg-white/10"
          />
          <div className="flex flex-col">
            <span className="font-display text-3xl uppercase tracking-wider text-text-bright font-bold leading-none">
              7abar1n
            </span>
            <span className="text-sm text-text-dim mt-1">
              Creator & Developer
            </span>
          </div>
        </a>
      </div>

      {/* Links - SMALL */}
      <h3 className="text-sm font-display text-text-dim uppercase tracking-widest mb-4">
        Contact & Support
      </h3>
      <div className="max-w-4xl animate-fade-in-up flex flex-wrap items-center gap-4">
        {/* Discord */}
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 py-2 px-4 rounded-full bg-white/[0.03] border border-white/5 hover:border-[#5865F2]/40 hover:bg-white/[0.06] transition-all duration-300"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-[#5865F2]"
          >
            <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
          </svg>
          <span className="font-display uppercase tracking-wider text-text-bright text-sm font-bold mt-0.5">
            Discord
          </span>
        </a>

        {/* Bug Report */}
        <button onClick={() => setIsBugFormOpen(true)} className="group flex items-center gap-2.5 py-2 px-4 rounded-full bg-white/[0.03] border border-white/5 hover:border-rust/40 hover:bg-white/[0.06] transition-all duration-300 cursor-pointer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rust">
            <path d="m8 2 1.88 1.88"/><path d="M14.12 3.88 16 2"/><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"/><path d="M12 20v-9"/><path d="M6.53 9C4.6 8.8 3 7.1 3 5"/><path d="M17.47 9c1.93-.2 3.53-1.9 3.53-4"/>
          </svg>
          <span className="font-display uppercase tracking-wider text-text-bright text-sm font-bold mt-0.5">Report a Bug</span>
        </button>

        {/* Email */}
        <button onClick={() => setIsEmailFormOpen(true)} className="group flex items-center gap-2.5 py-2 px-4 rounded-full bg-white/[0.03] border border-white/5 hover:border-white/30 hover:bg-white/[0.06] transition-all duration-300 cursor-pointer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-bright">
            <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
          </svg>
          <span className="font-display uppercase tracking-wider text-text-bright text-sm font-bold mt-0.5">Email Us</span>
        </button>
      </div>

      {/* BUG REPORT MODAL */}
      {isBugFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-[#151515] border border-white/10 rounded-xl w-full max-w-[500px] shadow-2xl relative flex flex-col animate-in zoom-in-95 duration-300">
            <button
              onClick={closeBugForm}
              className="absolute top-4 right-4 text-text-dim hover:text-text-bright transition-colors cursor-pointer"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>

            <div className="p-6 md:p-8">
              <h2 className="font-display text-3xl font-bold uppercase text-text-bright tracking-wide mb-2 flex items-center gap-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-rust"
                >
                  <path d="M8 2v4" />
                  <path d="M16 2v4" />
                  <rect width="16" height="14" x="4" y="8" rx="2" />
                  <path d="M12 11v6" />
                  <path d="M8 14h8" />
                </svg>
                Report a Bug
              </h2>
              <p className="text-text-dim text-sm mb-6">
                Please describe the issue you encountered in detail so we can
                reproduce and fix it.
              </p>

              {bugFormState === "success" ? (
                <div className="flex flex-col items-center justify-center py-10 animate-in fade-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4 text-green-500">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <h3 className="text-xl font-display font-bold text-text-bright uppercase tracking-wide mb-2">
                    Report Submitted
                  </h3>
                  <p className="text-text-dim text-center">
                    Thank you! We'll look into it shortly.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleBugSubmit}
                  className="flex flex-col gap-4"
                >
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="email"
                      className="text-xs font-ui uppercase font-bold text-text-dim tracking-wider"
                    >
                      Email <span className="text-rust">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="so we can get back to you"
                      className="w-full bg-black/40 border border-white/5 rounded-lg px-4 py-3 text-sm text-text-bright outline-none focus:border-rust/60 transition-colors placeholder:text-text-bright/20"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-ui uppercase font-bold text-text-dim tracking-wider">
                      Issue Type <span className="text-rust">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {ISSUE_TYPES.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setIssueType(type.id)}
                          className={`py-2 px-3 text-sm rounded-lg border transition-all ${
                            issueType === type.id
                              ? "bg-rust/10 border-rust/50 text-rust shadow-[inset_0_0_10px_rgba(206,66,43,0.1)]"
                              : "bg-black/20 border-white/5 text-text-dim hover:bg-black/40 hover:border-white/10 hover:text-text-bright"
                          }`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                    {issueType === "other" && (
                      <input
                        type="text"
                        placeholder="Please specify..."
                        value={customIssueType}
                        onChange={(e) => setCustomIssueType(e.target.value)}
                        required
                        className="w-full bg-black/40 border border-white/5 rounded-lg px-4 py-3 text-sm text-text-bright outline-none focus:border-rust/60 transition-colors placeholder:text-text-bright/20 animate-in fade-in slide-in-from-top-2 mt-1"
                      />
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5 mb-2">
                    <label
                      htmlFor="description"
                      className="text-xs font-ui uppercase font-bold text-text-dim tracking-wider"
                    >
                      Description <span className="text-rust">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      required
                      placeholder="What happened? What did you expect to happen?"
                      className="w-full bg-black/40 border border-white/5 rounded-lg px-4 py-3 text-sm text-text-bright outline-none focus:border-rust/60 transition-colors placeholder:text-text-bright/20 min-h-[120px] resize-y"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 mb-4">
                    <span className="text-xs font-ui uppercase font-bold text-text-dim tracking-wider">
                      Screenshot / Attachment{" "}
                      <span className="text-xs font-normal opacity-50 capitalize normal-case">
                        (Optional)
                      </span>
                    </span>
                    <div className="flex flex-col gap-2 w-full bg-black/40 border border-white/5 border-dashed rounded-lg p-3 transition-colors focus-within:border-rust/60">
                      <div className="flex items-center gap-4">
                        <input
                          type="file"
                          id="attachment"
                          multiple
                          accept="image/*,.pdf,.zip,.rar"
                          className="sr-only"
                          onChange={handleFileChange}
                        />
                        <label
                          htmlFor="attachment"
                          className="py-1.5 px-3 rounded text-xs font-bold bg-white/10 text-text-bright hover:bg-white/20 transition-colors cursor-pointer flex-shrink-0"
                        >
                          Choose Files
                        </label>
                        <span className="text-sm text-text-dim truncate">
                          {files.length === 0
                            ? "No files selected"
                            : `${files.length} file(s) selected`}
                        </span>
                      </div>
                      <p className="text-xs text-text-dim/60 leading-snug">
                        File uploads aren’t live yet — we’ll include the
                        filenames in your report and ask you to send them in our
                        reply.
                      </p>

                      {files.length > 0 && (
                        <div className="flex flex-col gap-1.5 mt-1 border-t border-white/5 pt-3">
                          {files.map((file, idx) => (
                            <div
                              key={`${file.name}-${idx}`}
                              className="flex items-center justify-between bg-black/20 border border-white/5 rounded px-3 py-2 animate-in fade-in slide-in-from-top-2"
                            >
                              <span
                                className="text-xs text-text-dim truncate pr-2"
                                title={file.name}
                              >
                                {file.name}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleRemoveFile(idx)}
                                className="text-text-dim hover:text-rust transition-colors p-1 flex-shrink-0 cursor-pointer"
                                aria-label="Remove file"
                              >
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M18 6 6 18" />
                                  <path d="m6 6 12 12" />
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {bugFormState === "error" && (
                    <p
                      role="alert"
                      className="text-sm text-rust bg-rust/10 border border-rust/30 rounded-lg px-4 py-3 animate-in fade-in"
                    >
                      {bugError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={bugFormState === "submitting"}
                    className="w-full bg-rust hover:bg-rust-hover text-text-bright font-display font-bold uppercase tracking-wider text-lg py-3 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_15px_var(--rust-glow)] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
                  >
                    {bugFormState === "submitting" ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5 text-text-bright"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      "Submit Report"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
      {/* EMAIL US MODAL */}
      {isEmailFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-[#151515] border border-white/10 rounded-xl w-full max-w-[500px] shadow-2xl relative flex flex-col animate-in zoom-in-95 duration-300">
            <button
              onClick={closeEmailForm}
              className="absolute top-4 right-4 text-text-dim hover:text-text-bright transition-colors cursor-pointer"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>

            <div className="p-6 md:p-8">
              <h2 className="font-display text-3xl font-bold uppercase text-text-bright tracking-wide mb-2 flex items-center gap-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-text-bright"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                Email Us
              </h2>
              <p className="text-text-dim text-sm mb-6">
                Send us a message for business inquiries, general questions, or
                anything else.
              </p>

              {emailFormState === "success" ? (
                <div className="flex flex-col items-center justify-center py-10 animate-in fade-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4 text-green-500">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <h3 className="text-xl font-display font-bold text-text-bright uppercase tracking-wide mb-2">
                    Message Sent
                  </h3>
                  <p className="text-text-dim text-center">
                    Thank you! We will get back to you soon.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleEmailSubmit}
                  className="flex flex-col gap-4"
                >
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="general-email"
                      className="text-xs font-ui uppercase font-bold text-text-dim tracking-wider"
                    >
                      Email <span className="text-text-bright/70">*</span>
                    </label>
                    <input
                      type="email"
                      id="general-email"
                      name="general-email"
                      required
                      placeholder="your@email.com"
                      className="w-full bg-black/40 border border-white/5 rounded-lg px-4 py-3 text-sm text-text-bright outline-none focus:border-white/30 transition-colors placeholder:text-text-bright/20"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="subject"
                      className="text-xs font-ui uppercase font-bold text-text-dim tracking-wider"
                    >
                      Subject <span className="text-text-bright/70">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      placeholder="What is this regarding?"
                      className="w-full bg-black/40 border border-white/5 rounded-lg px-4 py-3 text-sm text-text-bright outline-none focus:border-white/30 transition-colors placeholder:text-text-bright/20"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 mb-2">
                    <label
                      htmlFor="message"
                      className="text-xs font-ui uppercase font-bold text-text-dim tracking-wider"
                    >
                      Message <span className="text-text-bright/70">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      placeholder="How can we help you?"
                      className="w-full bg-black/40 border border-white/5 rounded-lg px-4 py-3 text-sm text-text-bright outline-none focus:border-white/30 transition-colors placeholder:text-text-bright/20 min-h-[120px] resize-y"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 mb-4">
                    <span className="text-xs font-ui uppercase font-bold text-text-dim tracking-wider">
                      Attachment{" "}
                      <span className="text-xs font-normal opacity-50 capitalize normal-case">
                        (Optional)
                      </span>
                    </span>
                    <div className="flex flex-col gap-2 w-full bg-black/40 border border-white/5 border-dashed rounded-lg p-3 transition-colors focus-within:border-white/30">
                      <div className="flex items-center gap-4">
                        <input
                          type="file"
                          id="email-attachment"
                          multiple
                          accept="image/*,.pdf,.zip,.rar"
                          className="sr-only"
                          onChange={handleEmailFileChange}
                        />
                        <label
                          htmlFor="email-attachment"
                          className="py-1.5 px-3 rounded text-xs font-bold bg-white/10 text-text-bright hover:bg-white/20 transition-colors cursor-pointer flex-shrink-0"
                        >
                          Choose Files
                        </label>
                        <span className="text-sm text-text-dim truncate">
                          {emailFiles.length === 0
                            ? "No files selected"
                            : `${emailFiles.length} file(s) selected`}
                        </span>
                      </div>
                      <p className="text-xs text-text-dim/60 leading-snug">
                        File uploads aren’t live yet — we’ll include the
                        filenames in your message and ask you to send them in
                        our reply.
                      </p>

                      {emailFiles.length > 0 && (
                        <div className="flex flex-col gap-1.5 mt-1 border-t border-white/5 pt-3">
                          {emailFiles.map((file, idx) => (
                            <div
                              key={`${file.name}-${idx}`}
                              className="flex items-center justify-between bg-black/20 border border-white/5 rounded px-3 py-2 animate-in fade-in slide-in-from-top-2"
                            >
                              <span
                                className="text-xs text-text-dim truncate pr-2"
                                title={file.name}
                              >
                                {file.name}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleRemoveEmailFile(idx)}
                                className="text-text-dim hover:text-text-bright transition-colors p-1 flex-shrink-0 cursor-pointer"
                                aria-label="Remove file"
                              >
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M18 6 6 18" />
                                  <path d="m6 6 12 12" />
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {emailFormState === "error" && (
                    <p
                      role="alert"
                      className="text-sm text-rust bg-rust/10 border border-rust/30 rounded-lg px-4 py-3 animate-in fade-in"
                    >
                      {emailError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={emailFormState === "submitting"}
                    className="w-full bg-white/10 hover:bg-white/20 text-text-bright font-display font-bold uppercase tracking-wider text-lg py-3 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(255,255,255,0.15)] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none border border-white/5"
                  >
                    {emailFormState === "submitting" ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5 text-text-bright"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
