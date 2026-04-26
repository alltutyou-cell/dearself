"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useEffect, useRef, useState, type MouseEvent } from "react";

type AudioPlayerProps = {
  src?: string;
  label?: string;
  caption?: string;
  variant?: "light" | "dark";
  className?: string;
};

export function AudioPlayer({
  src,
  label = "Listen · 30-second sample",
  caption,
  variant = "light",
  className = "",
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState(0);
  const [hasError, setHasError] = useState(false);

  const isDark = variant === "dark";
  const isPlaceholder = !src || hasError;

  // Magnetic play button + press scale
  const reduce = useReducedMotion();
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const ms = useMotionValue(1);
  const springX = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.6 });
  const springY = useSpring(my, { stiffness: 220, damping: 18, mass: 0.6 });
  const springS = useSpring(ms, { stiffness: 380, damping: 24, mass: 0.5 });

  const onBtnMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (reduce || !btnRef.current || isPlaceholder) return;
    const rect = btnRef.current.getBoundingClientRect();
    const cx = e.clientX - rect.left - rect.width / 2;
    const cy = e.clientY - rect.top - rect.height / 2;
    mx.set(Math.max(-1, Math.min(1, cx / (rect.width / 2))) * 8);
    my.set(Math.max(-1, Math.min(1, cy / (rect.height / 2))) * 8);
  };
  const onBtnLeave = () => {
    mx.set(0);
    my.set(0);
    ms.set(1);
  };

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onLoad = () => setDuration(a.duration || 0);
    const onTime = () => {
      setTime(a.currentTime);
      setProgress((a.currentTime / (a.duration || 1)) * 100);
    };
    const onEnd = () => setIsPlaying(false);
    const onErr = () => setHasError(true);
    a.addEventListener("loadedmetadata", onLoad);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("ended", onEnd);
    a.addEventListener("error", onErr);
    return () => {
      a.removeEventListener("loadedmetadata", onLoad);
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("ended", onEnd);
      a.removeEventListener("error", onErr);
    };
  }, [src]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a || isPlaceholder) return;
    if (isPlaying) {
      a.pause();
      setIsPlaying(false);
    } else {
      a.play()
        .then(() => setIsPlaying(true))
        .catch(() => setHasError(true));
    }
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current;
    if (!a || !duration || isPlaceholder) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    a.currentTime = ratio * duration;
  };

  const fmt = (s: number) => {
    if (!isFinite(s) || s < 0) return "0:00";
    const m = Math.floor(s / 60);
    const r = Math.floor(s % 60);
    return `${m}:${r.toString().padStart(2, "0")}`;
  };

  const containerCls = isDark
    ? "border-bone/25 bg-ink/60"
    : "border-ink/20 bg-bone-soft/80";
  const fgText = isDark ? "text-bone" : "text-ink";
  const fgSoft = isDark ? "text-bone/70" : "text-ink/60";
  const grooveBg = isDark ? "bg-bone/15" : "bg-ink/15";
  const grooveFill = isDark ? "bg-earth" : "bg-earth";
  const btnBg = isDark
    ? "bg-bone text-ink hover:bg-earth hover:text-bone"
    : "bg-ink text-bone hover:bg-earth";

  return (
    <div
      className={`relative border ${containerCls} backdrop-blur-sm px-5 py-5 md:px-7 md:py-6 ${className}`}
    >
      {src && !hasError ? (
        <audio ref={audioRef} src={src} preload="metadata" />
      ) : null}

      {label ? (
        <p className={`tag ${isDark ? "text-bone/60" : "text-earth"} mb-4`}>
          {label}
        </p>
      ) : null}

      <div className="flex items-center gap-5">
        {/* Play / pause — magnetic + press scale */}
        <motion.button
          ref={btnRef}
          type="button"
          onClick={toggle}
          onMouseMove={onBtnMove}
          onMouseLeave={onBtnLeave}
          onMouseDown={() => !isPlaceholder && ms.set(0.92)}
          onMouseUp={() => ms.set(1)}
          aria-label={isPlaying ? "Pause" : "Play"}
          disabled={isPlaceholder}
          style={{
            x: springX,
            y: springY,
            scale: springS,
            willChange: "transform",
          }}
          className={`shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-colors duration-300 ${btnBg} ${
            isPlaceholder ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {isPlaying ? (
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
              <rect x="0" y="0" width="4" height="16" fill="currentColor" />
              <rect x="10" y="0" width="4" height="16" fill="currentColor" />
            </svg>
          ) : (
            <svg
              width="16"
              height="18"
              viewBox="0 0 16 18"
              fill="currentColor"
              style={{ marginLeft: 2 }}
            >
              <path d="M0 0 L16 9 L0 18 Z" />
            </svg>
          )}
        </motion.button>

        {/* Groove + waveform */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            {/* Faux waveform — 36 vertical bars, taller in middle */}
            <div className="flex-1 flex items-end gap-[2px] h-7">
              {Array.from({ length: 36 }).map((_, i) => {
                const baseH =
                  20 +
                  Math.abs(Math.sin(i * 0.7) * 60) +
                  (i % 5 === 0 ? 18 : 0);
                const playedThreshold = (progress / 100) * 36;
                const played = i < playedThreshold;
                // subtle live "breath" on the currently-playing bar
                const isHead = isPlaying && Math.abs(i - playedThreshold) < 1;
                return (
                  <motion.span
                    key={i}
                    className={`w-[3px] rounded-[1px] transition-colors duration-150 ${
                      played
                        ? grooveFill
                        : isDark
                          ? "bg-bone/25"
                          : "bg-ink/25"
                    }`}
                    initial={{ scaleY: 0.2, opacity: 0 }}
                    whileInView={{ scaleY: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      delay: i * 0.015,
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    animate={
                      isHead
                        ? { scaleY: [1, 1.25, 1] }
                        : undefined
                    }
                    style={{
                      height: `${Math.min(100, baseH)}%`,
                      transformOrigin: "bottom",
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Click-to-seek thin groove under waveform */}
          <div
            onClick={seek}
            className={`relative h-[2px] ${grooveBg} ${
              isPlaceholder ? "" : "cursor-pointer"
            }`}
          >
            <motion.div
              className={`absolute inset-y-0 left-0 ${grooveFill}`}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 160, damping: 24, mass: 0.5 }}
            />
          </div>

          <div
            className={`mt-3 flex items-center justify-between gap-4 tag ${fgSoft}`}
          >
            <span className={fgText}>
              {isPlaceholder ? "0:30" : fmt(time)}
            </span>
            <span>{isPlaceholder ? "Sample · uploading shortly" : caption ?? ""}</span>
            <span>{isPlaceholder ? "0:30" : fmt(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
