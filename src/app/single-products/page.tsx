import SingleProductHero from "@/components/single-product/single-procuct-hero";
import { BestsellingProducts } from "@/components/single-product/bestselling-products";
import { AllSingleItems } from "@/components/single-product/all-single-items";
import Testimonial from "@/components/common/testimonial";

export default function SingleProducts() {
  return (
    <div className="min-h-screen">
      <SingleProductHero />
      <BestsellingProducts />
      <AllSingleItems />
      <Testimonial />
    </div>
  );
}
