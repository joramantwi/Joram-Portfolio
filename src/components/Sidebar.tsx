"use client";

import { Menu, Clock, Pin, ChevronDown, X } from "lucide-react";
import { navGroups, type ViewKey } from "./nav";

type SidebarProps = {
  active: ViewKey;
  onSelect: (key: ViewKey) => void;
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
};

export default function Sidebar({ active, onSelect, collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  return (
    <>
      {/* Backdrop (mobile only) */}
      {mobileOpen && (
        <div
          className="fixed inset-x-0 bottom-0 top-12 z-40 bg-black/40 lg:hidden"
          onClick={onMobileClose}
          aria-hidden
        />
      )}
      <nav
        className={`fixed left-0 top-12 z-50 flex h-[calc(100dvh-3rem)] flex-col border-r bg-white shrink-0 transition-[transform,width] duration-200 lg:static lg:top-auto lg:z-auto lg:h-full lg:translate-x-0 lg:shadow-none ${
          mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
        style={{
          width: collapsed ? 48 : 236,
          borderColor: "var(--border)",
        }}
      >
        <div className="flex h-11 items-center px-2">
          <button
            onClick={onToggle}
            aria-label="Toggle navigation"
            className="hidden h-9 w-9 place-items-center rounded hover:bg-[var(--sidebar-hover)] transition-colors lg:grid"
          >
            <Menu size={18} />
          </button>
          <button
            onClick={onMobileClose}
            aria-label="Close navigation"
            className="grid h-9 w-9 place-items-center rounded hover:bg-[var(--sidebar-hover)] transition-colors lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

      {!collapsed && (
        <div className="px-3 pb-2">
          <SidebarStub icon={Clock} label="Recent" />
          <SidebarStub icon={Pin} label="Pinned" />
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-2 pb-4">
        {navGroups.map((group) => (
          <div key={group.heading} className="mt-3">
            {!collapsed && (
              <div className="px-2 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                {group.heading}
              </div>
            )}
            {collapsed && <div className="mx-2 my-2 border-t" style={{ borderColor: "var(--border)" }} />}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = active === item.key;
                return (
                  <li key={item.key}>
                    <button
                      onClick={() => onSelect(item.key)}
                      title={item.label}
                      className="group relative flex w-full items-center gap-3 rounded px-2 py-[7px] text-left text-[13px] transition-colors"
                      style={{
                        background: isActive ? "var(--sidebar-active)" : "transparent",
                        color: isActive ? "var(--d365-blue-hover)" : "var(--text)",
                        fontWeight: isActive ? 600 : 400,
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) e.currentTarget.style.background = "var(--sidebar-hover)";
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) e.currentTarget.style.background = "transparent";
                      }}
                    >
                      {isActive && (
                        <span
                          className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full"
                          style={{ background: "var(--d365-blue)" }}
                        />
                      )}
                      <Icon size={18} style={{ color: isActive ? "var(--d365-blue)" : item.color }} className="shrink-0" />
                      {!collapsed && <span className="truncate">{item.label}</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      </nav>
    </>
  );
}

function SidebarStub({ icon: Icon, label }: { icon: typeof Clock; label: string }) {
  return (
    <div className="flex items-center justify-between rounded px-2 py-1.5 text-[13px] text-[var(--text-secondary)] hover:bg-[var(--sidebar-hover)]">
      <span className="flex items-center gap-3">
        <Icon size={16} />
        {label}
      </span>
      <ChevronDown size={14} />
    </div>
  );
}
