"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

/** The four Microsoft logo colours — the signature of the trail. */
const MICROSOFT_COLORS = ["#F25022", "#7FBA00", "#00A4EF", "#FFB900"];

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  size: number;
  color: string;
};

/**
 * Wraps content and paints a fading, Microsoft-coloured particle trail that
 * follows the pointer while it moves across the container. Honours reduced
 * motion and idles its animation loop when no particles remain.
 */
export default function CursorTrail({
  children,
  className = "",
  style,
  colors = MICROSOFT_COLORS,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  colors?: string[];
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let raf = 0;
    let running = false;
    let lastT = 0;
    let lastX = 0;
    let lastY = 0;
    let colorIndex = 0;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = (x: number, y: number) => {
      const color = colors[colorIndex % colors.length];
      colorIndex += 1;
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6 - 0.25,
        life: 0,
        max: 520 + Math.random() * 280,
        size: 3 + Math.random() * 3,
        color,
      });
      if (particles.length > 160) particles.splice(0, particles.length - 160);
    };

    const tick = (t: number) => {
      if (!lastT) lastT = t;
      const dt = t - lastT;
      lastT = t;

      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.life += dt;
        p.x += p.vx;
        p.y += p.vy;
      }
      particles = particles.filter((p) => p.life < p.max);

      for (const p of particles) {
        const k = 1 - p.life / p.max;
        ctx.globalAlpha = k;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (0.35 + 0.65 * k), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10 * k;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      if (particles.length) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
        lastT = 0;
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      lastT = 0;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const dx = x - lastX;
      const dy = y - lastY;
      if (dx * dx + dy * dy > 30) {
        spawn(x, y);
        lastX = x;
        lastY = y;
        start();
      }
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(wrap);
    wrap.addEventListener("pointermove", onMove);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      wrap.removeEventListener("pointermove", onMove);
    };
  }, [colors]);

  return (
    <div ref={wrapRef} className={`relative ${className}`} style={style}>
      {children}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-20"
        aria-hidden="true"
      />
    </div>
  );
}
