import Testimonial from "@/components/common/testimonial";
import { AllSingleItems } from "@/components/single-product/all-single-items";
import { BestsellingProducts } from "@/components/single-product/bestselling-products";
import SingleProductHero from "@/components/single-product/single-procuct-hero";

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
