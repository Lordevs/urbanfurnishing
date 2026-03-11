"use client";

import {
  ItemCarousel,
  CarouselItemData,
} from "@/components/shared/item-carousel";
import { useProducts } from "@/hooks/queries/use-products";
import type { ProductListItem } from "@/types/api";

function toCarouselItem(prod: ProductListItem): CarouselItemData {
  return {
    id: prod.id,
    title: prod.name,
    description: prod.short_description ?? undefined,
    img:
      prod.thumbnail ?? "/landing/home/single-item/single-item-img-1.webp",
  };
}

export default function SingleItems() {
  const { data, isLoading } = useProducts({ is_featured: true, page_size: 4 });

  const items: CarouselItemData[] = isLoading
    ? []
    : (data?.results ?? []).map(toCarouselItem);

  return (
    <ItemCarousel
      titlePrefix="Single"
      titleHighlight="Items"
      description="A curated selection of furniture and essentials designed to complete your space with style and functionality."
      items={items}
      defaultButtonText="Discover Collection"
      className="py-10 pb-20"
      id="single-items"
    />
  );
}
