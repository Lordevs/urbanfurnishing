"use client";

import { ROUTES } from "@/constants/route";
import { usePackages } from "@/hooks/queries/use-packages";
import type { PackageListItem } from "@/types/api";

import { FeaturedCarousel, FeaturedItem } from "../shared/featured-carousel";

const TAG_BADGE_COLOR: Record<string, string> = {
  BEST_SELLER: "bg-[#D1B072]",
  PREMIUM: "bg-[#D1B072]",
  VALUE_PACK: "bg-[#D1B072]",
  NEW: "bg-[#D1B072]",
};

function toFeaturedItem(pkg: PackageListItem): FeaturedItem {
  const actualPrice = parseFloat(pkg.actual_price);
  const discountedPrice = pkg.discounted_price
    ? parseFloat(pkg.discounted_price)
    : undefined;
    
  const price = discountedPrice ?? actualPrice;
  const originalPrice = discountedPrice ? actualPrice : undefined;

  const saving = pkg.money_saved ? Math.round(parseFloat(pkg.money_saved)) : undefined;

  return {
    id: pkg.slug,
    slug: pkg.slug,
    category: pkg.category_name?.toUpperCase() ?? "",
    title: pkg.name,
    description: pkg.short_description ?? "",
    features: [],
    pieces: pkg.pieces_count ?? 0,
    price,
    originalPrice,
    saveText: saving ? `Save AED ${saving.toLocaleString()}` : undefined,
    badge1: pkg.tag?.replace("_", " ") || undefined,
    badge1Color: pkg.tag ? TAG_BADGE_COLOR[pkg.tag] : undefined,
    badge2: pkg.discount_percentage ? `-${pkg.discount_percentage}% OFF` : undefined,
    image: pkg.thumbnail ?? "/landing/packages/feature-image-1.webp",
    itemType: "PACKAGE",
  };
}

// Skeleton card for loading state
function FeaturedSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row bg-white rounded-[24px] overflow-hidden border border-[#F0F0F0] min-h-[460px] animate-pulse">
      <div className="w-full sm:w-[45%] bg-[#F0EBE4]" />
      <div className="flex-1 p-7 flex flex-col gap-4">
        <div className="h-3 w-20 bg-[#F0EBE4] rounded" />
        <div className="h-7 w-3/4 bg-[#F0EBE4] rounded" />
        <div className="h-4 w-full bg-[#F0EBE4] rounded" />
        <div className="h-4 w-5/6 bg-[#F0EBE4] rounded" />
        <div className="grid grid-cols-2 gap-2 mt-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-10 bg-[#F0EBE4] rounded-[12px]" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function FeaturedCollections() {
  const { data, isLoading } = usePackages({ is_featured: true, page_size: 6 });

  if (isLoading) {
    return (
      <section className="py-20 px-4 sm:px-10 lg:px-16 max-w-8xl mx-auto">
        <div className="h-10 w-64 bg-[#F0EBE4] rounded animate-pulse mb-4" />
        <div className="h-5 w-80 bg-[#F0EBE4] rounded animate-pulse mb-10" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FeaturedSkeleton />
          <FeaturedSkeleton />
        </div>
      </section>
    );
  }

  const items = (data?.results ?? []).map(toFeaturedItem);

  return (
    <FeaturedCarousel
      title="Featured Collections"
      description="Our most loved packages, handpicked for you"
      items={items}
      detailRoute={(id) => ROUTES.PACKAGES_DETAIL(id)}
    />
  );
}
