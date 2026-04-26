"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type AmbientToggleProps = {
  /** Path to the main ambient track. Loops. */
  src?: string;
  /** Optional second layer (e.g. vinyl crackle). Loops. */
  crackleSrc?: string;
  /** Volume of main track (0–1). */
  volume?: number;
  /** Volume of crackle layer (0–1). */
  crackleVolume?: number;
};

/**
 * Tiny floating ambient-music control, fixed to the top-right of the page.
 *
 * - No autoplay. User opts in.
 * - Two optional layers (track + crackle).
 * - Polite: gracefully hidden if no sources are provided AND not yet started.
 *   When a source is present but not yet loaded, the toggle still renders so
 *   the design is intentional.
 */
export function AmbientToggle({
  src,
  crackleSrc,
  volume = 0.22,
  crackleVolume = 0.12,
}: AmbientToggleProps) {
  const mainRef = useRef<HTMLAudioElement | null>(null);
  const crackleRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const hasAny = Boolean(src || crackleSrc);

  useEffect(() => {
    if (mainRef.current) mainRef.current.volume = volume;
    if (crackleRef.current) crackleRef.current.volume = crackleVolume;
  }, [volume, crackleVolume]);

  const toggle = async () => {
    const next = !playing;
    if (next) {
      try {
        await Promise.all([
          mainRef.current?.play(),
          crackleRef.current?.play(),
        ]);
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    } else {
      mainRef.current?.pause();
      crackleRef.current?.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      {src ? (
        <audio ref={mainRef} src={src} loop preload="auto" />
      ) : null}
      {crackleSrc ? (
        <audio ref={crackleRef} src={crackleSrc} loop preload="auto" />
      ) : null}

      <motion.button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Mute ambient sound" : "Play ambient sound"}
        aria-pressed={playing}
        data-cursor-label={playing ? "mute" : "play softly"}
        disabled={!hasAny}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-4 right-4 md:top-6 md:right-6 z-40 flex items-center gap-2 px-3 py-2 rounded-full border backdrop-blur-sm transition-colors duration-300 ${
          playing
            ? "bg-ink/85 text-bone border-bone/20"
            : "bg-bone/70 text-ink border-ink/15 hover:bg-ink hover:text-bone"
        } ${hasAny ? "cursor-pointer" : "opacity-40 cursor-not-allowed"}`}
      >
        {/* Tiny waveform icon — bars animate when playing */}
        <span className="flex items-end gap-[2px] h-3">
          {[0.5, 0.85, 0.65, 1, 0.7].map((h, i) => (
            <motion.span
              key={i}
              className="w-[2px] rounded-[1px] bg-current"
              animate={
                playing
                  ? {
                      scaleY: [h * 0.4, h, h * 0.6, h * 0.95, h * 0.5],
                    }
                  : { scaleY: h }
              }
              transition={
                playing
                  ? {
                      duration: 1.4 + i * 0.18,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.07,
                    }
                  : { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
              }
              style={{
                height: "100%",
                transformOrigin: "bottom",
              }}
            />
          ))}
        </span>
        <span className="tag" style={{ fontSize: "0.62rem" }}>
          {playing ? "Sound on" : hasAny ? "Sound" : "Sound · soon"}
        </span>
      </motion.button>
    </>
  );
}
