"use client";

import { Fragment, useMemo } from "react";
import { skillGroups } from "@/data/portfolio";
import { Tile } from "../ui";
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
 * The three chapters of the journey — engineering → delivery → AI direction.
 * ------------------------------------------------------------------------- */
const JOURNEY: { icon: LucideIcon; title: string; note: string; accent: string }[] = [
  { icon: Code2, title: "Software Engineering", note: "Where I started", accent: "#0f6cbd" },
  {
    icon: LayoutGrid,
    title: "D365 & Power Platform Delivery",
    note: "My specialism today",
    accent: "#107c41",
  },
  {
    icon: Sparkles,
    title: "AI-enabled Solution Architecture",
    note: "Direction I'm building toward",
    accent: "#8764b8",
  },
];

/* ---------------------------------------------------------------------------
 * Visual metadata + reading order for each skill area.
 * ------------------------------------------------------------------------- */
type CategoryMeta = { icon: LucideIcon; accent: string; blurb: string };

const CATEGORY_META: Record<string, CategoryMeta> = {
  "Dynamics 365 & Dataverse": {
    icon: LayoutGrid,
    accent: "#0f6cbd",
    blurb: "Microsoft business applications I configure, support and extend.",
  },
  "Power Platform": {
    icon: Workflow,
    accent: "#107c41",
    blurb: "Low-code tooling I use to automate processes and extend CRM capability.",
  },
  "Pro-code extensibility": {
    icon: Braces,
    accent: "#8764b8",
    blurb: "Code-first customisations for scenarios beyond out-of-the-box configuration.",
  },
  "ALM, security and governance": {
    icon: ShieldCheck,
    accent: "#c33d2e",
    blurb: "Packaging, promoting and securing changes safely across environments.",
  },
  "Integration and data": {
    icon: Cable,
    accent: "#c19c00",
    blurb: "Data migration, quality and API-based integration across systems.",
  },
  "Business analysis and delivery": {
    icon: Users,
    accent: "#0f6cbd",
    blurb: "Translating business requirements into adopted solutions.",
  },
  "Software engineering": {
    icon: Code2,
    accent: "#038387",
    blurb: "Development foundations that support pro-code Dynamics delivery.",
  },
  "AI and emerging technology": {
    icon: Bot,
    accent: "#8764b8",
    blurb: "Applying prompt engineering and practical AI patterns in CRM contexts.",
  },
  "Dataverse & Model-Driven Apps": {
    icon: Database,
    accent: "#038387",
    blurb: "The data model and app-building layer beneath every D365 solution.",
  },
};

/** Order the skill set by market-facing specialism first, then breadth. */
const CATEGORY_ORDER = [
  "Dynamics 365 & Dataverse",
  "Power Platform",
  "Pro-code extensibility",
  "ALM, security and governance",
  "Integration and data",
  "Business analysis and delivery",
  "Software engineering",
  "AI and emerging technology",
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
      {/* Intro + journey */}
      <Tile title="My skill set" icon={Sparkles} accent="#8764b8">
        <div className="space-y-4 p-4 sm:p-5">
          <p className="max-w-2xl text-[13px] leading-relaxed text-[var(--text-secondary)]">
            I started out as a software engineer and specialised into Dynamics 365 and the Power
            Platform. I'm now extending that foundation into AI-enabled solution architecture for CRM
            and business process delivery.
          </p>

          {/* Journey strip */}
          <div
            className="flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center sm:gap-0"
            style={{
              borderColor: "var(--border)",
              background:
                "linear-gradient(120deg, var(--d365-blue-light) 0%, var(--journey-end) 70%)",
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
        </div>
      </Tile>

      {/* Skill areas */}
      <Tile title="Skill areas" icon={LayoutGrid} accent="#107c41">
        <div className="p-4">
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
        </div>
      </Tile>

      {/* Footprint */}
      <div
        className="flex items-center gap-2 rounded-lg border border-dashed px-4 py-3 text-[12.5px] text-[var(--text-secondary)]"
        style={{ borderColor: "var(--border-strong)" }}
      >
        <Sparkles size={15} style={{ color: "var(--d365-purple)" }} />
        <span className="font-medium text-[var(--text)]">{totalSkills} skills</span> across{" "}
        {groups.length} areas — from D365 delivery through to AI-enabled solution architecture.
      </div>
    </div>
  );
}
