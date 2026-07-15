"use client";

import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { useHeroCapability } from "./useHeroCapability";
import { HeroCanvasBoundary } from "./HeroCanvasBoundary";

/**
 * Quiet backdrop shown when WebGL isn't available (hardware acceleration
 * disabled, GPU-less VM/RDP session, sandboxed browser, etc.) or the
 * visitor has asked for reduced data. Keeps the ink/vignette atmosphere
 * without ever attempting a WebGL context. This is a deliberately minimal
 * placeholder — a fuller art-directed static frame is planned for a later
 * phase (see roadmap §10/§12), not skipped, just sequenced after the 3D
 * centerpiece itself exists.
 */
function HeroCanvasFallback() {
  return (
    <div
      className="absolute inset-0 z-0"
      aria-hidden="true"
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(176,141,87,0.08) 0%, rgba(11,10,12,0) 60%)",
      }}
    />
  );
}

/**
 * Ambient 3D backdrop for the hero.
 *
 * Two layers of drifting motes — brass (foreground, warmer, faster)
 * and oxblood (background, dimmer, slower) — read as candlelit dust
 * suspended in an old archive rather than a generic particle field.
 * Speed collapses to near-zero under prefers-reduced-motion.
 *
 * Rendering intensity is driven entirely by `useHeroCapability`:
 *  - "static" (no WebGL / reduced data): the Canvas never mounts at all,
 *    avoiding the WebGLRenderer context-creation error that would
 *    otherwise surface on unsupported devices.
 *  - "lite" (reduced motion / modest hardware): Canvas mounts, motion
 *    collapses to near-static.
 *  - "full": normal ambient drift.
 */
export function HeroCanvas() {
  const { ready, reducedMotion, tier } = useHeroCapability();

  // Before client-side detection resolves, render nothing rather than
  // guessing — avoids a flash of a Canvas that's about to be torn down.
  if (!ready) return null;

  if (tier === "static") {
    return <HeroCanvasFallback />;
  }

  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <HeroCanvasBoundary fallback={<HeroCanvasFallback />}>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, failIfMajorPerformanceCaveat: false }}
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
      </HeroCanvasBoundary>
    </div>
  );
}