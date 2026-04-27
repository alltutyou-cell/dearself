"use client";

import { useEffect, useState } from "react";

export function StickyMobileCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!show}
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 transition-transform duration-500 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-ink/95 backdrop-blur-sm border-t border-bone/10 px-4 py-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="tag text-bone/60 leading-tight">100 seats · $59</p>
          <p className="text-bone text-sm leading-tight truncate">
            Lifetime · 30-day refund
          </p>
        </div>
        <a
          href="#offer"
          className="shrink-0 bg-bone text-ink px-5 py-3 text-[0.7rem] tracking-[0.18em] uppercase hover:bg-earth hover:text-bone transition-colors duration-300"
        >
          Claim spot
        </a>
      </div>
    </div>
  );
}
