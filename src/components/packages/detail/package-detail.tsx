"use client";

import { ChevronLeft, ChevronRight, Plus, Minus, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/route";

interface PropertyType {
  id: string;
  label: string;
  price: number;
  description: string;
  features: string[];
  additionalInformation: { label: string; value: string }[];
  items: {
    category: string;
    name: string;
    image: string;
  }[];
}

interface PackageData {
  id: string;
  name: string;
  images: string[];
  propertyTypes: PropertyType[];
}

const DUMMY_PACKAGE: PackageData = {
  id: "investor-turnkey",
  name: "Investor Turnkey Package",
  images: [
    "/landing/packages/packages-product-img-1.webp",
    "/landing/packages/packages-product-img-2.webp",
    "/landing/packages/packages-product-img-3.webp",
    "/landing/packages/packages-product-img-4.webp",
    "/landing/packages/packages-product-img-5.webp",
    "/landing/packages/packages-product-img-1.webp", // Repeat for thumbnails
  ],
  propertyTypes: [
    {
      id: "studio",
      label: "Studio",
      price: 24900,
      description:
        "Designed for rental properties and investment apartments. Ideal for investors who want a fully furnished, rental-ready home delivered quickly and professionally. Perfect for landlords looking to maximize rental income with minimal hassle.",
      features: [
        "Complete furniture package",
        "Rental-ready setup",
        "Durable & practical furnishings",
        "Fast delivery timeline",
        "Professional installation",
        "Designed for ROI",
        "Easy maintenance materials",
        "Neutral color palette",
      ],
      additionalInformation: [
        { label: "Delivery Time", value: "2-4 weeks" },
        { label: "Installation", value: "Included" },
        { label: "Warranty", value: "1 year" },
        { label: "Customization", value: "Available" },
      ],
      items: [
        {
          category: "LIVING ROOM",
          name: "Show Home Sofa",
          image: "/landing/packages/packages-product-img-1.webp",
        },
        {
          category: "LIVING ROOM",
          name: "Statement Coffee Table",
          image: "/landing/packages/packages-product-img-2.webp",
        },
        {
          category: "LIVING ROOM",
          name: "Designer TV Console",
          image: "/landing/packages/packages-product-img-3.webp",
        },
        {
          category: "LIVING ROOM",
          name: "Premium Rug",
          image: "/landing/packages/packages-product-img-4.webp",
        },
        {
          category: "DINING",
          name: "Show Home Dining Set",
          image: "/landing/packages/packages-product-img-5.webp",
        },
        {
          category: "DINING",
          name: "Premium Dining Chairs",
          image: "/landing/packages/packages-product-img-1.webp",
        },
        {
          category: "BEDROOM",
          name: "Luxury Bed",
          image: "/landing/packages/packages-product-img-2.webp",
        },
        {
          category: "BEDROOM",
          name: "Bedside Tables",
          image: "/landing/packages/packages-product-img-3.webp",
        },
        {
          category: "BEDROOM",
          name: "Wardrobe System",
          image: "/landing/packages/packages-product-img-4.webp",
        },
        {
          category: "LIGHTING",
          name: "Accent Floor Lamp",
          image: "/landing/packages/packages-product-img-5.webp",
        },
        {
          category: "LIGHTING",
          name: "Designer Table Lamp",
          image: "/landing/packages/packages-product-img-1.webp",
        },
        {
          category: "DECOR",
          name: "Decorative Mirror",
          image: "/landing/packages/packages-product-img-2.webp",
        },
      ],
    },
    {
      id: "1br",
      label: "1 Bedroom",
      price: 34900,
      description:
        "Comprehensive furnishing solution for 1-bedroom apartments. Carefully selected pieces that balance space, style, and functionality for urban living.",
      features: [
        "Customized for 1-bedroom layouts",
        "High-quality materials",
        "Professional interior styling",
        "Zero-stress setup",
      ],
      additionalInformation: [
        { label: "Delivery Time", value: "2-4 weeks" },
        { label: "Installation", value: "Included" },
      ],
      items: [
        {
          category: "LIVING ROOM",
          name: "Sectional Sofa",
          image: "/landing/packages/packages-product-img-1.webp",
        },
        {
          category: "LIVING ROOM",
          name: "Marble Coffee Table",
          image: "/landing/packages/packages-product-img-2.webp",
        },
        {
          category: "DINING",
          name: "4-Seater Dining Set",
          image: "/landing/packages/packages-product-img-5.webp",
        },
      ],
    },
    {
      id: "2br",
      label: "2 Bedroom",
      price: 49900,
      description:
        "Elevated design package for 2-bedroom homes. Offers a cohesive look throughout the entire space with premium furniture and decor.",
      features: [
        "Full sets for two bedrooms",
        "Spacious living & dining furniture",
        "Curated accent pieces",
        "Durable for high-traffic rentals",
      ],
      additionalInformation: [
        { label: "Delivery Time", value: "3-5 weeks" },
        { label: "Installation", value: "Included" },
      ],
      items: [
        {
          category: "LIVING ROOM",
          name: "Premium Sectional",
          image: "/landing/packages/packages-product-img-1.webp",
        },
      ],
    },
    {
      id: "3br",
      label: "3 Bedroom",
      price: 69900,
      description:
        "The ultimate investor package for large 3-bedroom residences. High-end furnishing that increases property value and attracts premium tenants.",
      features: [
        "Luxury furniture for all rooms",
        "Statement lighting included",
        "Comprehensive decor package",
        "Priority delivery & setup",
      ],
      additionalInformation: [
        { label: "Delivery Time", value: "4-6 weeks" },
        { label: "Installation", value: "Included" },
      ],
      items: [
        {
          category: "LIVING ROOM",
          name: "Signature Sofa Suite",
          image: "/landing/packages/packages-product-img-1.webp",
        },
      ],
    },
  ],
};

const Accordion = ({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left group"
      >
        <span className="text-xs font-bold text-[#412A1F] uppercase tracking-wider">
          {title}
        </span>
        {isOpen ? (
          <Minus className="w-3.5 h-3.5 text-gray-800" />
        ) : (
          <Plus className="w-3.5 h-3.5 text-gray-800" />
        )}
      </button>
      {isOpen && (
        <div className="pb-6 animate-in fade-in slide-in-from-top-1">
          {children}
        </div>
      )}
    </div>
  );
};

export function PackageDetail({ slug }: { slug: string }) {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedTypeIndex, setSelectedTypeIndex] = useState(0);

  const selectedType = DUMMY_PACKAGE.propertyTypes[selectedTypeIndex];

  const nextImage = () =>
    setActiveImage((prev) => (prev + 1) % DUMMY_PACKAGE.images.length);
  const prevImage = () =>
    setActiveImage(
      (prev) =>
        (prev - 1 + DUMMY_PACKAGE.images.length) % DUMMY_PACKAGE.images.length,
    );

  return (
    <div className="bg-white" data-package-slug={slug}>
      <section className="max-w-8xl mx-auto px-4 sm:px-10 lg:px-16 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden group">
              <Image
                src={DUMMY_PACKAGE.images[activeImage]}
                alt={DUMMY_PACKAGE.name}
                fill
                className="object-cover"
              />
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="w-5 h-5 text-[#412A1F]" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="w-5 h-5 text-[#412A1F]" />
              </button>
            </div>

            <div className="grid grid-cols-5 gap-3">
              {DUMMY_PACKAGE.images.slice(0, 5).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    activeImage === idx
                      ? "border-[#412A1F]"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src={img}
                    alt="thumbnail"
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Detailed Info */}
          <div className="flex flex-col">
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#412A1F] mb-4">
              {DUMMY_PACKAGE.name}
            </h1>
            <p className="text-2xl font-bold text-[#412A1F] mb-8">
              AED {selectedType.price.toLocaleString()}
            </p>

            <div className="mb-10">
              <p className="text-[11px] text-[#412A1F]/60 font-medium mb-4">
                Select Property Type
              </p>
              <div className="flex flex-col gap-2">
                {DUMMY_PACKAGE.propertyTypes.map((type, idx) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedTypeIndex(idx)}
                    className={`w-full px-5 h-[52px] flex items-center justify-between border rounded-lg transition-all ${
                      selectedTypeIndex === idx
                        ? "bg-[#412A1F] border-[#412A1F] text-white"
                        : "bg-white border-gray-100 text-[#412A1F] hover:border-[#412A1F]/20"
                    }`}
                  >
                    <span className="text-sm">{type.label}</span>
                    <span
                      className={`text-sm font-bold ${selectedTypeIndex === idx ? "text-white" : "text-[#412A1F]/60"}`}
                    >
                      AED {type.price.toLocaleString()}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 mb-10">
              <Button className="w-full h-14 bg-[#412A1F] hover:bg-[#2C1A11] text-white rounded-lg text-xs font-bold uppercase tracking-widest transition-transform active:scale-[0.98]">
                Add to Cart
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full h-14 border border-[#412A1F] text-[#412A1F] hover:bg-gray-50 rounded-lg text-xs font-bold uppercase tracking-widest"
              >
                <Link href={ROUTES.BOOK_CONSULTATION}>
                  Schedule Consultation
                </Link>
              </Button>
            </div>

            {/* Accordions */}
            <div className="space-y-0.5">
              <Accordion title="Description" defaultOpen={true}>
                <p className="text-[13px] text-gray-500 leading-relaxed max-w-[90%]">
                  {selectedType.description}
                </p>
              </Accordion>
              <Accordion title="Package Features">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                  {selectedType.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Check className="w-3.5 h-3.5 text-[#412A1F] shrink-0" />
                      <span className="text-[13px] text-gray-500 leading-tight">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </Accordion>
              <Accordion title="Additional Information">
                <div className="space-y-4">
                  {selectedType.additionalInformation.map((info, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between pb-3 border-b border-gray-50 last:border-0 last:pb-0"
                    >
                      <span className="text-[13px] text-gray-400 font-medium">
                        {info.label}
                      </span>
                      <span className="text-[13px] text-[#412A1F] font-semibold">
                        {info.value}
                      </span>
                    </div>
                  ))}
                </div>
              </Accordion>
            </div>

            <div className="mt-10">
              <p className="text-sm text-gray-500">
                Need help deciding?{" "}
                <button className="text-[#412A1F] font-bold underline underline-offset-4 decoration-[#412A1F]/30 hover:decoration-[#412A1F]">
                  Contact our team
                </button>{" "}
                for a personalized consultation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Items Section */}
      <section className="bg-[#FAFAFA] py-24">
        <div className="max-w-8xl mx-auto px-4 sm:px-10 lg:px-16">
          <h2 className="text-3xl font-serif font-bold text-[#412A1F] mb-12">
            Items in this Package
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {selectedType.items.map((item, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">
                  {item.category}
                </p>
                <h3 className="text-sm font-bold text-[#412A1F] group-hover:text-[#C9A76A] transition-colors line-clamp-1">
                  {item.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
