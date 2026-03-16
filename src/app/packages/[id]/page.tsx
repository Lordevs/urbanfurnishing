import Testimonial from "@/components/common/testimonial";
import { PackageDetail } from "@/components/packages/detail/package-detail";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PackageDetailPage({ params }: Props) {
  const { id } = await params;

  return (
    <main className="min-h-screen">
      <PackageDetail slug={id} />
      <Testimonial />
    </main>
  );
}
