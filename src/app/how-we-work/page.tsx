import DynamicHero from "@/components/common/dynamic-hero";
import StepOdd from "@/components/how-we-work/steps/stepodd";
import Stepeven from "@/components/how-we-work/steps/stepeven";
import OurCommitment from "@/components/how-we-work/our-commitment";
import CtaSection from "@/components/common/cta-section";

export default function HowWeWork() {
  return (
    <main className="flex min-h-screen flex-col">
      <DynamicHero
        badgeText="OUR PROCESS"
        title="How We Work"
        description={
          <>
            A simple, structured process designed for clarity and
            <br className="hidden sm:block" /> accountability. From consultation
            to completion, you&apos;ll always know
            <br className="hidden sm:block" /> what to expect.
          </>
        }
      />
      <StepOdd
        stepNumber="01"
        title="Consultation & Package Selection"
        description="We begin with a detailed consultation to understand your property type, timeline, and intended use. Based on your needs, we recommend the most suitable package pathway."
        imageSrc="/how-we-work/consultation-package-selection.webp"
        imageAlt="Consultation & Package Selection"
        features={[
          "Initial property assessment",
          "Budget discussion",
          "Timeline confirmation",
          "Package recommendation",
        ]}
      />
      <Stepeven
        stepNumber="02"
        title="Scope Confirmation & Timeline"
        description="Everything is documented upfront with clear deliverables, milestones, and pricing. You will know exactly what to expect at every stage."
        imageSrc="/how-we-work/scope-confirmation-timeline.webp"
        imageAlt="Scope Confirmation & Timeline"
        features={[
          "Detailed scope document",
          "Design presentation",
          "Fixed pricing agreement",
          "Project timeline with milestones",
        ]}
      />
      <StepOdd
        stepNumber="03"
        title="Procurement & Installation"
        description="Our dedicated site lead manages all procurement, delivery coordination, and installation. You have one point of contact throughout the entire process."
        imageSrc="/how-we-work/procurement-installation.webp"
        imageAlt="Procurement & Installation"
        features={[
          "Quality-controlled procurement",
          "Coordinated delivery schedule",
          "Professional installation",
          "Regular progress updates",
        ]}
      />
      <Stepeven
        stepNumber="04"
        title="Handover & Support"
        description="Final walkthrough and handover of your fully furnished property. Our responsibility doesn't end at installation—we provide post-handover support."
        imageSrc="/how-we-work/handover-support.webp"
        imageAlt="Handover & Support"
        features={[
          "Complete property walkthrough",
          "Documentation handover",
          "Care & maintenance guidelines",
          "Post-handover support period",
        ]}
      />
      <OurCommitment />
      <CtaSection />
    </main>
  );
}
