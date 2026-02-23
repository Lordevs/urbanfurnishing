import AboutHeroSection from "@/components/about/about-hero-section";
import OurValues from "@/components/about/our-values";

export default function About() {
  return (
    <main className="flex min-h-screen flex-col">
      <AboutHeroSection />
      <OurValues />
    </main>
  );
}
