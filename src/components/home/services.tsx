"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowRightIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { usePackages } from "@/hooks/queries/use-packages";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "STUDIO",
  "1 BEDROOM",
  "2 BEDROOM",
  "3 BEDROOM",
  "VILLA",
  "KIDS",
];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("STUDIO");
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const { data, isLoading, isError } = usePackages({ page_size: 100 });

  // Filter packages based on active category
  const activePackages = useMemo(() => {
    if (!data?.results) return [];

    return data.results
      .map((pkg) => {
        // Find the property that matches the active category
        const matchingProperty = pkg.properties_info.find((prop) => {
          const name = prop.name.toUpperCase();
          if (activeCategory === "STUDIO") return name.includes("STUDIO");
          if (activeCategory === "VILLA") return name.includes("VILLA");
          if (activeCategory === "KIDS") return name.includes("KIDS");
          return name.includes(activeCategory);
        });

        if (!matchingProperty) return null;

        return {
          ...pkg,
          displayPrice: matchingProperty.price,
          propertyName: matchingProperty.name,
        };
      })
      .filter((pkg) => pkg !== null);
  }, [data, activeCategory]);

  // Filter categories that have at least one package
  const availableCategories = useMemo(() => {
    if (!data?.results) return [];

    return CATEGORIES.filter((category) => {
      return data.results.some((pkg) => {
        return pkg.properties_info.some((prop) => {
          const name = prop.name.toUpperCase();
          if (category === "STUDIO") return name.includes("STUDIO");
          if (category === "VILLA") return name.includes("VILLA");
          if (category === "KIDS") return name.includes("KIDS");
          return name.includes(category);
        });
      });
    });
  }, [data]);

  // Set initial category to the first available one if current one is not available
  useEffect(() => {
    if (
      availableCategories.length > 0 &&
      !availableCategories.includes(activeCategory)
    ) {
      setActiveCategory(availableCategories[0]);
    }
  }, [availableCategories]);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    setCount(api.scrollSnapList().length);
    onSelect();

    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  // Reset carousel when category or data changes
  useEffect(() => {
    if (api) {
      api.scrollTo(0);
    }
  }, [activeCategory, api, data]);

  const getCategorySlug = (categoryName: string | null | undefined) => {
    return (categoryName || "general").toLowerCase().replace(/ /g, "-");
  };

  if (!isLoading && !isError && (!data?.results || data.results.length === 0)) {
    return null;
  }

  return (
    <section id="services" className="py-16 sm:py-24 bg-white overflow-hidden">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#C9A76A] font-medium tracking-[0.2em] text-xs sm:text-sm uppercase mb-4">
            EXPLORE BY STYLE & SPACE
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-[56px] font-serif text-[#3D261C] leading-tight">
            Discover Furniture{" "}
            <span className="text-[#C9A76A] font-serif">Packages</span>
          </motion.h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {availableCategories.map((category, idx) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-6 py-2.5 rounded-full text-xs sm:text-[13px] font-medium transition-all duration-300 border",
                activeCategory === category
                  ? "bg-[#3D261C] border-[#3D261C] text-white shadow-lg"
                  : "bg-transparent border-[#E5E0DA] text-[#5D4E3C] hover:border-[#3D261C]",
              )}>
              {category}
            </motion.button>
          ))}
        </div>

        {/* Content Section */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-[#C9A76A] animate-spin" />
            <p className="text-[#5D4E3C] font-medium">Fetching Packages...</p>
          </div>
        ) : isError ? (
          <div className="text-center py-20 text-red-500">
            Failed to load packages. Please try again later.
          </div>
        ) : activePackages.length === 0 ? null : (
          <div className="relative max-w-8xl mx-auto">
            <Carousel
              setApi={setApi}
              opts={{
                align: "start",
                loop: false,
              }}
              className="w-full">
              <CarouselContent className="-ml-4 md:-ml-8">
                <AnimatePresence mode="popLayout">
                  {activePackages.map((pkg, index) => (
                    <CarouselItem
                      key={`${activeCategory}-${pkg!.id}`}
                      className="pl-4 md:pl-8 basis-full md:basis-1/2 lg:basis-1/3">
                      <motion.div
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="group">
                        <Link
                          href={`/packages/${getCategorySlug(pkg!.category_name)}/${pkg!.slug}`}
                          className="relative block aspect-video rounded-xl overflow-hidden mb-6 bg-[#F5F5F5] cursor-pointer group">
                          <Image
                            src={
                              pkg!.thumbnail ||
                              "/landing/home/services/services-img-1.webp"
                            }
                            alt={pkg!.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          {pkg!.tag === "BEST_SELLER" && (
                            <div className="absolute top-4 right-4 bg-[#C9A76A] text-white px-3 py-1 text-[10px] sm:text-xs rounded-full font-medium z-10">
                              Bestseller
                            </div>
                          )}
                        </Link>

                        <div className="space-y-4">
                          <p className="text-[#5D4E3C] text-sm sm:text-base">
                            From{" "}
                            <span className="font-bold text-[#3D261C]">
                              {pkg!.displayPrice.toLocaleString()}
                            </span>{" "}
                            AED
                          </p>
                          <Link
                            href={`/packages/${getCategorySlug(pkg!.category_name)}/${pkg!.slug}`}
                            className="group/link inline-flex items-center gap-2 text-lg sm:text-xl font-medium text-[#3D261C] hover:text-black transition-colors">
                            Explore{" "}
                            <span className="font-bold underline underline-offset-4 decoration-1 group-hover/link:decoration-2 transition-all">
                              {pkg!.name} {pkg!.propertyName}
                            </span>
                            <ArrowRightIcon className="w-5 h-5 transition-transform group-hover/link:translate-x-1.5" />
                          </Link>
                        </div>
                      </motion.div>
                    </CarouselItem>
                  ))}
                </AnimatePresence>
              </CarouselContent>
            </Carousel>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6 mt-16">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-10 h-10 border-[#E5E0DA] hover:bg-[#3D261C] hover:text-white transition-all disabled:opacity-30"
                onClick={() => api?.scrollPrev()}
                disabled={!canScrollPrev}>
                <ArrowLeft className="w-5 h-5" />
              </Button>

              <div className="flex gap-2.5">
                {Array.from({ length: count }).map((_, i) => (
                  <button
                    key={i}
                    className={cn(
                      "w-2.5 h-2.5 rounded-full transition-all duration-300",
                      current === i ? "bg-[#C9A76A] scale-110" : "bg-[#D1D5DB]",
                    )}
                    onClick={() => api?.scrollTo(i)}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-10 h-10 border-[#E5E0DA] hover:bg-[#3D261C] hover:text-white transition-all disabled:opacity-30"
                onClick={() => api?.scrollNext()}
                disabled={!canScrollNext}>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
