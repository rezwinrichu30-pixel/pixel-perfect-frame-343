import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Linkedin, Mail, MessageCircle, Ghost, MapPin, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow, MagneticButton, MediaFrame, Reveal, type MediaType } from "./primitives";

import heroImg from "@/assets/hero.jpg";
import portraitImg from "@/assets/portrait.jpg";
import reelImg from "@/assets/reel.jpg";
import catAutomotive from "@/assets/cat-automotive.jpg";
import catWedding from "@/assets/cat-wedding.jpg";
import catCollege from "@/assets/cat-college.jpg";
import catPr from "@/assets/cat-pr.jpg";
import catArchitectural from "@/assets/cat-architectural.jpg";
import catProduction from "@/assets/cat-production.jpg";
import catPhotography from "@/assets/cat-photography.jpg";

/* ================= Navbar ================= */
export function Navbar() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        solid ? "border-b border-border bg-background/80 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
        <a href="#top" className="font-display text-sm font-bold tracking-tight md:text-base">
          Mohamed Rezwin Ashraf
        </a>
        <div className="flex items-center gap-5">
          <div className="hidden gap-6 text-sm text-muted-foreground sm:flex">
            {["About", "Work", "Contact"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="transition-colors hover:text-primary"
              >
                {l}
              </a>
            ))}
          </div>
          <span className="rounded-full border border-primary/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
            Dubai, UAE
          </span>
        </div>
      </nav>
    </header>
  );
}

/* ================= Hero ================= */
export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center justify-center">
      <div className="grain absolute inset-0 overflow-hidden">
        <img
          src={heroImg}
          alt="Cinematic night shot of a videographer at work"
          width={1920}
          height={1088}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 veil" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 px-6 text-center"
      >
        <h1 className="font-display text-[13vw] font-bold leading-[0.92] md:text-8xl">
          Mohamed
          <br />
          Rezwin Ashraf
        </h1>
        <p className="mt-4 font-display text-lg tracking-[0.2em] text-primary uppercase md:text-2xl">
          Videographer / Editor
        </p>
        <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground md:text-base">
          Crafting stories through the lens.
        </p>
        <div className="mt-10">
          <MagneticButton
            href="#work"
            className="rounded-full bg-primary px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-primary-foreground glow-accent"
          >
            Press Play
          </MagneticButton>
        </div>
      </motion.div>
    </section>
  );
}

