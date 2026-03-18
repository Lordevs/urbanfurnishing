"use client";

import Image from "next/image";
import Link from "next/link";

import { ROUTES } from "@/constants/route";
import type { PackageProperty } from "@/types/api";

interface PackageItemsGridProps {
  selectedType: PackageProperty;
}

export function PackageItemsGrid({ selectedType }: PackageItemsGridProps) {
  if (!selectedType.items || selectedType.items.length === 0) return null;

  return (
    <section className="bg-[#FAFAFA] py-24">
      <div className="max-w-8xl mx-auto px-4 sm:px-10 lg:px-16">
        <h2 className="text-3xl font-serif font-bold text-[#412A1F] mb-12">
          Items in this Package
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {selectedType.items.map((item) => (
            <Link
              key={item.id}
              href={ROUTES.SINGLE_PRODUCT_DETAIL(item.product_slug)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-white">
                {item.product_thumbnail ? (
                  <Image
                    src={item.product_thumbnail}
                    alt={item.product_name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-200">
                    No Image
                  </div>
                )}
              </div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">
                {item.quantity} units
              </p>
              <h3 className="text-sm font-bold text-[#412A1F] group-hover:text-[#C9A76A] transition-colors line-clamp-1">
                {item.product_name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
