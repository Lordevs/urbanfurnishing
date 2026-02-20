import HeroSection from "@/components/hero-section";
import WhoWeWorkWith from "@/components/who-we-work-with";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <WhoWeWorkWith />
    </main>
  );
}
