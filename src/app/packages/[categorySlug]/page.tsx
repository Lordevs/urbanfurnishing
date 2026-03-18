import Testimonial from "@/components/common/testimonial";
import { OurPackages } from "@/components/packages/our-packages";
import PackagesHero from "@/components/packages/packages-hero";

interface Props {
  params: Promise<{ categorySlug: string }>;
}

export default async function CategoryPackagesPage({ params }: Props) {
  const { categorySlug } = await params;

  return (
    <div className="min-h-screen">
      <PackagesHero />
      <OurPackages categorySlug={categorySlug} />
      <Testimonial />
    </div>
  );
}
