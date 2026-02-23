"use client";

import PackageSection from "./package-section";
import { Building2 } from "lucide-react";

const includedItems = [
  "Complete living room furnishing",
  "Bedroom setup with wardrobe",
  "Dining area furniture",
  "Window treatments & curtains",
  "Lighting fixtures",
  "Soft furnishings & accessories",
  "Neutral color palette",
  "Fast-track delivery",
];

const idealForItems = [
  "Buy-to-let investors",
  "Property portfolio owners",
  "Short-term rental properties",
  "Quick turnover requirements",
];

const InvestorTurnkey = () => {
  return (
    <PackageSection
      packageNumber="01"
      badgeTitle="FAST, NEUTRAL, RENTAL-READY"
      badgeIcon={Building2}
      title="Investor Turnkey"
      description="Perfect for investors who need properties ready to rent quickly with proven, market-ready design."
      includedItems={includedItems}
      idealForItems={idealForItems}
      imageSrc="/packages/investor-turnkey.webp"
      imageAlt="Investor Turnkey Package"
    />
  );
};

export default InvestorTurnkey;
