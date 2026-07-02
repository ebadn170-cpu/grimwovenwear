"use client";

import { HeroBackground } from "./HeroBackground";
import { HeroCanvas } from "./HeroCanvas";
import { ThornCenterpiece } from "./ThornCenterpiece";
import { HeroWordmark } from "./HeroWordmark";
import { HeroNav } from "./HeroNav";
import { HeroSideLabels } from "./HeroSideLabels";
import { HeroFooterRow } from "./HeroFooterRow";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * HeroSection component
 * Orchestrates all hero sub-components.
 */
export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    tl.to(containerRef.current, {
      scale: 0.96,
      opacity: 0.5,
      ease: "none",
    });
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden">
      <HeroBackground />
      <HeroCanvas />
      <ThornCenterpiece />
      
      <div className="relative z-10 flex h-full items-center justify-center">
        <HeroWordmark />
      </div>

      <HeroNav />
      <HeroSideLabels />
      <HeroFooterRow />
    </section>
  );
}
