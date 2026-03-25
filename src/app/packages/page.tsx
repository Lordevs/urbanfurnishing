import Testimonial from "@/components/common/testimonial";
import { PackageCategories } from "@/components/packages/package-categories";
import PackagesHero from "@/components/packages/packages-hero";

export default function Packages() {
  return (
    <div className="min-h-screen">
      <PackagesHero />
      <PackageCategories />
      <Testimonial />
    </div>
  );
}
