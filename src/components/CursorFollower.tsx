"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import { useEffect, useState } from "react";

/**
 * Global custom cursor follower.
 *
 * Floats a small italic label that follows the mouse with a slight spring
 * delay. The label text comes from the `data-cursor-label` attribute on
 * any hovered element (or its ancestors).
 *
 * Hidden entirely on touch devices (no fine pointer / no hover).
 *
 * Usage:
 *   <a data-cursor-label="press play" ... />
 */
export function CursorFollower() {
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 320, damping: 28, mass: 0.45 });
  const sy = useSpring(y, { stiffness: 320, damping: 28, mass: 0.45 });

  // Detect hover-capable + fine pointer devices only.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };

    const onLeave = (e: MouseEvent) => {
      // Only hide if leaving the document body
      if (
        e.relatedTarget === null ||
        (e.relatedTarget as Node)?.nodeName === "HTML"
      ) {
        setVisible(false);
      }
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const closest = t.closest?.("[data-cursor-label]");
      if (closest) {
        setLabel(closest.getAttribute("data-cursor-label") || "");
      } else {
        setLabel("");
      }
    };

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover", onOver);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed top-0 left-0 z-[60] mix-blend-difference"
      aria-hidden
    >
      <AnimatePresence>
        {visible && label ? (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 8, scale: 0.92, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -4, scale: 0.96, filter: "blur(4px)" }}
            transition={{
              duration: 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute"
            style={{
              left: 22,
              top: 18,
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "0.95rem",
              letterSpacing: "-0.01em",
              color: "#e8e5d5",
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* tiny dot that ALWAYS follows */}
      <motion.div
        animate={{
          opacity: visible ? 1 : 0,
          scale: label ? 1.6 : 1,
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="absolute"
        style={{
          width: 6,
          height: 6,
          borderRadius: 999,
          background: "#e8e5d5",
          left: 0,
          top: 0,
          transform: "translate(-50%, -50%)",
        }}
      />
    </motion.div>
  );
}
