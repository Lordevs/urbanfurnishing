import SingleProductDetailHero from "@/components/single-product/detail/single-detail-hero-section";
import SingleProductDetails from "@/components/single-product/detail/single-product-details";
import { AllSingleItems } from "@/components/single-product/all-single-items";
import Testimonial from "@/components/common/testimonial";

export default function SingleProductDetailPage() {
  return (
    <div className="min-h-screen">
      <SingleProductDetailHero />
      <SingleProductDetails />
      <AllSingleItems />
      <Testimonial />
    </div>
  );
}
