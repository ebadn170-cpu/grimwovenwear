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
        className="w-[180%] max-w-none opacity-0 sm:w-[150%] md:w-[120%] lg:w-[100%]"
        style={{ 
          filter: "drop-shadow(0 0 40px rgba(0,0,0,0.8))",
        }}
      >
        <defs>
          {/* Edge masking to prevent rectangular boundaries */}
          <mask id="masterThornMask">
            <rect width="2048" height="751" fill="url(#radialFade)" />
            <radialGradient id="radialFade" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="30%" stopColor="white" stopOpacity="0.5" />
              <stop offset="85%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="black" />
            </radialGradient>
          </mask>
          
          {/* Specific mask for the center to keep text clear */}
          <mask id="textProtectionMask">
            <rect width="2048" height="751" fill="white" />
            <radialGradient id="clearText" cx="50%" cy="50%" r="45%">
              <stop offset="0%" stopColor="black" stopOpacity="0.95" />
              <stop offset="60%" stopColor="black" stopOpacity="0.2" />
              <stop offset="100%" stopColor="white" />
            </radialGradient>
            <rect width="2048" height="751" fill="url(#clearText)" />
          </mask>
        </defs>
        
        <g mask="url(#masterThornMask)">
          <g mask="url(#textProtectionMask)">
             <image 
               href="/thornpng.svg" 
               width="2048" 
               height="751" 
               className="opacity-90"
               style={{ 
                 filter: "brightness(0.7) contrast(1.3) grayscale(0.1)",
               }} 
             />
          </g>
        </g>
      </svg>
    </div>
  );
}
