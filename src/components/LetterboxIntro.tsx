"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "dearself-letterbox-v1";

/**
 * Cinematic page entrance — two ink bars cover the screen on first visit,
 * pause briefly as a letterbox frame, then retreat off-screen.
 *
 * Plays once per browser session. Skipped for users who prefer reduced motion.
 */
export function LetterboxIntro() {
  const [phase, setPhase] = useState<"idle" | "open" | "letterbox" | "exit">(
    "idle"
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const seen = sessionStorage.getItem(STORAGE_KEY);
    if (seen || reduce) return;

    sessionStorage.setItem(STORAGE_KEY, "1");

    // Defer first state transition past the effect body to keep the
    // setState call out of the synchronous effect path.
    const raf = requestAnimationFrame(() => setPhase("open"));
    const t1 = setTimeout(() => setPhase("letterbox"), 350);
    const t2 = setTimeout(() => setPhase("exit"), 1100);
    const t3 = setTimeout(() => setPhase("idle"), 2400);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Lock body scroll while overlay is up
  useEffect(() => {
    if (phase === "idle") return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [phase]);

  const ease = [0.83, 0, 0.17, 1] as [number, number, number, number];
  const fullH = "50vh";
  const stripH = "9vh"; // letterbox stripe size

  // top-bar height map per phase
  const top =
    phase === "open"
      ? fullH
      : phase === "letterbox"
        ? stripH
        : phase === "exit"
          ? "0vh"
          : "0vh";

  return (
    <AnimatePresence>
      {phase !== "idle" ? (
        <>
          {/* Top bar */}
          <motion.div
            initial={{ height: fullH }}
            animate={{ height: top }}
            exit={{ height: "0vh" }}
            transition={{ duration: 0.95, ease }}
            className="fixed inset-x-0 top-0 z-[80] bg-ink pointer-events-none"
            aria-hidden
          />
          {/* Bottom bar */}
          <motion.div
            initial={{ height: fullH }}
            animate={{ height: top }}
            exit={{ height: "0vh" }}
            transition={{ duration: 0.95, ease }}
            className="fixed inset-x-0 bottom-0 z-[80] bg-ink pointer-events-none"
            aria-hidden
          />

          {/* Tiny editorial mark in centre while letterboxed */}
          {phase === "letterbox" ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease }}
              className="fixed inset-x-0 top-0 z-[81] flex items-start justify-center pt-[2.5vh] pointer-events-none"
              aria-hidden
            >
              <span
                className="tag text-bone/65"
                style={{ letterSpacing: "0.32em" }}
              >
                Dear Self · Vol. 01
              </span>
            </motion.div>
          ) : null}
        </>
      ) : null}
    </AnimatePresence>
  );
}
