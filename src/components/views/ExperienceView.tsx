"use client";

import { Briefcase, MapPin } from "lucide-react";
import { experiences } from "@/data/portfolio";
import { Badge } from "../ui";

export default function ExperienceView() {
  return (
    <div className="space-y-4">
      {experiences.map((e, idx) => (
        <article
          key={e.role + e.company}
          className="rounded-lg border bg-white p-5 shadow-sm"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="flex items-start gap-3">
              <div
                className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-md"
                style={{ background: "var(--d365-blue-light)" }}
              >
                <Briefcase size={18} style={{ color: "var(--d365-blue)" }} />
              </div>
              <div>
                <h2 className="flex items-center gap-2 text-[16px] font-semibold text-[var(--text)]">
                  {e.role}
                  {e.current && <Badge color="#107c41">Current</Badge>}
                </h2>
                <p className="text-[13px] font-medium text-[var(--d365-blue-hover)]">{e.company}</p>
                <p className="mt-0.5 flex items-center gap-1 text-[12px] text-[var(--text-muted)]">
                  <MapPin size={12} /> {e.location}
                </p>
              </div>
            </div>
            <span className="rounded-full bg-[var(--surface)] px-3 py-1 text-[12px] font-medium text-[var(--text-secondary)]">
              {e.period}
            </span>
          </div>

          <ul className="mt-4 space-y-2 pl-1">
            {e.points.map((p, i) => (
              <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-[var(--text-secondary)]">
                <span
                  className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: e.current ? "var(--d365-green)" : "var(--d365-blue)" }}
                />
                {p}
              </li>
            ))}
          </ul>
          {idx < experiences.length - 1 && <span className="sr-only">next role</span>}
        </article>
      ))}
    </div>
  );
}
