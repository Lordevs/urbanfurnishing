"use client";

import dynamic from "next/dynamic";

const WhoWeWorkWith = dynamic(
  () => import("@/components/home/who-we-work-with"),
  { ssr: false },
);
const OurPackages = dynamic(() => import("@/components/home/our-packages"), {
  ssr: false,
});
const TextOverlayBanner = dynamic(
  () => import("@/components/common/text-overlay-banner"),
  { ssr: false },
);
const OurProcess = dynamic(() => import("@/components/home/our-process"), {
  ssr: false,
});
const SignatureDesign = dynamic(
  () => import("@/components/home/signature-design"),
  { ssr: false },
);
const CtaSection = dynamic(() => import("@/components/common/cta-section"), {
  ssr: false,
});

export default function HomeContent() {
  return (
    <>
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
    </>
  );
}
