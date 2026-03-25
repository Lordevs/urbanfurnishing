"use client";

import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import type { PackageImage } from "@/types/api";

interface PackageGalleryProps {
  images: PackageImage[];
  packageName: string;
}

export function PackageGallery({ images, packageName }: PackageGalleryProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [activeImage, setActiveImage] = useState(0);
  
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setActiveImage(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const scrollTo = (index: number) => {
    api?.scrollTo(index);
  };

  if (images.length === 0) {
    return (
      <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center text-gray-300">
        No Image Available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Gallery */}
      <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden group bg-gray-50">
        <Carousel
          setApi={setApi}
          plugins={[plugin.current]}
          className="w-full"
        >
          <CarouselContent>
            {images.map((img) => (
              <CarouselItem key={img.id}>
                <div className="relative w-full aspect-4/3">
                  <Image
                    src={img.image}
                    alt={img.alt_text || packageName}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {images.length > 1 && (
          <>
            <button
              onClick={() => api?.scrollPrev()}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <ChevronLeft className="w-5 h-5 text-[#412A1F]" />
            </button>
            <button
              onClick={() => api?.scrollNext()}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <ChevronRight className="w-5 h-5 text-[#412A1F]" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-3">
          {images.slice(0, 5).map((img, idx) => (
            <button
              key={img.id}
              onClick={() => scrollTo(idx)}
              className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                activeImage === idx
                  ? "border-[#412A1F]"
                  : "border-transparent"
              }`}
            >
              <Image
                src={img.image}
                alt="thumbnail"
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
