"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useRef, type MouseEvent } from "react";

type MagneticLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** Max pull distance in px on each axis. */
  pull?: number;
};

/**
 * Premium magnetic CTA — element gently drifts toward the cursor inside its
 * own bounding box, then springs back when the cursor leaves. Light press
 * compress on click. Inspired by emilkowal.ski-style micro-interactions.
 */
export function MagneticLink({
  href,
  children,
  className = "",
  pull = 14,
}: MagneticLinkProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLAnchorElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);

  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.6 });
  const springScale = useSpring(scale, {
    stiffness: 380,
    damping: 26,
    mass: 0.5,
  });

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = e.clientX - rect.left - rect.width / 2;
    const cy = e.clientY - rect.top - rect.height / 2;
    const nx = Math.max(-1, Math.min(1, cx / (rect.width / 2)));
    const ny = Math.max(-1, Math.min(1, cy / (rect.height / 2)));
    x.set(nx * pull);
    y.set(ny * pull);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
    scale.set(1);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={reset}
      onMouseDown={() => scale.set(0.96)}
      onMouseUp={() => scale.set(1)}
      style={{
        x: springX,
        y: springY,
        scale: springScale,
        willChange: "transform",
      }}
    >
      {children}
    </motion.a>
  );
}
