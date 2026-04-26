"use client";

import { useEffect, useRef, useState } from "react";

type HeroScratchProps = {
  src: string;
  alt: string;
  /** Spotlight radius in px. */
  radius?: number;
};

/**
 * Mouse-follow "scratch" reveal on the hero image.
 *
 * Two stacked image layers:
 *   - Bottom: full-colour, full-brightness original
 *   - Top: desaturated + dimmed clone, occluded everywhere except a soft
 *          radial window around the cursor
 *
 * As the cursor moves, the top layer's mask follows — revealing the warm
 * version underneath. On touch devices, the latest touch position acts the
 * same way and the spotlight fades out 1.4s after release.
 */
export function HeroScratch({ src, alt, radius = 220 }: HeroScratchProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  // On mount: parking the mask far off-screen
  useEffect(() => {
    if (!overlayRef.current) return;
    overlayRef.current.style.setProperty("--mx", `-9999px`);
    overlayRef.current.style.setProperty("--my", `-9999px`);
  }, []);

  const updateFromEvent = (clientX: number, clientY: number) => {
    if (!wrapRef.current || !overlayRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const mx = clientX - rect.left;
    const my = clientY - rect.top;
    overlayRef.current.style.setProperty("--mx", `${mx}px`);
    overlayRef.current.style.setProperty("--my", `${my}px`);
  };

  // Mouse handlers
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    updateFromEvent(e.clientX, e.clientY);
    setActive(true);
  };
  const onMouseLeave = () => setActive(false);

  // Touch handlers
  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const t = e.touches[0];
    if (!t) return;
    updateFromEvent(t.clientX, t.clientY);
    setActive(true);
  };
  const onTouchEnd = () => {
    // Linger briefly, then fade
    setTimeout(() => setActive(false), 1100);
  };

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 overflow-hidden"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchMove}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      data-cursor-label="your morning"
    >
      {/* Bottom: full-colour original */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Top: desaturated overlay, occluded except around cursor */}
      <div
        ref={overlayRef}
        className="hero-scratch-overlay absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={
          {
            opacity: active ? 1 : 1, // overlay is always present; mask handles reveal
            ["--r" as string]: `${radius}px`,
          } as React.CSSProperties
        }
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: "grayscale(85%) brightness(0.78) contrast(0.95)",
          }}
          draggable={false}
        />
      </div>
    </div>
  );
}
