"use client";

import {
  ItemCarousel,
  CarouselItemData,
} from "@/components/shared/item-carousel";

const singleItemsData: CarouselItemData[] = [
  {
    id: 1,
    title: "Sofa Item",
    description:
      "Modern, durable furniture designed to prepare your property for immediate rental.",
    img: "/landing/home/single-item-img-1.webp",
  },
  {
    id: 2,
    title: "Sofa Item",
    description:
      "Modern, durable furniture designed to prepare your property for immediate rental.",
    img: "/landing/home/single-item-img-2.webp",
  },
  {
    id: 3,
    title: "Lounge Chair",
    description:
      "Modern, durable furniture designed to prepare your property for immediate rental.",
    img: "/landing/home/single-item-img-3.webp",
  },
  {
    id: 4,
    title: "Lounge Chair",
    description:
      "Modern, durable furniture designed to prepare your property for immediate rental.",
    img: "/landing/home/single-item-img-4.webp",
  },
];

export default function SingleItems() {
  return (
    <ItemCarousel
      titlePrefix="Single"
      titleHighlight="Items"
      description="A curated selection of furniture and essentials designed to complete your space with style and functionality."
      items={singleItemsData}
      defaultButtonText="Discover Collection"
      className="py-10 pb-20"
      id="single-items"
    />
  );
}
