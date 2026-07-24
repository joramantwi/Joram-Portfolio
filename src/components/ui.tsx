import type { ReactNode, CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";

export function LinkedInIcon({
  size = 16,
  style,
  className,
}: {
  size?: number;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={style}
      className={className}
      aria-hidden="true"
    >
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8h4.52V24H.24V8zm7.5 0h4.33v2.19h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V24h-4.52v-6.36c0-1.52-.03-3.47-2.11-3.47-2.11 0-2.44 1.65-2.44 3.36V24H7.74V8z" />
    </svg>
  );
}

export function Tile({
  children,
  className = "",
  title,
  icon: Icon,
  accent,
  action,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
  icon?: LucideIcon;
  accent?: string;
  action?: ReactNode;
}) {
  return (
    <section
      className={`rounded-lg border bg-white shadow-[0_1.6px_3.6px_rgba(0,0,0,0.08),0_0.3px_0.9px_rgba(0,0,0,0.06)] ${className}`}
      style={{ borderColor: "var(--border)" }}
    >
      {title && (
        <div className="flex items-center gap-2 border-b px-4 py-2.5" style={{ borderColor: "var(--border)" }}>
          {Icon && <Icon size={16} style={{ color: accent ?? "var(--d365-blue)" }} />}
          <h2 className="text-[13px] font-semibold tracking-tight text-[var(--text)]">{title}</h2>
          {action && <div className="ml-auto">{action}</div>}
        </div>
      )}
      {children}
    </section>
  );
}

export function Badge({ children, color = "#0f6cbd" }: { children: ReactNode; color?: string }) {
  return (
    <span
      className="inline-flex items-center rounded px-2 py-0.5 text-[11px] font-medium"
      style={{ background: `${color}14`, color }}
    >
      {children}
    </span>
  );
}
