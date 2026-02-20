import HeroSection from "@/components/hero-section";
import WhoWeWorkWith from "@/components/who-we-work-with";
import OurPackages from "@/components/our-packages";
import InteriorDetail from "@/components/interior-detail";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <WhoWeWorkWith />
      <OurPackages />
      <InteriorDetail />
    </main>
  );
}
