"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * The masthead reveal — top ornament, kicker, GRIM, divider,
 * WOVEN WEAR, bottom ornament — staged as one weighted sequence
 * rather than a fade-in. Mirrors the motion principles: slow,
 * expo-out easing, nothing bouncy. Respects prefers-reduced-motion
 * by snapping straight to the resting state.
 */
export function HeroWordmark() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set("[data-reveal]", { opacity: 1, y: 0, scaleX: 1, filter: "blur(0px)" });
        return;
      }

      gsap.set("[data-reveal='rule']", { transformOrigin: "center" });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        "[data-reveal='rule-top']",
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 0.4, duration: 0.9, ease: "expo.out" }
      )
        .fromTo(
          "[data-reveal='kicker']",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.45"
        )
        .fromTo(
          "[data-reveal='wordmark']",
          { opacity: 0, y: 32, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "expo.out" },
          "-=0.2"
        )
        .fromTo(
          "[data-reveal='divider']",
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 0.5, duration: 0.7 },
          "-=0.55"
        )
        .fromTo(
          "[data-reveal='subtitle']",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.35"
        )
        .fromTo(
          "[data-reveal='rule-bottom']",
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 0.4, duration: 0.9 },
          "-=0.6"
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="flex select-none flex-col items-center"
    >
      {/* Top ornament */}
      <div
        data-reveal="rule-top"
        className="mb-8 flex items-center gap-4 md:mb-10"
      >
        <span className="h-px w-16 bg-brass opacity-40 md:w-20" />
        <span className="h-1.5 w-1.5 rotate-45 bg-brass opacity-70" />
        <span className="h-px w-16 bg-brass opacity-40 md:w-20" />
      </div>

      {/* Issue label — kicker */}
      <p
        data-reveal="kicker"
        className="mb-2 font-body text-[10px] font-semibold tracking-[0.35em] text-brass uppercase md:mb-3"
      >
        Est. MMXXVI
      </p>

      {/* GRIM — hero display word */}
      <h1
        data-reveal="wordmark"
        className="text-parchment"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(90px, 14vw, 160px)",
          fontWeight: 400,
          lineHeight: 0.75,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          margin: 0,
          textShadow: "0 8px 24px rgba(0, 0, 0, 0.6)",
        }}
      >
        Gr&phi;m
      </h1>

      {/* Divider rule with diamond */}
      <div
        data-reveal="divider"
        className="my-3 flex items-center gap-4 md:my-4"
      >
        <span className="h-px w-28 bg-brass opacity-35" />
        <div className="h-1.5 w-1.5 rotate-45 bg-brass opacity-70" />
        <span className="h-px w-28 bg-brass opacity-35" />
      </div>

      {/* WOVEN WEAR — spaced sans beneath */}
      <p
        data-reveal="subtitle"
        className="font-body text-parchment-dim uppercase"
        style={{
          fontSize: "clamp(12px, 1.8vw, 16px)",
          fontWeight: 400,
          letterSpacing: "0.5em",
          margin: 0,
        }}
      >
        Woven Wear
      </p>

      {/* Bottom ornament */}
      <div
        data-reveal="rule-bottom"
        className="mt-8 flex items-center gap-4 md:mt-10"
      >
        <span className="h-px w-16 bg-brass opacity-40 md:w-20" />
        <span className="h-1.5 w-1.5 rotate-45 bg-brass opacity-70" />
        <span className="h-px w-16 bg-brass opacity-40 md:w-20" />
      </div>
    </div>
  );
}
