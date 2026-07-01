"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";

/**
 * Ambient 3D backdrop for the hero.
 *
 * Two layers of drifting motes — brass (foreground, warmer, faster)
 * and oxblood (background, dimmer, slower) — read as candlelit dust
 * suspended in an old archive rather than a generic particle field.
 * Speed collapses to near-zero under prefers-reduced-motion.
 */
export function HeroCanvas() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, []);

  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />

        <Sparkles
          count={110}
          scale={[10, 6, 4]}
          size={2.4}
          speed={reducedMotion ? 0 : 0.18}
          opacity={0.55}
          color="#b08d57"
          noise={1.2}
        />
        <Sparkles
          count={70}
          scale={[11, 7, 5]}
          size={1.4}
          speed={reducedMotion ? 0 : 0.08}
          opacity={0.28}
          color="#7a2223"
          noise={1.4}
        />
      </Canvas>
    </div>
  );
}