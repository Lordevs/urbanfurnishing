"use client";

import PackageSection from "./package-section";
import { Home } from "lucide-react";

const includedItems = [
  "Customised design consultation",
  "Feature lighting solutions",
  "Premium soft furnishings",
  "Personal style integration",
  "Upgraded material finishes",
  "Custom joinery options",
  "Curated accessories",
  "Extended warranty coverage",
];

const idealForItems = [
  "Primary residence owners",
  "Families settling long-term",
  "Professionals wanting quality",
  "Personal style expression",
];

const EndUserSignature = () => {
  return (
    <PackageSection
      packageNumber="02"
      badgeTitle="PERSONALISED BUT CONTROLLED"
      badgeIcon={Home}
      title="End-User Signature"
      description="For homeowners who want their space to feel personal while maintaining design coherence and budget control."
      includedItems={includedItems}
      idealForItems={idealForItems}
      imageSrc="/packages/end-user-signature.webp"
      imageAlt="End-User Signature Package"
      reverse={true}
    />
  );
};

export default EndUserSignature;
