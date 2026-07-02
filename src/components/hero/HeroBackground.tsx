"use client";

/**
 * HeroBackground component
 * Provides the deep black background with volumetric light beams, grain overlay, and vignette.
 */
export function HeroBackground() {
  return (
    <div className="absolute inset-0 z-[-1] bg-black overflow-hidden">
      {/* Dramatic Top-Down Cinematic Lighting (Volumetric Rays) */}
      <div 
        className="absolute inset-0 opacity-80"
        style={{
          background: `
            radial-gradient(ellipse 1000px 1500px at 50% -30%, rgba(255, 255, 255, 0.2) 0%, transparent 70%),
            radial-gradient(ellipse 500px 800px at 50% -10%, rgba(255, 255, 255, 0.15) 0%, transparent 60%)
          `
        }}
      />
      
      {/* Sharp God Rays — Narrow, vertical gradients to simulate sharp beams */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.15) 42%, rgba(255, 255, 255, 0.15) 43%, transparent 45%),
            linear-gradient(90deg, transparent 48%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.2) 51%, transparent 53%),
            linear-gradient(75deg, transparent 55%, rgba(255, 255, 255, 0.15) 57%, rgba(255, 255, 255, 0.15) 58%, transparent 60%)
          `,
          filter: 'blur(40px)'
        }}
      />
      
      {/* Atmospheric Glow Overlay */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 50%)
          `
        }}
      />
      
      {/* Atmospheric Depth Layer — Darker bottom to ground the scene */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.8) 100%)
          `
        }}
      />

      {/* Grain Overlay — Subtle film texture */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' fill='%23ffffff'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Central Spot — Highlights the wordmark area for legibility */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, rgba(25, 25, 25, 0.4) 0%, transparent 60%)
          `
        }}
      />

      {/* Heavy Vignette — Focuses attention on the center and hides any edge artifacts */}
      <div 
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at center, transparent 10%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 1) 100%)
          `
        }}
      />
    </div>
  );
}
