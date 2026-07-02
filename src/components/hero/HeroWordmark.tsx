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

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        "[data-reveal='rule-top']",
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 0.4, duration: 1.2, ease: "expo.out" }
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
        className="mb-6 flex items-center gap-4 md:mb-8"
      >
        <span className="h-px w-12 bg-brass opacity-30 md:w-16" />
        <span className="h-1 w-1 rotate-45 bg-brass opacity-60" />
        <span className="h-px w-12 bg-brass opacity-30 md:w-16" />
      </div>

      {/* Issue label — kicker */}
      <p
        data-reveal="kicker"
        className="mb-2 font-body text-[9px] font-semibold tracking-[0.4em] text-brass/80 uppercase md:mb-4"
      >
        Est. MMXXVI
      </p>

      {/* GRIM — hero display word */}
      <h1
        data-reveal="wordmark"
        className="text-parchment relative z-20 text-center"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(60px, 15vw, 180px)",
          fontWeight: 400,
          lineHeight: 0.8,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          margin: 0,
          textShadow: "0 0 40px rgba(0, 0, 0, 0.9), 0 0 80px rgba(0, 0, 0, 0.6)",
        }}
      >
        GR&phi;M
      </h1>

      {/* Divider rule with diamond */}
      <div
        data-reveal="divider"
        className="my-4 flex items-center gap-4 md:my-6"
      >
        <span className="h-px w-24 bg-brass opacity-25" />
        <div className="h-1 w-1 rotate-45 bg-brass opacity-60" />
        <span className="h-px w-24 bg-brass opacity-25" />
      </div>

      {/* WOVEN WEAR — spaced sans beneath */}
      <p
        data-reveal="subtitle"
        className="font-body text-parchment relative z-20 uppercase"
        style={{
          fontSize: "clamp(11px, 1.5vw, 14px)",
          fontWeight: 500,
          letterSpacing: "0.6em",
          margin: 0,
          textShadow: "0 0 20px rgba(0, 0, 0, 0.8)",
        }}
      >
        Woven Wear
      </p>

      {/* Bottom ornament */}
      <div
        data-reveal="rule-bottom"
        className="mt-6 flex items-center gap-4 md:mt-8"
      >
        <span className="h-px w-12 bg-brass opacity-30 md:w-16" />
        <span className="h-1 w-1 rotate-45 bg-brass opacity-60" />
        <span className="h-px w-12 bg-brass opacity-30 md:w-16" />
      </div>
    </div>
  );
}
