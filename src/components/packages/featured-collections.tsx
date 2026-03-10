"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ShoppingCart } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const collections = [
  {
    category: "LIVING ROOM",
    title: "Modern Living Essentials",
    description:
      "Complete your living room with this contemporary furniture set",
    features: ["3-Seater Sofa", "Coffee Table", "2 Accent Chairs", "TV Stand"],
    pieces: 8,
    price: "AED 2,299",
    originalPrice: "AED 3,299",
    // Looking at the right card image it has "Save AED 1000 (24% off)", left card has "Save AED900 (24% off)" but left card price diff is 1000.
    // Wait, 3299 - 2299 = 1000. So let's make it AED 1000.
    saveText: "Save AED 1000 (24% off)",
    badge1: "BEST SELLER",
    badge1Color: "bg-[#D1B072]",
    badge2: "-24% OFF",
    image: "/landing/packages/feature-image-1.webp",
  },
  {
    category: "BEDROOM",
    title: "Luxury Bedroom Suite",
    description: "Transform your bedroom into a luxurious retreat",
    features: ["King Size Bed Frame", "2 Nightstands", "Dresser", "Mirror"],
    pieces: 6,
    price: "AED 3,199",
    originalPrice: "", // Original price doesn't appear explicitly crossed out, but let's see. The design shows "Save AED 1000" below it.
    saveText: "Save AED 1000 (24% off)",
    badge1: "PREMIUM",
    badge1Color: "bg-[#D1B072]",
    badge2: "-24% OFF",
    image: "/landing/packages/feature-image-2.webp",
  },
];

export function FeaturedCollections() {
  return (
    <section className="py-24 px-4 sm:px-10 lg:px-16 max-w-8xl mx-auto overflow-hidden">
      <div className="mb-10 text-left">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-[40px] font-bold text-[#1A1A1A] mb-3 tracking-tight">
          Featured Collections
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[#666666] text-lg font-light">
          Our most loved packages, handpicked for you
        </motion.p>
      </div>

      <div className="relative">
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full">
          <CarouselContent className="-ml-6">
            {collections.map((item, index) => (
              <CarouselItem
                key={index}
                className="pl-6 md:basis-full lg:basis-1/2">
                <div className="flex flex-col sm:flex-row bg-white rounded-[24px] overflow-hidden border border-[#F0F0F0] shadow-[0_8px_30px_rgba(0,0,0,0.04)] h-full min-h-[460px]">
                  {/* Left: Image */}
                  <div className="relative w-full sm:w-[45%] shrink-0 min-h-[300px] sm:min-h-full bg-[#f8f8f8]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />

                    {/* Badges */}
                    <div className="absolute top-5 left-5 flex flex-col gap-2.5">
                      <span
                        className={`px-3.5 py-1.5 rounded-md ${item.badge1Color} text-white text-[10.5px] font-semibold tracking-wider uppercase text-center w-max`}>
                        {item.badge1}
                      </span>
                      <span className="px-3.5 py-1.5 rounded-md bg-[#1A1A1A] text-white text-[10.5px] font-semibold tracking-wider uppercase text-center w-max">
                        {item.badge2}
                      </span>
                    </div>

                    {/* Heart Button */}
                    <button className="absolute top-5 right-5 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform">
                      <Heart className="w-4 h-4 text-[#1A1A1A]" />
                    </button>
                  </div>

                  {/* Right: Content */}
                  <div className="flex-1 p-7 lg:p-9 flex flex-col justify-between">
                    <div>
                      <h4 className="text-[#C9A76A] text-[10.5px] font-bold tracking-[0.15em] uppercase mb-2">
                        {item.category}
                      </h4>
                      <h3 className="text-[26px] font-bold text-[#1A1A1A] leading-tight mb-3">
                        {item.title}
                      </h3>
                      <p className="text-[#666666] text-[14.5px] mb-6 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Features Grid */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {item.features.map((feature, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2.5 bg-[#FDFDFD] border border-[#F5F5F5] px-3.5 py-2.5 rounded-lg">
                            <div className="w-[5px] h-[5px] rounded-full bg-[#D1B072] shrink-0" />
                            <span className="text-[12.5px] text-[#333333] font-medium leading-tight">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Pieces Info */}
                      <div className="flex items-center gap-2 mb-7 text-[#1A1A1A]">
                        <svg
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="#C9A76A"
                          className="w-5 h-5">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                          />
                        </svg>
                        <span className="text-[13.5px] font-medium">
                          {item.pieces} Premium Pieces
                        </span>
                      </div>
                    </div>

                    {/* Footer / Price Area */}
                    <div className="border-t border-[#F0F0F0] pt-6 flex items-end justify-between">
                      <div>
                        <p className="text-[#888888] text-[12px] mb-1">
                          Package Price
                        </p>
                        <div className="flex items-baseline gap-2.5 mb-1.5">
                          <span className="text-[26px] font-bold text-[#1A1A1A] leading-none">
                            {item.price}
                          </span>
                          {item.originalPrice && (
                            <span className="text-[#AAAAAA] text-[14px] line-through decoration-[#CCCCCC]">
                              {item.originalPrice}
                            </span>
                          )}
                        </div>
                        <p className="text-[#C9A76A] text-[11.5px] font-medium">
                          {item.saveText}
                        </p>
                      </div>

                      <Button className="bg-[#3D261C] hover:bg-[#2C1A11] text-white rounded-[12px] px-5 sm:px-6 h-auto font-medium flex items-center gap-2 transition-all shadow-md">
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden lg:block">
            <CarouselPrevious className="absolute -left-5 sm:-left-8 top-1/2 -translate-y-1/2 flex items-center justify-center w-[54px] h-[54px] bg-[#FBEBD9] border-none text-[#3D261C] hover:bg-[#F3DECA] hover:text-[#2C1A11] shadow-lg [&_svg]:w-6! [&_svg]:h-6! [&_svg]:stroke-1!" />
            <CarouselNext className="absolute -right-5 sm:-right-8 top-1/2 -translate-y-1/2 flex items-center justify-center w-[54px] h-[54px] bg-[#FBEBD9] border-none text-[#3D261C] hover:bg-[#F3DECA] hover:text-[#2C1A11] shadow-lg [&_svg]:w-6! [&_svg]:h-6! [&_svg]:stroke-1!" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
