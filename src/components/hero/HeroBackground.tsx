"use client";

/**
 * HeroBackground component
 * Provides the deep black background with volumetric light beams, grain overlay, and vignette.
 */
export function HeroBackground() {
  return (
    <div className="absolute inset-0 z-[-1] bg-[#050505]">
      {/* Volumetric Light Beams — Subtle brass glow from top */}
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          background: `
            radial-gradient(ellipse 800px 400px at 50% -10%, rgba(198, 161, 91, 0.12) 0%, transparent 60%),
            radial-gradient(ellipse 600px 300px at 50% 120%, rgba(198, 161, 91, 0.08) 0%, transparent 50%)
          `
        }}
      />
      
      {/* Atmospheric Depth Layer */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `
            linear-gradient(180deg, rgba(15, 15, 15, 0) 0%, rgba(5, 5, 5, 0.3) 100%)
          `
        }}
      />

      {/* Grain Overlay — Subtle texture */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' fill='%23ffffff'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette — Elegant edge darkening */}
      <div 
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at center, transparent 20%, rgba(5, 5, 5, 0.4) 70%, rgba(5, 5, 5, 0.8) 100%)
          `
        }}
      />

      {/* Corner Shadows — Adds depth */}
      <div 
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, transparent 40%),
            linear-gradient(-135deg, rgba(0, 0, 0, 0.3) 0%, transparent 40%)
          `
        }}
      />
    </div>
  );
}
