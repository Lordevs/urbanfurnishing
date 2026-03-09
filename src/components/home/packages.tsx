"use client";

import {
  ItemCarousel,
  CarouselItemData,
} from "@/components/shared/item-carousel";

const packagesData: CarouselItemData[] = [
  {
    id: 1,
    title: "Investor Turnkey",
    fields: [
      { label: "Package", value: "Package - 1" },
      { label: "Focus", value: "Rental-Ready" },
    ],
    img: "/landing/home/packages-img-1.webp",
  },
  {
    id: 2,
    title: "Modern Architectural",
    fields: [
      { label: "Package", value: "Package - 2" },
      { label: "Focus", value: "Clean aesthetics" },
    ],
    img: "/landing/home/packages-img-2.webp",
  },
  {
    id: 3,
    title: "Luxury Corporate",
    fields: [
      { label: "Package", value: "Package - 3" },
      { label: "Focus", value: "Premium Standard" },
    ],
    img: "/landing/home/packages-img-3.webp",
  },
  {
    id: 4,
    title: "Warm Minimalist",
    fields: [
      { label: "Package", value: "Package - 4" },
      { label: "Focus", value: "Inviting Tones" },
    ],
    img: "/landing/home/packages-img-4.webp",
  },
];

export default function Packages() {
  return (
    <ItemCarousel
      titlePrefix="Our"
      titleHighlight="Packages"
      description="Choose from our curated packages designed to meet different needs. From fast rental-ready properties to personalized luxury interiors and scalable developer solutions."
      items={packagesData}
      defaultButtonText="Package Details"
      className="py-10"
    />
  );
}
