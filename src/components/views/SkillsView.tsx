"use client";

import { Fragment, useMemo } from "react";
import { skillGroups } from "@/data/portfolio";
import {
  ArrowRight,
  Code2,
  Workflow,
  Cloud,
  Database,
  UserCog,
  Braces,
  ShieldCheck,
  Cable,
  Users,
  Bot,
  PieChart,
  Boxes,
  LayoutGrid,
  Table2,
  ClipboardList,
  ArrowRightLeft,
  Settings2,
  BarChart3,
  Globe,
  FileSpreadsheet,
  GitBranch,
  Lock,
  KeyRound,
  BookOpen,
  Sparkles,
  Network,
  RefreshCw,
  Zap,
  Headset,
  MessageSquare,
  Truck,
  Handshake,
  type LucideIcon,
} from "lucide-react";

/* ---------------------------------------------------------------------------
 * The three chapters of the journey — software engineer → D365 → AI.
 * ------------------------------------------------------------------------- */
const JOURNEY: { icon: LucideIcon; title: string; note: string; accent: string }[] = [
  { icon: Code2, title: "Software Engineering", note: "Where I started", accent: "#0f6cbd" },
  {
    icon: LayoutGrid,
    title: "Dynamics 365 & Power Platform",
    note: "My specialism today",
    accent: "#107c41",
  },
  {
    icon: Sparkles,
    title: "AI Solution Architecture",
    note: "Where I'm heading",
    accent: "#8764b8",
  },
];

/* ---------------------------------------------------------------------------
 * Visual metadata + reading order for each skill area.
 * ------------------------------------------------------------------------- */
type CategoryMeta = { icon: LucideIcon; accent: string; blurb: string };

const CATEGORY_META: Record<string, CategoryMeta> = {
  "Engineering Foundations": {
    icon: Code2,
    accent: "#0f6cbd",
    blurb: "The software-engineering background I build everything else on.",
  },
  "Dataverse & Model-Driven Apps": {
    icon: Database,
    accent: "#038387",
    blurb: "The data model and app-building layer beneath every D365 solution.",
  },
  "Dynamics 365 Apps": {
    icon: LayoutGrid,
    accent: "#0f6cbd",
    blurb: "The first-party business apps I configure and deliver on.",
  },
  "Power Platform": {
    icon: Workflow,
    accent: "#107c41",
    blurb: "Low-code tools that extend and surface Dataverse data.",
  },
  "Pro-Dev & Extensibility": {
    icon: Braces,
    accent: "#8764b8",
    blurb: "Code-first extensions where configuration alone isn't enough.",
  },
  "Data & Integration": {
    icon: Cable,
    accent: "#c19c00",
    blurb: "Moving, cleaning and connecting data across systems.",
  },
  "ALM & Governance": {
    icon: ShieldCheck,
    accent: "#c33d2e",
    blurb: "Shipping solutions safely across environments, with security and compliance.",
  },
  "Delivery & Consulting": {
    icon: Users,
    accent: "#0f6cbd",
    blurb: "Turning business needs into shipped, adopted solutions.",
  },
  "AI & Emerging Tech": {
    icon: Bot,
    accent: "#8764b8",
    blurb: "Exploring how AI fits into CRM workflows and business use cases.",
  },
};

/** Order the skill set reads as a story, foundations → specialism → AI. */
const CATEGORY_ORDER = [
  "Engineering Foundations",
  "Dataverse & Model-Driven Apps",
  "Dynamics 365 Apps",
  "Power Platform",
  "Pro-Dev & Extensibility",
  "Data & Integration",
  "ALM & Governance",
  "Delivery & Consulting",
  "AI & Emerging Tech",
];

