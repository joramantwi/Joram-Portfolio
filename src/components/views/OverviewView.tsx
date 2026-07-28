"use client";

import { Briefcase, Sparkles, FolderKanban, TrendingUp, MapPin, ArrowRight } from "lucide-react";
import { profile, kpis, experiences, skillGroups, projects } from "@/data/portfolio";
import { Tile, Badge, CountUp } from "../ui";
import type { ViewKey } from "../nav";

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
        <div
          className="orb-float pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #4aa5f0, transparent 70%)" }}
        />
        <div
          className="orb-float-delayed pointer-events-none absolute -bottom-24 right-40 h-72 w-72 rounded-full opacity-[0.14]"
          style={{ background: "radial-gradient(circle, #8764b8, transparent 70%)" }}
        />
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
            className="flex items-center gap-1.5 rounded bg-white px-4 py-2 text-[13px] font-semibold text-[var(--d365-navy)] transition-transform hover:-translate-y-0.5"
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

      {/* KPI tiles */}
      <div className="stagger-children grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((k) => (
          <Tile key={k.label} className="card-lift p-4">
            <div className="flex items-start justify-between">
              <span className="text-[12px] font-medium text-[var(--text-secondary)]">{k.label}</span>
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: k.accent }} />
            </div>
            <div className="mt-2 text-3xl font-bold tracking-tight" style={{ color: k.accent }}>
              <CountUp value={k.value} />
            </div>
            <div className="mt-1 text-[12px] text-[var(--text-muted)]">{k.caption}</div>
          </Tile>
        ))}
      </div>

      {/* Two columns */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Recent experience */}
        <Tile
          title="Recent Experience"
          icon={Briefcase}
          className="lg:col-span-2"
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

        {/* Top skills */}
        <Tile title="Skill Areas" icon={Sparkles} accent="#8764b8">
          <div className="p-2">
            {skillGroups.slice(0, 5).map((g, i) => {
              const accent = ["#0f6cbd", "#038387", "#107c41", "#8764b8", "#c19c00"][i % 5];
              return (
                <button
                  key={g.category}
                  onClick={() => onNavigate("skills")}
                  className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-[var(--sidebar-hover)]"
                >
                  <span className="flex min-w-0 items-center gap-2.5">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ background: accent }}
                    />
                    <span className="truncate text-[13px] font-medium text-[var(--text)]">
                      {g.category}
                    </span>
                  </span>
                  <span
                    className="shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold"
                    style={{ background: `${accent}14`, color: accent }}
                  >
                    {g.skills.length} skills
                  </span>
                </button>
              );
            })}
            <button
              onClick={() => onNavigate("skills")}
              className="mt-1 px-3 text-[12px] font-medium text-[var(--d365-blue)] hover:underline"
            >
              View all skills
            </button>
          </div>
        </Tile>
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
