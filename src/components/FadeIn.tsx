"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Initial blur in px. Default 6 for a subtle Emil-style entrance. */
  blur?: number;
  /** Override duration. Default 0.95s with spring-feel ease. */
  duration?: number;
};

export function FadeIn({
  children,
  className,
  delay = 0,
  y = 24,
  blur = 6,
  duration = 0.95,
}: FadeInProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={
        reduce
          ? { opacity: 0 }
          : { opacity: 0, y, filter: `blur(${blur}px)` }
      }
      whileInView={
        reduce
          ? { opacity: 1 }
          : { opacity: 1, y: 0, filter: "blur(0px)" }
      }
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: reduce ? 0.001 : duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      style={{ willChange: "transform, filter" }}
    >
      {children}
    </motion.div>
  );
}
