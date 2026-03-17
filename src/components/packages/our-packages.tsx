"use client";

import { usePackages } from "@/hooks/queries/use-packages";

import { PackageCard } from "./package-card";

export function OurPackages() {
  const { data, isLoading, error } = usePackages();

  if (isLoading) {
    return (
      <div className="py-24 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#412A1F]"></div>
      </div>
    );
  }

  if (error || !data) {
    return null; // Or handle error UI
  }

  return (
    <section className="py-24 bg-[#FAFAFA]">
      <div className="max-w-8xl mx-auto px-4 sm:px-10 lg:px-16 text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-serif font-semibold text-[#412A1F] mb-4">
          Our Packages
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Carefully curated furnishing solutions for every need
        </p>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {data.results.map((pkg) => (
            <PackageCard
              key={pkg.id}
              title={pkg.name}
              description={pkg.description || ""}
              image={pkg.thumbnail || "/landing/packages/packages-product-img-1.webp"}
              badge={`AED ${pkg.starting_price?.toLocaleString() || "0"}`}
              href={`/packages/${pkg.slug}`}
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
