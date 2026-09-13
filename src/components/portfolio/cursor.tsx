import { useEffect, useState } from "react";

/** Desktop-only custom cursor that expands to "▶ Play" over project cards. */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const el = e.target as HTMLElement | null;
      setActive(Boolean(el?.closest?.("[data-cursor='play']")));
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
      style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}
    >
      <div
        className="flex items-center justify-center rounded-full bg-primary/90 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-all duration-300 ease-out"
        style={{
          width: active ? 78 : 14,
          height: active ? 78 : 14,
          marginLeft: active ? -39 : -7,
          marginTop: active ? -39 : -7,
          opacity: active ? 1 : 0.75,
        }}
      >
        {active ? "▶ Play" : ""}
      </div>
    </div>
  );
}
