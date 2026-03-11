"use client";

import {
  Star,
  Minus,
  Plus,
  ArrowUpRight,
  Truck,
  ShieldCheck,
  Clock,
  Wrench,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/route";
import { useCart } from "@/context/cart-context";
import { useProductDetail } from "@/hooks/queries/use-product-detail";
import { formatAED } from "@/lib/utils";

const benefits = [
  { icon: Truck, text: "Free Delivery" },
  { icon: ShieldCheck, text: "10 Year Warranty" },
  { icon: Clock, text: "2-3 Weeks Delivery" },
  { icon: Wrench, text: "Professional Assembly" },
];

function DetailSkeleton() {
  return (
    <section className="py-20 px-4 sm:px-10 lg:px-16 max-w-8xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-12 xl:gap-20 animate-pulse">
        <div className="w-full lg:w-[55%] aspect-4/3 bg-[#f8f8f8] rounded-[24px]" />
        <div className="w-full lg:w-[45%] flex flex-col gap-4">
          <div className="h-4 w-32 bg-[#f8f8f8] rounded" />
          <div className="h-10 w-3/4 bg-[#f8f8f8] rounded" />
          <div className="h-6 w-full bg-[#f8f8f8] rounded" />
          <div className="h-24 w-full bg-[#f8f8f8] rounded-[20px]" />
          <div className="h-14 w-full bg-[#f8f8f8] rounded-[14px]" />
        </div>
      </div>
    </section>
  );
}

interface SingleProductDetailsProps {
  slug: string;
}

export default function SingleProductDetails({
  slug,
}: SingleProductDetailsProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("Overview");

  const { addItem } = useCart();
  const router = useRouter();

  const { data, isLoading, isError } = useProductDetail(slug);

  if (isLoading) return <DetailSkeleton />;

  if (isError || !data) {
    return (
      <section className="py-24 px-4 sm:px-10 lg:px-16 max-w-8xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-[#F8F8F8] rounded-full mb-4">
          <svg
            className="w-6 h-6 text-[#C9A76A]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p className="text-[#888] text-lg font-medium">
          Unable to load product details
        </p>
      </section>
    );
  }

  // Build images array
  const loadedImages: string[] =
    data.images.length > 0
      ? [
          ...data.images
            .filter((i) => i.is_primary || i.order === 0)
            .map((i) => i.image),
          ...data.images
            .filter((i) => !i.is_primary && i.order !== 0)
            .map((i) => i.image),
        ]
      : ["/landing/detail-page/detail-image-1.webp"];

  const actualPrice = parseFloat(data.actual_price);
  const effectivePrice = data.effective_price
    ? parseFloat(data.effective_price)
    : data.discounted_price
      ? parseFloat(data.discounted_price)
      : null;
  const price = effectivePrice ?? actualPrice;
  const originalPrice = effectivePrice ? actualPrice : null;
  const saving = data.money_saved
    ? Math.round(parseFloat(data.money_saved))
    : null;

  const handleAddToCart = () => {
    addItem({
      id: data.id,
      name: data.name,
      price: price || 0,
      quantity: quantity,
      image: loadedImages[0],
      itemType: "PRODUCT",
      slug: slug,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push(ROUTES.CART);
  };

  const nextImage = () =>
    setActiveImage((prev) => (prev + 1) % loadedImages.length);
  const prevImage = () =>
    setActiveImage(
      (prev) => (prev - 1 + loadedImages.length) % loadedImages.length,
    );

  return (
    <section className="py-20 px-4 sm:px-10 lg:px-16 max-w-8xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
        {/* Left: Images */}
        <div className="w-full lg:w-[55%] flex flex-col gap-4">
          {/* Main Image */}
          <div className="relative aspect-4/3 w-full bg-[#f8f8f8] rounded-[24px] overflow-hidden group">
            <Image
              src={loadedImages[activeImage]}
              alt={data.name}
              fill
              className="object-cover transition-transform duration-500 ease-in-out"
            />
            {data.tag && (
              <span className="absolute top-5 left-5 px-3 py-1.5 bg-[#D1B072] text-white text-[11px] font-bold tracking-widest uppercase rounded-[6px] z-10">
                {data.tag.replace("_", " ")}
              </span>
            )}
            {/* Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 text-[#1A1A1A]" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 text-[#1A1A1A]" />
            </button>
          </div>

          {/* Thumbnails */}
          {loadedImages.length > 1 && (
            <div className="grid grid-cols-5 gap-3 sm:gap-4">
              {loadedImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative aspect-square w-full rounded-[16px] overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImage === idx
                      ? "border-[#412A1F] shadow-sm scale-100"
                      : "border-transparent hover:border-[#EBEBEB] scale-[0.98]"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${data.name} Thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info */}
        <div className="w-full lg:w-[45%] flex flex-col">
          {/* Breadcrumbs Placeholder */}
          <div className="flex items-center gap-2 text-[13px] font-medium text-[#888888] mb-4 uppercase tracking-wider">
            <span>PRODUCTS</span>
            <span>/</span>
            <span className="text-[#C9A76A]">
              {(data.category_name ?? "Uncategorized").toUpperCase()}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-[#1A1A1A] leading-tight mb-4">
            {data.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < 4
                      ? "fill-[#1A1A1A] text-[#1A1A1A]"
                      : "fill-transparent text-[#EBEBEB]"
                  }`}
                />
              ))}
            </div>
            <span className="text-[14px] text-[#666666] font-medium">
              <span className="text-[#1A1A1A] font-bold">4.8</span> (127
              reviews)
            </span>
          </div>

          <p className="text-[#666666] text-[15px] sm:text-[16px] leading-relaxed mb-8">
            {data.description ||
              data.short_description ||
              "No description provided."}
          </p>

          {/* Price Box */}
          <div className="bg-[#FAFAFA] border border-[#F2F2F2] rounded-[20px] p-6 lg:p-8 mb-8">
            <div className="flex items-end gap-3 mb-2">
              <span className="text-3xl lg:text-[36px] font-serif font-bold text-[#1A1A1A] leading-none tracking-tight">
                {formatAED(price)}
              </span>
              {originalPrice && (
                <span className="text-[#AAAAAA] text-[16px] lg:text-[18px] font-medium tracking-tight line-through mb-1">
                  {formatAED(originalPrice)}
                </span>
              )}
            </div>
            {saving && data.discount_percentage ? (
              <p className="text-[#C9A76A] text-[14px] font-medium">
                You save {formatAED(saving)} ({data.discount_percentage}% off)
              </p>
            ) : null}
            {data.stock !== null && data.stock !== undefined && (
              <p className="text-[#888] text-[13px] font-medium mt-2">
                {data.stock > 0 ? `${data.stock} in stock` : "Out of stock"}
              </p>
            )}
          </div>

          {/* Quantity */}
          <div className="mb-8">
            <span className="block text-[14px] font-medium text-[#1A1A1A] mb-3">
              Quantity
            </span>
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-white border border-[#EBEBEB] rounded-[12px] h-[48px] w-max">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-[48px] h-full flex items-center justify-center text-[#888888] hover:text-[#1A1A1A] transition-colors cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="w-[48px] h-full flex items-center justify-center text-[16px] font-semibold text-[#1A1A1A]">
                  {quantity}
                </div>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-[48px] h-full flex items-center justify-center text-[#888888] hover:text-[#1A1A1A] transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 mb-10">
            <Button
              onClick={handleAddToCart}
              className="w-full h-[54px] lg:h-[60px] bg-[#412A1F]/90 hover:bg-[#412A1F] text-white rounded-[14px] text-[15px] font-medium flex items-center justify-center gap-3 transition-all duration-300 shadow-lg shadow-black/5 hover:scale-[1.01] cursor-pointer group"
            >
              Add to Cart
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
            </Button>
            <Button
              onClick={handleBuyNow}
              className="w-full h-[54px] lg:h-[60px] bg-white border-2 border-[#EBEBEB] hover:border-[#412A1F] hover:text-white  text-[#1A1A1A] rounded-[14px] text-[15px] font-bold flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer hover:-translate-y-0.5"
            >
              Buy Now
            </Button>
          </div>

          {/* Key Benefits */}
          <div className="mb-10">
            <h4 className="text-[15px] font-bold text-[#1A1A1A] mb-5">
              Key Benefits
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <benefit.icon className="w-5 h-5 text-[#888888] stroke-[1.5]" />
                  <span className="text-[14px] text-[#444444] font-medium">
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-[#EBEBEB] mb-8">
            <div className="flex items-center gap-8">
              {["Overview", "Specifications", "What's Included"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative pb-4 text-[14px] lg:text-[15px] font-medium transition-colors cursor-pointer ${
                    activeTab === tab
                      ? "text-[#1A1A1A]"
                      : "text-[#888888] hover:text-[#1A1A1A]"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#412A1F]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex flex-col gap-3">
            {activeTab === "Overview" && (
              <p className="text-[#444444] text-[15px] leading-relaxed">
                {data.overview && data.overview.length > 0
                  ? data.overview.join(" ")
                  : data.description ||
                    data.short_description ||
                    "No overview available."}
              </p>
            )}

            {activeTab === "Specifications" && (
              <div className="flex flex-col gap-2">
                {data.specifications && data.specifications.length > 0 ? (
                  data.specifications.map((spec, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center bg-[#FAFAFA] px-5 py-3.5 rounded-[12px]"
                    >
                      <span className="text-[#888888] text-[14px] font-medium">
                        {spec.key}
                      </span>
                      <span className="text-[#1A1A1A] text-[14px] font-semibold">
                        {spec.value}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-[#888] text-[14px]">
                    No specifications available.
                  </p>
                )}
              </div>
            )}

            {activeTab === "What's Included" &&
              (data.whats_included && data.whats_included.length > 0 ? (
                data.whats_included.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 bg-[#FAFAFA] px-5 py-3.5 rounded-[12px]"
                  >
                    <Check className="w-[18px] h-[18px] text-[#412A1F] stroke-[2.5] shrink-0" />
                    <span className="text-[14px] text-[#444444] font-medium">
                      {item}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-[#888] text-[14px]">
                  Included items not specified.
                </p>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
