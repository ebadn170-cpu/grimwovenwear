"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * React Three Fiber's <Canvas> throws (rather than rejects) when a WebGL
 * context can't be created — e.g. hardware acceleration disabled, running
 * inside a GPU-less VM/RDP session, or a sandboxed browser profile. That's
 * a real, fairly common environment condition, not a bug to fix away, so
 * the hero should degrade to `fallback` instead of taking the page down
 * with it. `useHeroCapability`'s `webglSupported` check catches the common
 * case ahead of time; this boundary is the backstop for whatever slips
 * past that pre-check (context creation can still fail even when a probe
 * canvas succeeded).
 */
export class HeroCanvasBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    // Known, expected failure mode — log quietly rather than as an
    // unhandled error so it doesn't read as a crash during development.
    console.warn(
      "HeroCanvas: WebGL context unavailable, falling back.",
      error
    );
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}