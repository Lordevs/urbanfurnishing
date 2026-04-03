import CTA from "@/components/common/cta";
// import HowWeWork from "@/components/common/how-we-work";
import SignatureDesign from "@/components/common/signature-design";
import Testimonial from "@/components/common/testimonial";
import DesignDirection from "@/components/our-new-design-expert/design-direction";
// import DesignServiceSession from "@/components/our-new-design-expert/design-service-session";
import HowItWorksSteps from "@/components/our-new-design-expert/how-it-works-steps";
import IntroSection from "@/components/our-new-design-expert/intro-section";
import OurDesignExpertHero from "@/components/our-new-design-expert/our-new-design-expert-hero";
import { PartnersMarquee } from "@/components/our-new-design-expert/partners-marquee";
// import ServiceLevels from "@/components/our-new-design-expert/service-levels";
import TheDifference from "@/components/our-new-design-expert/the-difference";
import WhatIsIncluded from "@/components/our-new-design-expert/what-is-included";
import WhenToChoose from "@/components/our-new-design-expert/when-to-choose";
import WhoIsItFor from "@/components/our-new-design-expert/who-is-it-for";

export default function OurDesignExpertPage() {
  return (
    <main className="min-h-screen">
      <OurDesignExpertHero />
      <IntroSection />
      <SignatureDesign />
      <PartnersMarquee />
      {/* <HowWeWork /> */}
      <WhoIsItFor />
      <WhatIsIncluded />
      <DesignDirection />
      <TheDifference />
      <HowItWorksSteps />
      <WhenToChoose />
      {/* <ServiceLevels /> */}
      {/* <DesignServiceSession /> */}
      <Testimonial />
      <CTA
        title={
          <>
            Book a Design Call with{" "}
            <span className="text-secondary font-serif">Elena Falconer</span>
          </>
        }
        description="For clients who want a more refined result and a property that stands out from the first impression."
        buttonText="Book Consultation"
        mobileViewTitle={
          <>
            Book a Design Call with{" "}
            <span className="text-secondary font-serif">Elena Falconer</span>
          </>
        }
        mobileViewDescription="For clients who want a more refined result and a property that stands out from the first impression."
        mobileViewButtonText="Book Consultation"
      />
    </main>
  );
}
