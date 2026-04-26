"use client";

import { motion } from "motion/react";
import { useState } from "react";

type PortraitRevealProps = {
  src: string;
  alt: string;
  signature?: string;
};

/**
 * Julia's portrait — micro-life on hover.
 *
 *   - default: subtle grayscale + sepia (current vibe)
 *   - hover:   filters drop, slight scale-up, signature appears word-by-word
 */
export function PortraitReveal({
  src,
  alt,
  signature = "— Julia",
}: PortraitRevealProps) {
  const [hovered, setHovered] = useState(false);
  const words = signature.split(/(\s+)/);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor-label="meet her"
    >
      <motion.div
        className="overflow-hidden"
        animate={
          hovered
            ? { scale: 1.02 }
            : { scale: 1 }
        }
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-auto block"
          style={{ aspectRatio: "3 / 4", objectFit: "cover" }}
          draggable={false}
          animate={
            hovered
              ? { filter: "grayscale(0%) sepia(0%)" }
              : { filter: "grayscale(20%) sepia(10%)" }
          }
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>

      {/* Handwritten-style signature, fades in word-by-word on hover */}
      <div className="absolute bottom-3 left-3 md:bottom-5 md:left-5 pointer-events-none">
        <span
          className="display-italic text-bone leading-none"
          style={{
            fontSize: "clamp(1.25rem, 2.4vw, 1.85rem)",
            textShadow: "0 1px 12px rgba(0,0,0,0.45)",
          }}
        >
          {words.map((w, i) =>
            /^\s+$/.test(w) ? (
              <span key={i}>{w}</span>
            ) : (
              <motion.span
                key={i}
                initial={false}
                animate={{
                  opacity: hovered ? 1 : 0,
                  y: hovered ? 0 : 6,
                  filter: hovered ? "blur(0px)" : "blur(8px)",
                }}
                transition={{
                  duration: 0.7,
                  delay: hovered ? 0.15 + i * 0.08 : 0,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ display: "inline-block", willChange: "transform, filter" }}
              >
                {w}
              </motion.span>
            )
          )}
        </span>
      </div>
    </div>
  );
}
