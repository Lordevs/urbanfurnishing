import Testimonial from "@/components/common/testimonial";
import { AllSingleItems } from "@/components/single-product/all-single-items";
import SingleProductDetailHero from "@/components/single-product/detail/single-detail-hero-section";
import SingleProductDetails from "@/components/single-product/detail/single-product-details";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function SingleProductDetailPage({ params }: Props) {
  const { id } = await params;
  return (
    <div className="min-h-screen">
      <SingleProductDetailHero />
      <SingleProductDetails slug={id} />
      <AllSingleItems limit={6} hidePagination={true} />
      <Testimonial />
    </div>
  );
}
