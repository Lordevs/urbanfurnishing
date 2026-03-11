"use client";

import { useState } from "react";
import Image from "next/image";
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
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/route";

const images = [
  "/landing/detail-page/detail-image-1.webp",
  "/landing/detail-page/detail-image-2.webp",
  "/landing/detail-page/detail-image-3.webp",
  "/landing/detail-page/detail-image-4.webp",
  "/landing/detail-page/detail-image-5.webp",
];

const benefits = [
  { icon: Truck, text: "Free Delivery" },
  { icon: ShieldCheck, text: "10 Year Warranty" },
  { icon: Clock, text: "2-3 Weeks Delivery" },
  { icon: Wrench, text: "Professional Assembly" },
];

const features = [
  "Premium Italian leather upholstery",
  "Solid oak wood frame construction",
  "Hand-crafted details and finishing",
  "Stain-resistant fabric protection",
  "10-year structural warranty",
  "Complimentary white-glove delivery",
  "Professional assembly included",
  "Eco-friendly and sustainable materials",
];

const mobileIncludedItems = [
  "3-Seater Premium Sofa",
  "Solid Wood Coffee Table",
  "2 Matching Accent Chairs",
  "Side Table Set",
  "Decorative Accessories",
];

const mobileDimensions = [
  { label: "Sofa", value: "220 \u00d7 90 \u00d7 85 cm" },
  { label: "Coffee Table", value: "120 \u00d7 60 \u00d7 45 cm" },
  { label: "Accent Chair", value: "75 \u00d7 80 \u00d7 85 cm" },
  { label: "Side Table", value: "50 \u00d7 50 \u00d7 55 cm" },
];

const mobileRelatedProducts = [
  {
    id: "prod-contemporary",
    name: "The Contemporary Collection",
    rating: "4.7",
    price: "AED 19,999",
    image: "/landing/detail-page/detail-image-2.webp",
  },
  {
    id: "prod-scandinavian",
    name: "The Scandinavian Suite",
    rating: "4.9",
    price: "AED 21,999",
    image: "/landing/detail-page/detail-image-3.webp",
  },
  {
    id: "prod-classic",
    name: "The Classic Ensemble",
    rating: "4.6",
    price: "AED 25,999",
    image: "/landing/detail-page/detail-image-4.webp",
  },
];

