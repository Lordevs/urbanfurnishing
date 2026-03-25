import CTA from "@/components/common/cta";
import HowWeWork from "@/components/common/how-we-work";
import SignatureDesign from "@/components/common/signature-design";
import HomeHero from "@/components/home/home-hero";
import Packages from "@/components/home/packages";
import PathwayNav from "@/components/home/pathway-nav";
import Services from "@/components/home/services";
import SingleItems from "@/components/home/single-items";
import Stats from "@/components/home/stats";
import OurClient from "@/components/our-client/our-client";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HomeHero />
      <Stats />
      <OurClient />
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
