import AboutHeroSection from "@/components/about/about-hero-section";
import OurValues from "@/components/about/our-values";
import OurApproach from "@/components/about/our-approach";
import TextOverlayBanner from "@/components/common/text-overlay-banner";

export default function About() {
  return (
    <main className="flex min-h-screen flex-col">
      <AboutHeroSection />
      <OurValues />
      <OurApproach />
      <TextOverlayBanner
        imageSrc="/about/our-work.webp"
        text={
          <>
            Designed for investors, homeowners, and{" "}
            <br className="hidden md:block" />
            developers who value clarity and <br className="hidden md:block" />
            accountability
          </>
        }
      />
    </main>
  );
}