export default function SingleProductDetails() {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("Overview");

  const { addItem } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    addItem({
      id: "prod-milano",
      name: "The Milano Collection",
      price: "₹23,999",
      quantity: quantity,
      image: images[activeImage],
      color: "Italian Leather",
    });
    router.push(ROUTES.CART);
  };

  const nextImage = () => setActiveImage((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setActiveImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <>
      {/* Mobile View */}
      <section className="md:hidden flex flex-col pt-4 pb-12 bg-white">
        <div className="px-4">
          {/* Main Image */}
          <div className="relative aspect-4/3 w-full bg-[#f8f8f8] rounded-[24px] overflow-hidden group mb-4">
            <Image
              src={images[activeImage]}
              alt="The Milano Collection"
              fill
              className="object-cover transition-transform duration-500 ease-in-out"
            />
            {/* Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md cursor-pointer">
              <ChevronLeft className="w-5 h-5 text-[#1A1A1A]" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md cursor-pointer">
              <ChevronRight className="w-5 h-5 text-[#1A1A1A]" />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-2.5 mb-6">
            {images.slice(0, 4).map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`relative aspect-square w-full rounded-[14px] overflow-hidden border-2 transition-all cursor-pointer ${
                  activeImage === idx
                    ? "border-[#412A1F] scale-100 opacity-100"
                    : "border-transparent opacity-80 hover:opacity-100 scale-[0.98]"
                }`}>
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          {/* Badges */}
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-[#C9A76A] font-serif text-white text-[10px] font-bold px-3 py-1 rounded-[6px] tracking-wide uppercase">
              LIVING ROOM
            </div>
            <div className="bg-[#F5F5F5] flex items-center gap-1.5 px-3 py-1 rounded-[6px]">
              <Star className="w-3.5 h-3.5 fill-[#C9A76A] text-[#C9A76A]" />
              <span className="text-[12px] font-medium text-[#1A1A1A]">
                4.8 <span className="text-[#888888] font-normal">(234)</span>
              </span>
            </div>
          </div>

          <h1 className="text-[26px] font-bold text-[#1A1A1A] leading-tight mb-3">
            The Milano Collection
          </h1>

          <p className="text-[#666666] text-[14px] leading-[1.6] mb-6">
            Experience Italian-inspired luxury with our Milano Collection. This
            carefully curated set features premium upholstery, solid wood
            construction, and timeless design that transforms any living space
            into a sophisticated retreat.
          </p>

          {/* Price Box */}
          <div className="bg-[#FAFAFA] rounded-[16px] p-5 mb-5 flex flex-col gap-1">
            <span className="text-[13px] text-[#888888]">Package Price</span>
            <div className="flex items-center gap-3">
              <span className="text-[26px] font-serif font-bold text-[#1A1A1A]">
                AED 23,999
              </span>
              <span className="text-[16px] font-serif text-[#AAAAAA] line-through">
                AED 31,999
              </span>
            </div>
            <span className="text-[#C9A76A] font-serif text-[13px] font-medium mt-1">
              Save AED 8,000 (25% off)
            </span>
          </div>

          {/* Add to Cart */}
          <Button
            onClick={handleAddToCart}
            className="w-full h-[54px] bg-[#422C20] hover:bg-[#3D261C] text-white rounded-[12px] text-[15px] font-medium flex items-center justify-center gap-2 mb-8 shadow-sm cursor-pointer">
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </Button>

          {/* What's Included */}
          <h3 className="text-[18px] font-bold font-serif text-[#1A1A1A] mb-4 flex items-center gap-2">
            What's Included
          </h3>
          <div className="flex flex-col gap-3.5 mb-8">
            {mobileIncludedItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-[18px] h-[18px] rounded-[4px] border-[1.5px] border-[#C9A76A] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-[#C9A76A] stroke-3" />
                </div>
                <span className="text-[14px] text-[#444444] font-medium">
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Features */}
          <h3 className="text-[18px] font-bold font-serif text-[#1A1A1A] mb-4">
            Features
          </h3>
          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="bg-[#FAFAFA] rounded-[16px] flex flex-col items-center justify-center p-5 gap-3 h-[100px]">
              <Star className="w-6 h-6 text-[#C9A76A] stroke-[1.5]" />
              <span className="text-[12px] text-[#666666] font-medium text-center">
                Premium Materials
              </span>
            </div>
            <div className="bg-[#FAFAFA] rounded-[16px] flex flex-col items-center justify-center p-5 gap-3 h-[100px]">
              <ShieldCheck className="w-6 h-6 text-[#C9A76A] stroke-[1.5]" />
              <span className="text-[12px] text-[#666666] font-medium text-center">
                5-Year Warranty
              </span>
            </div>
            <div className="bg-[#FAFAFA] rounded-[16px] flex flex-col items-center justify-center p-5 gap-3 h-[100px]">
              <Truck className="w-6 h-6 text-[#C9A76A] stroke-[1.5]" />
              <span className="text-[12px] text-[#666666] font-medium text-center">
                Free Delivery
              </span>
            </div>
            <div className="bg-[#FAFAFA] rounded-[16px] flex flex-col items-center justify-center p-5 gap-3 h-[100px]">
              <Wrench className="w-6 h-6 text-[#C9A76A] stroke-[1.5]" />
              <span className="text-[12px] text-[#666666] font-medium text-center">
                Expert Assembly
              </span>
            </div>
          </div>

          <hr className="border-[#EBEBEB] w-full mb-6" />

          {/* Dimensions */}
          <h3 className="text-[18px] font-bold font-serif text-[#1A1A1A] mb-4">
            Dimensions
          </h3>
          <div className="flex flex-col gap-3.5 mb-8">
            {mobileDimensions.map((dim, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="text-[14px] text-[#666666] font-medium">
                  {dim.label}
                </span>
                <span className="text-[14px] text-[#1A1A1A] font-bold">
                  {dim.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Separator block for related products */}
        <div className="w-full h-[8px] bg-[#FAFAFA] mb-8" />

        <div className="px-4">
          {/* You Might Also Like */}
          <h3 className="text-[20px] font-bold font-serif text-[#1A1A1A] mb-5">
            You Might Also Like
          </h3>
          <div className="flex flex-col gap-4">
            {mobileRelatedProducts.map((prod, idx) => (
              <div
                key={idx}
                className="flex bg-white rounded-[16px] overflow-hidden border border-[#F0F0F0] shadow-sm">
                <div className="w-[120px] shrink-0 relative bg-[#FAFAFA]">
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col p-3.5 flex-1">
                  <h4 className="text-[14px] font-bold text-[#1A1A1A] leading-snug mb-1">
                    {prod.name}
                  </h4>
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-3.5 h-3.5 fill-[#C9A76A] text-[#C9A76A]" />
                    <span className="text-[12px] font-medium text-[#1A1A1A]">
                      {prod.rating}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-[14px] font-bold text-[#1A1A1A]">
                      {prod.price}
                    </span>
                    <Link href={ROUTES.SINGLE_PRODUCT_DETAIL(prod.id)}>
                      <Button className="h-[32px] px-5 text-[12px] bg-[#422C20] hover:bg-[#2C1A11] text-white rounded-[8px] cursor-pointer">
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Desktop View */}
      <section className="hidden md:block py-20 px-4 sm:px-10 lg:px-16 max-w-8xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
          {/* Left: Images */}
          <div className="w-full lg:w-[55%] flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative aspect-4/3 w-full bg-[#f8f8f8] rounded-[24px] overflow-hidden group">
              <Image
                src={images[activeImage]}
                alt="The Milano Collection"
                fill
                className="object-cover transition-transform duration-500 ease-in-out"
              />
              {/* Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors opacity-0 group-hover:opacity-100 cursor-pointer">
                <ChevronLeft className="w-5 h-5 text-[#1A1A1A]" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors opacity-0 group-hover:opacity-100 cursor-pointer">
                <ChevronRight className="w-5 h-5 text-[#1A1A1A]" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-5 gap-3 sm:gap-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative aspect-square w-full rounded-[16px] overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImage === idx
                      ? "border-[#412A1F] shadow-sm scale-100"
                      : "border-transparent hover:border-[#EBEBEB] scale-[0.98]"
                  }`}>
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

          {/* Right: Product Info */}
          <div className="w-full lg:w-[45%] flex flex-col">
            {/* Breadcrumbs Placeholder */}
            <div className="flex items-center gap-2 text-[13px] font-medium text-[#888888] mb-4 uppercase tracking-wider">
              <span>PACKAGES</span>
              <span>/</span>
              <span className="text-[#C9A76A]">THE MILANO COLLECTION</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-[#1A1A1A] leading-tight mb-4">
              The Milano Collection
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
              Experience Italian luxury with our meticulously curated Milano
              Collection. This comprehensive package brings together timeless
              elegance and contemporary comfort, featuring hand-selected pieces
              that transform your living space into a sophisticated sanctuary.
            </p>

            {/* Price Box */}
            <div className="bg-[#FAFAFA] border border-[#F2F2F2] rounded-[20px] p-6 lg:p-8 mb-8">
              <div className="flex items-end gap-3 mb-2">
                <span className="text-3xl lg:text-[36px] font-serif font-bold text-[#1A1A1A] leading-none tracking-tight">
                  AED 23,999
                </span>
                <span className="text-[#AAAAAA] text-[16px] lg:text-[18px] font-medium tracking-tight line-through mb-1">
                  AED 32,999
                </span>
              </div>
              <p className="text-[#C9A76A] text-[14px] font-medium">
                You save AED 9,080
              </p>
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
                    className="w-[48px] h-full flex items-center justify-center text-[#888888] hover:text-[#1A1A1A] transition-colors cursor-pointer">
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="w-[48px] h-full flex items-center justify-center text-[16px] font-semibold text-[#1A1A1A]">
                    {quantity}
                  </div>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-[48px] h-full flex items-center justify-center text-[#888888] hover:text-[#1A1A1A] transition-colors cursor-pointer">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 mb-10">
              <Button
                onClick={handleAddToCart}
                className="w-full h-[54px] lg:h-[60px] bg-[#412A1F]/90 hover:bg-[#412A1F] text-white rounded-[14px] text-[15px] font-medium flex items-center justify-center gap-3 transition-all duration-300 shadow-lg shadow-black/5 hover:scale-[1.01] cursor-pointer group">
                Add to Cart
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </Button>
              <Button
                onClick={handleAddToCart}
                className="w-full h-[54px] lg:h-[60px] bg-white border-2 border-[#EBEBEB] hover:border-[#412A1F] hover:text-white  text-[#1A1A1A] rounded-[14px] text-[15px] font-bold flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer hover:-translate-y-0.5">
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
                {["Overview", "Specifications", "What's Included"].map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`relative pb-4 text-[14px] lg:text-[15px] font-medium transition-colors cursor-pointer ${
                        activeTab === tab
                          ? "text-[#1A1A1A]"
                          : "text-[#888888] hover:text-[#1A1A1A]"
                      }`}>
                      {tab}
                      {activeTab === tab && (
                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#412A1F]" />
                      )}
                    </button>
                  ),
                )}
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex flex-col gap-3">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 bg-[#FAFAFA] px-5 py-3.5 rounded-[12px]">
                  <Check className="w-[18px] h-[18px] text-[#412A1F] stroke-[2.5] shrink-0" />
                  <span className="text-[14px] text-[#444444] font-medium">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
