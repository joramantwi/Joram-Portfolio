"use client";

import { Mail, Phone, MapPin, Send } from "lucide-react";
import { profile } from "@/data/portfolio";
import { Tile, LinkedInIcon } from "../ui";

export default function ContactView() {
  const cards = [
    {
      icon: Mail,
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      accent: "#0f6cbd",
    },
    {
      icon: Phone,
      label: "Phone",
      value: profile.phone,
      href: `tel:${profile.phone.replace(/\s/g, "")}`,
      accent: "#107c41",
    },
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

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
        <form
          action={`mailto:${profile.email}`}
          method="post"
          encType="text/plain"
          className="grid gap-4 p-5 sm:grid-cols-2"
        >
          <Field label="Name" name="name" placeholder="Your name" />
          <Field label="Email" name="email" type="email" placeholder="you@company.com" />
          <div className="sm:col-span-2">
            <label className="mb-1 block text-[12px] font-medium text-[var(--text-secondary)]">Message</label>
            <textarea
              name="message"
              rows={5}
              placeholder="How can I help?"
              className="w-full rounded-md border px-3 py-2 text-[13px] outline-none transition-colors focus:border-[var(--d365-blue)] focus:ring-2 focus:ring-[var(--d365-blue)]/20"
              style={{ borderColor: "var(--border-strong)" }}
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="flex items-center gap-2 rounded px-5 py-2 text-[13px] font-semibold text-white transition-colors"
              style={{ background: "var(--d365-blue)" }}
            >
              <Send size={15} /> Send message
            </button>
          </div>
        </form>
      </Tile>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-[12px] font-medium text-[var(--text-secondary)]">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full rounded-md border px-3 py-2 text-[13px] outline-none transition-colors focus:border-[var(--d365-blue)] focus:ring-2 focus:ring-[var(--d365-blue)]/20"
        style={{ borderColor: "var(--border-strong)" }}
      />
    </div>
  );
}
