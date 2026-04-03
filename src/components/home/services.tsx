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

interface PackageCardImageProps {
  thumbnail: string | null | undefined;
  images: Array<{ image: string }>;
  alt: string;
}

function PackageCardImage({ thumbnail, images, alt }: PackageCardImageProps) {
  const [index, setIndex] = useState(0);

  // Combine thumbnail with images if needed, ensuring unique URLs
  const allImages = useMemo(() => {
    const list = images.map((img) => img.image);
    if (thumbnail && !list.includes(thumbnail)) {
      list.unshift(thumbnail);
    }
    return list.slice(0, 5); // Limit to 5 for the card
  }, [thumbnail, images]);

  useEffect(() => {
    if (allImages.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % allImages.length);
    }, 4000); // 4 seconds for services card
    return () => clearInterval(timer);
  }, [allImages.length]);

  return (
    <div className="absolute inset-0">
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{
            duration: 0.8,
            ease: [0.32, 0.72, 0, 1],
          }}
          className="absolute inset-0">
          <Image
            src={
              allImages[index] || "/landing/home/services/services-img-1.webp"
            }
            alt={alt}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dynamic Pills for Inner Image Gallery */}
      {allImages.length > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {allImages.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                index === i 
                  ? "bg-white w-7" 
                  : "bg-white/40 w-1.5"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

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
    <section id="services" className="py-16 sm:py-24 overflow-hidden">
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
            className="text-4xl sm:text-5xl md:text-[56px] font-serif text-primary leading-tight">
            Discover Furniture{" "}
            <span className="text-secondary font-serif">Packages</span>
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
                  ? "bg-[#8A6A4A] border-secondary text-white shadow-lg"
                  : "bg-transparent border-[#E5E0DA] text-[#5D4E3C] hover:border-[#3D261C]",
              )}>
              {category}
            </motion.button>
          ))}
        </div>

        {/* Content Section */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-secondary animate-spin" />
            <p className="text-[#5D4E3C] font-medium">Fetching Packages...</p>
          </div>
        ) : isError ? (
          <div className="text-center py-20 text-red-500">
            Failed to load packages. Please try again later.
          </div>
        ) : (
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
                      className="pl-4 md:pl-8 basis-full md:basis-1/3">
                      <motion.div
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="group">
                        <Link
                          href={`/packages/${getCategorySlug(pkg!.category_name)}/${pkg!.slug}`}
                          className="relative block aspect-16/11 rounded-lg overflow-hidden mb-6 bg-[#F5F5F5] cursor-pointer group shadow-sm transition-shadow duration-300 hover:shadow-xl border border-black/5">
                          <PackageCardImage
                            thumbnail={pkg!.thumbnail}
                            images={pkg!.images || []}
                            alt={pkg!.name}
                          />
                          {pkg!.tag === "BEST_SELLER" && (
                            <div className="absolute top-4 right-4 bg-[#C9A76A] text-white px-4 py-1.5 text-[11px] sm:text-xs rounded-full font-bold z-10 shadow-lg tracking-wider uppercase">
                              Bestseller
                            </div>
                          )}
                        </Link>

                        <div className="space-y-4 px-1">
                          <p className="text-primary text-sm sm:text-base font-medium">
                            From{" "}
                            <span className="font-bold text-[#3D261C] text-lg sm:text-xl">
                              {pkg!.displayPrice.toLocaleString()}
                            </span>{" "}
                            AED
                          </p>
                          <Link
                            href={`/packages/${getCategorySlug(pkg!.category_name)}/${pkg!.slug}`}
                            className="group/link inline-flex items-center gap-2 text-lg sm:text-xl font-medium text-primary transition-colors hover:text-secondary group-hover/link:text-secondary">
                            Explore{" "}
                            <span className="font-bold border-b-2 border-primary pb-1.5 leading-none transition-all group-hover/link:border-secondary group-hover/link:pb-1">
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
            <div className="flex items-center justify-center gap-10 mt-16">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-12 h-12 border-[#E5E0DA] hover:bg-secondary hover:border-secondary hover:text-white transition-all disabled:opacity-30 shadow-sm"
                onClick={() => api?.scrollPrev()}
                disabled={!canScrollPrev}>
                <ArrowLeft className="w-5 h-5" />
              </Button>

              <div className="flex gap-3">
                {Array.from({ length: count }).map((_, i) => (
                  <button
                    key={i}
                    className={cn(
                      "h-1.5 transition-all duration-300 rounded-full",
                      current === i
                        ? "bg-secondary w-8"
                        : "bg-[#D1D5DB] w-3 hover:bg-gray-400",
                    )}
                    onClick={() => api?.scrollTo(i)}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-12 h-12 border-[#E5E0DA] hover:bg-secondary hover:border-secondary hover:text-white transition-all disabled:opacity-30 shadow-sm"
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
