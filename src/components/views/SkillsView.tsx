"use client";

import { useMemo } from "react";
import { skillGroups } from "@/data/portfolio";
import {
  Handshake,
  Headset,
  MessageSquare,
  Truck,
  Grid3x3,
  Code2,
  Workflow,
  Cloud,
  Database,
  Layers,
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
  type LucideIcon,
} from "lucide-react";

/* ---------------------------------------------------------------------------
 * 1. Dynamics 365 app hub — the first-party business apps I deliver on.
 * ------------------------------------------------------------------------- */
type AppMeta = { icon: LucideIcon; accent: string; caption: string };

const APP_META: Record<string, AppMeta> = {
  Sales: {
    icon: Handshake,
    accent: "#0f6cbd",
    caption: "Build stronger customer relationships",
  },
  "Customer Service": {
    icon: Headset,
    accent: "#038387",
    caption: "Deliver exceptional service experiences",
  },
  "Customer Voice": {
    icon: MessageSquare,
    accent: "#8764b8",
    caption: "Capture feedback and act on it",
  },
  "Supply Chain Management": {
    icon: Truck,
    accent: "#107c41",
    caption: "Plan inventory & warehouse operations",
  },
};

/* ---------------------------------------------------------------------------
 * 2. Core capabilities — the "key skills" themes that cut across the work.
 * ------------------------------------------------------------------------- */
const CAPABILITIES: { icon: LucideIcon; title: string; caption: string; accent: string }[] = [
  {
    icon: Code2,
    title: "Low-code + Pro-code",
    caption: "Configure first, extend with code when it's needed",
    accent: "#0f6cbd",
  },
  {
    icon: Workflow,
    title: "Automation & Workflow",
    caption: "Power Automate flows that remove manual work",
    accent: "#107c41",
  },
  {
    icon: Cloud,
    title: "Cloud & API Integration",
    caption: "Connect D365 to external systems securely",
    accent: "#038387",
  },
  {
    icon: Database,
    title: "Data Modelling & Governance",
    caption: "Clean Dataverse schema, security & GDPR",
    accent: "#c19c00",
  },
  {
    icon: Layers,
    title: "Solution Architecture & ALM",
    caption: "Managed solutions shipped across environments",
    accent: "#8764b8",
  },
  {
    icon: UserCog,
    title: "Requirements to Delivery",
    caption: "Fit-gap, build, UAT, training & adoption",
    accent: "#c33d2e",
  },
];

/* ---------------------------------------------------------------------------
 * 3. Capability roadmap — the build skills, ordered foundation → advanced.
 * ------------------------------------------------------------------------- */
type CategoryMeta = { icon: LucideIcon; accent: string; blurb: string };

const CATEGORY_META: Record<string, CategoryMeta> = {
  "Engineering Foundations": {
    icon: Code2,
    accent: "#0f6cbd",
    blurb: "The software-engineering background behind the functional work.",
  },
  "Dataverse & Model-Driven Apps": {
    icon: Database,
    accent: "#038387",
    blurb: "The data model and app-building layer beneath every D365 solution.",
  },
  "Power Platform": {
    icon: Workflow,
    accent: "#107c41",
    blurb: "Low-code tools that extend and surface Dataverse data.",
  },
  "Data & Integration": {
    icon: Cable,
    accent: "#c19c00",
    blurb: "Moving, cleaning and connecting data across systems.",
  },
  "Pro-Dev & Extensibility": {
    icon: Braces,
    accent: "#8764b8",
    blurb: "Code-first extensions where configuration alone isn't enough.",
  },
  "ALM & Governance": {
    icon: ShieldCheck,
    accent: "#c33d2e",
    blurb: "Shipping solutions safely across environments, with security and compliance.",
  },
  "Delivery & Consulting": {
    icon: Users,
    accent: "#8764b8",
    blurb: "Turning business needs into shipped, adopted solutions.",
  },
  "AI & Emerging Tech": {
    icon: Bot,
    accent: "#c19c00",
    blurb: "Exploring how AI fits into CRM workflows and business use cases.",
  },
};

