"use client";

import { useEffect, useState } from "react";
import {
  Briefcase,
  Sparkles,
  FolderKanban,
  TrendingUp,
  Award,
  MapPin,
  ArrowRight,
  LayoutGrid,
  AppWindow,
  Workflow,
  Globe,
  Bot,
  SquareTerminal,
  BrainCircuit,
  FlaskConical,
  Database,
  Cloud,
  Building2,
} from "lucide-react";
import { profile, experiences, projects, certifications, certRoadmap } from "@/data/portfolio";
import { Tile, Badge, CountUp } from "../ui";
import type { ViewKey } from "../nav";

const microsoftStack = [
  { name: "Power Platform", Icon: LayoutGrid, color: "#b36ae2" },
  { name: "Power Apps", Icon: AppWindow, color: "#d264a9" },
  { name: "Power Automate", Icon: Workflow, color: "#4b8df8" },
  { name: "Power Pages", Icon: Globe, color: "#2bb6d8" },
  { name: "Copilot Studio", Icon: Bot, color: "#8e6be6" },
  { name: "Microsoft 365 Copilot", Icon: Sparkles, color: "#e267c0" },
  { name: "GitHub Copilot", Icon: SquareTerminal, color: "#d8dee9" },
  { name: "AI Builder", Icon: BrainCircuit, color: "#f2a63b" },
  { name: "Microsoft AI Foundry", Icon: FlaskConical, color: "#5aa8ff" },
  { name: "Dataverse", Icon: Database, color: "#33b77e" },
  { name: "Azure", Icon: Cloud, color: "#008ad7" },
  { name: "Dynamics 365", Icon: Building2, color: "#4b7be0" },
] as const;

// Earned certs ordered by the certification roadmap; unknown exams fall to the end.
const roadmapRank = (exam?: string) => {
  const i = exam ? certRoadmap.indexOf(exam) : -1;
  return i === -1 ? certRoadmap.length : i;
};
const earnedCerts = [...certifications].sort((a, b) => roadmapRank(a.exam) - roadmapRank(b.exam));

