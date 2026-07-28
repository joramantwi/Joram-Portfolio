"use client";

import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react";
import { ArrowLeft, Check, ChevronDown, GraduationCap, Link2, Menu, RefreshCw, Share2 } from "lucide-react";
import { profile } from "@/data/portfolio";
import { GitHubIcon, LinkedInIcon } from "./ui";
import { navGroups, viewTitles, type ViewKey } from "./nav";

type IconType = ComponentType<{ size?: number; style?: CSSProperties }>;

type CommandBarProps = {
  view: ViewKey;
  onBack: () => void;
  canGoBack: boolean;
  onNavigate: (v: ViewKey) => void;
  onOpenNav: () => void;
};

export default function CommandBar({ view, onBack, canGoBack, onNavigate, onOpenNav }: CommandBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  useEffect(() => {
    if (!shareOpen) return;
    const handler = (e: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(e.target as Node)) {
        setShareOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [shareOpen]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setShareOpen(false);
      }, 1200);
    } catch {
      setShareOpen(false);
    }
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
      "_blank",
      "noopener,noreferrer"
    );
    setShareOpen(false);
  };

  return (
    <div className="shrink-0 border-b bg-white" style={{ borderColor: "var(--border)" }}>
      <div className="flex items-center gap-1 px-3 py-1.5 text-[13px]">
        <button
          onClick={onOpenNav}
          aria-label="Open navigation"
          className="grid h-8 w-8 place-items-center rounded transition-colors hover:bg-[var(--sidebar-hover)] lg:hidden"
        >
          <Menu size={18} />
        </button>

        <button
          onClick={onBack}
          disabled={!canGoBack}
          aria-label="Back"
          className="grid h-8 w-8 place-items-center rounded transition-colors hover:bg-[var(--sidebar-hover)] disabled:opacity-30"
        >
          <ArrowLeft size={16} />
        </button>

        <span className="mx-1 h-5 w-px" style={{ background: "var(--border)" }} />

        <CmdButton icon={LinkedInIcon} label="LinkedIn" href={profile.linkedin} external />
        <CmdButton icon={GitHubIcon} label="GitHub" href={profile.github} external />
        <CmdButton icon={GraduationCap} label="Learn" href={profile.learnProfile} external />
        <CmdButton icon={RefreshCw} label="Refresh" onClick={() => window.location.reload()} />

        <div ref={shareRef} className="relative ml-auto">
          <button
            onClick={() => setShareOpen((o) => !o)}
            aria-haspopup="menu"
            aria-expanded={shareOpen}
            className="flex items-center gap-1.5 rounded border px-3 py-1 text-[13px] transition-colors hover:bg-[var(--sidebar-hover)]"
            style={{ borderColor: "var(--border-strong)" }}
          >
            <Share2 size={14} />
            <span className="hidden sm:inline">Share</span>
            <ChevronDown
              size={13}
              className={`transition-transform duration-200 ${shareOpen ? "rotate-180" : ""}`}
            />
          </button>

          {shareOpen && (
            <div
              role="menu"
              className="launcher-in absolute right-0 top-full z-30 mt-1 w-52 rounded-lg border bg-white p-1.5 shadow-lg"
              style={{ borderColor: "var(--border)" }}
            >
              <button
                role="menuitem"
                onClick={copyLink}
                className="flex w-full items-center gap-2.5 rounded px-2 py-1.5 text-left text-[13px] transition-colors hover:bg-[var(--sidebar-hover)]"
              >
                {copied ? (
                  <Check size={15} style={{ color: "var(--d365-green)" }} />
                ) : (
                  <Link2 size={15} style={{ color: "var(--d365-blue)" }} />
                )}
                {copied ? "Link copied" : "Copy link"}
              </button>
              <button
                role="menuitem"
                onClick={shareOnLinkedIn}
                className="flex w-full items-center gap-2.5 rounded px-2 py-1.5 text-left text-[13px] transition-colors hover:bg-[var(--sidebar-hover)]"
              >
                <LinkedInIcon size={15} style={{ color: "#0a66c2" }} />
                Share on LinkedIn
              </button>
            </div>
          )}
        </div>
      </div>

      <div ref={menuRef} className="relative px-5 pb-3 pt-1">
        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          className="-mx-2 flex items-center gap-2 rounded px-2 py-1 transition-colors hover:bg-[var(--sidebar-hover)]"
        >
          <h1 className="text-[20px] font-semibold tracking-tight text-[var(--text)]">
            {viewTitles[view]}
          </h1>
          <ChevronDown
            size={17}
            className={`text-[var(--text-secondary)] transition-transform duration-200 ${
              menuOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {menuOpen && (
          <div
            role="menu"
            className="launcher-in absolute left-5 top-full z-30 mt-1 w-64 rounded-lg border bg-white p-1.5 shadow-lg"
            style={{ borderColor: "var(--border)" }}
          >
            {navGroups.map((group) => (
              <div key={group.heading} className="py-1">
                <p className="px-2 py-1 text-[10.5px] font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                  {group.heading}
                </p>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = item.key === view;
                  return (
                    <button
                      key={item.key}
                      role="menuitem"
                      onClick={() => {
                        onNavigate(item.key);
                        setMenuOpen(false);
                      }}
                      className="flex w-full items-center gap-2.5 rounded px-2 py-1.5 text-left text-[13px] transition-colors hover:bg-[var(--sidebar-hover)]"
                      style={{
                        background: active ? "var(--sidebar-active)" : undefined,
                        color: active ? "var(--d365-blue)" : "var(--text)",
                        fontWeight: active ? 600 : 400,
                      }}
                    >
                      <Icon size={15} style={{ color: item.color }} />
                      {item.label}
                      {active && (
                        <Check size={14} className="ml-auto text-[var(--d365-blue)]" />
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        )}
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
        aria-label={label}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(download ? { download: "" } : {})}
      >
        {content}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={className} aria-label={label}>
      {content}
    </button>
  );
}