/** Order the roadmap reads as a journey, from foundations to advanced. */
const ROADMAP_ORDER = [
  "Engineering Foundations",
  "Dataverse & Model-Driven Apps",
  "Power Platform",
  "Data & Integration",
  "Pro-Dev & Extensibility",
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

/* ---------------------------------------------------------------------------
 * Small presentational pieces
 * ------------------------------------------------------------------------- */
function AppCard({ name, meta }: { name: string; meta: AppMeta }) {
  const Icon = meta.icon;
  return (
    <div
      className="card-lift flex flex-col items-center gap-1.5 rounded-xl border bg-white px-3 py-3 text-center shadow-sm"
      style={{ borderColor: "var(--border)" }}
    >
      <span
        className="grid h-10 w-10 place-items-center rounded-full"
        style={{ background: `${meta.accent}16` }}
      >
        <Icon size={18} style={{ color: meta.accent }} />
      </span>
      <span className="text-[12.5px] font-semibold leading-tight text-[var(--text)]">{name}</span>
      <span className="text-[10.5px] leading-snug text-[var(--text-muted)]">{meta.caption}</span>
    </div>
  );
}

function CenterNode() {
  return (
    <div
      className="grid h-28 w-28 place-items-center rounded-full text-center shadow-lg"
      style={{
        background: "linear-gradient(145deg, var(--d365-navy-2), var(--d365-navy))",
        boxShadow: "0 10px 30px rgba(11,21,36,0.35)",
      }}
    >
      <div className="flex flex-col items-center gap-1">
        <Grid3x3 size={22} className="text-[var(--d365-blue)]" />
        <span className="text-[11px] font-semibold leading-tight text-white">
          Dynamics
          <br />
          365
        </span>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * Main view
 * ------------------------------------------------------------------------- */
export default function SkillsView() {
  const apps = useMemo(
    () => skillGroups.find((g) => g.category === "Dynamics 365 Apps")?.skills ?? [],
    []
  );
  const roadmap = useMemo(
    () =>
      ROADMAP_ORDER.map((name) => skillGroups.find((g) => g.category === name)).filter(
        (g): g is NonNullable<typeof g> => Boolean(g)
      ),
    []
  );
  const totalSkills = useMemo(
    () => skillGroups.reduce((n, g) => n + g.skills.length, 0),
    []
  );

  return (
    <div className="view-enter space-y-8">
      {/* ---------------------------------------------------------------- */}
      {/* Section 1 — Dynamics 365 app hub                                  */}
      {/* ---------------------------------------------------------------- */}
      <section>
        <header className="mb-3">
          <h2 className="text-[16px] font-semibold text-[var(--text)]">
            Dynamics 365 apps I deliver
          </h2>
          <p className="mt-0.5 text-[12.5px] text-[var(--text-secondary)]">
            The first-party business apps I configure, extend and support — one platform, connected
            data.
          </p>
        </header>

        <div
          className="relative overflow-hidden rounded-xl border p-6"
          style={{
            borderColor: "var(--border)",
            background:
              "radial-gradient(120% 120% at 50% 0%, var(--d365-blue-light) 0%, white 55%)",
          }}
        >
          {/* Desktop radial hub */}
          <div className="relative mx-auto hidden h-[440px] max-w-[540px] md:block">
            {/* decorative dashed ring */}
            <div
              className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed"
              style={{ borderColor: "var(--border-strong)" }}
              aria-hidden
            />
            {/* soft glow behind centre */}
            <div
              className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
              style={{ background: "rgba(15,108,189,0.18)" }}
              aria-hidden
            />
            {/* centre */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <CenterNode />
            </div>
            {/* app satellites */}
            {apps.map((app, i) => {
              const meta = APP_META[app];
              if (!meta) return null;
              const angle = (360 / apps.length) * i;
              return (
                <div
                  key={app}
                  className="absolute left-1/2 top-1/2 w-40"
                  style={{
                    transform: `translate(-50%,-50%) rotate(${angle}deg) translate(0,-160px) rotate(${-angle}deg)`,
                  }}
                >
                  <AppCard name={app} meta={meta} />
                </div>
              );
            })}
          </div>

          {/* Mobile stacked hub */}
          <div className="md:hidden">
            <div className="flex justify-center">
              <CenterNode />
            </div>
            <div className="stagger-children mt-5 grid grid-cols-2 gap-3">
              {apps.map((app) => {
                const meta = APP_META[app];
                if (!meta) return null;
                return <AppCard key={app} name={app} meta={meta} />;
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Section 2 — Core capabilities                                     */}
      {/* ---------------------------------------------------------------- */}
      <section>
        <header className="mb-3">
          <h2 className="text-[16px] font-semibold text-[var(--text)]">Core capabilities</h2>
          <p className="mt-0.5 text-[12.5px] text-[var(--text-secondary)]">
            The themes that run through everything I build.
          </p>
        </header>

        <div className="stagger-children grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((c) => (
            <div
              key={c.title}
              className="card-lift flex items-start gap-3 rounded-lg border bg-white p-4 shadow-sm"
              style={{ borderColor: "var(--border)" }}
            >
              <span
                className="grid h-10 w-10 shrink-0 place-items-center rounded-lg"
                style={{ background: `${c.accent}14` }}
              >
                <c.icon size={19} style={{ color: c.accent }} />
              </span>
              <div>
                <h3 className="text-[13.5px] font-semibold text-[var(--text)]">{c.title}</h3>
                <p className="mt-0.5 text-[11.5px] leading-snug text-[var(--text-secondary)]">
                  {c.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Section 3 — Capability roadmap                                    */}
      {/* ---------------------------------------------------------------- */}
      <section>
        <header className="mb-3">
          <h2 className="text-[16px] font-semibold text-[var(--text)]">Capability roadmap</h2>
          <p className="mt-0.5 text-[12.5px] text-[var(--text-secondary)]">
            The build skills behind the apps — from engineering foundations to emerging tech.
          </p>
        </header>

        <div
          className="rounded-xl border bg-white p-5 shadow-sm sm:p-6"
          style={{ borderColor: "var(--border)" }}
        >
          <ol className="relative">
            {roadmap.map((group, i) => {
              const meta =
                CATEGORY_META[group.category] ??
                ({ icon: Code2, accent: "#0f6cbd", blurb: "" } as CategoryMeta);
              const num = String(i + 1).padStart(2, "0");
              const last = i === roadmap.length - 1;
              const Icon = meta.icon;
              return (
                <li key={group.category} className="flex gap-4 sm:gap-5">
                  {/* number + connector spine */}
                  <div className="flex flex-col items-center">
                    <span
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[12px] font-bold text-white shadow-sm"
                      style={{
                        background: meta.accent,
                        boxShadow: `0 4px 12px ${meta.accent}40`,
                      }}
                    >
                      {num}
                    </span>
                    {!last && (
                      <span
                        className="mt-1 w-px flex-1"
                        style={{ background: "var(--border)" }}
                        aria-hidden
                      />
                    )}
                  </div>

                  {/* content */}
                  <div className={last ? "flex-1" : "flex-1 pb-7"}>
                    <div className="flex items-center gap-2">
                      <Icon size={16} style={{ color: meta.accent }} />
                      <h3 className="text-[14px] font-semibold text-[var(--text)]">
                        {group.category}
                      </h3>
                    </div>
                    <p className="mt-0.5 text-[12px] leading-relaxed text-[var(--text-secondary)]">
                      {meta.blurb}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {group.skills.map((skill) => {
                        const SkillIcon = iconForSkill(skill, Icon);
                        return (
                          <span
                            key={skill}
                            className="inline-flex items-center gap-1.5 rounded-full border bg-white px-2.5 py-1 text-[12px] text-[var(--text)] transition-colors"
                            style={{ borderColor: "var(--border)" }}
                          >
                            <SkillIcon size={13} style={{ color: meta.accent }} />
                            {skill}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Footprint summary */}
      <div
        className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-dashed px-4 py-3 text-[12.5px] text-[var(--text-secondary)]"
        style={{ borderColor: "var(--border-strong)" }}
      >
        <span className="flex items-center gap-2">
          <Sparkles size={15} style={{ color: "var(--d365-purple)" }} />
          <span className="font-medium text-[var(--text)]">{apps.length} Dynamics 365 apps</span>
          {" · "}
          <span className="font-medium text-[var(--text)]">{totalSkills} skills</span> across{" "}
          {roadmap.length} capability areas
        </span>
      </div>
    </div>
  );
}
