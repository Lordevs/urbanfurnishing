import HeroSection from "@/components/home/hero-section";
import HomeContent from "@/components/home/home-content";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <HomeContent />
    </main>
  );
}
