"use client";

import { UserRound, MapPin, Award, LayoutGrid, Database, Puzzle, GitBranch } from "lucide-react";
import { profile } from "@/data/portfolio";
import { Tile, LinkedInIcon, Avatar } from "../ui";

type GlanceItem = {
  title: string;
  description: string;
  chips: string[];
  icon: typeof LayoutGrid;
  color: string;
};

const atAGlance: GlanceItem[] = [
  {
    title: "Dynamics 365 CE",
    description: "Delivered Customer Engagement solutions built around Sales and Customer Service.",
    chips: ["Sales", "Customer Service", "Model-driven apps"],
    icon: LayoutGrid,
    color: "#0f6cbd",
  },
  {
    title: "Power Platform build",
    description: "Model-driven apps on Dataverse, extended with the wider Power Platform.",
    chips: ["Dataverse", "Power Apps", "Power Pages", "Power Automate"],
    icon: Database,
    color: "#107c41",
  },
  {
    title: "Pro-dev & customisation",
    description:
      "Developed C# Dataverse plug-ins and registered them using the Plugin Registration Tool, alongside JavaScript form customisation and solution-based deployment.",
    chips: ["C# Dataverse plug-ins", "Plugin Registration Tool", "JavaScript customisation", "Solution deployment"],
    icon: Puzzle,
    color: "#8764b8",
  },
  {
    title: "ALM & solution management",
    description:
      "Developed customisations in unmanaged solutions and promoted managed solutions through Development, Test/UAT and Production using Power Platform Pipelines.",
    chips: ["Unmanaged development", "Managed promotion", "Power Platform Pipelines", "Development · Test/UAT · Production"],
    icon: GitBranch,
    color: "#038387",
  },
];

export default function ProfileView() {
  const rows = [
    { icon: MapPin, label: "Location", value: profile.location },
    { icon: LinkedInIcon, label: "LinkedIn", value: profile.linkedinLabel, href: profile.linkedin, external: true },
    { icon: Award, label: "Microsoft Learn", value: profile.learnProfileLabel, href: profile.learnCredentials, external: true },
  ];

  return (
    <div className="grid items-start gap-4 lg:grid-cols-3">
      <Tile className="lg:col-span-1" title="Contact Card" icon={UserRound} accent="#038387">
        <div className="p-5">
          <Avatar
            src={profile.avatar}
            name={profile.name}
            imgClassName="mx-auto h-20 w-20 rounded-full object-cover ring-1 ring-[var(--border)]"
            fallbackClassName="mx-auto grid h-20 w-20 place-items-center rounded-full text-2xl font-bold text-white"
            fallbackStyle={{ background: "linear-gradient(135deg, var(--d365-teal), var(--d365-blue))" }}
          />
          <h2 className="mt-3 text-center text-[16px] font-semibold text-[var(--text)]">{profile.name}</h2>
          <p className="text-center text-[12.5px] text-[var(--text-secondary)]">{profile.title}</p>

          <div className="mt-4 space-y-1">
            {rows.map((r) => {
              const Icon = r.icon;
              const content = (
                <span className="flex items-center gap-3 rounded px-2 py-2 text-[13px] transition-colors hover:bg-[var(--sidebar-hover)]">
                  <Icon size={16} style={{ color: "var(--d365-blue)" }} className="shrink-0" />
                  <span className="min-w-0">
                    <span className="block text-[11px] uppercase tracking-wide text-[var(--text-muted)]">
                      {r.label}
                    </span>
                    <span className="block truncate text-[var(--text)]">{r.value}</span>
                  </span>
                </span>
              );
              return r.href ? (
                <a
                  key={r.label}
                  href={r.href}
                  {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="block"
                >
                  {content}
                </a>
              ) : (
                <div key={r.label}>{content}</div>
              );
            })}
          </div>
        </div>
      </Tile>

      <div className="space-y-4 lg:col-span-2">
        <Tile title="About" icon={UserRound} accent="#0f6cbd">
          <div className="space-y-3 p-5 text-[13.5px] leading-relaxed text-[var(--text-secondary)]">
            {profile.summary.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </Tile>

        <Tile title="At a Glance" icon={UserRound} accent="#8764b8">
          <div className="stagger-children space-y-3 p-4">
            {atAGlance.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex gap-3 rounded-lg border bg-white p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  style={{ borderColor: "var(--border)" }}
                >
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-lg"
                    style={{ background: `${item.color}16` }}
                  >
                    <Icon size={19} style={{ color: item.color }} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[14px] font-semibold text-[var(--text)]">{item.title}</p>
                    <p className="mt-0.5 text-[12.5px] leading-relaxed text-[var(--text-secondary)]">
                      {item.description}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {item.chips.map((chip) => (
                        <span
                          key={chip}
                          className="rounded-full px-2.5 py-0.5 text-[11.5px] font-medium"
                          style={{ background: `${item.color}12`, color: item.color }}
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Tile>
      </div>
    </div>
  );
}
