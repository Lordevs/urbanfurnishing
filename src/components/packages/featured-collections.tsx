"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Heart,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { ROUTES } from "@/constants/route";
import { FeaturedCarousel } from "../shared/featured-carousel";

const collections = [
  {
    id: "pkg-1",
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
    id: "pkg-2",
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
  const router = useRouter();
  const { addItem } = useCart();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // For demo matching screenshot

  const handleAddToCart = (e: React.MouseEvent, item: any) => {
    e.stopPropagation();
    addItem({
      id: item.id,
      name: item.title,
      price: item.price,
      quantity: 1,
      image: item.image,
      color: item.category,
    });
  };

  const getPageNumbers = () => {
    return [1, 2, "...", 9, 10];
  };

  const currentItem = collections[0]; // For demo matching exactly screen 1 on mobile
  // Since we only have two in data, we can just map `collections` or repeat for demo
  // But to preserve user's data structure while showing design, we will map `collections`
  // and pretend they are the current page items.

  return (
    <section className="py-10 sm:py-20 w-full max-w-8xl mx-auto overflow-hidden">
      {/* Mobile View */}
      <div className="md:hidden flex flex-col px-4">
        <div className="mb-6 text-left">
          <h2 className="text-[26px] font-sans font-bold text-[#1A1A1A] tracking-tight mb-2">
            Featured Collections
          </h2>
          <p className="text-[#666666] text-[13px] font-light">
            Our most loved packages, handpicked for you
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {collections.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                router.push(ROUTES.PACKAGES_DETAIL(item.id.toString()))
              }
              className="bg-white rounded-[16px] shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-[#F0EBE6] overflow-hidden flex flex-col cursor-pointer">
              {/* Image Section */}
              <div className="relative w-full aspect-4/3 bg-[#f8f8f8]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {item.badge1 && (
                    <span className="bg-[#D1B072] text-white text-[10px] font-bold tracking-wider px-3 py-1.5 rounded-[6px] w-max">
                      {item.badge1}
                    </span>
                  )}
                  {item.badge2 && (
                    <span className="bg-[#1A1A1A] text-white text-[10px] font-bold tracking-wider px-3 py-1.5 rounded-[6px] w-max">
                      {item.badge2}
                    </span>
                  )}
                </div>

                {/* Heart Action */}
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-4 right-4 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md">
                  <Heart className="w-[18px] h-[18px] text-[#1A1A1A]" />
                </button>
              </div>

              {/* Content Section */}
              <div className="p-5 flex flex-col flex-1">
                {/* Header row: category and rating */}
                <div className="flex justify-between items-center mb-2.5">
                  <h4 className="text-[#C9A76A] text-[10px] font-bold tracking-widest uppercase">
                    {item.category}
                  </h4>
                  <div className="flex items-center gap-1 bg-[#F7F7F7] px-2 py-1 rounded-[6px]">
                    <Star className="w-3 h-3 fill-[#C9A76A] text-[#C9A76A]" />
                    <span className="text-[10px] font-bold text-[#1A1A1A]">
                      4.8
                    </span>
                    <span className="text-[10px] text-[#888888]">(124)</span>
                  </div>
                </div>

                <h3 className="text-[18px] font-serif font-bold text-[#1A1A1A] leading-tight mb-2">
                  {item.title}
                </h3>

                <p className="text-[#666666] text-[13px] leading-relaxed mb-5">
                  {item.description}
                </p>

                {/* Features Pills */}
                <div className="grid grid-cols-2 gap-2.5 mb-5">
                  {item.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="bg-[#FAFAFA] border border-[#F2F2F2] rounded-[8px] py-2 px-3 flex items-center gap-2">
                      <div className="w-[4px] h-[4px] rounded-full bg-[#D1B072] shrink-0" />
                      <span className="text-[11px] text-[#1A1A1A] font-medium truncate">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Pieces Count */}
                <div className="flex items-center gap-2 mb-5">
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#C9A76A"
                    className="w-[18px] h-[18px] shrink-0">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                    />
                  </svg>
                  <span className="text-[12px] text-[#1A1A1A] font-medium">
                    {item.pieces} Premium Pieces
                  </span>
                </div>

                {/* Separator */}
                <div className="w-full h-px bg-[#F0F0F0] mb-4" />

                {/* Pricing Area */}
                <div className="flex flex-col mb-5">
                  <p className="text-[#888888] text-[11px] mb-1">
                    Package Price
                  </p>
                  <div className="flex items-baseline gap-2 mb-0.5">
                    <span className="text-[22px] font-sans font-bold text-[#1A1A1A]">
                      {item.price}
                    </span>
                    {item.originalPrice && (
                      <span className="text-[13px] text-[#B3B3B3] line-through font-medium">
                        {item.originalPrice}
                      </span>
                    )}
                  </div>
                  {item.saveText && (
                    <span className="text-[11px] text-[#D1B072] font-medium mt-0.5">
                      {item.saveText}
                    </span>
                  )}
                </div>

                {/* Add To Cart Button */}
                <button
                  onClick={(e) => handleAddToCart(e, item)}
                  className="w-full bg-[#412A1F] hover:bg-[#2C1A11] text-white rounded-[12px] h-[48px] flex items-center justify-center gap-2 text-[14px] font-medium transition-colors">
                  <ShoppingCart className="w-[18px] h-[18px]" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Pagination exact match */}
        <div className="flex items-center justify-end gap-2 mt-8 w-full">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className={`w-[32px] h-[32px] flex items-center justify-center rounded-[4px] transition-colors ${
              currentPage === 1
                ? "bg-[#A89B93] opacity-90 cursor-not-allowed border-none"
                : "bg-white border hover:bg-gray-50 border-[#E0E0E0]"
            }`}>
            <Image
              src="/common/arrow-left.svg"
              alt="Previous"
              width={16}
              height={16}
              className={currentPage === 1 ? "brightness-0 invert" : ""}
            />
          </button>

          {getPageNumbers().map((pageNum, idx) => (
            <button
              key={idx}
              onClick={() =>
                typeof pageNum === "number" && setCurrentPage(pageNum)
              }
              disabled={pageNum === "..."}
              className={`w-[32px] h-[32px] flex items-center justify-center rounded-[4px] text-[13px] font-bold transition-colors ${
                pageNum === currentPage
                  ? "border-[1.5px] border-[#603D2C] text-[#603D2C] bg-white"
                  : pageNum === "..."
                    ? "text-[#1A1A1A] cursor-default bg-white border border-[#F0F0F0]"
                    : "border border-[#F0F0F0] text-[#1A1A1A] hover:bg-gray-50 bg-white"
              }`}>
              {pageNum}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
            className={`w-[32px] h-[32px] flex items-center justify-center rounded-[4px] transition-colors bg-white ${
              currentPage === totalPages
                ? "border border-[#F0F0F0] cursor-not-allowed"
                : "border border-[#F0F0F0] hover:bg-gray-50 cursor-pointer"
            }`}>
            <Image
              src="/common/arrow-right.svg"
              alt="Next"
              width={16}
              height={16}
              className={currentPage === totalPages ? "opacity-30" : ""}
            />
          </button>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <FeaturedCarousel
          title="Featured Collections"
          description="Our most loved packages, handpicked for you"
          items={collections}
          detailRoute={(id) => ROUTES.PACKAGES_DETAIL(id.toString())}
        />
      </div>
    </section>
  );
}
