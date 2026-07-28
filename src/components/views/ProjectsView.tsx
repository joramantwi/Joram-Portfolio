"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import {
  ArrowLeft,
  Boxes,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Factory,
  FolderKanban,
  List,
  PanelsTopLeft,
  Search,
  Tag,
  UserRound,
  X,
} from "lucide-react";
import { projects, type Project } from "@/data/portfolio";
import { Badge } from "../ui";

type ViewMode = "list" | "focus";
type FieldIcon = ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;

const border = { borderColor: "var(--border)" } as const;
const iconTile = { background: "#107c4114" } as const;

const showAsOptions: { key: ViewMode; label: string; icon: FieldIcon; hint: string }[] = [
  { key: "list", label: "Default list view", icon: List, hint: "Grid of all projects" },
  { key: "focus", label: "Focus view", icon: PanelsTopLeft, hint: "List with a record preview" },
];

function matches(p: Project, q: string) {
  const s = q.trim().toLowerCase();
  if (!s) return true;
  return [p.name, p.type, p.module, p.org, p.role, p.year, p.stage, p.industry, ...p.tags]
    .join(" ")
    .toLowerCase()
    .includes(s);
}

export default function ProjectsView() {
  const [mode, setMode] = useState<ViewMode>("list");
  const [selected, setSelected] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [showAsOpen, setShowAsOpen] = useState(false);
  const showAsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showAsOpen) return;
    const handler = (e: MouseEvent) => {
      if (showAsRef.current && !showAsRef.current.contains(e.target as Node)) setShowAsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showAsOpen]);

  const results = projects.map((p, i) => ({ p, i })).filter(({ p }) => matches(p, query));
  const activeIndex = selected ?? results[0]?.i ?? 0;

  const switchMode = (next: ViewMode) => {
    setMode(next);
    setSelected(null);
    setShowAsOpen(false);
  };

  const CurrentIcon = showAsOptions.find((o) => o.key === mode)!.icon;

  return (
    <div>
      {/* Grid command toolbar */}
      <div
        className="mb-4 flex flex-wrap items-center gap-2 rounded-lg border bg-white px-2 py-1.5 shadow-sm"
        style={border}
      >
        <div ref={showAsRef} className="relative">
          <button
            onClick={() => setShowAsOpen((o) => !o)}
            aria-haspopup="menu"
            aria-expanded={showAsOpen}
            aria-label="Show as"
            className="flex items-center gap-1.5 rounded px-2.5 py-1.5 text-[13px] text-[var(--text)] transition-colors hover:bg-[var(--sidebar-hover)]"
          >
            <CurrentIcon size={15} style={{ color: "var(--d365-blue)" }} />
            <span className="hidden sm:inline">Show As</span>
            <ChevronDown
              size={13}
              className={`transition-transform duration-200 ${showAsOpen ? "rotate-180" : ""}`}
            />
          </button>

          {showAsOpen && (
            <div
              role="menu"
              className="launcher-in absolute left-0 top-full z-30 mt-1 w-64 rounded-lg border bg-white p-1.5 shadow-lg"
              style={border}
            >
              {showAsOptions.map((opt) => {
                const Icon = opt.icon;
                const active = opt.key === mode;
                return (
                  <button
                    key={opt.key}
                    role="menuitem"
                    onClick={() => switchMode(opt.key)}
                    className="flex w-full items-start gap-2.5 rounded px-2 py-1.5 text-left transition-colors hover:bg-[var(--sidebar-hover)]"
                    style={{ background: active ? "var(--sidebar-active)" : undefined }}
                  >
                    <Icon
                      size={15}
                      className="mt-0.5 shrink-0"
                      style={{ color: active ? "var(--d365-blue)" : "var(--text-secondary)" }}
                    />
                    <span className="min-w-0 flex-1">
                      <span
                        className="block text-[13px]"
                        style={{
                          color: active ? "var(--d365-blue)" : "var(--text)",
                          fontWeight: active ? 600 : 400,
                        }}
                      >
                        {opt.label}
                      </span>
                      <span className="block text-[11.5px] text-[var(--text-muted)]">{opt.hint}</span>
                    </span>
                    {active && <Check size={14} className="mt-0.5 shrink-0 text-[var(--d365-blue)]" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <span className="mx-1 hidden h-5 w-px sm:block" style={{ background: "var(--border)" }} />
        <span className="hidden text-[12px] text-[var(--text-muted)] sm:inline">
          {results.length} of {projects.length}
        </span>

        <div className="relative ml-auto">
          <Search
            size={14}
            className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by keyword"
            className="w-40 rounded border bg-white py-1 pl-8 pr-7 text-[13px] outline-none transition-colors focus:border-[var(--d365-blue)] sm:w-52"
            style={border}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear filter"
              className="absolute right-1.5 top-1/2 grid h-5 w-5 -translate-y-1/2 place-items-center rounded text-[var(--text-muted)] hover:bg-[var(--sidebar-hover)]"
            >
              <X size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      {results.length === 0 && selected === null ? (
        <EmptyState query={query} onClear={() => setQuery("")} />
      ) : mode === "list" ? (
        selected !== null ? (
          <ProjectRecord project={projects[selected]} onBack={() => setSelected(null)} />
        ) : (
          <ListGrid results={results} onOpen={setSelected} />
        )
      ) : (
        <div className="grid gap-4 md:grid-cols-[17rem_minmax(0,1fr)]">
          <div className={selected === null ? "block" : "hidden md:block"}>
            <FocusList results={results} activeIndex={activeIndex} onSelect={setSelected} />
          </div>
          <div className={selected !== null ? "block" : "hidden md:block"}>
            <ProjectRecord
              project={projects[activeIndex]}
              onBack={() => setSelected(null)}
              backMobileOnly
            />
          </div>
        </div>
      )}
    </div>
  );
}

function ListGrid({
  results,
  onOpen,
}: {
  results: { p: Project; i: number }[];
  onOpen: (i: number) => void;
}) {
  return (
    <>
      {/* Desktop / tablet: table grid */}
      <div className="hidden overflow-hidden rounded-lg border bg-white shadow-sm md:block" style={border}>
        <table className="w-full text-left text-[13px]">
          <thead>
            <tr
              className="border-b text-[11px] font-semibold uppercase tracking-wide text-[var(--text-muted)]"
              style={border}
            >
              <th className="px-4 py-2.5">Name</th>
              <th className="px-4 py-2.5">Type</th>
              <th className="px-4 py-2.5">Module</th>
              <th className="hidden px-4 py-2.5 lg:table-cell">Client</th>
              <th className="hidden px-4 py-2.5 lg:table-cell">Role</th>
              <th className="hidden px-4 py-2.5 xl:table-cell">Year</th>
              <th className="px-4 py-2.5">Status</th>
            </tr>
          </thead>
          <tbody className="stagger-children">
            {results.map(({ p, i }) => (
              <tr
                key={p.name}
                onClick={() => onOpen(i)}
                className="group cursor-pointer border-b transition-colors last:border-0 hover:bg-[var(--sidebar-hover)]"
                style={border}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md" style={iconTile}>
                      <FolderKanban size={15} style={{ color: "var(--d365-green)" }} />
                    </span>
                    <span className="font-medium text-[var(--d365-blue-hover)] group-hover:underline">
                      {p.name}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">{p.type}</td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">{p.module}</td>
                <td className="hidden px-4 py-3 text-[var(--text-secondary)] lg:table-cell">{p.org}</td>
                <td className="hidden px-4 py-3 text-[var(--text-secondary)] lg:table-cell">{p.role}</td>
                <td className="hidden px-4 py-3 text-[var(--text-secondary)] xl:table-cell">{p.year}</td>
                <td className="px-4 py-3">
                  <StageBadge stage={p.stage} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: tappable cards */}
      <div className="stagger-children space-y-2.5 md:hidden">
        {results.map(({ p, i }) => (
          <button
            key={p.name}
            onClick={() => onOpen(i)}
            className="card-lift flex w-full items-center gap-3 rounded-lg border bg-white p-4 text-left shadow-sm"
            style={border}
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md" style={iconTile}>
              <FolderKanban size={18} style={{ color: "var(--d365-green)" }} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-medium text-[var(--text)]">{p.name}</p>
              <p className="mt-0.5 truncate text-[12px] text-[var(--text-muted)]">
                {p.type} · {p.module}
              </p>
              <p className="mt-0.5 flex items-center gap-1 text-[12px] text-[var(--text-muted)]">
                <Building2 size={11} /> {p.org}
              </p>
            </div>
            <ChevronRight size={16} className="shrink-0 text-[var(--text-muted)]" />
          </button>
        ))}
      </div>
    </>
  );
}

function FocusList({
  results,
  activeIndex,
  onSelect,
}: {
  results: { p: Project; i: number }[];
  activeIndex: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="overflow-hidden rounded-lg border bg-white shadow-sm" style={border}>
      <div
        className="border-b px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-[var(--text-muted)]"
        style={border}
      >
        Projects · {results.length}
      </div>
      <div className="stagger-children">
        {results.map(({ p, i }) => {
          const active = i === activeIndex;
          return (
            <button
              key={p.name}
              onClick={() => onSelect(i)}
              className="flex w-full items-center gap-2.5 border-b px-3 py-2.5 text-left transition-colors last:border-0 hover:bg-[var(--sidebar-hover)]"
              style={{ ...border, background: active ? "var(--sidebar-active)" : undefined }}
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md" style={iconTile}>
                <FolderKanban size={15} style={{ color: "var(--d365-green)" }} />
              </span>
              <div className="min-w-0 flex-1">
                <p
                  className="truncate text-[13px] font-medium"
                  style={{ color: active ? "var(--d365-blue)" : "var(--text)" }}
                >
                  {p.name}
                </p>
                <p className="truncate text-[11.5px] text-[var(--text-muted)]">{p.org}</p>
              </div>
              <ChevronRight size={15} className="shrink-0 text-[var(--text-muted)] md:hidden" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ProjectRecord({
  project,
  onBack,
  backMobileOnly,
}: {
  project: Project;
  onBack: () => void;
  backMobileOnly?: boolean;
}) {
  return (
    <div className="stagger-children space-y-4">
      <div className="rounded-lg border bg-white p-5 shadow-sm" style={border}>
        <button
          onClick={onBack}
          className={`mb-3 inline-flex items-center gap-1 text-[12px] font-medium text-[var(--d365-blue-hover)] hover:underline ${
            backMobileOnly ? "md:hidden" : ""
          }`}
        >
          <ArrowLeft size={13} /> Back to list
        </button>

        <div className="flex items-start gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md" style={iconTile}>
            <FolderKanban size={20} style={{ color: "var(--d365-green)" }} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-[16px] font-semibold text-[var(--text)]">{project.name}</h2>
              <StageBadge stage={project.stage} />
            </div>
            <p className="mt-0.5 flex items-center gap-1 text-[13px] text-[var(--d365-blue-hover)]">
              <Building2 size={13} /> {project.org}
            </p>
          </div>
        </div>

        <div className="mt-4 grid gap-x-6 gap-y-3.5 border-t pt-4 sm:grid-cols-2" style={border}>
          <Field icon={Tag} label="Project type" value={project.type} />
          <Field icon={Boxes} label="Module / area" value={project.module} />
          <Field icon={Factory} label="Industry" value={project.industry} />
          <Field icon={UserRound} label="Role" value={project.role} />
          <Field icon={Building2} label="Client" value={project.org} />
          <Field icon={CalendarDays} label="Year delivered" value={project.year} />
        </div>
      </div>

      <div className="rounded-lg border bg-white p-5 shadow-sm" style={border}>
        <SectionHeading>Summary</SectionHeading>
        <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--text-secondary)]">
          {project.summary}
        </p>

        <SectionHeading className="mt-5">Key highlights</SectionHeading>
        <ul className="mt-2 space-y-2">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-2 text-[13.5px] leading-relaxed text-[var(--text-secondary)]">
              <CheckCircle2 size={15} className="mt-0.5 shrink-0" style={{ color: "var(--d365-green)" }} />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <SectionHeading className="mt-5">Technologies</SectionHeading>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, value }: { icon: FieldIcon; label: string; value: string }) {
  return (
    <div>
      <p className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-[var(--text-muted)]">
        <Icon size={12} /> {label}
      </p>
      <p className="mt-1 text-[13.5px] text-[var(--text)]">{value}</p>
    </div>
  );
}

function SectionHeading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h3 className={`text-[11px] font-semibold uppercase tracking-wide text-[var(--text-muted)] ${className}`}>
      {children}
    </h3>
  );
}

function StageBadge({ stage }: { stage: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-medium"
      style={{ background: "#107c4114", color: "var(--d365-green)" }}
    >
      <CheckCircle2 size={12} /> {stage}
    </span>
  );
}

function EmptyState({ query, onClear }: { query: string; onClear: () => void }) {
  return (
    <div
      className="grid place-items-center rounded-lg border bg-white px-6 py-16 text-center shadow-sm"
      style={border}
    >
      <div className="grid h-12 w-12 place-items-center rounded-full" style={{ background: "var(--surface)" }}>
        <Search size={20} className="text-[var(--text-muted)]" />
      </div>
      <p className="mt-3 text-[14px] font-medium text-[var(--text)]">No projects match “{query}”</p>
      <p className="mt-1 text-[13px] text-[var(--text-muted)]">Try a different keyword or clear the filter.</p>
      <button
        onClick={onClear}
        className="mt-4 rounded border px-3 py-1.5 text-[13px] font-medium text-[var(--d365-blue)] transition-colors hover:bg-[var(--sidebar-hover)]"
        style={{ borderColor: "var(--border-strong)" }}
      >
        Clear filter
      </button>
    </div>
  );
}
