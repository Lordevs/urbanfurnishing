"use client";

import {
  ItemCarousel,
  CarouselItemData,
} from "@/components/shared/item-carousel";
import { ROUTES } from "@/constants/route";
import { useProducts } from "@/hooks/queries/use-products";
import type { ProductListItem } from "@/types/api";

function toCarouselItem(prod: ProductListItem): CarouselItemData {
  return {
    id: prod.id,
    title: prod.name,
    href: ROUTES.SINGLE_PRODUCT_DETAIL(prod.slug),
    description: prod.short_description ?? undefined,
    img: prod.thumbnail ?? "/landing/home/single-item/single-item-img-1.webp",
  };
}

export default function SingleItems() {
  const { data, isLoading } = useProducts({ is_featured: true, page_size: 4 });

  const items: CarouselItemData[] = isLoading
    ? []
    : (data?.results ?? []).map(toCarouselItem);

  if (!isLoading && items.length === 0) return null;

  return (
    <div className="w-full">
      <ItemCarousel
        titlePrefix="Single"
        titleHighlight="Items"
        description="A curated selection of furniture and essentials designed to complete your space with style and functionality."
        items={items}
        defaultButtonText="Discover Collection"
        className="py-10 pb-20"
        id="single-items"
      />
    </div>
  );
}
