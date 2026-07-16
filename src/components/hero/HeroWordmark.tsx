"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useHeroCapability } from "./useHeroCapability";

/**
 * The masthead reveal — top ornament, kicker, GRIM, divider,
 * WOVEN WEAR, bottom ornament — staged as one weighted sequence
 * rather than a fade-in. Mirrors the motion principles: slow,
 * expo-out easing, nothing bouncy. Respects prefers-reduced-motion
 * by snapping straight to the resting state.
 *
 * reducedMotion comes from the shared useHeroCapability hook (also used
 * by HeroCanvas) rather than a local matchMedia check, so both pieces of
 * the hero agree on motion intensity from one source of truth.
 */
export function HeroWordmark() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { ready, reducedMotion } = useHeroCapability();
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (!rootRef.current) return;
    // Wait for capability detection to resolve, and only ever run the
    // one-time entrance sequence once — a later reduced-motion toggle
    // (e.g. the user changes the OS setting mid-visit) shouldn't replay
    // or reverse an entrance that already happened.
    if (!ready || hasRunRef.current) return;
    hasRunRef.current = true;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set("[data-reveal]", { opacity: 1, y: 0, scaleX: 1, filter: "blur(0px)" });
        return;
      }

      gsap.set("[data-reveal='rule']", { transformOrigin: "center" });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        "[data-reveal='rule-top']",
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 0.5, duration: 0.9, ease: "expo.out" }
      )
        .fromTo(
          "[data-reveal='kicker']",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.45"
        )
        .fromTo(
          "[data-reveal='wordmark']",
          // opacity starts at 0.001, not 0 — an element at opacity 0 is
          // excluded from LCP candidacy entirely, so fading in from true
          // zero pushes the recorded LCP timestamp all the way to when
          // this tween finishes instead of first paint. 0.001 is visually
          // indistinguishable but keeps the element LCP-eligible from the
          // start.
          { opacity: 0.001, y: 32, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "expo.out" },
          "-=0.2"
        )
        .fromTo(
          "[data-reveal='divider']",
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 0.6, duration: 0.7 },
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
          { scaleX: 1, opacity: 0.5, duration: 0.9 },
          "-=0.6"
        );
    }, rootRef);

    return () => ctx.revert();
  }, [ready, reducedMotion]);

  return (
    <div
      ref={rootRef}
      className="flex select-none flex-col items-center"
    >
      {/* Top ornament */}
      <div
        data-reveal="rule-top"
        className="mb-6 flex items-center gap-3 md:mb-8"
      >
        <span className="h-px w-14 bg-brass opacity-50 md:w-16" />
        <span className="h-1 w-1 rotate-45 bg-brass opacity-80" />
        <span className="h-px w-14 bg-brass opacity-50 md:w-16" />
      </div>

      {/* Issue label — kicker */}
      <p
        data-reveal="kicker"
        className="mb-1 font-body text-xs font-semibold tracking-widest text-brass uppercase md:mb-2"
        style={{ letterSpacing: "0.3em" }}
      >
        Est. MMXXVI
      </p>

      {/* GRIM — hero display word */}
      <h1
        data-reveal="wordmark"
        className="text-parchment"
        style={{
          fontFamily: "'AncientGeek', serif",
          fontSize: "clamp(84px, 15vw, 160px)",
          fontWeight: 400,
          lineHeight: 0.9,
          letterSpacing: "0.08em",
          margin: 0,
        }}
      >
        Grim
      </h1>

      {/* Divider rule with diamond */}
      <div
        data-reveal="divider"
        className="my-1 flex items-center gap-3 md:my-2"
      >
        <span className="h-px w-20 bg-brass opacity-60" />
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <rect
            x="4"
            y="0"
            width="5.66"
            height="5.66"
            transform="rotate(45 4 0)"
            fill="#b08d57"
            opacity="0.9"
          />
        </svg>
        <span className="h-px w-20 bg-brass opacity-60" />
      </div>

      {/* WOVEN WEAR — spaced sans beneath */}
      <p
        data-reveal="subtitle"
        className="font-body text-parchment-dim uppercase"
        style={{
          fontSize: "clamp(11px, 1.5vw, 14px)",
          fontWeight: 500,
          letterSpacing: "0.45em",
          margin: 0,
        }}
      >
        Woven Wear
      </p>

      {/* Bottom ornament */}
      <div
        data-reveal="rule-bottom"
        className="mt-6 flex items-center gap-3 md:mt-8"
      >
        <span className="h-px w-14 bg-brass opacity-50 md:w-16" />
        <span className="h-1 w-1 rotate-45 bg-brass opacity-80" />
        <span className="h-px w-14 bg-brass opacity-50 md:w-16" />
      </div>
    </div>
  );
}