function CertificationsCard({ onNavigate }: { onNavigate: (v: ViewKey) => void }) {
  const [index, setIndex] = useState(0);
  const count = earnedCerts.length;

  useEffect(() => {
    if (count <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 4500);
    return () => clearInterval(id);
  }, [count]);

  const cert = earnedCerts[Math.min(index, count - 1)];
  const shortName = cert.name.replace(/^Microsoft Certified:\s*/, "");

  return (
    <button
      onClick={() => onNavigate("certifications")}
      className="card-lift group relative flex w-full items-center gap-4 overflow-hidden rounded-lg border bg-white p-4 text-left shadow-[0_1.6px_3.6px_rgba(0,0,0,0.08),0_0.3px_0.9px_rgba(0,0,0,0.06)]"
      style={{ borderColor: "var(--border)" }}
    >
      <span
        className="pointer-events-none absolute inset-y-0 left-0 w-1"
        style={{ background: "#8764b8" }}
        aria-hidden="true"
      />
      {cert.badge ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={cert.badge} alt="" className="h-16 w-16 shrink-0 drop-shadow-sm" />
      ) : (
        <span className="grid h-16 w-16 shrink-0 place-items-center rounded-xl" style={{ background: "#8764b814", color: "#8764b8" }}>
          <Award size={28} />
        </span>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <Award size={15} style={{ color: "#8764b8" }} />
          <span className="text-[12px] font-medium text-[var(--text-secondary)]">Certifications</span>
          {count > 1 && (
            <span className="rounded-full px-1.5 py-0.5 text-[10px] font-semibold" style={{ background: "#8764b81f", color: "#8764b8" }}>
              {count}
            </span>
          )}
          <ArrowRight
            size={15}
            className="ml-auto text-[var(--text-muted)] opacity-0 transition-opacity group-hover:opacity-100"
          />
        </div>
        <p className="mt-1.5 line-clamp-2 text-[14px] font-semibold leading-snug text-[var(--text)]">
          {shortName}
        </p>
        <p className="mt-0.5 text-[12px] text-[var(--text-muted)]">
          {cert.issuer} · {cert.date}
        </p>
        {count > 1 && (
          <div className="mt-2 flex gap-1.5">
            {earnedCerts.map((_, i) => (
              <span
                key={i}
                aria-hidden="true"
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === index ? 16 : 6,
                  background: i === index ? "#8764b8" : "var(--border-strong)",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </button>
  );
}

export default function OverviewView({ onNavigate }: { onNavigate: (v: ViewKey) => void }) {
  return (
    <div className="space-y-4">
      {/* Hero */}
      <div
        className="relative overflow-hidden rounded-lg p-5 text-white shadow-sm sm:p-6"
        style={{
          background:
            "linear-gradient(120deg, var(--d365-navy) 0%, var(--d365-navy-2) 45%, #0f3d6e 100%)",
        }}
      >
        <div className="relative z-10">
          <div className="min-w-0">
            <p className="text-[12px] font-medium uppercase tracking-wide text-white/60 sm:text-[13px] sm:tracking-widest">
              {profile.title}
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">{profile.name}</h1>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-white/70">
              <MapPin size={14} /> {profile.location}
            </p>
            <div className="mt-4 max-w-3xl space-y-2.5 text-[13.5px] leading-relaxed text-white/85">
              {profile.summary.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <button
                onClick={() => onNavigate("projects")}
                className="flex items-center gap-1.5 rounded px-4 py-2 text-[13px] font-semibold transition-transform hover:-translate-y-0.5"
                style={{ background: "var(--hero-primary-bg)", color: "var(--hero-primary-text)" }}
              >
                View projects <ArrowRight size={15} />
              </button>
              <button
                onClick={() => onNavigate("contact")}
                className="rounded border border-white/30 px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-white/10"
              >
                Get in touch
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights: years in tech + certifications */}
      <div className="stagger-children grid gap-4 sm:grid-cols-2">
        <button
          onClick={() => onNavigate("experience")}
          className="card-lift group relative flex flex-col overflow-hidden rounded-lg border bg-white p-4 text-left shadow-[0_1.6px_3.6px_rgba(0,0,0,0.08),0_0.3px_0.9px_rgba(0,0,0,0.06)]"
          style={{ borderColor: "var(--border)" }}
        >
          <span
            className="pointer-events-none absolute inset-y-0 left-0 w-1"
            style={{ background: "#0f6cbd" }}
            aria-hidden="true"
          />
          <div className="flex items-center gap-2.5">
            <span
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg"
              style={{ background: "#0f6cbd14", color: "#0f6cbd" }}
            >
              <TrendingUp size={18} />
            </span>
            <span className="text-[12px] font-medium text-[var(--text-secondary)]">Years in tech</span>
            <ArrowRight
              size={15}
              className="ml-auto text-[var(--text-muted)] opacity-0 transition-opacity group-hover:opacity-100"
            />
          </div>
          <div className="mt-3 text-3xl font-bold tracking-tight text-[var(--text)]">
            <CountUp value="9+" />
          </div>
          <div className="mt-1 text-[12px] text-[var(--text-muted)]">Since 2017</div>
        </button>

        <CertificationsCard onNavigate={onNavigate} />
      </div>

      {/* Recent experience */}
      <Tile
        title="Recent Experience"
        icon={Briefcase}
        action={
          <button
            onClick={() => onNavigate("experience")}
            className="text-[12px] font-medium text-[var(--d365-blue)] hover:underline"
          >
            See all
          </button>
        }
      >
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b text-left text-[11px] uppercase tracking-wide text-[var(--text-muted)]" style={{ borderColor: "var(--border)" }}>
              <th className="px-4 py-2 font-semibold">Role</th>
              <th className="hidden px-4 py-2 font-semibold sm:table-cell">Organisation</th>
              <th className="px-4 py-2 font-semibold">Period</th>
            </tr>
          </thead>
          <tbody>
            {experiences.slice(0, 4).map((e) => (
              <tr
                key={e.role + e.company}
                className="border-b transition-colors hover:bg-[var(--sidebar-hover)]"
                style={{ borderColor: "var(--border)" }}
              >
                <td className="px-4 py-2.5">
                  <span className="font-medium text-[var(--d365-blue-hover)]">{e.role}</span>
                  {e.current && (
                    <span className="ml-2 align-middle">
                      <Badge color="#107c41">Current</Badge>
                    </span>
                  )}
                </td>
                <td className="hidden px-4 py-2.5 text-[var(--text-secondary)] sm:table-cell">{e.company}</td>
                <td className="px-4 py-2.5 text-[var(--text-secondary)]">{e.period}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Tile>

      {/* Microsoft stack — gradient splash */}
      <div
        className="relative overflow-hidden rounded-lg p-5 text-white shadow-sm sm:p-6"
        style={{
          background:
            "linear-gradient(120deg, var(--d365-navy) 0%, var(--d365-navy-2) 45%, #0f3d6e 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full"
          style={{ background: "radial-gradient(circle, rgb(255 255 255 / 16%) 0%, transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="relative z-10">
          <div className="flex items-center justify-between gap-3">
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-white/75 sm:text-[12px]">
              <Sparkles size={14} /> Expertise across the Microsoft stack
            </p>
            <button
              onClick={() => onNavigate("skills")}
              className="shrink-0 text-[12px] font-medium text-white/80 transition-colors hover:text-white hover:underline"
            >
              View all skills
            </button>
          </div>
          <div className="stagger-children mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
            {microsoftStack.map(({ name, Icon, color }) => (
              <button
                key={name}
                onClick={() => onNavigate("skills")}
                className="flex items-center gap-2.5 rounded-lg border border-white/[0.12] bg-white/[0.06] px-3 py-2.5 text-left backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.12]"
              >
                <span
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-md"
                  style={{ background: `${color}26` }}
                >
                  <Icon size={16} style={{ color }} />
                </span>
                <span className="truncate text-[13px] font-medium text-white/90">{name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Highlighted projects */}
      <Tile
        title="Highlighted Projects"
        icon={FolderKanban}
        accent="#107c41"
        action={
          <button
            onClick={() => onNavigate("projects")}
            className="text-[12px] font-medium text-[var(--d365-blue)] hover:underline"
          >
            See all
          </button>
        }
      >
        <div className="grid gap-px bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((p) => (
            <div
              key={p.name}
              className="group cursor-pointer bg-white p-4 transition-colors hover:bg-[var(--d365-blue-light)]"
              onClick={() => onNavigate("projects")}
            >
              <div className="flex items-center gap-2">
                <TrendingUp size={15} style={{ color: "var(--d365-green)" }} />
                <Badge color="#107c41">{p.stage}</Badge>
              </div>
              <h3 className="mt-2 text-[14px] font-semibold text-[var(--text)] transition-colors group-hover:text-[var(--d365-blue)]">
                {p.name}
              </h3>
              <p className="text-[12px] text-[var(--text-muted)]">{p.org}</p>
              <p className="mt-2 text-[12.5px] leading-relaxed text-[var(--text-secondary)]">
                {p.summary}
              </p>
            </div>
          ))}
        </div>
      </Tile>
    </div>
  );
}
