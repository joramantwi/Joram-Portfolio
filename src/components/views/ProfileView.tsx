"use client";

import { UserRound, MapPin, FileText, Award } from "lucide-react";
import { profile, skillGroups } from "@/data/portfolio";
import { Tile, LinkedInIcon } from "../ui";
import { useRequestCv } from "../cv/RequestCvProvider";

export default function ProfileView() {
  const { open } = useRequestCv();
  const rows = [
    { icon: MapPin, label: "Location", value: profile.location },
    { icon: LinkedInIcon, label: "LinkedIn", value: profile.linkedinLabel, href: profile.linkedin, external: true },
    { icon: Award, label: "Microsoft Learn", value: profile.learnProfileLabel, href: profile.learnCredentials, external: true },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Tile className="lg:col-span-1" title="Contact Card" icon={UserRound} accent="#038387">
        <div className="p-5">
          <div
            className="mx-auto grid h-20 w-20 place-items-center rounded-full text-2xl font-bold text-white"
            style={{ background: "linear-gradient(135deg, var(--d365-teal), var(--d365-blue))" }}
          >
            {profile.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <h2 className="mt-3 text-center text-[16px] font-semibold text-[var(--text)]">{profile.name}</h2>
          <p className="text-center text-[12.5px] text-[var(--text-secondary)]">{profile.title}</p>

          <div className="mt-4 space-y-1">
            {rows.map((r) => {
              const Icon = r.icon;
              const content = (
                <span className="flex items-center gap-3 rounded px-2 py-2 text-[13px] transition-colors hover:bg-[var(--sidebar-hover)]">
                  <Icon size={16} style={{ color: "var(--d365-blue)" }} className="shrink-0" />
                  <span className="min-w-0">
                    <span className="block text-[11px] uppercase tracking-wide text-[var(--text-muted)]">
                      {r.label}
                    </span>
                    <span className="block truncate text-[var(--text)]">{r.value}</span>
                  </span>
                </span>
              );
              return r.href ? (
                <a
                  key={r.label}
                  href={r.href}
                  {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="block"
                >
                  {content}
                </a>
              ) : (
                <div key={r.label}>{content}</div>
              );
            })}
          </div>

          <button
            onClick={open}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded px-4 py-2 text-[13px] font-semibold text-white transition-colors"
            style={{ background: "var(--d365-blue)" }}
          >
            <FileText size={15} /> Request CV
          </button>
        </div>
      </Tile>

      <div className="space-y-4 lg:col-span-2">
        <Tile title="Professional Summary" icon={UserRound} accent="#0f6cbd">
          <p className="p-5 text-[13.5px] leading-relaxed text-[var(--text-secondary)]">
            {profile.summary}
          </p>
        </Tile>

        <Tile title="At a Glance" icon={UserRound} accent="#8764b8">
          <div className="flex flex-wrap gap-2 p-5">
            {skillGroups.flatMap((g) => g.skills).slice(0, 18).map((s) => (
              <span
                key={s}
                className="rounded-full px-3 py-1 text-[12px] font-medium"
                style={{ background: "var(--d365-blue-light)", color: "var(--d365-blue-hover)" }}
              >
                {s}
              </span>
            ))}
          </div>
        </Tile>
      </div>
    </div>
  );
}
