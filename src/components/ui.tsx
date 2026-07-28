"use client";

import { useEffect, useRef, useState } from "react";
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

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/**
 * Avatar that shows an image and gracefully falls back to the person's
 * initials if the image is missing or fails to load.
 */
export function Avatar({
  src,
  name,
  imgClassName,
  fallbackClassName,
  fallbackStyle,
}: {
  src: string;
  name: string;
  imgClassName?: string;
  fallbackClassName?: string;
  fallbackStyle?: CSSProperties;
}) {
  const [ok, setOk] = useState(true);
  const ref = useRef<HTMLImageElement>(null);

  // Catch images that already failed before the onError handler attached.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setOk(false);
  }, []);

  if (!ok) {
    return (
      <div className={fallbackClassName} style={fallbackStyle} title={name}>
        {initialsOf(name)}
      </div>
    );
  }

  return (
    <img
      ref={ref}
      src={src}
      alt={name}
      title={name}
      onError={() => setOk(false)}
      className={imgClassName}
    />
  );
}

export function GitHubIcon({
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
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.32.47-2.39 1.24-3.23-.13-.3-.54-1.53.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.05.14 3 .4 2.29-1.55 3.29-1.23 3.29-1.23.66 1.65.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.23 0 4.62-2.81 5.64-5.49 5.94.43.37.82 1.1.82 2.22 0 1.61-.02 2.9-.02 3.29 0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
    </svg>
  );
}

export function WaffleIcon({
  size = 18,
  style,
  className,
}: {
  size?: number;
  style?: CSSProperties;
  className?: string;
}) {
  const positions = [4, 10, 16];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="currentColor"
      style={style}
      className={className}
      aria-hidden="true"
    >
      {positions.flatMap((cy) =>
        positions.map((cx) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={1.6} />
        ))
      )}
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

/** Animates a numeric value (with optional suffix like "+") counting up on mount. */
export function CountUp({ value, duration = 1100 }: { value: string; duration?: number }) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";
  const [display, setDisplay] = useState(match ? 0 : NaN);
  const frame = useRef<number>(0);

  useEffect(() => {
    if (!match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(target);
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * target));
      if (t < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);

  if (!match) return <>{value}</>;
  return (
    <>
      {display}
      {suffix}
    </>
  );
}
