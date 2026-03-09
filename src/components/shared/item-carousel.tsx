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
import { cn } from "@/lib/utils";

export interface CarouselItemData {
  id: string | number;
  title: string;
  img: string;
  fields?: { label?: string; value: string }[];
  description?: string;
  buttonText?: string;
}

interface ItemCarouselProps {
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  items: CarouselItemData[];
  defaultButtonText?: string;
  className?: string; // Add optional className to section wrapper
}

export function ItemCarousel({
  titlePrefix,
  titleHighlight,
  description,
  items,
  defaultButtonText = "Package Details",
  className,
}: ItemCarouselProps) {
  return (
    <section
      className={cn(
        "w-full px-4 sm:px-10 lg:px-16 max-w-8xl mx-auto py-20",
        className,
      )}>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-6">
        <h2 className="text-5xl sm:text-6xl font-semibold tracking-tight">
          <span className="text-[#1a1a1a]">{titlePrefix} </span>
          <span className="text-[#C9A76A]">{titleHighlight}</span>
        </h2>
        <p className="max-w-md lg:max-w-xl text-gray-500 text-sm sm:text-lg leading-relaxed">
          {description}
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
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="pl-3 sm:pl-5 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <div className="relative group rounded-[24px] overflow-hidden w-full aspect-3/4 sm:aspect-4/5 md:aspect-3/4 cursor-pointer border border-[#F5E6E0]">
                  {/* Image Background */}
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Hover Overlay Gradient */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 50%, #000000 100%)",
                    }}>
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 z-10 w-full">
                      <h3 className="text-white text-2xl font-semibold mb-2 drop-shadow-md">
                        {item.title}
                      </h3>

                      {item.description && (
                        <p className="text-white/85 text-[13px] leading-relaxed mb-6 font-light">
                          {item.description}
                        </p>
                      )}

                      {item.fields && item.fields.length > 0 && (
                        <div className="mb-6 space-y-1">
                          {item.fields.map((field, idx) => (
                            <p key={idx} className="text-white/85 text-[15px]">
                              {field.label ? `${field.label} : ` : ""}
                              {field.value}
                            </p>
                          ))}
                        </div>
                      )}

                      <div className="w-full bg-[#412A1F] rounded-full p-2 pl-6 flex items-center justify-between shadow-lg mb-1 pointer-events-auto hover:bg-[#2b1b14] transition-colors">
                        <span className="text-white text-sm font-medium">
                          {item.buttonText || defaultButtonText}
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
