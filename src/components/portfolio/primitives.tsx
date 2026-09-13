import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Play } from "lucide-react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ---------- Magnetic button ---------- */
export function MagneticButton({
  children,
  className,
  href,
  onClick,
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });
  const tx = useTransform(sx, (v) => v);
  const ty = useTransform(sy, (v) => v);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.35);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const Comp = (href ? motion.a : motion.button) as typeof motion.a;

  return (
    <Comp
      ref={ref as never}
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: tx, y: ty }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className={cn("inline-flex items-center justify-center", className)}
    >
      {children}
    </Comp>
  );
}

/* ---------- Section reveal ---------- */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">— {children}</p>;
}

/* ---------- Media frame (video-ready) ---------- */
export type MediaType = "image" | "video";

export function MediaFrame({
  src,
  mediaType = "image",
  alt,
  poster,
  className,
  showPlayIcon = true,
  playOnHoverOnly = false,
}: {
  src: string;
  mediaType?: MediaType;
  alt: string;
  poster?: string;
  className?: string;
  showPlayIcon?: boolean;
  playOnHoverOnly?: boolean;
}) {
  return (
    <div className={cn("grain group/media relative h-full w-full overflow-hidden", className)}>
      {mediaType === "video" ? (
        <video
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          autoPlay
          className="h-full w-full object-cover transition-transform duration-700 group-hover/media:scale-105"
        />
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover/media:scale-105"
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-background/30" />
      {showPlayIcon && (
        <div
          className={cn(
            "pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-300",
            playOnHoverOnly ? "opacity-0 group-hover/media:opacity-100" : "opacity-100",
          )}
        >
          <span className="glow-accent flex size-16 items-center justify-center rounded-full bg-background/55 backdrop-blur-sm">
            <Play className="size-6 translate-x-[2px] fill-current text-primary" />
          </span>
        </div>
      )}
    </div>
  );
}
