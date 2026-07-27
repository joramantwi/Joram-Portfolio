"use client";

import Image from "next/image";
import { BadgeCheck, GraduationCap, ExternalLink, ShieldCheck } from "lucide-react";
import { certifications, education, profile } from "@/data/portfolio";
import { Tile } from "../ui";

export default function CertificationsView() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Tile title="Certifications" icon={BadgeCheck} accent="#8764b8">
        <div className="p-4">
          <ul className="space-y-3">
            {certifications.map((c) => {
              const inner = (
                <>
                  <div className="grid h-16 w-16 shrink-0 place-items-center">
                    {c.badge ? (
                      <Image
                        src={c.badge}
                        alt={`${c.name} badge`}
                        width={64}
                        height={64}
                        className="h-16 w-16 object-contain transition-transform duration-200 group-hover:scale-110"
                      />
                    ) : (
                      <div
                        className="grid h-12 w-12 place-items-center rounded-md"
                        style={{ background: "#8764b814" }}
                      >
                        <BadgeCheck size={20} style={{ color: "var(--d365-purple)" }} />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[14px] font-semibold leading-snug text-[var(--text)]">
                      {c.name}
                    </p>
                    <p className="mt-0.5 text-[12.5px] text-[var(--text-secondary)]">
                      {c.issuer} · {c.date}
                    </p>
                    {c.credentialUrl && (
                      <span
                        className="mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-semibold"
                        style={{ background: "#10784114", color: "var(--d365-green)" }}
                      >
                        <ShieldCheck size={13} /> Verified credential
                      </span>
                    )}
                  </div>
                  {c.credentialUrl && (
                    <ExternalLink
                      size={16}
                      className="mt-1 shrink-0 text-[var(--text-muted)] transition-colors group-hover:text-[var(--d365-blue)]"
                    />
                  )}
                </>
              );

              const className =
                "group flex items-start gap-4 rounded-lg border bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--d365-blue)] hover:shadow-md";

              return c.credentialUrl ? (
                <li key={c.name}>
                  <a
                    href={c.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                    style={{ borderColor: "var(--border)" }}
                  >
                    {inner}
                  </a>
                </li>
              ) : (
                <li
                  key={c.name}
                  className={className.replace("group ", "")}
                  style={{ borderColor: "var(--border)" }}
                >
                  {inner}
                </li>
              );
            })}
          </ul>

          <a
            href={profile.learnCredentials}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-dashed p-4 transition-colors hover:bg-[var(--sidebar-hover)]"
            style={{ borderColor: "var(--border-strong)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="grid h-10 w-10 shrink-0 place-items-center rounded-md"
                style={{ background: "var(--d365-blue-light)" }}
              >
                <BadgeCheck size={18} style={{ color: "var(--d365-blue)" }} />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-[var(--text)]">
                  Live on Microsoft Learn
                </p>
                <p className="text-[12px] text-[var(--text-secondary)]">
                  All certifications &amp; applied skills, always up to date
                </p>
              </div>
            </div>
            <ExternalLink size={16} className="shrink-0 text-[var(--d365-blue)]" />
          </a>
        </div>
      </Tile>

      <Tile title="Education" icon={GraduationCap} accent="#0f6cbd">
        <ul className="divide-y" style={{ borderColor: "var(--border)" }}>
          {education.map((e) => (
            <li key={e.qualification} className="flex items-start gap-3 p-4">
              <div
                className="grid h-10 w-10 shrink-0 place-items-center rounded-md"
                style={{ background: "var(--d365-blue-light)" }}
              >
                <GraduationCap size={18} style={{ color: "var(--d365-blue)" }} />
              </div>
              <div>
                <p className="text-[14px] font-semibold text-[var(--text)]">{e.qualification}</p>
                <p className="text-[12.5px] text-[var(--text-secondary)]">
                  {e.institution} · {e.date}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Tile>
    </div>
  );
}
