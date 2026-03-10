import PackagesHero from "@/components/packages/packages-hero";
import { FeaturedCollections } from "@/components/packages/featured-collections";

export default function Packages() {
  return (
    <div className="min-h-screen bg-[#FCFCFA]">
      <PackagesHero />
      <FeaturedCollections />
    </div>
  );
}
