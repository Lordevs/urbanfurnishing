import HowWeWorkHero from "@/components/how-we-work/how-we-work-hero";
import Step1 from "@/components/how-we-work/steps/step-1";

export default function HowWeWork() {
  return (
    <main className="flex min-h-screen flex-col">
      <HowWeWorkHero />
      <Step1 />
    </main>
  );
}
