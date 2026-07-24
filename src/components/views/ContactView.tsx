"use client";

import { useState, type FormEvent } from "react";
import { MapPin, Send, CheckCircle2, Loader2 } from "lucide-react";
import { profile } from "@/data/portfolio";
import { Tile, LinkedInIcon } from "../ui";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactView() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const cards = [
    {
      icon: LinkedInIcon,
      label: "LinkedIn",
      value: profile.linkedinLabel,
      href: profile.linkedin,
      external: true,
      accent: "#038387",
    },
    {
      icon: MapPin,
      label: "Location",
      value: profile.location,
      accent: "#8764b8",
    },
  ];

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    if (payload.website) {
      setStatus("success");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
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
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map((c) => {
          const Icon = c.icon;
          const inner = (
            <>
              <div
                className="grid h-11 w-11 place-items-center rounded-md"
                style={{ background: `${c.accent}14` }}
              >
                <Icon size={20} style={{ color: c.accent }} />
              </div>
              <div className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                {c.label}
              </div>
              <div className="mt-0.5 truncate text-[13.5px] font-medium text-[var(--text)]">{c.value}</div>
            </>
          );
          const className =
            "block rounded-lg border bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md";
          return c.href ? (
            <a
              key={c.label}
              href={c.href}
              {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={className}
              style={{ borderColor: "var(--border)" }}
            >
              {inner}
            </a>
          ) : (
            <div key={c.label} className={className} style={{ borderColor: "var(--border)" }}>
              {inner}
            </div>
          );
        })}
      </div>

      <Tile title="Send a Message" icon={Send} accent="#0f6cbd">
        {status === "success" ? (
          <div className="p-8 text-center">
            <CheckCircle2 size={40} className="mx-auto" style={{ color: "var(--d365-green)" }} />
            <h3 className="mt-3 text-[15px] font-semibold">Message sent</h3>
            <p className="mt-1 text-[13px] text-[var(--text-secondary)]">
              Thanks for reaching out — I&apos;ll get back to you soon.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-4 rounded px-4 py-2 text-[13px] font-semibold text-white"
              style={{ background: "var(--d365-blue)" }}
            >
              Send another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-4 p-5 sm:grid-cols-2">
            <Field label="Name" name="name" placeholder="Your name" required />
            <Field label="Email" name="email" type="email" placeholder="you@company.com" required />
            <div className="sm:col-span-2">
              <label className="mb-1 block text-[12px] font-medium text-[var(--text-secondary)]">Message</label>
              <textarea
                name="message"
                rows={5}
                required
                placeholder="How can I help?"
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
              <div className="sm:col-span-2 rounded-md bg-[#c33d2e14] px-3 py-2 text-[12.5px] text-[var(--d365-red)]">
                {errorMsg}
              </div>
            )}

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="flex items-center gap-2 rounded px-5 py-2 text-[13px] font-semibold text-white transition-colors disabled:opacity-60"
                style={{ background: "var(--d365-blue)" }}
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 size={15} className="animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    <Send size={15} /> Send message
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </Tile>
    </div>
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
      <label className="mb-1 block text-[12px] font-medium text-[var(--text-secondary)]">{label}</label>
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
