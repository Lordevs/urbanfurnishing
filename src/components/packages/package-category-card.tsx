"use client";

import Autoplay from "embla-carousel-autoplay";
import { ArrowRight, LayoutGrid } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ROUTES } from "@/constants/route";
import type { PackageCategoryExtended } from "@/types/api";

interface Props {
  category: PackageCategoryExtended;
}

export function PackageCategoryCard({ category }: Props) {
  const router = useRouter();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(0);

  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true }),
  );

  const slides: {
    type: "category" | "package";
    id: string;
    image: string;
    name: string;
    slug?: string;
  }[] = [];

  if (category.image) {
    slides.push({
      type: "category",
      id: `cat-${category.id}`,
      image: category.image,
      name: category.name,
    });
  }

  category.packages.forEach((pkg) => {
    if (pkg.thumbnail) {
      slides.push({
        type: "package",
        id: `pkg-${pkg.id}`,
        image: pkg.thumbnail,
        name: pkg.name,
        slug: pkg.slug,
      });
    }
  });

  useEffect(() => {
    if (!api) return;

    // Use setTimeout to avoid synchronous state updates during render phase (satisfies react linter)
    const initTimer = setTimeout(() => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);
    }, 0);

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    api.on("select", onSelect);

    return () => {
      clearTimeout(initTimer);
      api.off("select", onSelect);
    };
  }, [api]);

  const handleCardClick = () => {
    router.push(ROUTES.PACKAGES_CATEGORY(category.slug));
  };

  const handleSlideClick = (e: React.MouseEvent, slide: (typeof slides)[0]) => {
    e.stopPropagation();

    if (slide.type === "package" && slide.slug) {
      router.push(ROUTES.PACKAGES_DETAIL(slide.slug, category.slug));
    } else {
      handleCardClick();
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white rounded-3xl overflow-hidden border border-gray-100 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
    >
      <div className="w-full relative overflow-hidden bg-[#F5F1EE] aspect-3/2 group/image">
        {slides.length > 0 ? (
          <>
            <Carousel
              setApi={setApi}
              plugins={[plugin.current]}
              className="w-full h-full relative group/carousel"
            >
              <CarouselContent>
                {slides.map((slide) => (
                  <CarouselItem key={slide.id}>
                    <div
                      onClick={(e) => handleSlideClick(e, slide)}
                      className="w-full aspect-3/2 relative cursor-pointer"
                    >
                      <Image
                        src={slide.image}
                        alt={slide.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        priority={slide.type === "category"}
                        unoptimized
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-6 text-center pointer-events-none z-20">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-white text-[10px] font-bold uppercase tracking-[0.25em] mb-2 opacity-80">
                    {slides[current - 1]?.type === "category"
                      ? "Collection"
                      : "Package"}
                  </p>
                  <h4 className="text-white text-xl md:text-2xl font-serif leading-tight">
                    {slides[current - 1]?.name}
                  </h4>
                </div>
              </div>

              {/* {slides.length > 1 && (
                <div onClick={(e) => e.stopPropagation()}>
                  <CarouselPrevious className="left-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white z-40" />
                  <CarouselNext className="right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white z-40" />
                </div>
              )} */}
            </Carousel>

            {slides.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-30 pointer-events-none">
                {Array.from({ length: count }).map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full transition-all duration-300 ${index + 1 === current
                        ? "w-4 bg-white"
                        : "w-1.5 bg-white/50"
                      }`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#8F877C] text-sm italic">
            No images available
          </div>
        )}
      </div>

      <div className="p-8 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-gray-50">
            <LayoutGrid className="w-5 h-5 text-[#412A1F]" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold font-serif text-[#1A1A1A]">
            {category.name}
          </h3>
        </div>

        {category.description && (
          <p className="text-sm text-[#4A5565] leading-relaxed mb-6 line-clamp-3">
            {category.description}
          </p>
        )}

        {/* View Details Button */}
        <div className="mt-auto flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-[#412A1F] text-white text-sm font-medium hover:bg-[#2C1A11] transition-colors group/btn">
          Explore Collection
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
}
