"use client";

import { Search, Settings, Plus, HelpCircle, Lightbulb } from "lucide-react";
import { profile } from "@/data/portfolio";
import { useSearch } from "./search/SearchProvider";
import { Avatar } from "./ui";
import AppLauncher from "./AppLauncher";

export default function TopBar() {
  const { open } = useSearch();

  return (
    <header
      className="flex h-12 items-center gap-2 px-2 text-white shrink-0 z-30"
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
          className="grid h-9 w-9 place-items-center rounded hover:bg-white/10 transition-colors md:hidden"
        >
          <Search size={17} />
        </button>
        {[Lightbulb, Plus, Settings, HelpCircle].map((Icon, i) => (
          <button
            key={i}
            className="hidden h-9 w-9 place-items-center rounded hover:bg-white/10 transition-colors sm:grid"
            aria-label="Action"
          >
            <Icon size={17} />
          </button>
        ))}
        <Avatar
          src={profile.avatar}
          name={profile.name}
          imgClassName="ml-1 h-8 w-8 shrink-0 rounded-full object-cover ring-1 ring-white/20"
          fallbackClassName="ml-1 grid h-8 w-8 place-items-center rounded-full text-[12px] font-semibold"
          fallbackStyle={{ background: "var(--d365-teal)" }}
        />
      </div>
    </header>
  );
}
