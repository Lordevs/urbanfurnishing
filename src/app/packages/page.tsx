import { Suspense } from "react";

import Testimonial from "@/components/common/testimonial";
import { AllPackages } from "@/components/packages/all-packages";
import { FeaturedCollections } from "@/components/packages/featured-collections";
import PackagesHero from "@/components/packages/packages-hero";

export default function Packages() {
  return (
    <div className="min-h-screen">
      <PackagesHero />
      <FeaturedCollections />
      <Suspense fallback={null}>
        <AllPackages />
      </Suspense>
      <Testimonial />
    </div>
  );
}
