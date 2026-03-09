"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const packagesData = [
  {
    id: 1,
    title: "Investor Turnkey",
    packageStr: "Package - 1",
    focus: "Rental-Ready",
    img: "/landing/home/packages-img-1.webp",
  },
  {
    id: 2,
    title: "Modern Architectural",
    packageStr: "Package - 2",
    focus: "Clean aesthetics",
    img: "/landing/home/packages-img-2.webp",
  },
  {
    id: 3,
    title: "Luxury Corporate",
    packageStr: "Package - 3",
    focus: "Premium Standard",
    img: "/landing/home/packages-img-3.webp",
  },
  {
    id: 4,
    title: "Warm Minimalist",
    packageStr: "Package - 4",
    focus: "Inviting Tones",
    img: "/landing/home/packages-img-4.webp",
  },
];

export default function Packages() {
  return (
    <section className="w-full px-4 sm:px-10 lg:px-16 max-w-8xl mx-auto">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-6">
        <h2 className="text-5xl sm:text-6xl font-semibold tracking-tight">
          <span className="text-[#1a1a1a]">Our </span>
          <span className="text-[#C9A76A]">Packages</span>
        </h2>
        <p className="max-w-md lg:max-w-xl text-gray-500 text-sm sm:text-base leading-relaxed">
          Choose from our curated packages designed to meet different needs.
          From fast rental-ready properties to personalized luxury interiors and
          scalable developer solutions.
        </p>
      </div>

      <div className="relative">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full">
          <CarouselContent className="-ml-3 sm:-ml-5">
            {packagesData.map((pkg, idx) => (
              <CarouselItem
                key={pkg.id}
                className="pl-3 sm:pl-5 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <div className="relative group rounded-[24px] overflow-hidden w-full aspect-3/4 sm:aspect-4/5 md:aspect-3/4 cursor-pointer">
                  {/* Image Background */}
                  <Image
                    src={pkg.img}
                    alt={pkg.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Hover Overlay Gradient */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,1) 100%)",
                    }}>
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 z-10 w-full">
                      <h3 className="text-white text-2xl font-semibold mb-2 drop-shadow-md">
                        {pkg.title}
                      </h3>
                      <p className="text-white/85 text-[15px] mb-1">
                        Package : {pkg.packageStr}
                      </p>
                      <p className="text-white/85 text-[15px] mb-6">
                        Focus : {pkg.focus}
                      </p>

                      <div className="w-full bg-[#412A1F] rounded-full p-2 pl-6 flex items-center justify-between shadow-lg mb-1 pointer-events-auto hover:bg-[#2b1b14] transition-colors">
                        <span className="text-white text-sm font-medium">
                          Package Details
                        </span>
                        <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center shrink-0">
                          <ArrowUpRight className="w-4 h-4 text-[#412A1F]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Nav arrows customized to match image */}
          <div className="hidden sm:block">
            <CarouselPrevious className="absolute -left-5 lg:-left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#FDF9F1] border-none shadow-md hover:bg-[#F3EFE7] text-[#412A1F]" />
            <CarouselNext className="absolute -right-5 lg:-right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#FDF9F1] border-none shadow-md hover:bg-[#F3EFE7] text-[#412A1F]" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
