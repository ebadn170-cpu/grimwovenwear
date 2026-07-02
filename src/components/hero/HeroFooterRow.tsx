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
            className="text-[8px] font-semibold tracking-[0.3em] uppercase text-parchment-ghost transition-all duration-300 hover:text-brass"
          >
            {social}
          </button>
        ))}
      </div>

      {/* Scroll Cue */}
      <div className="flex flex-col items-center gap-4">
        <span className="text-[8px] font-semibold tracking-[0.4em] uppercase text-parchment-ghost">
          Scroll
        </span>
        <div className="h-14 w-px bg-gradient-to-b from-brass via-brass to-transparent opacity-60" />
      </div>

      {/* Enter Atelier */}
      <button className="group flex items-center gap-3">
        <span className="text-[8px] font-semibold tracking-[0.3em] uppercase text-parchment transition-all duration-300 group-hover:text-brass">
          Enter Atelier
        </span>
        <div className="flex items-center gap-1">
          <div className="h-px w-10 bg-parchment transition-all duration-300 group-hover:w-14 group-hover:bg-brass" />
          <div className="h-2 w-2 rotate-45 border-t border-r border-parchment transition-all duration-300 group-hover:border-brass" />
        </div>
      </button>
    </div>
  );
}
