import Testimonial from "@/components/common/testimonial";
import { OurPackages } from "@/components/packages/our-packages";
import PackagesHero from "@/components/packages/packages-hero";

export default function Packages() {
  return (
    <div className="min-h-screen">
      <PackagesHero />
      <OurPackages />
      <Testimonial />
    </div>
  );
}
