import SingleProductHero from "@/components/single-product/single-procuct-hero";
import { BestsellingProducts } from "@/components/single-product/bestselling-products";

export default function SingleProducts() {
  return (
    <div className="bg-[#FCFCFA]">
      <SingleProductHero />
      <BestsellingProducts />
    </div>
  );
}
