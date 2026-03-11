"use client";

import {
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Clock,
  Check,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/route";
import { useCart } from "@/context/cart-context";
import { usePackageDetail } from "@/hooks/queries/use-package-detail";
import { formatAED } from "@/lib/utils";

const includedFeatures = [
  {
    image: "/landing/detail-page/free-delivery.svg",
    title: "Free Delivery",
    subtitle: "On all packages",
  },
  {
    image: "/landing/detail-page/warranty.svg",
    title: "10 Year Warranty",
    subtitle: "Full coverage",
  },
  {
    image: "/landing/detail-page/fast-delivery.svg",
    title: "Fast Delivery",
    subtitle: "2-3 weeks",
  },
  {
    image: "/landing/detail-page/expert-assembly.svg",
    title: "Expert Assembly",
    subtitle: "Professional setup",
  },
];

interface PackageDetailProps {
  slug: string;
}

export function PackageDetail({ slug }: PackageDetailProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("Features & Benefits");

  const { addItem } = useCart();
  const router = useRouter();

  const { data, isLoading, isError } = usePackageDetail(slug);

  if (isLoading) {
    return (
      <section className="py-12 px-4 sm:px-10 lg:px-16 max-w-8xl mx-auto min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#C9A76A] border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

  if (isError || !data) {
    return (
      <section className="py-12 px-4 sm:px-10 lg:px-16 max-w-8xl mx-auto min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <AlertCircle className="w-12 h-12 text-red-500" />
          <h2 className="text-xl font-bold text-[#1A1A1A]">
            Package not found
          </h2>
        </div>
      </section>
    );
  }

  const images =
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
  const savingAmount = data.money_saved ? parseFloat(data.money_saved) : null;

  const currentFeatures = data.features_and_benefits?.length
    ? data.features_and_benefits
    : data.key_benefits?.length
      ? data.key_benefits
      : (data.features ?? []);

  const currentSpecs = data.specifications ?? [];
  const currentWhatsIncluded = data.whats_included ?? [];

  const handleAddToCart = () => {
    addItem({
      id: data.id,
      slug: data.slug,
      name: data.name,
      price: price || 0,
      quantity: quantity,
      image: images[0],
      itemType: "PACKAGE",
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push(ROUTES.CART);
  };

  const nextImage = () => setActiveImage((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setActiveImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section className="sm:py-12 px-4 sm:px-10 lg:px-16 max-w-8xl mx-auto overflow-x-hidden md:overflow-x-visible">
      <div className="w-full flex-col gap-10 hidden md:flex">
        {/* Top: Images */}
        <div className="w-full flex flex-col gap-4">
          {/* Main Image */}
          <div className="relative aspect-video sm:aspect-2/1 w-full rounded-[24px] overflow-hidden group">
            <Image
              src={images[activeImage]}
              alt="Package Detail"
              fill
              className="object-cover transition-transform duration-500"
            />
            {/* Badges */}
            {data.discount_percentage ? (
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                <span className="bg-[#C9A76A] text-white text-[11px] sm:text-[12px] font-bold px-4 py-2 rounded-full uppercase tracking-wide shadow-sm">
                  Save {data.discount_percentage}%
                </span>
              </div>
            ) : null}

            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
              <span className="bg-[#1A1A1A]/80 backdrop-blur-md text-white text-[11px] sm:text-[12px] font-medium px-4 py-1.5 rounded-full shadow-sm">
                {activeImage + 1} / {images.length}
              </span>
            </div>

            {/* Nav Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-10 sm:w-12 h-10 sm:h-12 bg-white/90 rounded-[14px] sm:rounded-[16px] flex items-center justify-center shadow-lg hover:bg-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 text-[#1A1A1A]" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-10 sm:w-12 h-10 sm:h-12 bg-white/90 rounded-[14px] sm:rounded-[16px] flex items-center justify-center shadow-lg hover:bg-white transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 text-[#1A1A1A]" />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-3 sm:gap-4">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`relative aspect-16/10 sm:aspect-4/3 w-full rounded-[16px] overflow-hidden border-2 transition-all cursor-pointer ${
                  activeImage === idx
                    ? "border-[#412A1F] shadow-sm scale-100"
                    : "border-transparent hover:border-[#EBEBEB] scale-[0.98]"
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full flex flex-col max-w-8xl mx-auto">
          {/* Metadata */}
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex items-center gap-2">
              <div className="bg-[#FCF9F3] text-[#C9A76A] px-3.5 py-1.5 rounded-full flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase border border-[#F2EAD9]">
                <div className="w-[5px] h-[5px] rounded-full bg-[#C9A76A] drop-shadow-[0_0_2px_rgba(201,167,106,0.3)]" />
                {data.category_name || "Package"} &bull;{" "}
                {data.package_type_display || data.package_type || "Standard"}
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-[#453127] leading-tight">
              {data.name}
            </h1>

            <div className="flex items-center gap-3">
              <div className="bg-linear-to-r from-[#C9A76A] to-[#C9A76A]/80 text-white px-2.5 py-1 rounded-[6px] flex items-center gap-1.5 text-[12px] font-bold">
                <Star className="w-3.5 h-3.5 fill-white text-white" />
                4.8
              </div>
              <span className="text-[#888888] text-[13px] font-medium">
                Based on <span className="font-bold text-[#444444]">124</span>{" "}
                reviews
              </span>
            </div>

            <p className="text-[#5D4E3C]/80 text-[14px] sm:text-[15px] leading-relaxed mt-1">
              {data.short_description ||
                data.description ||
                "No description provided."}
            </p>
          </div>

          {/* Price Box */}
          <div className="bg-linear-to-r from-white via-[#FFF8F0] to-white border border-[#F2EFE9] rounded-[20px] p-6 lg:p-8 mb-8 shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
            <div className="flex items-end gap-3 mb-4">
              <span className="text-4xl lg:text-[46px] font-bold text-[#412A1F] leading-none tracking-tight">
                {formatAED(price)}
              </span>
              {originalPrice && (
                <span className="text-[#5D4E3C]/30 text-[16px] lg:text-[20px] font-medium tracking-tight line-through mb-1.5">
                  {formatAED(originalPrice)}
                </span>
              )}
            </div>
            {savingAmount && (
              <div className="flex flex-col gap-3">
                <div className="bg-[#F0FDF4] text-[#008236] w-max px-3 py-1 rounded-full flex items-center gap-1.5 text-[11px] font-bold tracking-wide">
                  <Check className="w-3.5 h-3.5 stroke-3" />
                  Save {formatAED(savingAmount)}
                </div>
                <div className="flex items-center gap-1.5 text[#5D4E3C]/80 text-[11px] font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  Fast delivery and professional assembly
                </div>
              </div>
            )}
            {!savingAmount && (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-1.5 text[#5D4E3C]/80 text-[11px] font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  Fast delivery and professional assembly
                </div>
              </div>
            )}
          </div>

          {/* Quantity & Actions */}
          <div className="flex flex-col gap-4 mb-10 w-full max-w-8xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center justify-between border border-[#EBEBEB] rounded-[12px] h-[52px] sm:w-[190px] pl-2 shrink-0 bg-white">
                <span className="text-[14px] text-[#5D4E3C]/80 font-medium">
                  Quantity
                </span>
                <div className="flex items-center gap-3.5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 sm:w-[34px] sm:h-[32px] rounded-[8px] border border-[#EBE0D3] flex items-center justify-center text-[#412A1F] hover:bg-[#FDFBF7] transition-colors cursor-pointer shrink-0"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[15px] font-medium text-[#412A1F] min-w-[12px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 sm:w-[34px] sm:h-[32px] rounded-[8px] border border-[#EBE0D3] flex items-center justify-center text-[#412A1F] hover:bg-[#FDFBF7] transition-colors cursor-pointer shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                className="flex-1 h-[52px] bg-linear-to-r from-[#412A1F] to-[#5D4E3C] hover:opacity-90 text-white rounded-[8px] text-[15px] font-normal tracking-wide flex items-center justify-center gap-2.5 transition-all shadow-md cursor-pointer border-none"
              >
                <ShoppingCart className="w-[18px] h-[18px]" />
                Add to Cart
              </Button>
            </div>

            <Button
              onClick={handleBuyNow}
              className="w-full h-[52px] border border-[#C9A76A]/40 hover:border-[#C9A76A] text-[#412A1F] rounded-[8px] text-[14px] font-medium tracking-wide flex items-center justify-center hover:text-white transition-all bg-[#FCFBF9] shadow-sm cursor-pointer mt-1"
            >
              Buy Now - Fast Checkout
            </Button>
          </div>

          {/* What's Included label grid */}
          <div className="mb-12">
            <h4 className="text-[16px] font-bold text-[#1A1A1A] mb-5">
              What&apos;s Included
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {includedFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 bg-white border border-[#F2F2F2] rounded-[16px] p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
                >
                  <div className="w-12 h-12 bg-[#FDFBF7] border border-[#F0EBE0] rounded-[12px] flex items-center justify-center shrink-0">
                    <Image
                      src={feat.image}
                      alt={feat.title}
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-[#333333] mb-0.5">
                      {feat.title}
                    </span>
                    <span className="text-[11px] text-[#888888] font-medium">
                      {feat.subtitle}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-[#FCFBFA] p-1.5 rounded-[12px] flex items-center justify-between mb-8 max-w-[500px] mx-auto w-full border border-[#F2F2F2]">
            {["Features & Benefits", "Specifications", "What's Included"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2.5 px-2 text-[12px] font-bold rounded-[8px] transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === tab
                      ? "bg-linear-to-r from-[#C9A76A] to-[#B3905A] text-white shadow-md shadow-[#C9A76A]/20"
                      : "text-[#888888] hover:text-[#1A1A1A]"
                  }`}
                >
                  {tab}
                </button>
              ),
            )}
          </div>

          {/* Dynamic Details Area */}
          <div className="mb-10 min-h-[160px]">
            {activeTab === "Features & Benefits" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {currentFeatures.map((feature, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-[#F2F2F2] p-4 rounded-[14px] flex items-center gap-3 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
                  >
                    <div className="w-6 h-6 rounded-full bg-linear-to-r from-[#C9A76A] to-[#B3905A] flex items-center justify-center shrink-0 shadow-sm shadow-[#C9A76A]/20">
                      <Check className="w-3 h-3 text-white stroke-3" />
                    </div>
                    <span className="text-[12px] text-[#555555] font-semibold leading-tight pr-2">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "Specifications" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {currentSpecs.map((spec, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-[#F2F2F2] p-4 rounded-[14px] flex items-center justify-between gap-3 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
                  >
                    <span className="text-[12px] text-[#888888] font-medium shrink-0">
                      {spec.key}
                    </span>
                    <span className="text-[12px] text-[#1A1A1A] font-semibold text-right leading-tight wrap-break-word">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "What's Included" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {currentWhatsIncluded.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-[#F2F2F2] p-4 rounded-[14px] flex items-center gap-3 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#FCF9F3] border border-[#F2EAD9] flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-[#C9A76A]" />
                    </div>
                    <span className="text-[12px] text-[#555555] font-semibold leading-tight pr-2">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile exact match layout */}
      <div className="flex flex-col md:hidden -mx-4 mt-2 mb-10">
        {/* Mobile Images */}
        <div className="relative aspect-4/3 w-full group mb-3">
          <Image
            src={images[activeImage]}
            alt="Package Detail"
            fill
            className="object-cover transition-transform duration-500"
          />
          {/* Badges */}
          <div className="absolute top-4 left-4">
            <span className="bg-[#C9A76A] text-white text-[10px] font-bold px-3 py-[5px] rounded-lg tracking-wider">
              SAVE 27%
            </span>
          </div>

          <div className="absolute bottom-4 right-4 bg-[#1A1A1A]/95 text-white text-[11px] font-medium px-4 py-1.5 rounded-lg shadow-sm">
            {activeImage + 1} / {images.length}
          </div>

          {/* Nav Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md"
          >
            <ChevronLeft className="w-5 h-5 text-[#1A1A1A]" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md"
          >
            <ChevronRight className="w-5 h-5 text-[#1A1A1A]" />
          </button>
        </div>

        {/* Mobile Thumbnails */}
        <div className="grid grid-cols-4 gap-2.5 px-4 mb-8">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(idx)}
              className={`relative aspect-square w-full rounded-xl overflow-hidden cursor-pointer ${
                activeImage === idx ? "opacity-100" : "opacity-60"
              }`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>

        {/* Info Box */}
        <div className="px-4 flex flex-col mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-[#C9A76A] text-white px-[9px] py-[3px] rounded-[6px] text-[10px] font-bold flex items-center gap-1">
              4.8
            </div>
            <span className="text-[#888888] text-[12px] font-medium">
              230 reviews
            </span>
          </div>

          <h1 className="text-[26px] font-serif font-bold text-[#1A1A1A] leading-[1.2] mb-4">
            Modern Living Essentials
          </h1>

          <p className="text-[#666666] text-[13px] leading-relaxed mb-6">
            Discover cozy living with this 450 Sq ft Contemporary Collection,
            all. Ready to install, curated furniture across different features
            to ensure that there is nothing missing design wise to bring home
            that cozy feeling on arriving home.
          </p>

          <div className="bg-[#FAFAFA] rounded-2xl p-5 mb-6 flex flex-col gap-4">
            <div className="flex items-baseline gap-2">
              <span className="text-[28px] font-serif font-bold text-[#1A1A1A]">
                AED 2,399
              </span>
              <span className="text-[15px] font-serif font-medium text-[#B3B3B3] line-through">
                AED 3,299
              </span>
            </div>
            <p className="text-[#666666] text-[11px]">
              Or 3 interest-free payments of AED 799 with{" "}
              <span className="font-bold text-[#1A1A1A]">Tabby</span>
            </p>

            <div className="flex items-center gap-4 mt-2">
              <span className="text-[13px] text-[#412A1F] font-medium min-w-[60px]">
                Quantity
              </span>
              <div className="flex items-center bg-white border border-[#EBEBEB] rounded-[24px] px-2 py-1 flex-1 max-w-[120px] justify-between h-[42px]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center text-[#1A1A1A] hover:bg-gray-50 rounded-full"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-[14px] font-bold text-[#1A1A1A]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center text-[#1A1A1A] hover:bg-gray-50 rounded-full"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <Button
              onClick={handleAddToCart}
              className="w-full bg-[#412A1F] hover:bg-[#2C1A11] text-white rounded-xl h-[48px] text-[14px] font-medium flex items-center justify-center gap-2 mt-2"
            >
              <ShoppingCart className="w-[16px] h-[16px]" />
              Add to Cart
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-10">
            <Button
              onClick={handleAddToCart}
              className="w-full border border-[#412A1F] text-[#412A1F] bg-white hover:bg-gray-50 rounded-xl h-[46px] text-[13px] font-medium shadow-none"
            >
              Buy Now
            </Button>
            <Button className="w-full border border-[#EBEBEB] text-[#1A1A1A] bg-white hover:bg-gray-50 rounded-xl h-[46px] text-[13px] font-medium shadow-none">
              Add to Wishlist
            </Button>
          </div>
        </div>

        <div className="bg-[#FAFAFA] px-4 py-8 grid grid-cols-1 gap-10 border-t border-[#F2F2F2]">
          {/* Mobile What's Included */}
          <div>
            <h2 className="text-[18px] font-serif font-bold text-[#1A1A1A] mb-5">
              What&apos;s Included
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:mb-0 px-1">
              {includedFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 sm:p-5 rounded-[16px] flex flex-col items-center justify-center gap-3 text-center border border-[#F2F2F2]"
                >
                  <Image
                    src={feat.image}
                    width={32}
                    height={32}
                    alt={feat.title}
                    className="mb-1"
                  />
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold text-[#1A1A1A]">
                      {feat.title}
                    </span>
                    <span className="text-[10px] text-[#888888]">
                      {feat.subtitle}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Product Features */}
          <div>
            <h2 className="text-[18px] font-serif font-bold text-[#1A1A1A] mb-5">
              Product Features
            </h2>
            <div className="flex flex-col gap-4 mb-8">
              {currentFeatures.slice(0, 5).map((feature, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="w-[18px] h-[18px] shrink-0 border-[1.5px] border-[#C9A76A] rounded-[4px] flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-[#C9A76A] stroke-3" />
                  </div>
                  <span className="text-[12px] text-[#444444] leading-snug">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Mobile Guarantees Boxes */}
            <div className="flex flex-col gap-3">
              <div className="bg-white px-5 py-4 rounded-[16px] flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#F2F2F2]/50">
                <div className="w-5 h-5 rounded-full border-[1.5px] border-[#C9A76A] shrink-0" />
                <span className="text-[12px] font-medium text-[#444444]">
                  100% money-back guarantee for returning unused
                </span>
              </div>
              <div className="bg-white px-5 py-4 rounded-[16px] flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#F2F2F2]/50">
                <div className="w-5 h-5 rounded-full border-[1.5px] border-[#C9A76A] shrink-0" />
                <span className="text-[12px] font-medium text-[#444444]">
                  Cash on Delivery available for all orders
                </span>
              </div>
              <div className="bg-white px-5 py-4 rounded-[16px] flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#F2F2F2]/50">
                <div className="w-5 h-5 rounded-full border-[1.5px] border-[#C9A76A] shrink-0" />
                <span className="text-[12px] font-medium text-[#444444]">
                  Comprehensive 5yr warranty and 7day return
                </span>
              </div>
              <div className="bg-white px-5 py-4 rounded-[16px] flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#F2F2F2]/50">
                <div className="w-5 h-5 rounded-full border-[1.5px] border-[#C9A76A] shrink-0" />
                <span className="text-[12px] font-medium text-[#444444]">
                  7 days trial and 100% money return if not satisfied
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
