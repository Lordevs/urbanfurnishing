import CTA from "@/components/common/cta";
import HowWeWork from "@/components/common/how-we-work";
import SignatureDesign from "@/components/common/signature-design";
import HomeHero from "@/components/home/home-hero";
import Packages from "@/components/home/packages";
import PathwayNav from "@/components/home/pathway-nav";
import Services from "@/components/home/services";
import SingleItems from "@/components/home/single-items";

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
