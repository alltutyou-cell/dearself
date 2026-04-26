"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

type Chapter = {
  id: string;
  num: string;
  label: string;
};

type ChapterIndexProps = {
  chapters: Chapter[];
};

/**
 * Vertical magazine-style chapter index, anchored to the left edge on desktop.
 *
 * Tracks which section is in view via IntersectionObserver, highlights it,
 * and lets the user click to scroll to a chapter. Hidden on mobile and tablet.
 */
export function ChapterIndex({ chapters }: ChapterIndexProps) {
  const [active, setActive] = useState<string>(chapters[0]?.id ?? "");
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const els = chapters
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (els.length === 0) return;

    // Pick the section closest to the top quarter of the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top)
          );
        if (visible[0]?.target.id) {
          setActive(visible[0].target.id);
        }
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [chapters]);

  // Hide on hero — too noisy alongside the existing corner labels there.
  const onHero = active === "hero" || active === "";

  return (
    <motion.nav
      aria-label="Chapter index"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        opacity: onHero ? 0 : 1,
        x: onHero ? -12 : 0,
      }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{ pointerEvents: onHero ? "none" : "auto" }}
      className="hidden lg:flex fixed left-5 xl:left-8 top-1/2 -translate-y-1/2 z-30 flex-col gap-2"
    >
      {chapters.map((c) => {
        const isActive = c.id === active;
        return (
          <motion.a
            key={c.id}
            href={`#${c.id}`}
            data-cursor-label={c.label}
            className="group flex items-center gap-3 py-1"
            initial={false}
          >
            {/* Number — fades in only when index is hovered or chapter is active */}
            <motion.span
              className="tag"
              animate={{
                opacity: hovered || isActive ? (isActive ? 1 : 0.55) : 0,
                x: hovered || isActive ? 0 : -6,
              }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{
                color: isActive ? "var(--color-ink)" : "var(--color-ink)",
                fontSize: "0.62rem",
                width: "1.4rem",
                display: "inline-block",
              }}
            >
              {c.num}
            </motion.span>

            {/* Tick mark — always visible, length grows when active */}
            <motion.span
              animate={{
                width: isActive ? 28 : 12,
                opacity: isActive ? 1 : 0.35,
                backgroundColor: isActive
                  ? "var(--color-earth)"
                  : "var(--color-ink)",
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="block h-[1px]"
            />

            {/* Label — fades in on hover */}
            <motion.span
              className="display-italic"
              animate={{
                opacity: hovered ? 1 : 0,
                x: hovered ? 0 : -6,
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: "0.95rem",
                color: "var(--color-ink)",
                whiteSpace: "nowrap",
              }}
            >
              {c.label}
            </motion.span>
          </motion.a>
        );
      })}
    </motion.nav>
  );
}
