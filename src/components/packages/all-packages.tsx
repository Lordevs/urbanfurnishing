"use client";

import { ProductGrid, GridItemProps } from "../shared/product-grid";

const categories = [
  "All",
  "Living Room",
  "Bedroom",
  "Dining Room",
  "Office",
  "Outdoor",
  "Kids",
];

const packagesData: GridItemProps[] = [
  {
    id: 1,
    category: "OFFICE",
    title: "Home Office Pro",
    description: "Create a productive workspace at home",
    pieces: 5,
    price: "AED 1,599",
    originalPrice: "AED 2,099",
    saveText: "Save AED 500",
    badges: [
      { text: "NEW", color: "bg-[#D1B072]" },
      { text: "-24% OFF", color: "bg-[#1A1A1A]" },
    ],
    image: "/landing/packages/packages-product-img-1.webp",
  },
  {
    id: 2,
    category: "DINING ROOM",
    title: "Compact Dining Set",
    description: "Perfect for apartments and cozy dining spaces",
    pieces: 5,
    price: "AED 999",
    originalPrice: "AED 1,299",
    saveText: "Save AED 300",
    badges: [
      { text: "VALUE PACK", color: "bg-[#D1B072]" },
      { text: "-23% OFF", color: "bg-[#1A1A1A]" },
    ],
    image: "/landing/packages/packages-product-img-2.webp",
  },
  {
    id: 3,
    category: "DINING ROOM",
    title: "Elegant Dining Collection",
    description: "Host memorable dinners with this stylish dining set",
    pieces: 7,
    price: "AED 1,899",
    originalPrice: "AED 2,499",
    saveText: "Save AED 600",
    badges: [{ text: "-24% OFF", color: "bg-[#1A1A1A]" }],
    image: "/landing/packages/packages-product-img-2.webp",
  },
  {
    id: 4,
    category: "KIDS",
    title: "Kids Dream Room",
    description: "Fun and functional furniture for your little ones",
    pieces: 6,
    price: "AED 1,299",
    originalPrice: "AED 1,699",
    saveText: "Save AED 400",
    badges: [{ text: "-24% OFF", color: "bg-[#1A1A1A]" }],
    image: "/landing/packages/packages-product-img-3.webp",
  },
  {
    id: 5,
    category: "LIVING ROOM",
    title: "Modern Living Essentials",
    description: "Complete your living room with this contemporary furniture set",
    pieces: 8,
    price: "AED 2,399",
    originalPrice: "AED 3,299",
    saveText: "Save AED 900",
    badges: [
      { text: "BEST SELLER", color: "bg-[#D1B072]" },
      { text: "-24% OFF", color: "bg-[#1A1A1A]" },
    ],
    image: "/landing/packages/packages-product-img-4.webp",
  },
  {
    id: 6,
    category: "BEDROOM",
    title: "Classic Bedroom Comfort",
    description: "Timeless bedroom furniture for restful nights",
    pieces: 5,
    price: "AED 2,399",
    originalPrice: "",
    saveText: "",
    badges: [],
    image: "/landing/packages/packages-product-img-5.webp",
  },
  {
    id: 7,
    category: "LIVING ROOM",
    title: "Minimalist Studio Bundle",
    description: "Perfect for small spaces and modern living",
    pieces: 5,
    price: "AED 1,799",
    originalPrice: "",
    saveText: "",
    badges: [],
    image: "/landing/packages/packages-product-img-4.webp",
  },
  {
    id: 8,
    category: "BEDROOM",
    title: "Luxury Bedroom Suite",
    description: "Transform your bedroom into a luxurious retreat",
    pieces: 6,
    price: "AED 3,199",
    originalPrice: "AED 4,199",
    saveText: "Save AED 1000",
    badges: [
      { text: "PREMIUM", color: "bg-[#D1B072]" },
      { text: "-24% OFF", color: "bg-[#1A1A1A]" },
    ],
    image: "/landing/packages/packages-product-img-5.webp",
  },
  {
    id: 9,
    category: "OUTDOOR",
    title: "Outdoor Oasis",
    description: "Extend your living space outdoors with style",
    pieces: 9,
    price: "AED 2,199",
    originalPrice: "",
    saveText: "",
    badges: [],
    image: "/landing/packages/packages-product-img-3.webp",
  },
];

import { ROUTES } from "@/constants/route";

export function AllPackages() {
  return (
    <ProductGrid
      title="All Packages"
      categories={categories}
      items={packagesData}
      detailRoute={(id) => ROUTES.PACKAGES_DETAIL(id.toString())}
    />
  );
}
