"use client";

import {
  ItemCarousel,
  CarouselItemData,
} from "@/components/shared/item-carousel";
import { usePackages } from "@/hooks/queries/use-packages";
import type { PackageListItem } from "@/types/api";

function toCarouselItem(pkg: PackageListItem): CarouselItemData {
  return {
    id: pkg.id,
    title: pkg.name,
    img: pkg.thumbnail ?? "/landing/home/packages/packages-img-1.webp",
    fields: [
      { label: "Package", value: pkg.package_type_display ?? pkg.package_type ?? "" },
      { label: "Category", value: pkg.category_name ?? "" },
    ],
  };
}

export default function Packages() {
  const { data, isLoading } = usePackages({ is_featured: true, page_size: 4 });

  const items: CarouselItemData[] = isLoading
    ? []
    : (data?.results ?? []).map(toCarouselItem);

  return (
    <ItemCarousel
      titlePrefix="Our"
      titleHighlight="Packages"
      description="Choose from our curated packages designed to meet different needs. From fast rental-ready properties to personalized luxury interiors and scalable developer solutions."
      items={items}
      defaultButtonText="Package Details"
      className="py-10"
      id="packages"
    />
  );
}
