import CTA from "@/components/common/cta";
import HowWeWork from "@/components/common/how-we-work";
import SignatureDesign from "@/components/common/signature-design";
import Testimonial from "@/components/common/testimonial";
import DesignDirection from "@/components/our-new-design-expert/design-direction";
import DesignServiceSession from "@/components/our-new-design-expert/design-service-session";
import OurDesignExpertHero from "@/components/our-new-design-expert/our-new-design-expert-hero";
import ServiceLevels from "@/components/our-new-design-expert/service-levels";

export default function OurDesignExpertPage() {
  return (
    <main className="min-h-screen">
      <OurDesignExpertHero />
      <SignatureDesign />
      <HowWeWork />
      <DesignDirection />
      <ServiceLevels />
      <DesignServiceSession />
      <Testimonial />
      <CTA />
    </main>
  );
}
