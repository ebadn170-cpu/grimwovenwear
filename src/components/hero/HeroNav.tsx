"use client";

import Link from "next/link";

/**
 * HeroNav component
 * Floating navbar with logo, links, and cart/menu.
 */
export function HeroNav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-6 md:px-8 lg:px-12 lg:py-8">
      {/* Logo */}
      <div className="text-[10px] font-semibold tracking-[0.4em] uppercase text-parchment/90">
        GrimWovenWear
      </div>
      
      {/* Navigation Links */}
      <div className="hidden items-center gap-10 md:flex">
        {["Collection", "Atelier", "Journal", "Archive", "Contact"].map((item) => (
          <Link 
            key={item} 
            href={`/${item.toLowerCase()}`}
            className="text-[9px] font-medium tracking-[0.35em] uppercase text-parchment/50 transition-all duration-500 hover:text-parchment hover:tracking-[0.45em]"
          >
            {item}
          </Link>
        ))}
      </div>

      {/* Cart and Menu */}
      <div className="flex items-center gap-8">
        <button className="text-[9px] font-semibold tracking-[0.3em] uppercase text-parchment/50 transition-all duration-500 hover:text-parchment">
          Cart (0)
        </button>
        <div className="flex items-center justify-center border border-parchment/20 rounded-full w-8 h-8 group cursor-pointer transition-all duration-500 hover:border-parchment/40">
          <button className="flex flex-col items-center justify-center gap-1.5">
            <span className="h-px w-4 bg-parchment/80 transition-all duration-300 group-hover:w-5" />
            <span className="h-px w-4 bg-parchment/80 transition-all duration-300 group-hover:w-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}
