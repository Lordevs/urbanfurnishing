"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List as ListIcon,
  Heart,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  "All",
  "Living Room",
  "Bedroom",
  "Dining Room",
  "Office",
  "Outdoor",
  "Kids",
];

const packagesData = [
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
    image: "/landing/packages/packages-img-1.webp",
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
    image: "/landing/packages/packages-img-2.webp",
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
    image: "/landing/packages/packages-img-3.webp",
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
    image: "/landing/packages/packages-img-4.webp",
  },
  {
    id: 5,
    category: "LIVING ROOM",
    title: "Modern Living Essentials",
    description:
      "Complete your living room with this contemporary furniture set",
    pieces: 8,
    price: "AED 2,399",
    originalPrice: "AED 3,299",
    saveText: "Save AED 900",
    badges: [
      { text: "BEST SELLER", color: "bg-[#D1B072]" },
      { text: "-24% OFF", color: "bg-[#1A1A1A]" },
    ],
    image: "/landing/packages/packages-img-5.webp",
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
    image: "/landing/packages/packages-img-6.webp",
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
    image: "/landing/packages/packages-img-7.webp",
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
    image: "/landing/packages/packages-img-8.webp",
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
    image: "/landing/packages/packages-img-9.webp",
  },
];

export function AllPackages() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPackages = packagesData.filter((pkg) => {
    const matchesCategory =
      activeCategory === "All" ||
      pkg.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch =
      pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="px-4 sm:px-10 lg:px-16 max-w-8xl mx-auto pb-24">
      {/* Filter Header */}
      <div className="bg-white border border-[#EDEDED] rounded-[24px] p-5 lg:p-6 mb-12 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <h2 className="text-[20px] lg:text-[22px] font-bold text-[#1A1A1A] tracking-tight">
              All Packages
            </h2>
            <span className="bg-[#F5F5F5] text-[#888888] text-[12px] font-medium px-3 py-1 rounded-full">
              {filteredPackages.length} results
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 lg:gap-4">
            {/* View Toggles */}
            <div className="bg-[#F5F5F5] p-1 rounded-[12px] flex items-center shrink-0">
              <button className="bg-white text-[#1A1A1A] shadow-sm p-2 rounded-[8px] transition-all">
                <LayoutGrid className="w-[18px] h-[18px]" />
              </button>
              <button className="text-[#888888] p-2 rounded-[8px] hover:text-[#1A1A1A] transition-all">
                <ListIcon className="w-[18px] h-[18px]" />
              </button>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-auto flex-1 sm:flex-none">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-[#AAAAAA]" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search packages..."
                className="bg-[#F5F5F5] text-[#1A1A1A] placeholder:text-[#AAAAAA] text-[14px] rounded-[12px] pl-10 pr-4 h-11 w-full sm:w-[260px] focus:outline-none focus:ring-1 focus:ring-[#E0E0E0] transition-shadow"
              />
            </div>

            {/* Filter Button */}
            <Button className="bg-[#422C20] hover:bg-[#322118] text-white rounded-[12px] h-11 px-6 text-[14px] font-medium flex items-center gap-2 shrink-0">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center gap-2 lg:gap-3 mt-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-[13px] font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-[#422C20] text-white"
                  : "bg-[#F5F5F5] text-[#666666] hover:bg-[#EBEBEB] hover:text-[#1A1A1A]"
              }`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredPackages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence>
            {filteredPackages.map((pkg) => (
              <motion.div
                key={pkg.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-[20px] sm:rounded-[24px] overflow-hidden flex flex-col h-full border border-[#F2F2F2] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300">
                {/* Image Container */}
                <div className="relative aspect-4/3 bg-[#F8F8F8] w-full shrink-0">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    className="object-cover"
                  />
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                    {pkg.badges.map((badge, idx) => (
                      <span
                        key={idx}
                        className={`px-2.5 py-1 ${badge.color} text-white text-[9px] font-bold tracking-widest uppercase rounded-[4px] w-max`}>
                        {badge.text}
                      </span>
                    ))}
                  </div>

                  {/* Heart Button */}
                  <button className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-105 transition-transform text-[#1A1A1A]">
                    <Heart className="w-[14px] h-[14px]" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-5 lg:p-6 flex flex-col flex-1">
                  <h4 className="text-[#C5A67C] text-[10px] sm:text-[11px] font-bold tracking-[0.12em] uppercase mb-1.5">
                    {pkg.category}
                  </h4>
                  <h3 className="text-[18px] sm:text-[20px] font-bold text-[#1A1A1A] leading-tight mb-2">
                    {pkg.title}
                  </h3>
                  <p className="text-[#888888] text-[13px] leading-relaxed mb-6 line-clamp-2">
                    {pkg.description}
                  </p>

                  {/* Pieces Badge */}
                  <div className="flex items-center gap-2.5 bg-[#FAFAFA] border border-[#F2F2F2] px-4 py-3 rounded-[12px] mb-6 w-full">
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#C9A76A"
                      className="w-[16px] h-[16px] shrink-0">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                      />
                    </svg>
                    <span className="text-[13px] font-medium text-[#1A1A1A]">
                      {pkg.pieces} Premium Pieces
                    </span>
                  </div>

                  {/* Footer Price Block */}
                  <div className="mt-auto flex items-end justify-between border-t border-[#F0F0F0] pt-5 lg:pt-6">
                    <div className="flex flex-col">
                      <div className="flex items-baseline gap-2 mb-0.5 whitespace-nowrap">
                        <span className="text-[20px] lg:text-[24px] font-bold text-[#1A1A1A] leading-none tracking-tight">
                          {pkg.price}
                        </span>
                        {pkg.originalPrice && (
                          <span className="text-[#B3B3B3] text-[13px] lg:text-[14px] font-medium tracking-tight line-through mt-0.5">
                            {pkg.originalPrice}
                          </span>
                        )}
                      </div>
                      <div className="h-[18px]">
                        {pkg.saveText && (
                          <p className="text-[#C5A67C] text-[11px] lg:text-[12px] font-medium mt-0.5">
                            {pkg.saveText}
                          </p>
                        )}
                      </div>
                    </div>

                    <Button className="bg-[#412A1F]/90 hover:bg-[#412A1F] text-white rounded-[10px] lg:rounded-[12px] text-[13px] lg:text-[14px] font-medium px-5 lg:px-6 h-[40px] lg:h-[44px] flex items-center justify-center gap-2 transition-all shadow-none duration-300 hover:scale-105 cursor-pointer shrink-0">
                      <ShoppingCart className="w-[15px] lg:w-[16px] h-[15px] lg:h-[16px]" />
                      Add
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="py-20 text-center text-[#888888] font-medium">
          No packages matched your search.
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-end gap-2.5 mt-16 pb-8">
        <button className="w-[36px] lg:w-[40px] h-[38px] lg:h-[42px] rounded-[6px] lg:rounded-[8px] bg-[#A5958A] text-white flex items-center justify-center transition-all shadow-sm cursor-pointer hover:bg-[#8F8177]">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button className="w-[36px] lg:w-[40px] h-[38px] lg:h-[42px] rounded-[6px] lg:rounded-[8px] bg-white border-2 border-[#8A7969] text-[#8A7969] text-[14px] lg:text-[15px] font-bold flex items-center justify-center shadow-sm cursor-pointer hover:bg-[#FDFBF9]">
          1
        </button>
        <button className="w-[36px] lg:w-[40px] h-[38px] lg:h-[42px] rounded-[6px] lg:rounded-[8px] bg-white border border-[#EBEBEB] text-[#1A1A1A] text-[14px] lg:text-[15px] font-bold hover:border-[#8A7969] hover:text-[#8A7969] transition-all flex items-center justify-center shadow-sm cursor-pointer">
          2
        </button>
        <span className="text-[#1A1A1A] px-1 text-[14px] lg:text-[15px] font-bold tracking-widest">
          ...
        </span>
        <button className="w-[36px] lg:w-[40px] h-[38px] lg:h-[42px] rounded-[6px] lg:rounded-[8px] bg-white border border-[#EBEBEB] text-[#1A1A1A] text-[14px] lg:text-[15px] font-bold hover:border-[#8A7969] hover:text-[#8A7969] transition-all flex items-center justify-center shadow-sm cursor-pointer">
          9
        </button>
        <button className="w-[36px] lg:w-[40px] h-[38px] lg:h-[42px] rounded-[6px] lg:rounded-[8px] bg-white border border-[#EBEBEB] text-[#1A1A1A] text-[14px] lg:text-[15px] font-bold hover:border-[#8A7969] hover:text-[#8A7969] transition-all flex items-center justify-center shadow-sm cursor-pointer">
          10
        </button>
        <button className="w-[36px] lg:w-[40px] h-[38px] lg:h-[42px] rounded-[6px] lg:rounded-[8px] bg-white border border-[#EBEBEB] text-[#AAAAAA] hover:text-[#1A1A1A] hover:border-[#8A7969] transition-all flex items-center justify-center shadow-sm cursor-pointer">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
