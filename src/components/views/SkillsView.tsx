"use client";

import { Fragment } from "react";
import { Tile } from "../ui";
import {
  ArrowRight,
  Code2,
  Workflow,
  Cloud,
  Database,
  UserCog,
  Braces,
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

type SkillColumn = {
  label: string;
  accent: string;
  skills: string[];
};

const SKILL_COLUMNS: SkillColumn[] = [
  {
    label: "Dynamics 365 & Platform",
    accent: "#0f6cbd",
    skills: [
      "Dynamics 365 Customer Service",
      "Dynamics 365 Contact Center",
      "Dynamics 365 Sales",
      "Dataverse data modelling",
      "Model-driven app design",
      "Business process flows",
    ],
  },
  {
    label: "Pro-code & Extensibility",
    accent: "#8764b8",
    skills: [
      "C# Dataverse plug-ins",
      "JavaScript form scripting",
      "Power Automate cloud flows",
      "Web API & REST integrations",
    ],
  },
  {
    label: "ALM, Governance & AI",
    accent: "#107c41",
    skills: [
      "Managed / unmanaged solutions",
      "Power Platform Pipelines",
      "Dataverse security model",
      "Requirements & fit-gap analysis",
      "UAT facilitation",
      "Copilot Studio",
      "AI-assisted service design",
    ],
  },
];

/** Maps a skill name to a fitting icon via keywords, falling back to a default. */
function iconForSkill(skill: string, fallback: LucideIcon): LucideIcon {
  const s = skill.toLowerCase();
  const rules: [RegExp, LucideIcon][] = [
    [/sales/, PieChart],
    [/customer service|contact center|case|sla|routing/, Headset],
    [/customer voice|survey|feedback/, MessageSquare],
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
    [/javascript|c#|php|node|python|full-stack|plugin/, Braces],
    [/copilot|\bai\b|prompt|use case|optim/, Sparkles],
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
  return (
    <div className="view-enter space-y-4">
      {/* Intro + journey */}
      <div className="crm-accent-bar crm-ring rounded-lg">
      <Tile title="My skill set" icon={Sparkles} accent="#8764b8">
        <div className="crm-surface space-y-4 p-4 sm:p-5">
          <p className="max-w-2xl text-[13px] leading-relaxed text-[var(--text-secondary)]">
            I started out as a software engineer and specialised into Dynamics 365 and the Power
            Platform. I&apos;m now extending that foundation toward AI-enabled solution architecture
            across Dynamics 365 CE and business process delivery.
          </p>

          {/* Journey strip */}
          <div
            className="flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center sm:gap-0"
            style={{
              borderColor: "var(--border)",
              background:
                "linear-gradient(115deg, rgba(135,100,184,0.16) 0%, rgba(15,108,189,0.12) 52%, var(--journey-end) 100%)",
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
      </div>

      {/* Skill areas */}
      <div className="crm-accent-bar crm-ring rounded-lg">
      <Tile title="Skills & technologies" icon={LayoutGrid} accent="#107c41">
        <div className="grid divide-y lg:grid-cols-3 lg:divide-x lg:divide-y-0" style={{ borderColor: "var(--border)" }}>
          {SKILL_COLUMNS.map((column) => (
            <section key={column.label} className="p-5 sm:p-6">
              <div className="flex items-center justify-between gap-2">
                <p className="crm-gradient-text text-[10.5px] font-semibold uppercase tracking-[0.18em]">
                  {column.label}
                </p>
                <span
                  className="grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-[10px] font-semibold tabular-nums"
                  style={{ background: `${column.accent}14`, color: column.accent }}
                >
                  {column.skills.length}
                </span>
              </div>
              <ol className="stagger-children mt-4 space-y-0">
                {column.skills.map((skill, index) => {
                  const SkillIcon = iconForSkill(skill, LayoutGrid);
                  return (
                    <li
                      key={skill}
                      className="group flex items-center gap-3 border-b py-2.5 last:border-b-0"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <span
                        className="w-4 shrink-0 font-mono text-[10px] tabular-nums"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="grid h-7 w-7 shrink-0 place-items-center rounded-md transition-transform duration-200 group-hover:scale-105"
                        style={{ background: `${column.accent}14` }}
                      >
                        <SkillIcon size={14} style={{ color: column.accent }} aria-hidden />
                      </span>
                      <span className="text-[13px] font-medium text-[var(--text)] transition-transform duration-200 group-hover:translate-x-0.5">
                        {skill}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </section>
          ))}
        </div>
      </Tile>
      </div>

    </div>
  );
}
