'use client';

import { useState } from 'react';

export function ContactCards() {
  const [isBugFormOpen, setIsBugFormOpen] = useState(false);
  const [bugFormState, setBugFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [issueType, setIssueType] = useState('bug');
  const [customIssueType, setCustomIssueType] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  const [isEmailFormOpen, setIsEmailFormOpen] = useState(false);
  const [emailFormState, setEmailFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [emailFiles, setEmailFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
    // reset input so the same file can be selected again if removed
    e.target.value = '';
  };

  const handleRemoveFile = (indexToRemove: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const handleBugSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBugFormState('submitting');
    // Simulate network request
    setTimeout(() => {
      setBugFormState('success');
      setTimeout(() => {
        setIsBugFormOpen(false);
        setBugFormState('idle');
      }, 2000);
    }, 1000);
  };

  const handleEmailFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setEmailFiles((prev) => [...prev, ...newFiles]);
    }
    e.target.value = '';
  };

  const handleRemoveEmailFile = (indexToRemove: number) => {
    setEmailFiles((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailFormState('submitting');
    setTimeout(() => {
      setEmailFormState('success');
      setTimeout(() => {
        setIsEmailFormOpen(false);
        setEmailFormState('idle');
      }, 2000);
    }, 1000);
  };

  return (
    <>
      <div className="max-w-4xl animate-fade-in-up grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Discord */}
        <a href="#" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center justify-center gap-4 p-8 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#5865F2]/50 hover:bg-white/[0.04] transition-all duration-300">
          <div className="w-16 h-16 rounded-full bg-[#5865F2]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(88,101,242,0.15)]">
            <span className="text-[#5865F2] text-2xl font-bold">D</span>
          </div>
          <h2 className="text-xl font-display font-bold text-text-bright uppercase tracking-wide">Discord</h2>
          <p className="text-sm text-text-dim text-center">Fastest way to get help, report bugs, and chat with the community. (Soon)</p>
        </a>

        {/* Bug Report */}
        <button 
          onClick={() => setIsBugFormOpen(true)}
          className="group flex flex-col items-center justify-center gap-4 p-8 rounded-xl bg-white/[0.02] border border-white/5 hover:border-rust/50 hover:bg-white/[0.04] transition-all duration-300 text-left"
        >
          <div className="w-16 h-16 rounded-full bg-rust/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_var(--rust-glow)]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rust">
              <path d="M8 2v4"/><path d="M16 2v4"/><rect width="16" height="14" x="4" y="8" rx="2"/><path d="M12 11v6"/><path d="M8 14h8"/>
            </svg>
          </div>
          <h2 className="text-xl font-display font-bold text-text-bright uppercase tracking-wide">Report a Bug</h2>
          <p className="text-sm text-text-dim text-center">Did something break? Let us know so we can fix it ASAP.</p>
        </button>

        {/* Email */}
        <button 
          onClick={() => setIsEmailFormOpen(true)}
          className="group flex flex-col items-center justify-center gap-4 p-8 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/30 hover:bg-white/[0.04] transition-all duration-300 text-left cursor-pointer"
        >
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-bright">
              <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          </div>
          <h2 className="text-xl font-display font-bold text-text-bright uppercase tracking-wide">Email Us</h2>
          <p className="text-sm text-text-dim text-center">For business inquiries or general questions.</p>
        </button>
      </div>

      {/* BUG REPORT MODAL */}
      {isBugFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-[#151515] border border-white/10 rounded-xl w-full max-w-[500px] shadow-2xl relative flex flex-col animate-in zoom-in-95 duration-300">
            
            <button 
              onClick={() => setIsBugFormOpen(false)}
              className="absolute top-4 right-4 text-text-dim hover:text-text-bright transition-colors cursor-pointer"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
              </svg>
            </button>

            <div className="p-6 md:p-8">
              <h2 className="font-display text-3xl font-bold uppercase text-text-bright tracking-wide mb-2 flex items-center gap-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rust">
                  <path d="M8 2v4"/><path d="M16 2v4"/><rect width="16" height="14" x="4" y="8" rx="2"/><path d="M12 11v6"/><path d="M8 14h8"/>
                </svg>
                Report a Bug
              </h2>
              <p className="text-text-dim text-sm mb-6">
                Please describe the issue you encountered in detail so we can reproduce and fix it.
              </p>

              {bugFormState === 'success' ? (
                <div className="flex flex-col items-center justify-center py-10 animate-in fade-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4 text-green-500">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <h3 className="text-xl font-display font-bold text-text-bright uppercase tracking-wide mb-2">Report Submitted</h3>
                  <p className="text-text-dim text-center">Thank you! We'll look into it shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleBugSubmit} className="flex flex-col gap-4">
                  
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs font-ui uppercase font-bold text-text-dim tracking-wider">
                      Email <span className="text-rust">*</span>
                    </label>
                    <input 
                      type="email" 
                      id="email" 
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
                      {[
                        { id: 'bug', label: 'Bug / Glitch' },
                        { id: 'calculation', label: 'Wrong Calculation' },
                        { id: 'feature', label: 'Feature Request' },
                        { id: 'other', label: 'Other' },
                      ].map(type => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setIssueType(type.id)}
                          className={`py-2 px-3 text-sm rounded-lg border transition-all ${
                            issueType === type.id 
                              ? 'bg-rust/10 border-rust/50 text-rust shadow-[inset_0_0_10px_rgba(206,66,43,0.1)]' 
                              : 'bg-black/20 border-white/5 text-text-dim hover:bg-black/40 hover:border-white/10 hover:text-text-bright'
                          }`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                    {issueType === 'other' && (
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
                    <label htmlFor="description" className="text-xs font-ui uppercase font-bold text-text-dim tracking-wider">
                      Description <span className="text-rust">*</span>
                    </label>
                    <textarea 
                      id="description" 
                      required
                      placeholder="What happened? What did you expect to happen?"
                      className="w-full bg-black/40 border border-white/5 rounded-lg px-4 py-3 text-sm text-text-bright outline-none focus:border-rust/60 transition-colors placeholder:text-text-bright/20 min-h-[120px] resize-y"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 mb-4">
                    <span className="text-xs font-ui uppercase font-bold text-text-dim tracking-wider">
                      Screenshot / Attachment <span className="text-xs font-normal opacity-50 capitalize normal-case">(Optional)</span>
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
                          {files.length === 0 ? 'No files selected' : `${files.length} file(s) selected`}
                        </span>
                      </div>

                      {files.length > 0 && (
                        <div className="flex flex-col gap-1.5 mt-1 border-t border-white/5 pt-3">
                          {files.map((file, idx) => (
                            <div key={`${file.name}-${idx}`} className="flex items-center justify-between bg-black/20 border border-white/5 rounded px-3 py-2 animate-in fade-in slide-in-from-top-2">
                              <span className="text-xs text-text-dim truncate pr-2" title={file.name}>{file.name}</span>
                              <button 
                                type="button" 
                                onClick={() => handleRemoveFile(idx)}
                                className="text-text-dim hover:text-rust transition-colors p-1 flex-shrink-0 cursor-pointer"
                                aria-label="Remove file"
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={bugFormState === 'submitting'}
                    className="w-full bg-rust hover:bg-rust-hover text-text-bright font-display font-bold uppercase tracking-wider text-lg py-3 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_15px_var(--rust-glow)] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
                  >
                    {bugFormState === 'submitting' ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-text-bright" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Submit Report'
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
              onClick={() => setIsEmailFormOpen(false)}
              className="absolute top-4 right-4 text-text-dim hover:text-text-bright transition-colors cursor-pointer"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
              </svg>
            </button>

            <div className="p-6 md:p-8">
              <h2 className="font-display text-3xl font-bold uppercase text-text-bright tracking-wide mb-2 flex items-center gap-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-bright">
                  <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                Email Us
              </h2>
              <p className="text-text-dim text-sm mb-6">
                Send us a message for business inquiries, general questions, or anything else.
              </p>

              {emailFormState === 'success' ? (
                <div className="flex flex-col items-center justify-center py-10 animate-in fade-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4 text-green-500">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <h3 className="text-xl font-display font-bold text-text-bright uppercase tracking-wide mb-2">Message Sent</h3>
                  <p className="text-text-dim text-center">Thank you! We will get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
                  
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="general-email" className="text-xs font-ui uppercase font-bold text-text-dim tracking-wider">
                      Email <span className="text-text-bright/70">*</span>
                    </label>
                    <input 
                      type="email" 
                      id="general-email" 
                      required
                      placeholder="your@email.com"
                      className="w-full bg-black/40 border border-white/5 rounded-lg px-4 py-3 text-sm text-text-bright outline-none focus:border-white/30 transition-colors placeholder:text-text-bright/20"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="subject" className="text-xs font-ui uppercase font-bold text-text-dim tracking-wider">
                      Subject <span className="text-text-bright/70">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="subject" 
                      required
                      placeholder="What is this regarding?"
                      className="w-full bg-black/40 border border-white/5 rounded-lg px-4 py-3 text-sm text-text-bright outline-none focus:border-white/30 transition-colors placeholder:text-text-bright/20"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 mb-2">
                    <label htmlFor="message" className="text-xs font-ui uppercase font-bold text-text-dim tracking-wider">
                      Message <span className="text-text-bright/70">*</span>
                    </label>
                    <textarea 
                      id="message" 
                      required
                      placeholder="How can we help you?"
                      className="w-full bg-black/40 border border-white/5 rounded-lg px-4 py-3 text-sm text-text-bright outline-none focus:border-white/30 transition-colors placeholder:text-text-bright/20 min-h-[120px] resize-y"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 mb-4">
                    <span className="text-xs font-ui uppercase font-bold text-text-dim tracking-wider">
                      Attachment <span className="text-xs font-normal opacity-50 capitalize normal-case">(Optional)</span>
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
                          {emailFiles.length === 0 ? 'No files selected' : `${emailFiles.length} file(s) selected`}
                        </span>
                      </div>

                      {emailFiles.length > 0 && (
                        <div className="flex flex-col gap-1.5 mt-1 border-t border-white/5 pt-3">
                          {emailFiles.map((file, idx) => (
                            <div key={`${file.name}-${idx}`} className="flex items-center justify-between bg-black/20 border border-white/5 rounded px-3 py-2 animate-in fade-in slide-in-from-top-2">
                              <span className="text-xs text-text-dim truncate pr-2" title={file.name}>{file.name}</span>
                              <button 
                                type="button" 
                                onClick={() => handleRemoveEmailFile(idx)}
                                className="text-text-dim hover:text-text-bright transition-colors p-1 flex-shrink-0 cursor-pointer"
                                aria-label="Remove file"
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={emailFormState === 'submitting'}
                    className="w-full bg-white/10 hover:bg-white/20 text-text-bright font-display font-bold uppercase tracking-wider text-lg py-3 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(255,255,255,0.15)] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none border border-white/5"
                  >
                    {emailFormState === 'submitting' ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-text-bright" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
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
