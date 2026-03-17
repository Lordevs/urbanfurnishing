"use client";

import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { ROUTES } from "@/constants/route";
import { useCart } from "@/context/cart-context";
import { usePackages } from "@/hooks/queries/use-packages";
import type { PackageListItem } from "@/types/api";

import { FeaturedCarousel, FeaturedItem } from "../shared/featured-carousel";

const TAG_BADGE_COLOR: Record<string, string> = {
  BEST_SELLER: "bg-[#D1B072]",
  PREMIUM: "bg-[#D1B072]",
  VALUE_PACK: "bg-[#D1B072]",
  NEW: "bg-[#D1B072]",
};

function toFeaturedItem(pkg: PackageListItem): FeaturedItem {
  const actualPrice = parseFloat(pkg.actual_price ?? "0");
  const discountedPrice = pkg.discounted_price
    ? parseFloat(pkg.discounted_price)
    : undefined;

  const price = discountedPrice ?? actualPrice;
  const originalPrice = discountedPrice ? actualPrice : undefined;

  const saving = pkg.money_saved
    ? Math.round(parseFloat(pkg.money_saved))
    : undefined;

  return {
    id: pkg.id,
    slug: pkg.slug,
    category: pkg.category_name?.toUpperCase() ?? "",
    title: pkg.name,
    description: pkg.short_description ?? "",
    features: [],
    price,
    originalPrice,
    saveText: saving ? `Save AED ${saving.toLocaleString()}` : undefined,
    badge1: pkg.tag?.replace("_", " ") || undefined,
    badge1Color: pkg.tag ? TAG_BADGE_COLOR[pkg.tag] : undefined,
    badge2: pkg.discount_percentage
      ? `-${pkg.discount_percentage}% OFF`
      : undefined,
    image: pkg.thumbnail ?? "/landing/packages/feature-image-1.webp",
    itemType: "PACKAGE",
    isInStock: pkg.is_in_stock ?? true,
  };
}

