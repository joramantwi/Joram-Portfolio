"use client";

import { BadgeCheck, GraduationCap } from "lucide-react";
import { certifications, education } from "@/data/portfolio";
import { Tile } from "../ui";

export default function CertificationsView() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Tile title="Certifications" icon={BadgeCheck} accent="#8764b8">
        <ul className="divide-y" style={{ borderColor: "var(--border)" }}>
          {certifications.map((c) => (
            <li key={c.name} className="flex items-start gap-3 p-4">
              <div
                className="grid h-10 w-10 shrink-0 place-items-center rounded-md"
                style={{ background: "#8764b814" }}
              >
                <BadgeCheck size={18} style={{ color: "var(--d365-purple)" }} />
              </div>
              <div>
                <p className="text-[14px] font-semibold text-[var(--text)]">{c.name}</p>
                <p className="text-[12.5px] text-[var(--text-secondary)]">
                  {c.issuer} · {c.date}
                </p>
              </div>
            </li>
          ))}
        </ul>
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
