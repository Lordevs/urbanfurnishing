"use client";

import {
  ItemCarousel,
  CarouselItemData,
} from "@/components/shared/item-carousel";
import { ROUTES } from "@/constants/route";
import { usePackageCategories } from "@/hooks/queries/use-categories";
import type { PackageCategoryExtended } from "@/types/api";

function toCarouselItem(category: PackageCategoryExtended): CarouselItemData {
  return {
    id: category.id,
    title: category.name,
    href: ROUTES.PACKAGES_CATEGORY(category.slug),
    img: category.image ?? "/landing/home/packages/packages-img-1.webp",
    fields: [
      {
        label: "Type",
        value: "Curated Collection",
      },
    ],
  };
}

export default function Packages() {
  const { data, isLoading } = usePackageCategories();

  const items: CarouselItemData[] = isLoading
    ? []
    : (data ?? []).map(toCarouselItem);

  if (!isLoading && items.length === 0) return null;

  return (
    <div className="w-full">
      <ItemCarousel
        titlePrefix="Our"
        titleHighlight="Collections"
        description="Experience luxury living with our curated furniture collections. Each piece is hand-selected to create cohesive, stunning environments for any living space."
        items={items}
        defaultButtonText="View Collection"
        className="py-10"
        id="packages"
      />
    </div>
  );
}
