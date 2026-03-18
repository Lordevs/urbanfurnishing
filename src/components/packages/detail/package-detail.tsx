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
    pkg.images.length > 0 ? [...pkg.images].sort((a, b) => a.order - b.order) : [];

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
    <div className="bg-white" data-package-slug={slug}>
      <section className="max-w-8xl mx-auto px-4 sm:px-10 lg:px-16 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <PackageGallery images={sortedImages} packageName={pkg.name} />

          <div className="flex flex-col">
            <PackageInfo
              pkg={pkg}
              selectedTypeIndex={selectedTypeIndex}
              setSelectedTypeIndex={setSelectedTypeIndex}
              handleAddToCart={handleAddToCart}
              selectedType={selectedType}
            />

            {/* Feature Accordions */}
            <div className="mt-10 space-y-0.5">
              <PackageAccordion title="Description" defaultOpen={true}>
                <p className="text-[13px] text-gray-500 leading-relaxed max-w-[90%]">
                  {pkg.description}
                </p>
              </PackageAccordion>

              {selectedType && (
                <>
                  {selectedType.features.length > 0 && (
                    <PackageAccordion title="Package Features">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                        {selectedType.features.map((feature: string, i: number) => (
                          <div key={i} className="flex items-center gap-3">
                            <Check className="w-3.5 h-3.5 text-[#412A1F] shrink-0" />
                            <span className="text-[13px] text-gray-500 leading-tight">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </PackageAccordion>
                  )}

                  {selectedType.additional_info.length > 0 && (
                    <PackageAccordion title="Additional Information">
                      <div className="space-y-4">
                        {selectedType.additional_info.map(
                          (info: { key: string; value: string }, i: number) => (
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
                          ),
                        )}
                      </div>
                    </PackageAccordion>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {selectedType && <PackageItemsGrid selectedType={selectedType} />}
    </div>
  );
}