/* ================= Marquee ================= */
export function Marquee() {
  const words = ["Videographer", "Editor", "Storyteller", "Dubai, UAE", "Colorist", "Reels"];
  const strip = [...words, ...words, ...words];
  return (
    <div className="group overflow-hidden border-y border-border bg-background py-3">
      <div className="marquee-track group-hover:[animation-play-state:paused]">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0">
            {strip.map((w, i) => (
              <span
                key={`${k}-${i}`}
                className="px-6 text-[11px] font-semibold uppercase tracking-[0.35em] text-primary/80"
              >
                {w} —
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= About ================= */
const TOOLS = ["DaVinci Resolve", "Final Cut Pro", "Adobe Premiere Pro", "CapCut"];

export function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-36">
      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <Reveal>
          <div className="grain overflow-hidden rounded-2xl glow-soft">
            <img
              src={portraitImg}
              alt="Portrait of Mohamed Rezwin Ashraf holding a cinema camera"
              width={912}
              height={1104}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <Eyebrow>About</Eyebrow>
          <h2 className="mt-4 text-4xl font-bold md:text-6xl">About</h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            Creative and passionate Video Editor & Videographer with experience in cinematic video
            editing, reels, wedding videos, travel content, and social media content creation.
            Skilled in storytelling, color grading, transitions, sound design, and camera handling.
          </p>

          <p className="mt-10 eyebrow">Software Skills</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {TOOLS.map((t) => (
              <span
                key={t}
                className="rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground/90 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:glow-accent"
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= Featured reel ================= */
export function FeaturedReel({
  videoUrl,
  mediaType = "image",
}: {
  videoUrl?: string;
  mediaType?: MediaType;
}) {
  return (
    <section className="py-20 md:py-32">
      <div className="mb-10 px-5 text-center md:px-10">
        <Eyebrow>Showreel</Eyebrow>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-3 overflow-hidden rounded-2xl border border-primary/30 glow-accent md:mx-8"
      >
        <div className="aspect-[21/9] w-full md:aspect-[21/9] sm:aspect-video" data-cursor="play">
          <MediaFrame src={videoUrl ?? reelImg} mediaType={mediaType} alt="Featured showreel" />
        </div>
        <div className="pointer-events-none absolute right-5 top-5 [perspective:600px]">
          <div className="flip-badge rounded-full border border-primary/50 bg-background/70 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-primary backdrop-blur">
            Reel · 2026 · Showreel
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ================= Lightbox Modal ================= */
type LightboxProject = Project & { index: number };

function LightboxModal({
  project,
  isOpen,
  onClose,
}: {
  project: LightboxProject | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-50 flex items-center justify-center p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative w-full max-w-4xl">
            <div className="overflow-hidden rounded-2xl border border-border bg-card glow-accent">
              <div className="aspect-video w-full">
                <MediaFrame
                  src={project.src}
                  mediaType={project.mediaType}
                  alt={`${project.category} project — ${project.title}`}
                  showPlayIcon={true}
                />
              </div>
              <div className="px-6 py-4">
                <h3 className="font-display text-lg font-semibold">{project.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{project.category}</p>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close lightbox"
              className="absolute -right-12 -top-12 rounded-full bg-background/20 p-2 transition-all hover:bg-background/40 md:relative md:-right-0 md:-top-0 md:ml-4 md:inline-flex md:border md:border-border md:bg-card"
            >
              <X className="size-6" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ================= Work ================= */
type Project = {
  title: string;
  category: string;
  src: string;
  mediaType: MediaType;
};

const CATEGORIES = [
  "Automotive",
  "Wedding",
  "College",
  "PR",
  "Architectural",
  "Production",
  "Wedding Photography",
] as const;

// NOTE: The three automotive cards (Midnight GT, Desert Roll, Showroom Teaser) 
// are currently using the same placeholder image. Update with distinct automotive 
// thumbnails when real assets become available.
const PROJECTS: Project[] = [
  { title: "Midnight GT", category: "Automotive", src: catAutomotive, mediaType: "image" },
  { title: "Desert Roll — Automotive 02", category: "Automotive", src: catAutomotive, mediaType: "image" },
  { title: "Showroom Teaser", category: "Automotive", src: catAutomotive, mediaType: "image" },
  { title: "Sara & Ahmed", category: "Wedding", src: catWedding, mediaType: "image" },
  { title: "Golden Hour Vows", category: "Wedding", src: catWedding, mediaType: "image" },
  { title: "Nikah Film — Kochi", category: "Wedding", src: catWedding, mediaType: "image" },
  { title: "College Fest Highlights", category: "College", src: catCollege, mediaType: "image" },
  { title: "Farewell Aftermovie", category: "College", src: catCollege, mediaType: "image" },
  { title: "Campus Cypher", category: "College", src: catCollege, mediaType: "image" },
  { title: "Brand Launch Night", category: "PR", src: catPr, mediaType: "image" },
  { title: "Boutique Opening", category: "PR", src: catPr, mediaType: "image" },
  { title: "Founder Interview", category: "PR", src: catPr, mediaType: "image" },
  { title: "Marina Towers", category: "Architectural", src: catArchitectural, mediaType: "image" },
  { title: "Villa Walkthrough", category: "Architectural", src: catArchitectural, mediaType: "image" },
  { title: "Skyline Blue Hour", category: "Architectural", src: catArchitectural, mediaType: "image" },
  { title: "Studio Commercial", category: "Production", src: catProduction, mediaType: "image" },
  { title: "Behind The Scenes 01", category: "Production", src: catProduction, mediaType: "image" },
  { title: "Music Video Set", category: "Production", src: catProduction, mediaType: "image" },
  { title: "Bridal Portraits", category: "Wedding Photography", src: catPhotography, mediaType: "image" },
  { title: "Engagement Session", category: "Wedding Photography", src: catPhotography, mediaType: "image" },
  { title: "Candid Frames", category: "Wedding Photography", src: catPhotography, mediaType: "image" },
];

export function Work() {
  const [active, setActive] = useState<string>(CATEGORIES[0]);
  const [selectedProject, setSelectedProject] = useState<LightboxProject | null>(null);
  const items = PROJECTS.filter((p) => p.category === active);

  return (
    <>
      <section id="work" className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
        <Reveal>
          <Eyebrow>Work</Eyebrow>
          <h2 className="mt-4 text-4xl font-bold md:text-6xl">My Work</h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-10 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300",
                  active === c
                    ? "bg-primary text-primary-foreground glow-accent"
                    : "border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {items.map((p, idx) => (
              <button
                key={p.title}
                onClick={() => setSelectedProject({ ...p, index: idx })}
                data-cursor="play"
                className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:glow-accent cursor-pointer text-left"
              >
                <div className="aspect-video w-full">
                  <MediaFrame
                    src={p.src}
                    mediaType={p.mediaType}
                    alt={`${p.category} project — ${p.title}`}
                    playOnHoverOnly
                  />
                </div>
                <div className="flex items-center justify-between px-4 py-4">
                  <h3 className="font-display text-sm font-semibold">{p.title}</h3>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {p.category}
                  </span>
                </div>
              </button>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      <LightboxModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}

/* ================= Contact + Footer ================= */
const LINKS = [
  { label: "rezwinrichu30@gmail.com", href: "mailto:rezwinrichu30@gmail.com", Icon: Mail, name: "Email" },
  { label: "@rez_.win", href: "https://instagram.com/rez_.win", Icon: Instagram, name: "Instagram" },
  { label: "rexwiinn", href: "https://snapchat.com/add/rexwiinn", Icon: Ghost, name: "Snapchat" },
  { label: "+91 90615 94843", href: "https://wa.me/919061594843", Icon: MessageCircle, name: "WhatsApp" },
  {
    label: "Mohammed Rezwin",
    href: "https://www.linkedin.com/in/mohammed-rezwin",
    Icon: Linkedin,
    name: "LinkedIn",
  },
];

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-3xl px-5 py-24 text-center md:py-32">
      <Reveal>
        <Eyebrow>Contact</Eyebrow>
        <h2 className="mt-4 text-4xl font-bold md:text-6xl">Let's Create Something</h2>
        <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
          Available for wedding shoots, automotive content, PR campaigns, and creative
          collaborations.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <ul className="mx-auto mt-12 flex max-w-md flex-col gap-3">
          {LINKS.map(({ label, href, Icon, name }) => (
            <li key={name}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:glow-accent"
              >
                <Icon className="size-5 text-primary" />
                <span className="text-sm">{label}</span>
                <span className="ml-auto text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {name}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-primary/40 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-primary">
          <MapPin className="size-3.5" /> Dubai, UAE
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border px-5 py-10 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 md:flex-row md:justify-between">
        <div className="flex gap-3">
          {LINKS.filter((l) => l.name !== "Email").map(({ href, Icon, name }) => (
            <MagneticButton
              key={name}
              href={href}
              ariaLabel={name}
              className="size-11 rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <Icon className="size-4" />
            </MagneticButton>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">© 2026 Mohamed Rezwin Ashraf</p>
      </div>
    </footer>
  );
}
