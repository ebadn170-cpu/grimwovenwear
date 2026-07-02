"use client";

/**
 * HeroSideLabels component
 * Vertical labels on the sides of the hero section.
 */
export function HeroSideLabels() {
  return (
    <>
      {/* Left Labels */}
      <div className="pointer-events-none fixed bottom-1/2 left-4 z-20 hidden -translate-y-1/2 flex-col items-center gap-32 lg:left-6 lg:gap-40 md:flex">
        <div className="rotate-[-90deg] text-[8px] font-semibold tracking-[0.4em] uppercase text-parchment-ghost opacity-70 transition-opacity duration-300 hover:opacity-100">
          Black Label
        </div>
        <div className="h-16 w-px bg-brass opacity-25" />
        <div className="rotate-[-90deg] text-[8px] font-semibold tracking-[0.4em] uppercase text-parchment-ghost opacity-70 transition-opacity duration-300 hover:opacity-100">
          Vol. VII
        </div>
      </div>

      {/* Right Labels */}
      <div className="pointer-events-none fixed bottom-1/2 right-4 z-20 hidden -translate-y-1/2 flex-col items-center gap-32 lg:right-6 lg:gap-40 md:flex">
        <div className="rotate-[90deg] text-[8px] font-semibold tracking-[0.4em] uppercase text-parchment-ghost opacity-70 transition-opacity duration-300 hover:opacity-100">
          Runway Collection
        </div>
        <div className="h-16 w-px bg-brass opacity-25" />
        <div className="rotate-[90deg] text-[8px] font-semibold tracking-[0.4em] uppercase text-parchment-ghost opacity-70 transition-opacity duration-300 hover:opacity-100">
          FW26
        </div>
      </div>
    </>
  );
}
