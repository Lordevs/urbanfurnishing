"use client";

import { ROUTES } from "@/constants/route";
import { useProducts } from "@/hooks/queries/use-products";
import type { ProductListItem } from "@/types/api";

import { FeaturedCarousel, FeaturedItem } from "../shared/featured-carousel";

const TAG_BADGE_COLOR: Record<string, string> = {
  BEST_SELLER: "bg-[#D1B072]",
  PREMIUM: "bg-[#D1B072]",
  VALUE_PACK: "bg-[#D1B072]",
  NEW: "bg-[#D1B072]",
};

function toFeaturedItem(prod: ProductListItem): FeaturedItem {
  const actualPrice = parseFloat(prod.actual_price);
  const discountedPrice = prod.discounted_price
    ? parseFloat(prod.discounted_price)
    : undefined;

  const price = discountedPrice ?? actualPrice;
  const originalPrice = discountedPrice ? actualPrice : undefined;

  const saving = prod.money_saved
    ? Math.round(parseFloat(prod.money_saved))
    : undefined;

  return {
    id: prod.slug,
    slug: prod.slug,
    category: prod.category_name?.toUpperCase() ?? "",
    title: prod.name,
    description: prod.short_description ?? "",
    features: [],
    pieces: 0,
    price,
    originalPrice,
    saveText: saving ? `Save AED ${saving.toLocaleString()}` : undefined,
    badge1: prod.tag?.replace("_", " ") || undefined,
    badge1Color: prod.tag ? TAG_BADGE_COLOR[prod.tag] : undefined,
    badge2: prod.discount_percentage
      ? `-${prod.discount_percentage}% OFF`
      : undefined,
    image: prod.thumbnail ?? "/landing/single-products/bestselling-img-1.webp",
    itemType: "PRODUCT",
  };
}

function FeaturedSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row bg-white rounded-[24px] overflow-hidden border border-[#F0F0F0] min-h-[460px] animate-pulse">
      <div className="w-full sm:w-[45%] bg-[#F0EBE4]" />
      <div className="flex-1 p-7 flex flex-col gap-4">
        <div className="h-3 w-20 bg-[#F0EBE4] rounded" />
        <div className="h-7 w-3/4 bg-[#F0EBE4] rounded" />
        <div className="h-4 w-full bg-[#F0EBE4] rounded" />
        <div className="h-4 w-5/6 bg-[#F0EBE4] rounded" />
      </div>
    </div>
  );
}

export function BestsellingProducts() {
  const { data, isLoading } = useProducts({ is_featured: true, page_size: 6 });

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
      title="Bestselling Products"
      description="Our most loved Single products, handpicked for you"
      items={items}
      detailRoute={(id) => ROUTES.SINGLE_PRODUCT_DETAIL(id)}
    />
  );
}