// Skeleton card for loading state
function FeaturedSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row bg-white rounded-[24px] overflow-hidden border border-[#F0F0F0] min-h-[460px] animate-pulse">
      <div className="w-full sm:w-[45%] bg-[#F0EBE4]" />
      <div className="flex-1 p-7 flex flex-col gap-4">
        <div className="h-3 w-20 bg-[#F0EBE4] rounded" />
        <div className="h-7 w-3/4 bg-[#F0EBE4] rounded" />
        <div className="h-4 w-full bg-[#F0EBE4] rounded" />
        <div className="h-4 w-5/6 bg-[#F0EBE4] rounded" />
        <div className="grid grid-cols-2 gap-2 mt-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-10 bg-[#F0EBE4] rounded-[12px]" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function FeaturedCollections() {
  const router = useRouter();
  const { addItem } = useCart();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // For demo matching screenshot

  const handleAddToCart = (e: React.MouseEvent, item: FeaturedItem) => {
    e.stopPropagation();
    addItem({
      id: item.id,
      slug: item.slug,
      name: item.title,
      price: item.price,
      quantity: 1,
      image: item.image,
      color: item.category,
      itemType: item.itemType || "PACKAGE",
    });
    router.push(ROUTES.CART);
  };

  const getPageNumbers = () => {
    return [1, 2, "...", 9, 10];
  };
  const { data, isLoading } = usePackages({ is_featured: true, page_size: 6 });

  if (isLoading) {
    return (
      <section className="py-20 px-4 sm:px-10 lg:px-16 max-w-8xl mx-auto">
        <div className="h-10 w-64 bg-[#F0EBE4] rounded animate-pulse mb-4" />
        <div className="h-5 w-80 bg-[#F0EBE4] rounded animate-pulse mb-10" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FeaturedSkeleton />
          <FeaturedSkeleton />
        </div>
      </section>
    );
  }

  const items = (data?.results ?? []).map(toFeaturedItem);

  return (
    <section className="py-10 sm:py-20 w-full max-w-8xl mx-auto overflow-hidden">
      {/* Mobile View */}
      <div className="md:hidden flex flex-col px-4">
        <div className="mb-6 text-left">
          <h2 className="text-2xl font-sans font-bold text-[#1A1A1A] tracking-tight mb-2">
            Featured Collections
          </h2>
          <p className="text-[#666666] text-xs font-light">
            Our most loved packages, handpicked for you
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => router.push(ROUTES.PACKAGES_DETAIL(item.slug))}
              className="bg-white rounded-[16px] shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-[#F0EBE6] overflow-hidden flex flex-col cursor-pointer"
            >
              {/* Image Section */}
              <div className="relative w-full aspect-4/3 bg-[#f8f8f8]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {item.badge1 && (
                    <span className="bg-[#D1B072] text-white text-[10px] font-bold tracking-wider px-3 py-1.5 rounded-[6px] w-max">
                      {item.badge1}
                    </span>
                  )}
                  {item.badge2 && (
                    <span className="bg-[#1A1A1A] text-white text-[10px] font-bold tracking-wider px-3 py-1.5 rounded-[6px] w-max">
                      {item.badge2}
                    </span>
                  )}
                  {!item.isInStock && (
                    <span className="bg-red-600 text-white text-[10px] font-bold tracking-wider px-3 py-1.5 rounded-[6px] w-max">
                      OUT OF STOCK
                    </span>
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-5 flex flex-col flex-1">
                {/* Header row: category and rating */}
                <div className="flex justify-between items-center mb-2.5">
                  <h4 className="text-[#C9A76A] text-[10px] font-bold tracking-widest uppercase">
                    {item.category}
                  </h4>
                </div>

                <h3 className="text-[18px] font-serif font-bold text-[#1A1A1A] leading-tight mb-2">
                  {item.title}
                </h3>

                <p className="text-[#666666] text-[13px] leading-relaxed mb-5">
                  {item.description}
                </p>

                {/* Separator */}
                <div className="w-full h-px bg-[#F0F0F0] mb-4" />

                {/* Pricing Area */}
                <div className="flex flex-col mb-5">
                  <p className="text-[#888888] text-[11px] mb-1">
                    Package Price
                  </p>
                  <div className="flex items-baseline gap-2 mb-0.5">
                    <span className="text-[22px] font-sans font-bold text-[#1A1A1A]">
                      {item.price}
                    </span>
                    {item.originalPrice && (
                      <span className="text-[13px] text-[#B3B3B3] line-through font-medium">
                        {item.originalPrice}
                      </span>
                    )}
                  </div>
                  {item.saveText && (
                    <span className="text-[11px] text-[#D1B072] font-medium mt-0.5">
                      {item.saveText}
                    </span>
                  )}
                </div>

                {/* Add To Cart Button */}
                <button
                  onClick={(e) => item.isInStock && handleAddToCart(e, item)}
                  disabled={!item.isInStock}
                  className={`w-full rounded-[12px] h-[48px] flex items-center justify-center gap-2 text-[14px] font-medium transition-colors ${item.isInStock
                      ? "bg-[#412A1F] hover:bg-[#2C1A11] text-white"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                >
                  {item.isInStock ? (
                    <>
                      <ShoppingCart className="w-[18px] h-[18px]" />
                      Add to Cart
                    </>
                  ) : (
                    "Out of Stock"
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Pagination exact match */}
        <div className="flex items-center justify-end gap-2 mt-8 w-full">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className={`w-[32px] h-[32px] flex items-center justify-center rounded-[4px] transition-colors ${currentPage === 1
                ? "bg-[#A89B93] opacity-90 cursor-not-allowed border-none"
                : "bg-white border hover:bg-gray-50 border-[#E0E0E0]"
              }`}
          >
            <Image
              src="/common/arrow-left.svg"
              alt="Previous"
              width={16}
              height={16}
              className={currentPage === 1 ? "brightness-0 invert" : ""}
            />
          </button>

          {getPageNumbers().map((pageNum, idx) => (
            <button
              key={idx}
              onClick={() =>
                typeof pageNum === "number" && setCurrentPage(pageNum)
              }
              disabled={pageNum === "..."}
              className={`w-[32px] h-[32px] flex items-center justify-center rounded-[4px] text-[13px] font-bold transition-colors ${pageNum === currentPage
                  ? "border-[1.5px] border-[#603D2C] text-[#603D2C] bg-white"
                  : pageNum === "..."
                    ? "text-[#1A1A1A] cursor-default bg-white border border-[#F0F0F0]"
                    : "border border-[#F0F0F0] text-[#1A1A1A] hover:bg-gray-50 bg-white"
                }`}
            >
              {pageNum}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
            className={`w-[32px] h-[32px] flex items-center justify-center rounded-[4px] transition-colors bg-white ${currentPage === totalPages
                ? "border border-[#F0F0F0] cursor-not-allowed"
                : "border border-[#F0F0F0] hover:bg-gray-50 cursor-pointer"
              }`}
          >
            <Image
              src="/common/arrow-right.svg"
              alt="Next"
              width={16}
              height={16}
              className={currentPage === totalPages ? "opacity-30" : ""}
            />
          </button>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <FeaturedCarousel
          title="Featured Collections"
          description="Our most loved packages, handpicked for you"
          items={items}
          detailRoute={(id) => ROUTES.PACKAGES_DETAIL(id)}
        />
      </div>
    </section>
  );
}
