"use client";

import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react";
import {
  PieChart,
  Headset,
  Database,
  LayoutGrid,
  Workflow,
  Globe,
  MessageSquareText,
  Truck,
  Cloud,
  Infinity,
} from "lucide-react";
import { GitHubIcon, WaffleIcon } from "./ui";

type IconType = ComponentType<{ size?: number; style?: CSSProperties }>;

type D365App = {
  name: string;
  note: string;
  icon: IconType;
  color: string;
  status?: "upcoming";
};

type AppGroup = {
  heading: string;
  caption: string;
  apps: D365App[];
};

const groups: AppGroup[] = [
  {
    heading: "Customer Engagement",
    caption: "aka CE, formerly CRM",
    apps: [
      {
        name: "Sales",
        note: "Custom model-driven apps using Sales components",
        icon: PieChart,
        color: "#0f6cbd",
      },
      {
        name: "Customer Service",
        note: "Case management, routing & SLAs",
        icon: Headset,
        color: "#8764b8",
      },
    ],
  },
  {
    heading: "Power Platform",
    caption: "Low-code foundation",
    apps: [
      {
        name: "Dataverse",
        note: "Data modelling, relationships & security",
        icon: Database,
        color: "#107c41",
      },
      {
        name: "Power Apps",
        note: "Model-driven app design & customisation",
        icon: LayoutGrid,
        color: "#742774",
      },
      {
        name: "Power Automate",
        note: "Cloud flow automation",
        icon: Workflow,
        color: "#0b53ce",
      },
      {
        name: "Power Pages",
        note: "Secure external portals",
        icon: Globe,
        color: "#5c2e91",
      },
    ],
  },
  {
    heading: "Engagement & Feedback",
    caption: "Voice of the customer",
    apps: [
      {
        name: "Customer Voice",
        note: "Surveys & feedback capture",
        icon: MessageSquareText,
        color: "#038387",
      },
    ],
  },
  {
    heading: "DevOps & ALM",
    caption: "Build, ship & govern",
    apps: [
      {
        name: "Azure",
        note: "App registrations & cloud services",
        icon: Cloud,
        color: "#0078d4",
      },
      {
        name: "GitHub",
        note: "Source control & collaboration",
        icon: GitHubIcon,
        color: "#24292f",
      },
      {
        name: "Azure DevOps",
        note: "Boards, repos & pipelines",
        icon: Infinity,
        color: "#0052cc",
      },
    ],
  },
  {
    heading: "Finance & Operations",
    caption: "aka F&O",
    apps: [
      {
        name: "Supply Chain Management",
        note: "Joining my next role — coming soon",
        icon: Truck,
        color: "#0078d4",
        status: "upcoming",
      },
    ],
  },
];

export default function AppLauncher() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        aria-label="Apps I've worked with"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="grid h-9 w-9 place-items-center rounded transition-colors hover:bg-white/10"
        style={{ background: open ? "rgba(255,255,255,0.12)" : undefined }}
      >
        <WaffleIcon size={18} />
      </button>

      {open && (
        <div
          className="absolute left-0 top-full z-50 mt-1.5 w-[340px] origin-top-left overflow-hidden rounded-xl border bg-white text-[var(--text)] shadow-2xl sm:w-[380px]"
          style={{ borderColor: "var(--border)", animation: "launcherIn 0.14s ease-out" }}
          role="dialog"
          aria-label="Apps I've worked with"
        >
          <div
            className="flex items-center gap-2.5 px-4 py-3 text-white"
            style={{ background: "var(--d365-navy)" }}
          >
            <WaffleIcon size={16} />
            <div>
              <p className="text-[13.5px] font-semibold leading-tight">Apps I&apos;ve worked with</p>
              <p className="text-[11.5px] text-white/60">Platforms &amp; tools across my experience</p>
            </div>
          </div>

          <div className="max-h-[70vh] overflow-y-auto p-2">
            {groups.map((group) => (
              <div key={group.heading} className="mb-1 px-1 py-1.5">
                <div className="flex items-baseline justify-between px-2 pb-1">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                    {group.heading}
                  </span>
                  <span className="text-[10.5px] text-[var(--text-muted)]">{group.caption}</span>
                </div>
                <ul className="space-y-0.5">
                  {group.apps.map((app) => {
                    const Icon = app.icon;
                    return (
                      <li key={app.name}>
                        <div className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-[var(--sidebar-hover)]">
                          <span
                            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg"
                            style={{ background: `${app.color}18` }}
                          >
                            <Icon size={18} style={{ color: app.color }} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="flex items-center gap-2">
                              <span className="truncate text-[13px] font-semibold text-[var(--text)]">
                                {app.name}
                              </span>
                              {app.status === "upcoming" && (
                                <span
                                  className="shrink-0 rounded-full px-1.5 py-0.5 text-[9.5px] font-bold uppercase tracking-wide"
                                  style={{ background: "#c8842014", color: "#b7791f" }}
                                >
                                  Upcoming
                                </span>
                              )}
                            </span>
                            <span className="block truncate text-[11.5px] text-[var(--text-secondary)]">
                              {app.note}
                            </span>
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
