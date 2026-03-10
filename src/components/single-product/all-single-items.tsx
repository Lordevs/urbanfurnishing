"use client";

import { ProductGrid, GridItemProps } from "../shared/product-grid";
import { ROUTES } from "@/constants/route";

const categories = [
  "All",
  "Living Room",
  "Bedroom",
  "Dining Room",
  "Office",
  "Outdoor",
  "Kids",
];

const singleItemsData: GridItemProps[] = [
  {
    id: 1,
    category: "OFFICE",
    title: "The Contemporary Collection",
    description:
      "A curated living room suite featuring modern Italian design and premium craftsmanship",
    pieces: 5,
    price: "AED 1,599",
    originalPrice: "AED 2,099",
    saveText: "Save AED 500",
    badges: [
      { text: "NEW", color: "bg-[#D1B072]" },
      { text: "-24% OFF", color: "bg-[#1A1A1A]" },
    ],
    image: "/landing/single-products/single-item-img-1.webp",
  },
  {
    id: 2,
    category: "DINING ROOM",
    title: "The Executive Workspace",
    description:
      "Build your ideal home office with ergonomic furniture and smart storage solutions",
    pieces: 5,
    price: "AED 999",
    originalPrice: "AED 1,299",
    saveText: "Save AED 300",
    badges: [
      { text: "VALUE PACK", color: "bg-[#D1B072]" },
      { text: "-23% OFF", color: "bg-[#1A1A1A]" },
    ],
    image: "/landing/single-products/single-item-img-2.webp",
  },
  {
    id: 3,
    category: "DINING ROOM",
    title: "The Grand Suite",
    description:
      "Transform your master bedroom into a five-star hotel experience with luxury textiles",
    pieces: 7,
    price: "AED 1,899",
    originalPrice: "AED 2,499",
    saveText: "Save AED 600",
    badges: [{ text: "-24% OFF", color: "bg-[#1A1A1A]" }],
    image: "/landing/single-products/single-item-img-3.webp",
  },
  {
    id: 4,
    category: "KIDS",
    title: "The Contemporary Collection",
    description:
      "A curated living room suite featuring modern Italian design and premium craftsmanship",
    pieces: 6,
    price: "AED 1,299",
    originalPrice: "AED 1,699",
    saveText: "Save AED 400",
    badges: [{ text: "-24% OFF", color: "bg-[#1A1A1A]" }],
    image: "/landing/single-products/single-item-img-4.webp",
  },
  {
    id: 5,
    category: "LIVING ROOM",
    title: "The Contemporary Collection",
    description:
      "A curated living room suite featuring modern Italian design and premium craftsmanship",
    pieces: 8,
    price: "AED 2,399",
    originalPrice: "AED 3,299",
    saveText: "Save AED 900",
    badges: [
      { text: "BEST SELLER", color: "bg-[#D1B072]" },
      { text: "-24% OFF", color: "bg-[#1A1A1A]" },
    ],
    image: "/landing/single-products/single-item-img-5.webp",
  },
  {
    id: 6,
    category: "BEDROOM",
    title: "The Contemporary Collection",
    description:
      "A curated living room suite featuring modern Italian design and premium craftsmanship",
    pieces: 5,
    price: "AED 2,399",
    originalPrice: "",
    saveText: "",
    badges: [],
    image: "/landing/single-products/single-item-img-6.webp",
  },
  {
    id: 7,
    category: "LIVING ROOM",
    title: "The Contemporary Collection",
    description:
      "A curated living room suite featuring modern Italian design and premium craftsmanship",
    pieces: 5,
    price: "AED 1,799",
    originalPrice: "",
    saveText: "",
    badges: [],
    image: "/landing/single-products/single-item-img-7.webp",
  },
  {
    id: 8,
    category: "BEDROOM",
    title: "The Contemporary Collection",
    description:
      "A curated living room suite featuring modern Italian design and premium craftsmanship",
    pieces: 8,
    price: "AED 3,199",
    originalPrice: "AED 4,199",
    saveText: "Save AED 1000",
    badges: [
      { text: "PREMIUM", color: "bg-[#D1B072]" },
      { text: "-24% OFF", color: "bg-[#1A1A1A]" },
    ],
    image: "/landing/single-products/single-item-img-8.webp",
  },
  {
    id: 9,
    category: "OUTDOOR",
    title: "The Executive Workspace",
    description:
      "Build your ideal home office with ergonomic furniture and smart storage solutions",
    pieces: 9,
    price: "AED 2,199",
    originalPrice: "",
    saveText: "",
    badges: [],
    image: "/landing/single-products/single-item-img-9.webp",
  },
];

export function AllSingleItems() {
  return (
    <ProductGrid
      title="All Single Items"
      categories={categories}
      items={singleItemsData}
      detailRoute={(id) => ROUTES.SINGLE_PRODUCT_DETAIL(id.toString())}
    />
  );
}
