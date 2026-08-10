"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  Search,
  X,
  CornerDownLeft,
  LayoutDashboard,
  Briefcase,
  Sparkles,
  FolderKanban,
  BadgeCheck,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import {
  experiences,
  skillGroups,
  projects,
  certifications,
  education,
} from "@/data/portfolio";
import type { ViewKey } from "../nav";

type SearchCategory =
  | "Page"
  | "Experience"
  | "Skill"
  | "Project"
  | "Certification"
  | "Education";

type SearchItem = {
  id: string;
  title: string;
  subtitle: string;
  category: SearchCategory;
  view: ViewKey;
  keywords: string;
};

const categoryIcon: Record<SearchCategory, LucideIcon> = {
  Page: LayoutDashboard,
  Experience: Briefcase,
  Skill: Sparkles,
  Project: FolderKanban,
  Certification: BadgeCheck,
  Education: GraduationCap,
};

const categoryColor: Record<SearchCategory, string> = {
  Page: "#0f6cbd",
  Experience: "#0f6cbd",
  Skill: "#8764b8",
  Project: "#107c41",
  Certification: "#8764b8",
  Education: "#038387",
};

function buildIndex(): SearchItem[] {
  const items: SearchItem[] = [];

  const pages: { title: string; subtitle: string; view: ViewKey; icon?: LucideIcon }[] = [
    { title: "Overview", subtitle: "Dashboard & summary", view: "overview" },
    { title: "Experience", subtitle: "Professional history", view: "experience" },
    { title: "Skills", subtitle: "Capabilities", view: "skills" },
    { title: "Projects", subtitle: "Delivered work", view: "projects" },
    { title: "Certifications", subtitle: "Credentials & education", view: "certifications" },
    { title: "Profile", subtitle: "About Joram", view: "profile" },
    { title: "Contact", subtitle: "Get in touch", view: "contact" },
  ];
  pages.forEach((p, i) =>
    items.push({
      id: `page-${i}`,
      title: p.title,
      subtitle: p.subtitle,
      category: "Page",
      view: p.view,
      keywords: `${p.title} ${p.subtitle}`.toLowerCase(),
    })
  );

  experiences.forEach((e, i) =>
    items.push({
      id: `exp-${i}`,
      title: e.role,
      subtitle: `${e.company} · ${e.period}`,
      category: "Experience",
      view: "experience",
      keywords: `${e.role} ${e.company} ${e.location} ${e.period} ${e.paragraphs.join(" ")}`.toLowerCase(),
    })
  );

  skillGroups.forEach((g, gi) => {
    items.push({
      id: `skillgroup-${gi}`,
      title: g.category,
      subtitle: `${g.skills.length} skills`,
      category: "Skill",
      view: "skills",
      keywords: `${g.category} ${g.skills.join(" ")}`.toLowerCase(),
    });
    g.skills.forEach((s, si) =>
      items.push({
        id: `skill-${gi}-${si}`,
        title: s,
        subtitle: g.category,
        category: "Skill",
        view: "skills",
        keywords: `${s} ${g.category}`.toLowerCase(),
      })
    );
  });

  projects.forEach((p, i) =>
    items.push({
      id: `project-${i}`,
      title: p.name,
      subtitle: `${p.org} · ${p.stage}`,
      category: "Project",
      view: "projects",
      keywords: `${p.name} ${p.org} ${p.stage} ${p.tags.join(" ")} ${p.summary}`.toLowerCase(),
    })
  );

  certifications.forEach((c, i) =>
    items.push({
      id: `cert-${i}`,
      title: c.name,
      subtitle: `${c.issuer} · ${c.date}`,
      category: "Certification",
      view: "certifications",
      keywords: `${c.name} ${c.issuer} ${c.date}`.toLowerCase(),
    })
  );

  education.forEach((e, i) =>
    items.push({
      id: `edu-${i}`,
      title: e.qualification,
      subtitle: `${e.institution} · ${e.date}`,
      category: "Education",
      view: "certifications",
      keywords: `${e.qualification} ${e.institution} ${e.date}`.toLowerCase(),
    })
  );

  return items;
}

type SearchContextValue = { open: () => void; navigate: (view: ViewKey) => void };
const SearchContext = createContext<SearchContextValue | null>(null);

export function useSearch(): SearchContextValue {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used within a SearchProvider");
  return ctx;
}

