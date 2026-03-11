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
    title: "Sofa Item",
    description:
      "Modern, durable furniture designed to prepare your property for immediate rental.",
    img: "/landing/home/single-item/single-item-img-1.webp",
  },
  {
    id: 2,
    title: "Sofa Item",
    description:
      "Modern, durable furniture designed to prepare your property for immediate rental.",
    img: "/landing/home/single-item/single-item-img-2.webp",
  },
  {
    id: 3,
    title: "Lounge Chair",
    description:
      "Modern, durable furniture designed to prepare your property for immediate rental.",
    img: "/landing/home/single-item/single-item-img-3.webp",
  },
  {
    id: 4,
    title: "Lounge Chair",
    description:
      "Modern, durable furniture designed to prepare your property for immediate rental.",
    img: "/landing/home/single-item/single-item-img-4.webp",
  },
];

const mobileSingleItems = [
  {
    id: 1,
    category: "Seating",
    title: "Ash Sofa",
    price: "AED 4,200",
    img: "/landing/home/single-item/single-item-img-1.webp",
  },
  {
    id: 2,
    category: "Seating",
    title: "Modern Loveseat",
    price: "AED 3,800",
    img: "/landing/home/single-item/single-item-img-2.webp",
  },
  {
    id: 3,
    category: "Seating",
    title: "Accent Chair",
    price: "AED 2,100",
    img: "/landing/home/single-item/single-item-img-3.webp",
  },
  {
    id: 4,
    category: "Dining",
    title: "Dining Chair",
    price: "AED 850",
    img: "/landing/home/single-item/single-item-img-4.webp",
  },
];

export default function SingleItems() {
  const [currentPage, setCurrentPage] = useState(1);

  // Extend mobile items to 12 to demonstrate proper pagination with 4 items per page
  const allMobileItems = Array.from({ length: 12 }).map((_, i) => ({
    ...mobileSingleItems[i % mobileSingleItems.length],
    id: i + 1,
  }));

  const itemsPerPage = 4;
  const totalPages = Math.ceil(allMobileItems.length / itemsPerPage);

  const currentItems = allMobileItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const getPageNumbers = () => {
    if (totalPages <= 5)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 2) return [1, 2, "...", totalPages - 1, totalPages];
    if (currentPage >= totalPages - 1)
      return [1, 2, "...", totalPages - 1, totalPages];
    return [1, "...", currentPage, "...", totalPages];
  };

  return (
    <>
      <div
        className="sm:hidden w-full px-4 py-5 sm:py-16"
        id="single-items-mobile">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold tracking-tight mb-3">
            <span className="text-[#1a1a1a] font-serif">Single </span>
            <span className="text-[#C9A76A] font-serif">Items</span>
          </h2>
          <p className="text-gray-500 text-[13px]">
            Find the perfect pieces to complete your space
          </p>
        </div>

        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {currentItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-[16px] overflow-hidden border border-[#EEEEEE] shadow-none hover:shadow-md transition-shadow">
                <div className="relative aspect-square w-full bg-[#FAFAFA]">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="px-4 pt-4 pb-5 flex flex-col">
                  <span className="text-[#D3A971] text-[11px] font-medium tracking-wide mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-bold text-[15px] sm:text-[16px] text-[#2C1A11] leading-tight mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-[#412A1F] text-[13px] sm:text-[14px] font-normal tracking-wide">
                    {item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination - Right Aligned as requested */}
          <div className="flex items-center justify-end gap-1.5 mt-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`w-8 h-8 flex items-center justify-center rounded-[4px] transition-colors ${
                currentPage === 1
                  ? "bg-[#B5A89F] border border-[#B5A89F] text-white cursor-not-allowed"
                  : "bg-white border border-[#E5E5E5] text-[#1E293B] hover:bg-gray-50 cursor-pointer"
              }`}>
              <ChevronLeft className="w-5 h-5 stroke-2" />
            </button>

            {getPageNumbers().map((pageNum, idx) => (
              <button
                key={idx}
                onClick={() =>
                  typeof pageNum === "number" && setCurrentPage(pageNum)
                }
                disabled={pageNum === "..."}
                className={`w-8 h-8 flex items-center justify-center rounded-[4px] text-[13px] font-bold transition-colors ${
                  pageNum === currentPage
                    ? "border border-[#603D2C] text-[#603D2C]"
                    : pageNum === "..."
                      ? "border border-[#E5E5E5] text-[#1E293B] cursor-default"
                      : "border border-[#E5E5E5] text-[#1E293B] hover:bg-gray-50 cursor-pointer"
                }`}>
                {pageNum}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className={`w-8 h-8 flex items-center justify-center rounded-[4px] transition-colors bg-white ${
                currentPage === totalPages
                  ? "border border-[#E5E5E5] text-[#9CA3AF] cursor-not-allowed"
                  : "border border-[#E5E5E5] text-[#1E293B] hover:bg-gray-50 cursor-pointer"
              }`}>
              <ChevronRight className="w-5 h-5 stroke-2" />
            </button>
          </div>
        </div>
      </div>

      <div className="hidden sm:block">
        <ItemCarousel
          titlePrefix="Single"
          titleHighlight="Items"
          description="A curated selection of furniture and essentials designed to complete your space with style and functionality."
          items={singleItemsData}
          defaultButtonText="Discover Collection"
          className="py-10 pb-20"
          id="single-items"
        />
      </div>
    </>
  );
}
