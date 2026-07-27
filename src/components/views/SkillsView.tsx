"use client";

import { skillGroups } from "@/data/portfolio";
import { Tile } from "../ui";
import {
  Database,
  Workflow,
  Cable,
  ShieldCheck,
  Users,
  Code2,
  Bot,
  type LucideIcon,
} from "lucide-react";

const icons: LucideIcon[] = [Database, Workflow, Cable, ShieldCheck, Users, Code2, Bot];
const accents = ["#0f6cbd", "#038387", "#107c41", "#c33d2e", "#8764b8", "#0f6cbd", "#c19c00"];

export default function SkillsView() {
  return (
    <div className="stagger-children grid gap-4 md:grid-cols-2">
      {skillGroups.map((g, i) => {
        const Icon = icons[i % icons.length];
        const accent = accents[i % accents.length];
        return (
          <Tile key={g.category} title={g.category} icon={Icon} accent={accent} className="card-lift">
            <div className="flex flex-wrap gap-2 p-4">
              {g.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-md border px-2.5 py-1 text-[12.5px] font-medium text-[var(--text-secondary)] transition-all hover:-translate-y-0.5 hover:border-current hover:shadow-sm"
                  style={{ borderColor: "var(--border)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                >
                  {s}
                </span>
              ))}
            </div>
          </Tile>
        );
      })}
    </div>
  );
}
