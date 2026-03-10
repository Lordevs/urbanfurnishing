import HomeHero from "@/components/home/home-hero";
import Services from "@/components/home/services";
import PathwayNav from "@/components/home/pathway-nav";
import Packages from "@/components/home/packages";
import SingleItems from "@/components/home/single-items";
import HowWeWork from "@/components/common/how-we-work";
import CTA from "@/components/common/cta";
import SignatureDesign from "@/components/common/signature-design";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HomeHero />
      <Services />
      <PathwayNav />
      <Packages />
      <SingleItems />
      <SignatureDesign />
      <HowWeWork />
      <CTA />
    </main>
  );
}
