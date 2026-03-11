"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
    img: "/landing/home/packages/packages-img-1.webp",
  },
  {
    id: 2,
    title: "Modern Architectural",
    fields: [
      { label: "Package", value: "Package - 2" },
      { label: "Focus", value: "Clean aesthetics" },
    ],
    img: "/landing/home/packages/packages-img-2.webp",
  },
  {
    id: 3,
    title: "Luxury Corporate",
    fields: [
      { label: "Package", value: "Package - 3" },
      { label: "Focus", value: "Premium Standard" },
    ],
    img: "/landing/home/packages/packages-img-3.webp",
  },
  {
    id: 4,
    title: "Warm Minimalist",
    fields: [
      { label: "Package", value: "Package - 4" },
      { label: "Focus", value: "Inviting Tones" },
    ],
    img: "/landing/home/packages/packages-img-4.webp",
  },
];

const mobilePackages = [
  {
    id: 1,
    title: "Essential Foyer",
    price: "AED 12,500",
    img: "/landing/home/packages/packages-img-1.webp",
    tag: "Popular",
  },
  {
    id: 2,
    title: "Living Essentials",
    price: "AED 28,000",
    img: "/landing/home/packages/packages-img-2.webp",
    tag: "Best Seller",
  },
  {
    id: 3,
    title: "Bedroom Suite",
    price: "AED 22,000",
    img: "/landing/home/packages/packages-img-3.webp",
    tag: "New",
  },
  {
    id: 4,
    title: "Dining Collection",
    price: "AED 18,500",
    img: "/landing/home/packages/packages-img-4.webp",
    tag: "",
  },
];

export default function Packages() {
  const [currentPage, setCurrentPage] = useState(1);

  // Extend mobile packages to 10 to demonstrate proper pagination
  const allMobilePackages = Array.from({ length: 10 }).map((_, i) => ({
    ...mobilePackages[i % mobilePackages.length],
    id: i + 1,
  }));

  const totalPages = allMobilePackages.length;
  const currentPackage = allMobilePackages[currentPage - 1];

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
        className="sm:hidden w-full px-4 py-10 sm:py-16"
        id="packages-mobile">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold tracking-tight mb-3">
            <span className="text-[#1a1a1a] font-serif">Our </span>
            <span className="text-[#C9A76A] font-serif">Packages</span>
          </h2>
          <p className="text-gray-500 text-xs">
            Curated collections for every room in your home
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div
            key={currentPackage.id}
            className="w-full bg-white rounded-[8px] overflow-hidden shadow-sm border border-gray-200 pb-3 sm:max-w-[400px]">
            <div className="relative aspect-3/4 w-full">
              <Image
                src={currentPackage.img}
                alt={currentPackage.title}
                fill
                className="object-cover"
              />
              {currentPackage.tag && (
                <span className="absolute top-3 right-3 bg-[#DDA15E] text-white text-[9px] px-2 py-0.5 rounded-sm font-medium tracking-wide uppercase">
                  {currentPackage.tag}
                </span>
              )}
            </div>
            <div className="px-5 pt-4 flex flex-col gap-1">
              <h3 className="font-bold text-[15px] text-[#2C1A11]">
                {currentPackage.title}
              </h3>
              <p className="text-[#DDA15E] text-[13px] font-medium mb-3">
                {currentPackage.price}
              </p>
              <button className="w-full py-2.5 border border-[#E5E5E5] text-[#2c1a11]/70 rounded-[4px] text-[12px] font-semibold tracking-wide hover:bg-gray-50 transition-colors cursor-pointer">
                View Details
              </button>
            </div>
          </div>

          {/* Pagination - Right Aligned with Card */}
          <div className="flex items-center justify-end gap-1.5 mt-8 w-full sm:max-w-[400px]">
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
          titlePrefix="Our"
          titleHighlight="Packages"
          description="Choose from our curated packages designed to meet different needs. From fast rental-ready properties to personalized luxury interiors and scalable developer solutions."
          items={packagesData}
          defaultButtonText="Package Details"
          className="py-10"
          id="packages"
        />
      </div>
    </>
  );
}
