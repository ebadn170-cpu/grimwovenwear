"use client";

/**
 * HeroFooterRow component
 * Social icons, scroll cue, and enter atelier link.
 */
export function HeroFooterRow() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 flex items-end justify-between px-4 py-6 md:px-8 lg:px-12 lg:py-8">
      {/* Social Icons */}
      <div className="flex gap-8">
        {["IG", "FB", "PIN", "X"].map((social) => (
          <button 
            key={social} 
            className="text-[9px] font-medium tracking-[0.4em] uppercase text-parchment/40 transition-all duration-500 hover:text-parchment"
          >
            {social}
          </button>
        ))}
      </div>

      {/* Scroll Cue */}
      <div className="flex flex-col items-center gap-4">
        <span className="text-[9px] font-medium tracking-[0.5em] uppercase text-parchment/40">
          Scroll
        </span>
        <div className="relative flex flex-col items-center">
          <div className="h-12 w-px bg-gradient-to-b from-parchment/40 via-parchment/20 to-transparent" />
          <div className="absolute bottom-0 h-1.5 w-1.5 rotate-45 border-b border-r border-parchment/40" />
        </div>
      </div>

      {/* Enter Atelier */}
      <button className="group flex items-center gap-4">
        <span className="text-[9px] font-semibold tracking-[0.4em] uppercase text-parchment/80 transition-all duration-500 group-hover:text-parchment">
          Enter Atelier
        </span>
        <div className="relative flex items-center">
          <div className="h-px w-12 bg-parchment/30 transition-all duration-500 group-hover:w-16 group-hover:bg-parchment/60" />
          <div className="absolute right-0 h-1.5 w-1.5 rotate-45 border-t border-r border-parchment/40 transition-all duration-500 group-hover:border-parchment/80" />
        </div>
      </button>
    </div>
  );
}
