"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";

import { ROUTES } from "@/constants/route";
import { cn } from "@/lib/utils";
import type { PackageProperty } from "@/types/api";

interface PackageItemsGridProps {
  selectedType: PackageProperty;
}

function ProductItemCarousel({
  images,
  alt,
}: {
  images: { image: string }[];
  alt: string;
}) {
  const [index, setIndex] = useState(0);

  // Filter to first 5 images and ensure we have unique ones
  const displayImages = useMemo(() => {
    return (images || []).slice(0, 5).map((img) => img.image);
  }, [images]);

  useEffect(() => {
    if (displayImages.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % displayImages.length);
    }, 3500); // Slightly different timing than main carousel
    return () => clearInterval(timer);
  }, [displayImages.length]);

  if (displayImages.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-200">
        No Image
      </div>
    );
  }

  return (
    <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out">
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0">
          <Image src={displayImages[index]} alt={alt} fill className="object-cover" />
        </motion.div>
      </AnimatePresence>

      {/* Mini Dynamic Pills */}
      {displayImages.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-10">
          {displayImages.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1 rounded-full transition-all duration-500",
                index === i ? "bg-white w-5" : "bg-white/40 w-1",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function PackageItemsGrid({ selectedType }: PackageItemsGridProps) {
  if (!selectedType.items || selectedType.items.length === 0) return null;

  return (
    <section className="py-24">
      <div className="max-w-8xl mx-auto px-4 sm:px-10 lg:px-16">
        <h2 className="text-3xl font-serif font-bold text-primary mb-12">
          Items in this Package
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {selectedType.items.map((item) => (
            <Link
              key={item.id}
              href={ROUTES.SINGLE_PRODUCT_DETAIL(item.product_slug)}
              className="group cursor-pointer">
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-5 bg-white border border-secondary/10 shadow-sm transition-shadow hover:shadow-md">
                <ProductItemCarousel
                  images={item.product_images}
                  alt={item.product_name}
                />
              </div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-[10px] text-secondary font-bold uppercase tracking-widest">
                  {item.quantity} {item.quantity > 1 ? "units" : "unit"}
                </p>
              </div>
              <h3 className="text-[15px] font-bold text-primary group-hover:text-secondary transition-colors line-clamp-1">
                {item.product_name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
