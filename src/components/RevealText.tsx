"use client";

import { motion, useReducedMotion } from "motion/react";
import { useId } from "react";

type RevealTextProps = {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  mode?: "char" | "word";
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  stagger?: number;
  blur?: number;
  duration?: number;
  once?: boolean;
};

/**
 * Emil-Kowalski-style reveal:
 *   - splits text into chars or words
 *   - each piece flies up + un-blurs + fades in
 *   - spring-eased, lightly staggered
 */
export function RevealText({
  children,
  as = "span",
  mode = "word",
  className = "",
  style,
  delay = 0,
  stagger = 0.04,
  blur = 12,
  duration = 0.9,
  once = true,
}: RevealTextProps) {
  const reduce = useReducedMotion();
  const id = useId();
  const Tag = motion[as] as typeof motion.span;

  const tokens =
    mode === "char"
      ? Array.from(children)
      : children.split(/(\s+)/); // keep whitespace tokens to preserve layout

  const container = {
    hidden: {},
    show: {
      transition: {
        delayChildren: delay,
        staggerChildren: reduce ? 0 : stagger,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: "0.4em",
      filter: `blur(${blur}px)`,
    },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: reduce ? 0.001 : duration,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <Tag
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-80px" }}
      variants={container}
      aria-label={children}
      key={id}
    >
      {tokens.map((token, i) => {
        // whitespace passes through without animation
        if (/^\s+$/.test(token)) {
          return <span key={i}>{token}</span>;
        }
        return (
          <motion.span
            key={i}
            variants={item}
            aria-hidden
            style={{ display: "inline-block", willChange: "transform, filter" }}
          >
            {token}
          </motion.span>
        );
      })}
    </Tag>
  );
}
