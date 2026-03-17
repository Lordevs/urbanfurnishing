"use client";

import { ChevronLeft, ChevronRight, Plus, Minus, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/route";
import { useCart } from "@/context/cart-context";
import { usePackageDetail } from "@/hooks/queries/use-package-detail";

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
  const { data: pkg, isLoading, error } = usePackageDetail(slug);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedTypeIndex, setSelectedTypeIndex] = useState(0);
  const [prevSlug, setPrevSlug] = useState(slug);

  // Reset selected type index when slug changes
  if (slug !== prevSlug) {
    setPrevSlug(slug);
    setSelectedTypeIndex(0);
  }

  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (!pkg || !selectedType) return;

    addItem({
      id: selectedType.id,
      slug: pkg.slug,
      name: `${pkg.name} - ${selectedType.name}`,
      price: Number(selectedType.price),
      image: images[0]?.image || "",
      itemType: "PACKAGE",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#412A1F]"></div>
      </div>
    );
  }

  if (error || !pkg) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center">
        <h2 className="text-2xl font-serif font-bold text-[#412A1F]">
          Package not found
        </h2>
        <Button asChild className="mt-4 bg-[#412A1F]">
          <Link href={ROUTES.PACKAGES}>Back to Packages</Link>
        </Button>
      </div>
    );
  }

  const selectedType = pkg.properties[selectedTypeIndex];
  const images =
    pkg.images.length > 0 ? pkg.images.sort((a, b) => a.order - b.order) : [];

  const nextImage = () => setActiveImage((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setActiveImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="bg-white" data-package-slug={slug}>
      <section className="max-w-8xl mx-auto px-4 sm:px-10 lg:px-16 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden group bg-gray-50">
              {images[activeImage] ? (
                <Image
                  src={images[activeImage].image}
                  alt={images[activeImage].alt_text || pkg.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  No Image Available
                </div>
              )}
              {images.length > 1 && (
                <>
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
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-3">
                {images.slice(0, 5).map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImage(idx)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      activeImage === idx
                        ? "border-[#412A1F]"
                        : "border-transparent"
                    }`}
                  >
                    <Image
                      src={img.image}
                      alt="thumbnail"
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Detailed Info */}
          <div className="flex flex-col">
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#412A1F] mb-4">
              {pkg.name}
            </h1>
            <p className="text-2xl font-bold text-[#412A1F] mb-8">
              AED{" "}
              {Number(
                selectedType?.price || pkg.starting_price || 0,
              ).toLocaleString()}
            </p>

            {pkg.properties.length > 0 && (
              <div className="mb-10">
                <p className="text-[11px] text-[#412A1F]/60 font-medium mb-4">
                  Select Property Type
                </p>
                <div className="flex flex-col gap-2">
                  {pkg.properties.map((type, idx) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedTypeIndex(idx)}
                      className={`w-full px-5 h-[52px] flex items-center justify-between border rounded-lg transition-all ${
                        selectedTypeIndex === idx
                          ? "bg-[#412A1F] border-[#412A1F] text-white"
                          : "bg-white border-gray-100 text-[#412A1F] hover:border-[#412A1F]/20"
                      }`}
                    >
                      <span className="text-sm">{type.name}</span>
                      <span
                        className={`text-sm font-bold ${selectedTypeIndex === idx ? "text-white" : "text-[#412A1F]/60"}`}
                      >
                        AED {Number(type.price).toLocaleString()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3 mb-10">
              <Button
                onClick={handleAddToCart}
                className="w-full h-[58px] rounded-full text-[16px] font-medium flex items-center justify-center transition-all duration-300 relative group px-4 bg-[#412A1F] hover:bg-[#2C1A11] text-white cursor-pointer"
              >
                <span className="flex-1 text-center">Add to Cart</span>
                <div className="flex bg-[#FFF8F0] rounded-full w-[30px] h-[30px] items-center justify-center text-[#412A1F] transition-transform duration-300 group-hover:scale-95 shrink-0">
                  <Image
                    src="/common/arrow-up.svg"
                    alt="Arrow Up"
                    width={12}
                    height={12}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
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
                  {pkg.description}
                </p>
              </Accordion>
              {selectedType && (
                <>
                  {selectedType.features.length > 0 && (
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
                  )}
                  {selectedType.additional_info.length > 0 && (
                    <Accordion title="Additional Information">
                      <div className="space-y-4">
                        {selectedType.additional_info.map((info, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between pb-3 border-b border-gray-50 last:border-0 last:pb-0"
                          >
                            <span className="text-[13px] text-gray-400 font-medium">
                              {info.key}
                            </span>
                            <span className="text-[13px] text-[#412A1F] font-semibold">
                              {info.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </Accordion>
                  )}
                </>
              )}
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
      {selectedType && selectedType.items.length > 0 && (
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
      )}
    </div>
  );
}
