"use client";

import { useEffect, useState } from "react";

/**
 * How much of the hero experience a visitor's device/preferences can
 * support:
 *  - "full"   full 3D centerpiece + ambient motion
 *  - "lite"   3D retained but motion-reduced (fewer particles, no idle
 *             animation) — used for reduced-motion or modest hardware
 *  - "static" no live WebGL canvas at all — a static fallback should be
 *             rendered instead (introduced in a later phase; for now
 *             HeroCanvas simply declines to mount)
 */
export type HeroCapabilityTier = "full" | "lite" | "static";

export interface HeroCapability {
  /** false during the SSR/first-paint pass, true once client checks have run */
  ready: boolean;
  /** OS/browser-level reduced-motion preference */
  reducedMotion: boolean;
  /** Save-Data header or a slow effective connection type */
  reducedData: boolean;
  /** whether a WebGL context can be created at all */
  webglSupported: boolean;
  /** coarse, best-effort low-end signal from cores/memory — never used alone */
  isLowEndDevice: boolean;
  /** the single tier consumers should render at */
  tier: HeroCapabilityTier;
}

const DEFAULT_CAPABILITY: HeroCapability = {
  ready: false,
  reducedMotion: false,
  reducedData: false,
  webglSupported: true,
  isLowEndDevice: false,
  tier: "full",
};

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

function detectLowEndDevice(): boolean {
  if (typeof navigator === "undefined") return false;

  // deviceMemory/hardwareConcurrency are coarse, best-effort signals with
  // patchy browser support — absence of either should never itself imply
  // "low end," only require both when present.
  const memory = (navigator as Navigator & { deviceMemory?: number })
    .deviceMemory;
  const cores = navigator.hardwareConcurrency;

  const lowMemory = typeof memory === "number" && memory <= 4;
  const lowCores = typeof cores === "number" && cores <= 4;

  return lowMemory && lowCores;
}

function detectReducedData(): boolean {
  if (typeof navigator === "undefined") return false;

  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;

  if (!connection) return false;
  if (connection.saveData) return true;
  return (
    connection.effectiveType === "slow-2g" || connection.effectiveType === "2g"
  );
}

function computeTier(input: {
  reducedMotion: boolean;
  reducedData: boolean;
  webglSupported: boolean;
  isLowEndDevice: boolean;
}): HeroCapabilityTier {
  if (!input.webglSupported || input.reducedData) return "static";
  if (input.reducedMotion || input.isLowEndDevice) return "lite";
  return "full";
}

/**
 * Single source of truth for hero animation/rendering intensity.
 *
 * HeroCanvas and HeroWordmark both key their motion off this hook instead
 * of running their own independent `matchMedia` checks, so their pacing
 * stays in sync and any future hero element (e.g. HeroCenterpiece) has one
 * place to plug into rather than a third copy of the same detection logic.
 *
 * `ready` is false until client-side checks resolve. Consumers that want to
 * avoid a flash of full-motion content before detection completes should
 * treat "not ready" the same as the reduced-motion case.
 */
export function useHeroCapability(): HeroCapability {
  const [capability, setCapability] = useState<HeroCapability>(
    DEFAULT_CAPABILITY
  );

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const recompute = () => {
      const reducedMotion = motionQuery.matches;
      const reducedData = detectReducedData();
      const webglSupported = detectWebGL();
      const isLowEndDevice = detectLowEndDevice();

      setCapability({
        ready: true,
        reducedMotion,
        reducedData,
        webglSupported,
        isLowEndDevice,
        tier: computeTier({
          reducedMotion,
          reducedData,
          webglSupported,
          isLowEndDevice,
        }),
      });
    };

    recompute();

    motionQuery.addEventListener("change", recompute);
    return () => motionQuery.removeEventListener("change", recompute);
  }, []);

  return capability;
}