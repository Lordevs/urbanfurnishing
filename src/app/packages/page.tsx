import PackagesHero from "@/components/packages/packages-hero";
import { FeaturedCollections } from "@/components/packages/featured-collections";
import { AllPackages } from "@/components/packages/all-packages";
import Testimonial from "@/components/common/testimonial";

export default function Packages() {
  return (
    <div className="min-h-screen">
      <PackagesHero />
      <FeaturedCollections />
      <AllPackages />
      <Testimonial />
    </div>
  );
}