/** Maps a skill name to a fitting icon via keywords, falling back to a default. */
function iconForSkill(skill: string, fallback: LucideIcon): LucideIcon {
  const s = skill.toLowerCase();
  const rules: [RegExp, LucideIcon][] = [
    [/sales/, PieChart],
    [/customer service|case|sla|routing/, Headset],
    [/customer voice|survey|feedback/, MessageSquare],
    [/supply chain/, Truck],
    [/copilot studio|copilot/, Bot],
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
  const groups = useMemo(
    () =>
      CATEGORY_ORDER.map((name) => skillGroups.find((g) => g.category === name)).filter(
        (g): g is NonNullable<typeof g> => Boolean(g)
      ),
    []
  );
  const totalSkills = useMemo(
    () => groups.reduce((n, g) => n + g.skills.length, 0),
    [groups]
  );

  return (
    <div className="view-enter space-y-4">
      {/* Intro */}
      <header>
        <h2 className="text-[17px] font-semibold text-[var(--text)]">My skill set</h2>
        <p className="mt-1 max-w-2xl text-[13px] leading-relaxed text-[var(--text-secondary)]">
          I started out as a software engineer and specialised into Microsoft Dynamics 365 and the
          Power Platform. I'm now combining that engineering background with AI, working toward AI
          solution architecture in the Dynamics 365 space.
        </p>
      </header>

      {/* Journey strip */}
      <div
        className="flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center sm:gap-0"
        style={{
          borderColor: "var(--border)",
          background: "linear-gradient(120deg, var(--d365-blue-light) 0%, white 70%)",
        }}
      >
        {JOURNEY.map((p, i) => (
          <Fragment key={p.title}>
            <div className="flex flex-1 items-center gap-3">
              <span
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
                style={{ background: `${p.accent}18` }}
              >
                <p.icon size={20} style={{ color: p.accent }} />
              </span>
              <div>
                <p className="text-[13px] font-semibold leading-tight text-[var(--text)]">
                  {p.title}
                </p>
                <p className="text-[11px] text-[var(--text-muted)]">{p.note}</p>
              </div>
            </div>
            {i < JOURNEY.length - 1 && (
              <ArrowRight
                size={18}
                className="mx-3 hidden shrink-0 sm:block"
                style={{ color: "var(--text-muted)" }}
                aria-hidden
              />
            )}
          </Fragment>
        ))}
      </div>

      {/* Skill areas */}
      <div className="stagger-children grid grid-cols-1 gap-4 lg:grid-cols-2">
        {groups.map((group) => {
          const meta =
            CATEGORY_META[group.category] ??
            ({ icon: Code2, accent: "#0f6cbd", blurb: "" } as CategoryMeta);
          const Icon = meta.icon;
          return (
            <div
              key={group.category}
              className="card-lift flex h-full flex-col overflow-hidden rounded-xl border bg-white shadow-sm"
              style={{ borderColor: "var(--border)" }}
            >
              {/* accent bar */}
              <div className="h-1 w-full" style={{ background: meta.accent }} />

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-3">
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-lg"
                    style={{ background: `${meta.accent}14` }}
                  >
                    <Icon size={20} style={{ color: meta.accent }} />
                  </span>
                  <div>
                    <h3 className="text-[15px] font-semibold leading-tight text-[var(--text)]">
                      {group.category}
                    </h3>
                    <p className="mt-0.5 text-[11.5px] text-[var(--text-muted)]">
                      {group.skills.length} skills
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-[12.5px] leading-relaxed text-[var(--text-secondary)]">
                  {meta.blurb}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {group.skills.map((skill) => {
                    const SkillIcon = iconForSkill(skill, Icon);
                    return (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[12px] text-[var(--text)]"
                        style={{
                          borderColor: `${meta.accent}33`,
                          background: `${meta.accent}0a`,
                        }}
                      >
                        <SkillIcon size={13} style={{ color: meta.accent }} />
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footprint */}
      <div
        className="flex items-center gap-2 rounded-lg border border-dashed px-4 py-3 text-[12.5px] text-[var(--text-secondary)]"
        style={{ borderColor: "var(--border-strong)" }}
      >
        <Sparkles size={15} style={{ color: "var(--d365-purple)" }} />
        <span className="font-medium text-[var(--text)]">{totalSkills} skills</span> across{" "}
        {groups.length} areas — from engineering foundations toward AI solution architecture.
      </div>
    </div>
  );
}
