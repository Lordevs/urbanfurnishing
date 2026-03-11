"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  ItemCarousel,
  CarouselItemData,
} from "@/components/shared/item-carousel";

const singleItemsData: CarouselItemData[] = [
  {
    id: 1,
    title: "Luxe Velvet Sofa",
    description: "Premium velvet upholstery with solid oak legs. The perfect centerpiece for your modern living room.",
    img: "/landing/home/single-item/single-item-img-1.webp",
  },
  {
    id: 2,
    title: "Minimalist Lounge Chair",
    description: "Ergonomically designed for maximum comfort without compromising on contemporary style.",
    img: "/landing/home/single-item/single-item-img-2.webp",
  },
  {
    id: 3,
    title: "Marble Coffee Table",
    description: "Italian marble top on a powder-coated steel frame. A timeless addition to any space.",
    img: "/landing/home/single-item/single-item-img-3.webp",
  },
  {
    id: 4,
    title: "Industrial Dining Chair",
    description: "Durable steel and reclaimed wood construction. Perfect for both home and commercial use.",
    img: "/landing/home/single-item/single-item-img-4.webp",
  },
  {
    id: 5,
    title: "Scandinavian Bed Frame",
    description: "Light-toned beech wood frame with a minimalist headboard for a serene bedroom atmosphere.",
    img: "/landing/home/packages/packages-img-1.webp",
  },
  {
    id: 6,
    title: "Walnut Sideboard",
    description: "Handcrafted walnut finish with ample storage. Expertly combines form and function.",
    img: "/landing/home/packages/packages-img-2.webp",
  },
  {
    id: 7,
    title: "Modern Pendant Light",
    description: "Architectural lighting solution that adds a touch of elegance to your dining or entry area.",
    img: "/landing/home/packages/packages-img-3.webp",
  },
  {
    id: 8,
    title: "Hand-Woven Rug",
    description: "Premium wool and silk blend, manually woven by skilled artisans for a unique texture underfoot.",
    img: "/landing/home/packages/packages-img-4.webp",
  },
];

export default function SingleItems() {
  return (
    <div className="w-full">
      <ItemCarousel
        titlePrefix="Single"
        titleHighlight="Items"
        description="A curated selection of furniture and essentials designed to complete your space with style and functionality."
        items={singleItemsData}
        defaultButtonText="Discover Collection"
        className="py-16"
        id="single-items"
      />
    </div>
  );
}
