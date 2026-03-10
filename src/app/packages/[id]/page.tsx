import Testimonial from "@/components/common/testimonial";
import { PackageDetail } from "@/components/packages/detail/package-detail";

export default function PackageDetailPage() {
  return (
    <div className="min-h-screen">
      <PackageDetail />
      <Testimonial />
    </div>
  );
}
