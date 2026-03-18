"use client";

import { usePackages } from "@/hooks/queries/use-packages";

import { PackageCard } from "./package-card";

function PackageSkeleton() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 flex flex-col h-full animate-pulse">
      <div className="h-[320px] w-full bg-[#F0EBE4]" />
      <div className="p-8 flex flex-col flex-1 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#F0EBE4]" />
          <div className="h-6 w-32 bg-[#F0EBE4] rounded" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-[#F0EBE4] rounded" />
          <div className="h-4 w-5/6 bg-[#F0EBE4] rounded" />
        </div>
        <div className="space-y-3 mt-4">
          <div className="h-8 w-full bg-[#F0EBE4] rounded" />
          <div className="h-8 w-full bg-[#F0EBE4] rounded" />
        </div>
        <div className="mt-auto h-12 w-full bg-[#F0EBE4] rounded-xl" />
      </div>
    </div>
  );
}

export function OurPackages({ categorySlug }: { categorySlug?: string } = {}) {
  const { data, isLoading, error } = usePackages(
    categorySlug ? { category__slug: categorySlug } : {},
  );

  if (isLoading) {
    return (
      <section className="pb-24 pt-12 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-16 text-center mb-16">
          <div className="h-12 w-64 bg-[#F0EBE4] rounded mx-auto mb-4 animate-pulse" />
          <div className="h-4 w-96 bg-[#F0EBE4] rounded mx-auto animate-pulse" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {[...Array(4)].map((_, i) => (
              <PackageSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !data) {
    return null; // Or handle error UI
  }

  return (
    <section className="pb-24 pt-12 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-16 text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-serif font-semibold text-[#412A1F] mb-4">
          Our Packages
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Carefully curated furnishing solutions for every need
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {data.results.map((pkg) => (
            <PackageCard
              key={pkg.id}
              title={pkg.name}
              description={pkg.description || ""}
              image={
                pkg.thumbnail || "/landing/packages/packages-product-img-1.webp"
              }
              badge={`AED ${pkg.starting_price?.toLocaleString() || "0"}`}
              href={`/packages/${categorySlug || "collection"}/${pkg.slug}`}
              options={pkg.properties_info.map((prop) => ({
                label: prop.name,
                price: `AED ${prop.price.toLocaleString()}`,
              }))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
