import HeroSection from "@/components/home/hero-section";
import WhoWeWorkWith from "@/components/home/who-we-work-with";
import OurPackages from "@/components/home/our-packages";
import TextOverlayBanner from "@/components/common/text-overlay-banner";
import OurProcess from "@/components/home/our-process";
import SignatureDesign from "@/components/home/signature-design";
import CtaSection from "@/components/common/cta-section";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <WhoWeWorkWith />
      <OurPackages />
      <TextOverlayBanner
        imageSrc="/home/Interior-detail.webp"
        text={
          <>
            Delivered on time. <br />
            Priced clearly. <br />
            Managed end-to-end.
          </>
        }
      />
      <OurProcess />
      <SignatureDesign />
      <CtaSection />
    </main>
  );
}
