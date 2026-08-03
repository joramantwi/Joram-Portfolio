"use client";

import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react";
import {
  BookOpen,
  ChartNoAxesCombined,
  CircleUserRound,
  Dumbbell,
  Footprints,
  Guitar,
  HelpCircle,
  Lightbulb,
  Moon,
  Plane,
  Plus,
  Search,
  Settings,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import { hobbies, profile, type Hobby } from "@/data/portfolio";
import { useSearch } from "./search/SearchProvider";
import { Avatar } from "./ui";
import AppLauncher from "./AppLauncher";

const hobbyIcons: Record<Hobby["icon"], ComponentType<{ size?: number }>> = {
  hiking: Footprints,
  anime: BookOpen,
  boxing: Dumbbell,
  bass: Guitar,
  travel: Plane,
  investing: ChartNoAxesCombined,
};

type CashDrop = {
  id: number;
  left: number;
  drift: number;
  delay: number;
  duration: number;
  rotation: number;
};

export default function TopBar() {
  const { open, navigate } = useSearch();
  const [hobbiesOpen, setHobbiesOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [cashDrops, setCashDrops] = useState<CashDrop[]>([]);
  const [secretVisible, setSecretVisible] = useState(false);
  const hobbiesContentRef = useRef<HTMLDivElement>(null);
  const cashClickCount = useRef(0);
  const cashId = useRef(0);
  const cashTimers = useRef<number[]>([]);
  const secretRevealed = useRef(false);

  useEffect(() => {
    const stored = localStorage.getItem("portfolio-theme");
    const isDark = stored === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  useEffect(() => {
    if (!hobbiesOpen) return;
    hobbiesContentRef.current?.scrollTo({ top: 0 });
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setHobbiesOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [hobbiesOpen]);

  useEffect(() => {
    return () => cashTimers.current.forEach((timer) => window.clearTimeout(timer));
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("portfolio-theme", next ? "dark" : "light");
  };

  const openContact = () => {
    setSecretVisible(false);
    navigate("contact");
  };

  const makeItRain = () => {
    cashClickCount.current += 1;
    const click = cashClickCount.current;
    const dropCount = click === 1 ? 1 + Math.floor(Math.random() * 3) : 1;
    const batch = Array.from({ length: dropCount }, (_, index): CashDrop => ({
      id: cashId.current++,
      left: 3 + Math.random() * 94,
      drift: -70 + Math.random() * 140,
      delay: index * 120 + Math.random() * 180,
      duration: 5000 + Math.random() * 2500,
      rotation: -55 + Math.random() * 110,
    }));

    setCashDrops((current) => [...current.slice(-120), ...batch]);
    const ids = new Set(batch.map((drop) => drop.id));
    cashTimers.current.push(
      window.setTimeout(() => {
        setCashDrops((current) => current.filter((drop) => !ids.has(drop.id)));
      }, 8000)
    );

    if (click >= 30 && !secretRevealed.current) {
      secretRevealed.current = true;
      setSecretVisible(true);
      cashTimers.current.push(window.setTimeout(openContact, 4300));
    }
  };

  return (
    <>
      <header
        className="z-30 flex h-12 shrink-0 items-center gap-2 px-2 text-white"
        style={{ background: "var(--d365-navy)" }}
      >
        <AppLauncher />

        <div className="flex items-center gap-3 pl-1 pr-4">
          <h1 className="whitespace-nowrap text-[15px] font-semibold tracking-tight">
            {profile.name}
          </h1>
        </div>

        <div className="mx-auto hidden w-full max-w-xl md:block">
          <button
            onClick={open}
            aria-label="Search portfolio"
            className="flex w-full items-center gap-2 rounded bg-white/10 px-3 py-1.5 text-sm text-white/70 ring-1 ring-inset ring-white/15 transition-colors hover:bg-white/15"
          >
            <Search size={15} />
            <span className="select-none">Search projects, skills, certifications…</span>
            <kbd className="ml-auto rounded border border-white/20 bg-white/5 px-1.5 py-0.5 text-[11px] text-white/60">
              Ctrl K
            </kbd>
          </button>
        </div>

        <div className="ml-auto flex items-center gap-1">
          <button
            onClick={open}
            aria-label="Search"
            title="Search"
            className="grid h-9 w-9 place-items-center rounded transition-colors hover:bg-white/10 md:hidden"
          >
            <Search size={17} />
          </button>
          <TopBarButton
            label={dark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={toggleTheme}
            active={dark}
            mobile
          >
            {dark ? <Sun size={17} /> : <Lightbulb size={17} />}
          </TopBarButton>
          <TopBarButton label="Make it rain" onClick={makeItRain} mobile>
            <Plus size={18} />
          </TopBarButton>
          <TopBarButton
            label="When I'm not building"
            onClick={() => setHobbiesOpen(true)}
            active={hobbiesOpen}
            mobile
          >
            <Settings size={17} />
          </TopBarButton>
          <a
            href="https://learn.microsoft.com/en-gb/dynamics365/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Dynamics 365 help"
            title="Dynamics 365 help"
            className="hidden h-9 w-9 place-items-center rounded transition-colors hover:bg-white/10 sm:grid"
          >
            <HelpCircle size={17} />
          </a>
          <button
            onClick={() => navigate("profile")}
            aria-label="Open profile"
            title="Open profile"
            className="ml-1 grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-white/10"
          >
            <Avatar
              src={profile.avatar}
              name={profile.name}
              imgClassName="h-8 w-8 shrink-0 rounded-full object-cover ring-1 ring-white/30"
              fallbackClassName="grid h-8 w-8 place-items-center rounded-full text-[12px] font-semibold"
              fallbackStyle={{ background: "var(--d365-teal)" }}
            />
          </button>
        </div>
      </header>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 top-12 z-40 overflow-hidden" aria-hidden="true">
        {cashDrops.map((drop) => (
          <span
            key={drop.id}
            className="cash-drop"
            style={
              {
                left: `${drop.left}%`,
                animationDelay: `${drop.delay}ms`,
                animationDuration: `${drop.duration}ms`,
                "--cash-drift": `${drop.drift}px`,
                "--cash-rotation": `${drop.rotation}deg`,
              } as CSSProperties
            }
          >
            <span>$</span>
          </span>
        ))}
      </div>

      {secretVisible && (
        <button
          onClick={openContact}
          className="cash-secret fixed left-1/2 top-20 z-50 w-[min(90vw,390px)] -translate-x-1/2 rounded-lg border px-5 py-4 text-left shadow-2xl"
          style={{
            background: "var(--surface-raised)",
            borderColor: "var(--d365-green)",
            color: "var(--text)",
          }}
          aria-live="polite"
        >
          <span className="block text-[11px] font-semibold uppercase tracking-wide text-[var(--d365-green)]">
            Secret unlocked
          </span>
          <span className="mt-1 block text-[16px] font-semibold">Got a job for me? Let&apos;s talk.</span>
          <span className="mt-1 block text-[12.5px] text-[var(--text-secondary)]">
            Opening contact details...
          </span>
        </button>
      )}

      {hobbiesOpen && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="hobbies-title">
          <button
            className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"
            onClick={() => setHobbiesOpen(false)}
            aria-label="Close hobbies panel"
          />
          <aside
            className="panel-in absolute bottom-0 right-0 top-0 flex w-full max-w-[430px] flex-col border-l bg-white shadow-2xl"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="border-b px-5 pb-4 pt-5" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-start gap-3">
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-md"
                  style={{ background: "var(--d365-blue-light)", color: "var(--d365-blue)" }}
                >
                  <Sparkles size={19} />
                </span>
                <div className="min-w-0 flex-1">
                  <h2 id="hobbies-title" className="text-[19px] font-semibold text-[var(--text)]">
                    When I&apos;m not building
                  </h2>
                  <p className="mt-1 text-[13px] leading-relaxed text-[var(--text-secondary)]">
                    The things that keep me curious, grounded and moving outside of technology.
                  </p>
                </div>
                <button
                  onClick={() => setHobbiesOpen(false)}
                  aria-label="Close"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded transition-colors hover:bg-[var(--sidebar-hover)]"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div ref={hobbiesContentRef} className="flex-1 overflow-y-auto p-4 sm:p-5">
              <div className="stagger-children grid gap-3 sm:grid-cols-2">
                {hobbies.map((hobby) => {
                  const Icon = hobbyIcons[hobby.icon];
                  return (
                    <article
                      key={hobby.name}
                      className="card-lift min-h-40 rounded-lg border bg-white p-4"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <span
                        className="grid h-9 w-9 place-items-center rounded-md"
                        style={{ background: `${hobby.accent}16`, color: hobby.accent }}
                      >
                        <Icon size={18} />
                      </span>
                      <h3 className="mt-3 text-[14px] font-semibold text-[var(--text)]">{hobby.name}</h3>
                      <p className="mt-1.5 text-[12.5px] leading-relaxed text-[var(--text-secondary)]">
                        {hobby.description}
                      </p>
                    </article>
                  );
                })}
              </div>

              <div
                className="mt-4 rounded-lg border p-4"
                style={{ borderColor: "var(--border)", background: "var(--surface)" }}
              >
                <div className="flex items-center gap-2 text-[12px] font-semibold text-[var(--text)]">
                  <CircleUserRound size={15} style={{ color: "var(--d365-teal)" }} />
                  More than a CV
                </div>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-[var(--text-secondary)]">
                  Good solutions come from broad interests. Each of these shapes how I think about discipline,
                  creativity, risk and people.
                </p>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

function TopBarButton({
  label,
  onClick,
  active,
  mobile,
  children,
}: {
  label: string;
  onClick: () => void;
  active?: boolean;
  mobile?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      aria-pressed={active}
      className={`${mobile ? "grid" : "hidden sm:grid"} h-9 w-9 place-items-center rounded transition-colors hover:bg-white/10`}
      style={{ background: active ? "rgba(255,255,255,0.13)" : undefined }}
    >
      {children}
    </button>
  );
}
