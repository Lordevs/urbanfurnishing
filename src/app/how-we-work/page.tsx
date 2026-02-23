import HowWeWorkHero from "@/components/how-we-work/how-we-work-hero";
import StepOdd from "@/components/how-we-work/steps/step-1&3";
import Step2 from "@/components/how-we-work/steps/step-2&4";

export default function HowWeWork() {
  return (
    <main className="flex min-h-screen flex-col">
      <HowWeWorkHero />
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
      <Step2 />
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
    </main>
  );
}
