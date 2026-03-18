import Testimonial from "@/components/common/testimonial";
import { PackageDetail } from "@/components/packages/detail/package-detail";

interface Props {
  params: Promise<{ categorySlug: string; packageSlug: string }>;
}

export default async function PackageDetailPage({ params }: Props) {
  const { packageSlug } = await params;

  return (
    <main className="min-h-screen">
      <PackageDetail slug={packageSlug} />
      <Testimonial />
    </main>
  );
}
