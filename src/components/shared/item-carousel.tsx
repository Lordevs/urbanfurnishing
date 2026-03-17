"use client";

import Image from "next/image";
import Link from "next/link";

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
  href?: string;
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
  id?: string;
}

export function ItemCarousel({
  titlePrefix,
  titleHighlight,
  description,
  items,
  defaultButtonText = "Package Details",
  className,
  id,
}: ItemCarouselProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section
      id={id}
      className={cn(
        "w-full px-4 sm:px-10 lg:px-16 max-w-8xl mx-auto py-2 lg:py-20",
        className,
      )}>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-6">
        <h2 className="text-3xl sm:text-6xl  font-semibold tracking-tight">
          <span className="text-[#1a1a1a] font-serif ">{titlePrefix} </span>
          <span className="text-[#C9A76A] font-serif ">{titleHighlight}</span>
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
                <Link
                  href={item.href || "#"}
                  className={cn(
                    "relative group rounded-[24px] overflow-hidden w-full aspect-3/4 sm:aspect-4/5 md:aspect-3/4 flex cursor-pointer border border-[#F5E6E0]",
                    !item.href && "pointer-events-none",
                  )}>
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
                      <h3 className="text-white font-serif text-2xl font-semibold mb-2 drop-shadow-md">
                        {item.title}
                      </h3>

                      {item.description && (
                        <p className="text-white/50 text-[13px] leading-relaxed mb-6 font-light">
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
                          <Image
                            src="/common/arrow-up.svg"
                            alt="Arrow Up"
                            width={12}
                            height={12}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Nav arrows customized to match image */}
          {items.length >= 4 && (
            <div className="hidden sm:block z-10 pointer-events-none">
              <CarouselPrevious className="absolute lg:-left-7 -left-5 top-1/2 -translate-y-1/2 w-[56px] h-[56px] bg-[#FFEDD9] border-none shadow-none hover:bg-[#FFEDD9] hover:brightness-95 hover:scale-105 transition-all text-[#2B1B12] pointer-events-auto z-20 disabled:opacity-100 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:brightness-100">
                <Image
                  src="/common/arrow-left.svg"
                  alt="Previous"
                  width={24}
                  height={24}
                />
              </CarouselPrevious>
              <CarouselNext className="absolute lg:-right-7 -right-5 top-1/2 -translate-y-1/2 w-[56px] h-[56px] bg-[#FFEDD9] border-none shadow-none hover:bg-[#FFEDD9] hover:brightness-95 hover:scale-105 transition-all text-[#2B1B12] pointer-events-auto z-20 disabled:opacity-100 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:brightness-100">
                <Image
                  src="/common/arrow-right.svg"
                  alt="Next"
                  width={24}
                  height={24}
                />
              </CarouselNext>
            </div>
          )}
        </Carousel>
      </div>
    </section>
  );
}
