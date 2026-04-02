"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/route";
import { useCart } from "@/context/cart-context";
import { usePackageDetail } from "@/hooks/queries/use-package-detail";

import { PackageAccordion } from "./package-accordion";
import { PackageGallery } from "./package-gallery";
import { PackageInfo } from "./package-info";
import { PackageItemsGrid } from "./package-items-grid";

export function PackageDetail({ slug }: { slug: string }) {
  const router = useRouter();
  const { data: pkg, isLoading, error } = usePackageDetail(slug);
  const [selectedTypeIndex, setSelectedTypeIndex] = useState(0);
  const [prevSlug, setPrevSlug] = useState(slug);

  // Reset selected type index when slug changes
  if (slug !== prevSlug) {
    setPrevSlug(slug);
    setSelectedTypeIndex(0);
  }

  const { addItem } = useCart();

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
  const sortedImages =
    pkg.images.length > 0
      ? [...pkg.images].sort((a, b) => a.order - b.order)
      : [];

  const handleAddToCart = () => {
    if (!pkg || !selectedType) return;

    addItem({
      id: pkg.id,
      slug: pkg.slug,
      name: `${pkg.name} - ${selectedType.name}`,
      packageBaseName: pkg.name,
      price: Number(selectedType.price),
      image: sortedImages[0]?.image || "",
      itemType: "PACKAGE",
      selectedPropertyId: selectedType.id,
      selectedAddOnIds: [],
      selectedAddOns: [],
    });
    router.push(ROUTES.CART);
  };

  return (
    <div className="bg-white min-h-screen" data-package-slug={slug}>
      <section className="max-w-8xl mx-auto px-4 sm:px-10 lg:px-16 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Left Column: Gallery (Increased Width) */}
          <div className="lg:col-span-8">
            <PackageGallery images={sortedImages} packageName={pkg.name} />
          </div>

          {/* Right Column: Info Card (Reduced Width) */}
          <div className="lg:col-span-4 h-fit lg:sticky lg:top-32">
            <div className="bg-[#F9F9F9] rounded-[32px] p-6 sm:p-8">
              <PackageInfo
                pkg={pkg}
                selectedTypeIndex={selectedTypeIndex}
                setSelectedTypeIndex={setSelectedTypeIndex}
                handleAddToCart={handleAddToCart}
                selectedType={selectedType}
              />

              {/* Action Accordions - Dynamic Content */}
              <div className="mt-8 space-y-3">
                {pkg.description && (
                  <PackageAccordion title="Description" defaultOpen={true}>
                    <p className="text-[14px] text-gray-500 leading-relaxed">
                      {pkg.description}
                    </p>
                  </PackageAccordion>
                )}

                {selectedType && selectedType.features.length > 0 && (
                  <PackageAccordion title="What's Included">
                    <ul className="space-y-2 list-disc list-inside">
                      {selectedType.features.map((feature, i) => (
                        <li
                          key={i}
                          className="text-[14px] text-gray-500 leading-relaxed">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </PackageAccordion>
                )}

                {selectedType && selectedType.additional_info.length > 0 && (
                  <PackageAccordion title="Specifications">
                    <div className="space-y-3">
                      {selectedType.additional_info.map((info, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center pb-2 border-b border-gray-50 last:border-0 last:pb-0">
                          <span className="text-[13px] text-gray-400">
                            {info.key}
                          </span>
                          <span className="text-[13px] text-[#412A1F] font-semibold">
                            {info.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </PackageAccordion>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {selectedType && <PackageItemsGrid selectedType={selectedType} />}
    </div>
  );
}
