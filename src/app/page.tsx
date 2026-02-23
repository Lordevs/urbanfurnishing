import HeroSection from "@/components/home/hero-section";
import WhoWeWorkWith from "@/components/home/who-we-work-with";
import OurPackages from "@/components/home/our-packages";
import InteriorDetail from "@/components/home/interior-detail";
import OurProcess from "@/components/home/our-process";
import CtaSection from "@/components/common/cta-section";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <WhoWeWorkWith />
      <OurPackages />
      <InteriorDetail />
      <OurProcess />
      <CtaSection />
    </main>
  );
}
