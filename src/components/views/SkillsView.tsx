"use client";

import { useMemo, useState } from "react";
import { skillGroups } from "@/data/portfolio";
import {
  Database,
  Workflow,
  Cable,
  ShieldCheck,
  Users,
  Code2,
  Bot,
  LayoutGrid,
  Table2,
  FileSpreadsheet,
  GitBranch,
  Cloud,
  Zap,
  BarChart3,
  Lock,
  MessageSquare,
  Sparkles,
  Boxes,
  Network,
  Braces,
  Globe,
  ClipboardList,
  Settings2,
  RefreshCw,
  BookOpen,
  UserCog,
  KeyRound,
  ArrowRightLeft,
  Headset,
  PieChart,
  Handshake,
  type LucideIcon,
} from "lucide-react";

type CategoryMeta = {
  icon: LucideIcon;
  accent: string;
  blurb: string;
};

/** Visual metadata per category, keyed by the category name in portfolio.ts */
const categoryMeta: Record<string, CategoryMeta> = {
  "Microsoft Dynamics 365 / CRM": {
    icon: LayoutGrid,
    accent: "#0f6cbd",
    blurb: "Model-driven apps, configuration and customisation across the CE stack.",
  },
  "Power Platform & Dataverse": {
    icon: Database,
    accent: "#038387",
    blurb: "Low-code build on Dataverse — apps, automation, pages and reporting.",
  },
  "Automation, Integration & Data": {
    icon: Workflow,
    accent: "#107c41",
    blurb: "Connecting systems and keeping data clean, mapped and moving.",
  },
  "Security, Governance & ALM": {
    icon: ShieldCheck,
    accent: "#c33d2e",
    blurb: "Access control, compliance and a disciplined path to production.",
  },
  "Delivery & Stakeholder Management": {
    icon: Users,
    accent: "#8764b8",
    blurb: "Turning business needs into shipped, adopted solutions.",
  },
  "Technical Foundations": {
    icon: Code2,
    accent: "#0f6cbd",
    blurb: "The engineering background behind the functional work.",
  },
  "AI & Emerging Technologies": {
    icon: Bot,
    accent: "#c19c00",
    blurb: "Exploring how AI fits into CRM workflows and business use cases.",
  },
};

/** Maps a skill name to a fitting icon via keywords, falling back to the category icon. */
function iconForSkill(skill: string, fallback: LucideIcon): LucideIcon {
  const s = skill.toLowerCase();
  const rules: [RegExp, LucideIcon][] = [
    [/sales/, PieChart],
    [/customer service|case|sla|routing/, Headset],
    [/customer engagement|\bce\b/, Handshake],
    [/power automate|workflow|flow|automation/, Workflow],
    [/power apps|model-driven|canvas|app\b/, LayoutGrid],
    [/dataverse|data model|database|sql/, Database],
    [/table|entit/, Table2],
    [/form|view|business rule/, ClipboardList],
    [/business process/, ArrowRightLeft],
    [/command bar|ribbon|configuration|customisation|customization/, Settings2],
    [/solution|alm|managed|unmanaged|layering/, Boxes],
    [/connector|integration|rest|api|json/, Cable],
    [/azure|app registration|cloud/, Cloud],
    [/power bi|report|dashboard|analytic/, BarChart3],
    [/power pages|portal|web/, Globe],
    [/migration|dedupl|import|excel|csv|mapping/, FileSpreadsheet],
    [/devops|ci\/cd|pipeline|environment strateg/, GitBranch],
    [/security|gdpr|retention/, Lock],
    [/role|team|business unit|field-level|permission/, KeyRound],
    [/training|documentation|workshop|coaching/, BookOpen],
    [/requirement|fit-gap|process map|user stor|agile|scrum|uat/, UserCog],
    [/javascript|c#|php|node|python|full-stack/, Braces],
    [/copilot|ai |prompt|use case|optim/, Sparkles],
    [/stakeholder|adoption/, Users],
    [/network|topology/, Network],
    [/sync|refresh/, RefreshCw],
    [/message|notification|communication/, MessageSquare],
    [/quick|fast|zap/, Zap],
  ];
  for (const [re, icon] of rules) if (re.test(s)) return icon;
  return fallback;
}

export default function SkillsView() {
  const [active, setActive] = useState(0);
  const group = skillGroups[active];
  const meta =
    categoryMeta[group.category] ?? ({ icon: Code2, accent: "#0f6cbd", blurb: "" } as CategoryMeta);

  const totalSkills = useMemo(() => skillGroups.reduce((n, g) => n + g.skills.length, 0), []);

  return (
    <div className="space-y-4">
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        {skillGroups.map((g, i) => {
          const m = categoryMeta[g.category];
          const Icon = m?.icon ?? Code2;
          const accent = m?.accent ?? "#0f6cbd";
          const isActive = i === active;
          return (
            <button
              key={g.category}
              onClick={() => setActive(i)}
              className="group flex items-center gap-2 rounded-full border px-3.5 py-2 text-[12.5px] font-medium transition-all duration-200"
              style={{
                borderColor: isActive ? accent : "var(--border)",
                background: isActive ? accent : "white",
                color: isActive ? "white" : "var(--text-secondary)",
                boxShadow: isActive ? `0 4px 12px ${accent}33` : undefined,
              }}
            >
              <Icon size={15} style={{ color: isActive ? "white" : accent }} />
              <span>{g.category}</span>
              <span
                className="ml-0.5 grid h-4 min-w-4 place-items-center rounded-full px-1 text-[10px] font-bold"
                style={{
                  background: isActive ? "rgba(255,255,255,0.22)" : `${accent}14`,
                  color: isActive ? "white" : accent,
                }}
              >
                {g.skills.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active category panel */}
      <div
        key={active}
        className="view-enter rounded-lg border bg-white p-5 shadow-sm"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="flex items-start gap-3">
          <span
            className="grid h-11 w-11 shrink-0 place-items-center rounded-lg"
            style={{ background: `${meta.accent}16` }}
          >
            <meta.icon size={22} style={{ color: meta.accent }} />
          </span>
          <div>
            <h2 className="text-[16px] font-semibold text-[var(--text)]">{group.category}</h2>
            <p className="mt-0.5 text-[12.5px] leading-relaxed text-[var(--text-secondary)]">
              {meta.blurb}
            </p>
          </div>
        </div>

        <div className="stagger-children mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
          {group.skills.map((skill) => {
            const Icon = iconForSkill(skill, meta.icon);
            return (
              <div
                key={skill}
                className="card-lift group flex flex-col items-center gap-2.5 rounded-lg border bg-white px-3 py-4 text-center"
                style={{ borderColor: "var(--border)" }}
              >
                <span
                  className="grid h-11 w-11 place-items-center rounded-full transition-transform duration-200 group-hover:scale-110"
                  style={{ background: `${meta.accent}14` }}
                >
                  <Icon size={19} style={{ color: meta.accent }} />
                </span>
                <span className="text-[12.5px] font-medium leading-snug text-[var(--text)]">
                  {skill}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footprint summary */}
      <div
        className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-dashed px-4 py-3 text-[12.5px] text-[var(--text-secondary)]"
        style={{ borderColor: "var(--border-strong)" }}
      >
        <span className="flex items-center gap-2">
          <Sparkles size={15} style={{ color: "var(--d365-purple)" }} />
          <span className="font-medium text-[var(--text)]">{totalSkills} skills</span> across{" "}
          {skillGroups.length} capability areas
        </span>
        <span className="text-[var(--text-muted)]">Select a category to explore</span>
      </div>
    </div>
  );
}
