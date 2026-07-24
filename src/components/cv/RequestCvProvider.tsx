"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
  type FormEvent,
} from "react";
import { X, Send, CheckCircle2, Loader2, FileText } from "lucide-react";

type RequestCvContextValue = { open: () => void };

const RequestCvContext = createContext<RequestCvContextValue | null>(null);

export function useRequestCv(): RequestCvContextValue {
  const ctx = useContext(RequestCvContext);
  if (!ctx) {
    throw new Error("useRequestCv must be used within a RequestCvProvider");
  }
  return ctx;
}

type Status = "idle" | "submitting" | "success" | "error";

export function RequestCvProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const open = useCallback(() => {
    setStatus("idle");
    setErrorMsg("");
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    // Honeypot: pretend success if filled by a bot.
    if (payload.website) {
      setStatus("success");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/request-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Request failed");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error && err.message !== "Request failed"
          ? err.message
          : "Something went wrong. Please try again in a moment."
      );
    }
  }

  return (
    <RequestCvContext.Provider value={{ open }}>
      {children}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Request CV"
        >
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
            onClick={close}
          />
          <div className="relative w-full max-w-md rounded-xl border bg-white shadow-2xl" style={{ borderColor: "var(--border)" }}>
            <div className="flex items-center gap-2 border-b px-5 py-3.5" style={{ borderColor: "var(--border)" }}>
              <FileText size={17} style={{ color: "var(--d365-blue)" }} />
              <h2 className="text-[15px] font-semibold">Request CV</h2>
              <button
                onClick={close}
                aria-label="Close"
                className="ml-auto grid h-8 w-8 place-items-center rounded hover:bg-[var(--sidebar-hover)]"
              >
                <X size={16} />
              </button>
            </div>

            {status === "success" ? (
              <div className="p-6 text-center">
                <CheckCircle2 size={40} className="mx-auto" style={{ color: "var(--d365-green)" }} />
                <h3 className="mt-3 text-[15px] font-semibold">Request received</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-[var(--text-secondary)]">
                  Thanks — your request has been sent. If approved, you&apos;ll receive a private
                  download link by email shortly.
                </p>
                <button
                  onClick={close}
                  className="mt-4 rounded px-4 py-2 text-[13px] font-semibold text-white"
                  style={{ background: "var(--d365-blue)" }}
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 p-5">
                <p className="text-[12.5px] leading-relaxed text-[var(--text-secondary)]">
                  My CV is shared on request. Leave your details and I&apos;ll send a private,
                  time-limited download link once approved.
                </p>

                <Field label="Name" name="name" placeholder="Your name" required />
                <Field label="Work email" name="email" type="email" placeholder="you@company.com" required />
                <Field label="Company" name="company" placeholder="Company (optional)" />
                <div>
                  <label className="mb-1 block text-[12px] font-medium text-[var(--text-secondary)]">
                    Message <span className="text-[var(--text-muted)]">(optional)</span>
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Role or reason for your interest"
                    className="w-full rounded-md border px-3 py-2 text-[13px] outline-none transition-colors focus:border-[var(--d365-blue)] focus:ring-2 focus:ring-[var(--d365-blue)]/20"
                    style={{ borderColor: "var(--border-strong)" }}
                  />
                </div>

                {/* Honeypot field, hidden from humans */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                {status === "error" && (
                  <p className="rounded-md bg-[#c33d2e14] px-3 py-2 text-[12.5px] text-[var(--d365-red)]">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="flex w-full items-center justify-center gap-2 rounded px-4 py-2.5 text-[13px] font-semibold text-white transition-colors disabled:opacity-60"
                  style={{ background: "var(--d365-blue)" }}
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 size={15} className="animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      <Send size={15} /> Send request
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </RequestCvContext.Provider>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1 block text-[12px] font-medium text-[var(--text-secondary)]">
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-md border px-3 py-2 text-[13px] outline-none transition-colors focus:border-[var(--d365-blue)] focus:ring-2 focus:ring-[var(--d365-blue)]/20"
        style={{ borderColor: "var(--border-strong)" }}
      />
    </div>
  );
}
