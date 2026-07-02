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
      <div className="text-[9px] font-semibold tracking-[0.35em] uppercase text-parchment">
        GrimWovenWear
      </div>
      
      {/* Navigation Links */}
      <div className="hidden items-center gap-10 md:flex">
        {["Collection", "Atelier", "Journal", "Archive", "Contact"].map((item) => (
          <Link 
            key={item} 
            href={`/${item.toLowerCase()}`}
            className="text-[9px] font-medium tracking-[0.25em] uppercase text-parchment-ghost transition-all duration-300 hover:text-brass"
          >
            {item}
          </Link>
        ))}
      </div>

      {/* Cart and Menu */}
      <div className="flex items-center gap-8">
        <button className="text-[9px] font-semibold tracking-[0.25em] uppercase text-parchment-ghost transition-all duration-300 hover:text-brass">
          Cart (0)
        </button>
        <button className="flex h-6 w-6 flex-col items-center justify-center gap-1.5 transition-all duration-300 hover:gap-2">
          <span className="h-px w-5 bg-parchment transition-all duration-300" />
          <span className="h-px w-4 bg-parchment transition-all duration-300" />
          <span className="h-px w-3 bg-parchment transition-all duration-300" />
        </button>
      </div>
    </nav>
  );
}
