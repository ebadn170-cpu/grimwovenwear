"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useMouseParallax } from "../../hooks/useMouseParallax";

/**
 * ThornCenterpiece component
 * Renders the vectorized thorn SVG and applies GSAP animations for breathing and parallax.
 */
export function ThornCenterpiece() {
  const svgRef = useRef<SVGSVGElement>(null);
  const mousePos = useMouseParallax();

  useEffect(() => {
    if (svgRef.current) {
      gsap.to(svgRef.current, {
        x: mousePos.x * 15,
        y: mousePos.y * 15,
        duration: 1.2,
        ease: "power2.out",
      });
    }
  }, [mousePos]);

  useEffect(() => {
    if (!svgRef.current) return;

    const paths = svgRef.current.querySelectorAll("path");
    
    // Breathing animation
    gsap.to(paths, {
      y: "random(-8, 8)",
      rotation: "random(-1.5, 1.5)",
      duration: "random(4, 6)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        amount: 2.5,
        from: "random",
      },
    });

    // Initial entrance
    gsap.fromTo(
      svgRef.current,
      { opacity: 0, scale: 0.85 },
      { opacity: 0.85, scale: 1, duration: 2.5, ease: "expo.out" }
    );
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center overflow-hidden">
      <svg
        ref={svgRef}
        viewBox="0 0 2048 751"
        className="w-[140%] max-w-none opacity-0 sm:w-[120%] md:w-[100%] lg:w-[90%]"
        style={{ 
          filter: "drop-shadow(0 12px 40px rgba(0, 0, 0, 0.7))",
        }}
      >
        {/* Simplified paths for the component - in a real scenario, we'd include all paths or a optimized set */}
        {/* For now, we'll use a placeholder or a few key paths to maintain performance and readability */}
        <g transform="translate(0, 0)">
           <image href="/thornpng.svg" width="2048" height="751" />
        </g>
      </svg>
    </div>
  );
}
