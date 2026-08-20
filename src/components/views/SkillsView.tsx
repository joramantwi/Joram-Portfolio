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
    label: "Platform & architecture",
    accent: "#0f6cbd",
    skills: [
      "Dynamics 365 Customer Service",
      "Dynamics 365 Contact Center",
      "Dynamics 365 Sales",
      "Dataverse data modelling",
      "Model-driven app design",
      "Power Platform",
    ],
  },
  {
    label: "Engineering & extensibility",
    accent: "#8764b8",
    skills: [
      "C# Dataverse plug-ins",
      "Plugin Registration Tool",
      "JavaScript form scripting",
      "Power Automate cloud flows",
      "Power Apps",
      "Web API & REST integrations",
    ],
  },
  {
    label: "Governance, delivery & AI",
    accent: "#107c41",
    skills: [
      "Managed / unmanaged solutions",
      "Power Platform Pipelines",
      "Dataverse security model",
      "Requirements discovery",
      "UAT facilitation",
      "Prompt engineering",
      "AI use case design for CRM",
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
  const totalSkills = SKILL_COLUMNS.reduce((total, column) => total + column.skills.length, 0);

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
      <Tile title="Skills & technologies" icon={LayoutGrid} accent="#107c41">
        <div className="grid divide-y lg:grid-cols-3 lg:divide-x lg:divide-y-0" style={{ borderColor: "var(--border)" }}>
          {SKILL_COLUMNS.map((column) => (
            <section key={column.label} className="p-5 sm:p-6">
              <p
                className="text-[10.5px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: column.accent }}
              >
                {column.label}
              </p>
              <ol className="stagger-children mt-4 space-y-0">
                {column.skills.map((skill, index) => {
                  const SkillIcon = iconForSkill(skill, LayoutGrid);
                  return (
                    <li
                      key={skill}
                      className="group flex items-center gap-3 border-b py-3 transition-transform duration-200 last:border-b-0 hover:translate-x-1"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <span
                        className="w-5 shrink-0 font-mono text-[10px]"
                        style={{ color: column.accent }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <SkillIcon
                        size={15}
                        className="shrink-0 transition-transform duration-200 group-hover:scale-110"
                        style={{ color: column.accent }}
                      />
                      <span className="text-[13px] font-medium text-[var(--text)]">{skill}</span>
                    </li>
                  );
                })}
              </ol>
            </section>
          ))}
        </div>
      </Tile>

      {/* Footprint */}
      <div
        className="flex items-center gap-2 rounded-lg border border-dashed px-4 py-3 text-[12.5px] text-[var(--text-secondary)]"
        style={{ borderColor: "var(--border-strong)" }}
      >
        <Sparkles size={15} style={{ color: "var(--d365-purple)" }} />
        <span className="font-medium text-[var(--text)]">{totalSkills} skills</span> across{" "}
        3 capability areas — from D365 delivery through to AI-enabled solution architecture.
      </div>
    </div>
  );
}