export function SearchProvider({
  onNavigate,
  children,
}: {
  onNavigate: (view: ViewKey) => void;
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const index = useMemo(buildIndex, []);

  const open = useCallback(() => {
    setQuery("");
    setActive(0);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      // Default: show the pages for quick jumping.
      return index.filter((i) => i.category === "Page");
    }
    const terms = q.split(/\s+/);
    const scored = index
      .map((item) => {
        let score = 0;
        for (const term of terms) {
          if (!item.keywords.includes(term)) return null;
          if (item.title.toLowerCase().includes(term)) score += 3;
          if (item.title.toLowerCase().startsWith(term)) score += 2;
          score += 1;
        }
        return { item, score };
      })
      .filter((x): x is { item: SearchItem; score: number } => x !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, 20)
      .map((x) => x.item);
    return scored;
  }, [query, index]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 20);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const select = useCallback(
    (item: SearchItem | undefined) => {
      if (!item) return;
      onNavigate(item.view);
      setIsOpen(false);
    },
    [onNavigate]
  );

  // Global keyboard shortcut: Ctrl/Cmd+K to open.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((v) => !v);
        setQuery("");
        setActive(0);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      select(results[active]);
    }
  }

  return (
    <SearchContext.Provider value={{ open, navigate: onNavigate }}>
      {children}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[12vh]"
          role="dialog"
          aria-modal="true"
          aria-label="Search portfolio"
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" onClick={close} />
          <div
            className="relative w-full max-w-xl overflow-hidden rounded-xl border bg-white shadow-2xl"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="flex items-center gap-2 border-b px-4" style={{ borderColor: "var(--border)" }}>
              <Search size={17} style={{ color: "var(--d365-blue)" }} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder="Search projects, skills, certifications…"
                className="h-12 flex-1 bg-transparent text-[14px] outline-none placeholder:text-[var(--text-muted)]"
              />
              <button
                onClick={close}
                aria-label="Close search"
                className="grid h-7 w-7 place-items-center rounded hover:bg-[var(--sidebar-hover)]"
              >
                <X size={15} />
              </button>
            </div>

            <div className="max-h-[52vh] overflow-y-auto py-2">
              {results.length === 0 ? (
                <div className="px-4 py-10 text-center text-[13px] text-[var(--text-secondary)]">
                  No matches for <span className="font-semibold text-[var(--text)]">&ldquo;{query}&rdquo;</span>
                </div>
              ) : (
                <ul>
                  {results.map((item, i) => {
                    const Icon = categoryIcon[item.category];
                    const color = categoryColor[item.category];
                    const isActive = i === active;
                    return (
                      <li key={item.id}>
                        <button
                          onMouseEnter={() => setActive(i)}
                          onClick={() => select(item)}
                          className="flex w-full items-center gap-3 px-3 py-2 text-left transition-colors"
                          style={{ background: isActive ? "var(--sidebar-active)" : "transparent" }}
                        >
                          <span
                            className="grid h-8 w-8 shrink-0 place-items-center rounded-md"
                            style={{ background: `${color}14` }}
                          >
                            <Icon size={16} style={{ color }} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[13.5px] font-medium text-[var(--text)]">
                              {item.title}
                            </span>
                            <span className="block truncate text-[12px] text-[var(--text-secondary)]">
                              {item.subtitle}
                            </span>
                          </span>
                          <span
                            className="hidden shrink-0 rounded-full px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wide sm:inline"
                            style={{ background: `${color}14`, color }}
                          >
                            {item.category}
                          </span>
                          {isActive && (
                            <CornerDownLeft size={14} className="shrink-0 text-[var(--text-muted)]" />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div
              className="flex items-center justify-between border-t px-4 py-2 text-[11px] text-[var(--text-muted)]"
              style={{ borderColor: "var(--border)" }}
            >
              <span className="flex items-center gap-3">
                <Kbd>↑</Kbd>
                <Kbd>↓</Kbd>
                <span>to navigate</span>
                <Kbd>↵</Kbd>
                <span>to open</span>
              </span>
              <span className="flex items-center gap-1">
                <Kbd>Esc</Kbd>
                <span>to close</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </SearchContext.Provider>
  );
}

function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd
      className="rounded border px-1.5 py-0.5 font-sans text-[10.5px] text-[var(--text-secondary)]"
      style={{ borderColor: "var(--border-strong)", background: "var(--surface)" }}
    >
      {children}
    </kbd>
  );
}
