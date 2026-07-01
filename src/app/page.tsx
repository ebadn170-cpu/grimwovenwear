import { HeroCanvas } from "@/components/hero/HeroCanvas";
import { HeroWordmark } from "@/components/hero/HeroWordmark";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-ink">
      {/* Ambient 3D ember field */}
      <HeroCanvas />

      {/* Vignette — keeps the wordmark legible over the particle field */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, var(--color-ink) 88%)",
        }}
      />

      {/* Hero content — generous vertical breathing room top & bottom */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-24 md:py-32 lg:py-48">
        <HeroWordmark />
      </section>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-3 md:bottom-10">
        <span
          className="font-body text-parchment-ghost uppercase"
          style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.3em" }}
        >
          Scroll
        </span>
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-brass to-transparent" />
      </div>
    </main>
  );
}