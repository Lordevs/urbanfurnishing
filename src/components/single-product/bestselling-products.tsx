"use client";

import { ROUTES } from "@/constants/route";
import { FeaturedCarousel } from "../shared/featured-carousel";

const bestsellingData = [
  {
    id: "best-1",
    category: "LIVING ROOM",
    title: "The Contemporary Collection",
    description:
      "A curated living room suite featuring modern Italian design and premium craftsmanship",
    features: ["3-Seater Sofa", "Coffee Table", "2 Accent Chairs", "TV Stand"],
    pieces: 8,
    price: "AED 2,299",
    originalPrice: "AED 3,299",
    saveText: "Save AED 800 (24% off)",
    badge1: "BEST SELLER",
    badge1Color: "bg-[#D1B072]",
    badge2: "-24% OFF",
    image: "/landing/single-products/bestselling-img-1.webp",
  },
  {
    id: "best-2",
    category: "BEDROOM",
    title: "The Grand Suite",
    description:
      "Transform your master bedroom into a five-star hotel experience with luxury textiles",
    features: ["King Size Bed Frame", "2 Nightstands", "Dresser", "Mirror"],
    pieces: 6,
    price: "AED 3,199",
    originalPrice: "",
    saveText: "Save AED 1000 (24% off)",
    badge1: "PREMIUM",
    badge1Color: "bg-[#D1B072]",
    badge2: "-24% OFF",
    image: "/landing/single-products/bestselling-img-2.webp",
  },
];

export function BestsellingProducts() {
  return (
    <FeaturedCarousel
      title="Bestselling Products"
      description="Our most loved Single products, handpicked for you"
      items={bestsellingData}
      detailRoute={(id) => ROUTES.SINGLE_PRODUCT_DETAIL(id.toString())}
    />
  );
}
