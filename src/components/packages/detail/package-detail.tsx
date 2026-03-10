"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Truck,
  ShieldCheck,
  Clock,
  Wrench,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const images = [
  "/landing/detail-page/detail-image-1.webp",
  "/landing/detail-page/detail-image-2.webp",
  "/landing/detail-page/detail-image-3.webp",
  "/landing/detail-page/detail-image-4.webp",
];

const includedFeatures = [
  { icon: Truck, title: "Free Delivery", subtitle: "On all packages" },
  { icon: ShieldCheck, title: "10 Year Warranty", subtitle: "Full coverage" },
  { icon: Clock, title: "Fast Delivery", subtitle: "2-3 weeks" },
  { icon: Wrench, title: "Expert Assembly", subtitle: "Professional setup" },
];

const features = [
  "Premium upholstery with stain-resistant fabric protection",
  "Solid wood frame construction for lasting durability",
  "Hand-crafted details and expert finishing",
  "Ergonomically designed for maximum comfort",
  "10-year structural warranty included",
  "Complimentary white-glove delivery service",
  "Professional assembly and setup included",
  "Eco-friendly and sustainably sourced materials",
];

export function PackageDetail() {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("Features & Benefits");

  const nextImage = () => setActiveImage((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setActiveImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section className="py-12 lg:py-20 px-4 sm:px-10 lg:px-16 max-w-8xl mx-auto">
      <div className="w-full flex flex-col gap-10">
        {/* Top: Images */}
        <div className="w-full flex flex-col gap-4">
          {/* Main Image */}
          <div className="relative aspect-16/9 sm:aspect-2/1 w-full rounded-[24px] overflow-hidden group">
            <Image
              src={images[activeImage]}
              alt="Package Detail"
              fill
              className="object-cover transition-transform duration-500"
            />
            {/* Badges */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
              <span className="bg-[#C9A76A] text-white text-[11px] sm:text-[12px] font-bold px-4 py-2 rounded-full uppercase tracking-wide shadow-sm">
                Save 27%
              </span>
            </div>

            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
              <span className="bg-[#1A1A1A]/80 backdrop-blur-md text-white text-[11px] sm:text-[12px] font-medium px-4 py-1.5 rounded-full shadow-sm">
                {activeImage + 1} / {images.length}
              </span>
            </div>

            {/* Nav Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-10 sm:w-12 h-10 sm:h-12 bg-white/90 rounded-[14px] sm:rounded-[16px] flex items-center justify-center shadow-lg hover:bg-white transition-colors cursor-pointer">
              <ChevronLeft className="w-5 h-5 text-[#1A1A1A]" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-10 sm:w-12 h-10 sm:h-12 bg-white/90 rounded-[14px] sm:rounded-[16px] flex items-center justify-center shadow-lg hover:bg-white transition-colors cursor-pointer">
              <ChevronRight className="w-5 h-5 text-[#1A1A1A]" />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-3 sm:gap-4">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`relative aspect-16/10 sm:aspect-4/3 w-full rounded-[16px] overflow-hidden border-2 transition-all cursor-pointer ${
                  activeImage === idx
                    ? "border-[#412A1F] shadow-sm scale-100"
                    : "border-transparent hover:border-[#EBEBEB] scale-[0.98]"
                }`}>
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full flex flex-col max-w-8xl mx-auto">
          {/* Metadata */}
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex items-center gap-2">
              <div className="bg-[#FCF9F3] text-[#C9A76A] px-3.5 py-1.5 rounded-full flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase border border-[#F2EAD9]">
                <div className="w-[5px] h-[5px] rounded-full bg-[#C9A76A]" />
                Living Room
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-[#453127] leading-tight">
              Modern Living Essentials
            </h1>

            <div className="flex items-center gap-3">
              <div className="bg-[#BCA37F] text-white px-2.5 py-1 rounded-[6px] flex items-center gap-1.5 text-[12px] font-bold">
                <Star className="w-3.5 h-3.5 fill-white text-white" />
                4.8
              </div>
              <span className="text-[#888888] text-[13px] font-medium">
                Based on <span className="font-bold text-[#444444]">124</span>{" "}
                reviews
              </span>
            </div>

            <p className="text-[#5D4E3C]/80 text-[14px] sm:text-[15px] leading-relaxed mt-1">
              Complete your living room with this contemporary furniture set.
              Expertly curated collection featuring premium materials and
              timeless design that transforms any space. Each piece is carefully
              selected to ensure perfect harmony and lasting quality.
            </p>
          </div>

          {/* Price Box */}
          <div className="bg-linear-to-r from-white via-[#FFF8F0] to-white border border-[#F2EFE9] rounded-[20px] p-6 lg:p-8 mb-8 shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
            <div className="flex items-end gap-3 mb-4">
              <span className="text-4xl lg:text-[46px] font-bold text-[#412A1F] leading-none tracking-tight">
                AED 2,399
              </span>
              <span className="text-[#5D4E3C]/30 text-[16px] lg:text-[20px] font-medium tracking-tight line-through mb-1.5">
                AED 3,299
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <div className="bg-[#F0FDF4] text-[#008236] w-max px-3 py-1 rounded-full flex items-center gap-1.5 text-[11px] font-bold tracking-wide">
                <Check className="w-3.5 h-3.5 stroke-3" />
                Save AED 900
              </div>
              <div className="flex items-center gap-1.5 text[#5D4E3C]/80 text-[11px] font-medium">
                <Clock className="w-3.5 h-3.5" />
                35% savings vs. individual items
              </div>
            </div>
          </div>

          {/* Quantity & Actions */}
          <div className="flex flex-col gap-4 mb-10 w-full max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center justify-between border border-[#EBEBEB] rounded-[8px] h-[52px] sm:w-[150px] px-4 shrink-0 bg-white">
                <span className="text-[14px] text-[#888888] font-medium">
                  Quantity
                </span>
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-5 h-5 rounded-full border border-[#EBEBEB] flex items-center justify-center text-[#888888] hover:text-[#1A1A1A] hover:border-[#1A1A1A] transition-colors cursor-pointer shrink-0">
                    <Minus className="w-2.5 h-2.5" />
                  </button>
                  <span className="text-[14px] font-bold text-[#1A1A1A] min-w-[12px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-5 h-5 rounded-full border border-[#EBEBEB] flex items-center justify-center text-[#888888] hover:text-[#1A1A1A] hover:border-[#1A1A1A] transition-colors cursor-pointer shrink-0">
                    <Plus className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>

              <Button className="flex-1 h-[52px] bg-[#4B3B33] hover:bg-[#32231A] text-white rounded-[8px] text-[14px] font-bold flex items-center justify-center gap-2.5 transition-all shadow-md cursor-pointer">
                <ShoppingCart className="w-[18px] h-[18px]" />
                Add to Cart
              </Button>
            </div>

            <Button className="w-full h-[52px] bg-white border border-[#D9D1C7] hover:border-[#4B3B33] text-[#4B3B33] rounded-[8px] text-[14px] font-bold flex items-center justify-center transition-all bg-[#FCFBF9] shadow-sm cursor-pointer">
              Buy Now - Fast Checkout
            </Button>
          </div>

          {/* What's Included label grid */}
          <div className="mb-14">
            <h4 className="text-[16px] font-bold text-[#1A1A1A] mb-5">
              What's Included
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {includedFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 bg-white border border-[#F2F2F2] rounded-[16px] p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                  <div className="w-12 h-12 bg-[#FDFBF7] border border-[#F0EBE0] rounded-[12px] flex items-center justify-center shrink-0">
                    <feat.icon
                      className="w-5 h-5 text-[#C9A76A]"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-[#333333] mb-0.5">
                      {feat.title}
                    </span>
                    <span className="text-[11px] text-[#888888] font-medium">
                      {feat.subtitle}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-[#FCFBFA] p-1.5 rounded-[12px] flex items-center justify-between mb-8 max-w-[500px] mx-auto w-full border border-[#F2F2F2]">
            {["Features & Benefits", "Specifications", "What's Included"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2.5 px-2 text-[12px] font-bold rounded-[8px] transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === tab
                      ? "bg-linear-to-r from-[#C9A76A] to-[#B3905A] text-white shadow-md shadow-[#C9A76A]/20"
                      : "text-[#888888] hover:text-[#1A1A1A]"
                  }`}>
                  {tab}
                </button>
              ),
            )}
          </div>

          {/* Features Detail Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-10">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#F2F2F2] p-4 rounded-[14px] flex items-center gap-3 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                <div className="w-6 h-6 rounded-full bg-linear-to-r from-[#C9A76A] to-[#B3905A] flex items-center justify-center shrink-0 shadow-sm shadow-[#C9A76A]/20">
                  <Check className="w-3 h-3 text-white stroke-3" />
                </div>
                <span className="text-[12px] text-[#555555] font-semibold leading-tight pr-2">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
