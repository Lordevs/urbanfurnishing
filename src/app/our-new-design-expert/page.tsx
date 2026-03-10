import CTA from "@/components/common/cta";
import HowWeWork from "@/components/common/how-we-work";
import SignatureDesign from "@/components/common/signature-design";
import Testimonial from "@/components/common/testimonial";
import OurDesignExpertHero from "@/components/our-new-design-expert/our-new-design-expert-hero";

export default function OurDesignExpertPage() {
  return (
    <main className="min-h-screen">
      <OurDesignExpertHero />
      <SignatureDesign />
      <HowWeWork />
      <Testimonial />
      <CTA />
    </main>
  );
}
