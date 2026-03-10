"use client";

import { ROUTES } from "@/constants/route";
import { FeaturedCarousel } from "../shared/featured-carousel";

const collections = [
  {
    id: 1,
    category: "LIVING ROOM",
    title: "Modern Living Essentials",
    description:
      "Complete your living room with this contemporary furniture set",
    features: ["3-Seater Sofa", "Coffee Table", "2 Accent Chairs", "TV Stand"],
    pieces: 8,
    price: "AED 2,299",
    originalPrice: "AED 3,299",
    saveText: "Save AED 1000 (24% off)",
    badge1: "BEST SELLER",
    badge1Color: "bg-[#D1B072]",
    badge2: "-24% OFF",
    image: "/landing/packages/feature-image-1.webp",
  },
  {
    id: 2,
    category: "BEDROOM",
    title: "Luxury Bedroom Suite",
    description: "Transform your bedroom into a luxurious retreat",
    features: ["King Size Bed Frame", "2 Nightstands", "Dresser", "Mirror"],
    pieces: 6,
    price: "AED 3,199",
    originalPrice: "",
    saveText: "Save AED 1000 (24% off)",
    badge1: "PREMIUM",
    badge1Color: "bg-[#D1B072]",
    badge2: "-24% OFF",
    image: "/landing/packages/feature-image-2.webp",
  },
];

export function FeaturedCollections() {
  return (
    <FeaturedCarousel
      title="Featured Collections"
      description="Our most loved packages, handpicked for you"
      items={collections}
      detailRoute={(id) => ROUTES.PACKAGES_DETAIL(id.toString())}
    />
  );
}
