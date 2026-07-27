"use client";

import { FolderKanban, Building2, CheckCircle2 } from "lucide-react";
import { projects } from "@/data/portfolio";
import { Badge } from "../ui";

export default function ProjectsView() {
  return (
    <div className="stagger-children grid gap-4 md:grid-cols-2">
      {projects.map((p) => (
        <article
          key={p.name}
          className="group card-lift flex flex-col rounded-lg border bg-white p-5 shadow-sm"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex items-start justify-between">
            <div
              className="grid h-10 w-10 place-items-center rounded-md transition-transform group-hover:scale-110"
              style={{ background: "#107c4114" }}
            >
              <FolderKanban size={18} style={{ color: "var(--d365-green)" }} />
            </div>
            <span className="flex items-center gap-1 text-[12px] font-medium text-[var(--d365-green)]">
              <CheckCircle2 size={14} /> {p.stage}
            </span>
          </div>

          <h2 className="mt-3 text-[15px] font-semibold text-[var(--text)]">{p.name}</h2>
          <p className="mt-0.5 flex items-center gap-1 text-[12px] text-[var(--text-muted)]">
            <Building2 size={12} /> {p.org}
          </p>
          <p className="mt-2 flex-1 text-[13px] leading-relaxed text-[var(--text-secondary)]">
            {p.summary}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
