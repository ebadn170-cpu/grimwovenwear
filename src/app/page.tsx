import { HeroSection } from "@/components/hero/HeroSection";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-ink">
      <HeroSection />
      
      {/* Other sections would go here */}
      <div className="h-screen bg-ink" />
    </main>
  );
}