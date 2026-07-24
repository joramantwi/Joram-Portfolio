"use client";

import type { ComponentType, CSSProperties } from "react";
import { ArrowLeft, ChevronDown, FileText, Mail, RefreshCw, Share2 } from "lucide-react";
import { profile } from "@/data/portfolio";
import { LinkedInIcon } from "./ui";
import { viewTitles, type ViewKey } from "./nav";

type IconType = ComponentType<{ size?: number; style?: CSSProperties }>;

type CommandBarProps = {
  view: ViewKey;
  onBack: () => void;
  canGoBack: boolean;
};

export default function CommandBar({ view, onBack, canGoBack }: CommandBarProps) {
  return (
    <div className="shrink-0 border-b bg-white" style={{ borderColor: "var(--border)" }}>
      <div className="flex items-center gap-1 px-3 py-1.5 text-[13px]">
        <button
          onClick={onBack}
          disabled={!canGoBack}
          aria-label="Back"
          className="grid h-8 w-8 place-items-center rounded transition-colors hover:bg-[var(--sidebar-hover)] disabled:opacity-30"
        >
          <ArrowLeft size={16} />
        </button>

        <span className="mx-1 h-5 w-px" style={{ background: "var(--border)" }} />

        <CmdButton
          icon={FileText}
          label="Request CV"
          href={`mailto:${profile.email}?subject=CV%20request&body=Hi%20Joram%2C%20I%27d%20like%20a%20copy%20of%20your%20CV.`}
        />
        <CmdButton icon={Mail} label="Email" href={`mailto:${profile.email}`} />
        <CmdButton icon={LinkedInIcon} label="LinkedIn" href={profile.linkedin} external />
        <CmdButton icon={RefreshCw} label="Refresh" onClick={() => window.location.reload()} />

        <div className="ml-auto">
          <button className="flex items-center gap-1.5 rounded border px-3 py-1 text-[13px] transition-colors hover:bg-[var(--sidebar-hover)]" style={{ borderColor: "var(--border-strong)" }}>
            <Share2 size={14} />
            Share
            <ChevronDown size={13} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 px-5 pb-3 pt-1">
        <h1 className="text-[20px] font-semibold tracking-tight text-[var(--text)]">
          {viewTitles[view]}
        </h1>
        <ChevronDown size={17} className="text-[var(--text-secondary)]" />
      </div>
    </div>
  );
}

type CmdButtonProps = {
  icon: IconType;
  label: string;
  href?: string;
  onClick?: () => void;
  external?: boolean;
  download?: boolean;
};

function CmdButton({ icon: Icon, label, href, onClick, external, download }: CmdButtonProps) {
  const className =
    "flex items-center gap-1.5 rounded px-2.5 py-1.5 text-[13px] text-[var(--text)] transition-colors hover:bg-[var(--sidebar-hover)]";
  const content = (
    <>
      <Icon size={15} style={{ color: "var(--d365-blue)" }} />
      <span className="hidden sm:inline">{label}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={className}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(download ? { download: "" } : {})}
      >
        {content}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={className}>
      {content}
    </button>
  );
}
