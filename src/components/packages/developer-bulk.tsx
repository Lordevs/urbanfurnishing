"use client";

import PackageSection from "./package-section";
import { Users } from "lucide-react";

const includedItems = [
  "Standardised design templates",
  "Coordinated delivery schedule",
  "Consistent quality control",
  "Predictable timeline",
  "Volume pricing structure",
  "Show unit option available",
  "Bulk procurement benefits",
  "Dedicated project manager",
];

const idealForItems = [
  "Real estate developers",
  "Property management companies",
  "Multiple unit projects",
  "New development launches",
];

const DeveloperBulk = () => {
  return (
    <PackageSection
      packageNumber="03"
      badgeTitle="REPEATABLE DELIVERY FOR MULTIPLE UNITS"
      badgeIcon={Users}
      title="Developer / Bulk"
      description="Scalable furnishing solutions for developers with consistent quality across multiple properties."
      includedItems={includedItems}
      idealForItems={idealForItems}
      imageSrc="/packages/bulk.webp"
      imageAlt="Developer Bulk Package"
    />
  );
};

export default DeveloperBulk;
