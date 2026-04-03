"use client";

import { usePackageCategories } from "@/hooks/queries/use-categories";

import { PackageCategoryCard } from "./package-category-card";

function CategorySkeleton() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 flex flex-col h-full animate-pulse">
      <div className="aspect-3/2 w-full bg-[#F0EBE4]" />
      <div className="p-8 flex flex-col flex-1 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#F0EBE4]" />
          <div className="h-6 w-32 bg-[#F0EBE4] rounded" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-[#F0EBE4] rounded" />
          <div className="h-4 w-5/6 bg-[#F0EBE4] rounded" />
        </div>
        <div className="mt-auto h-12 w-full bg-[#F0EBE4] rounded-xl" />
      </div>
    </div>
  );
}

export function PackageCategories() {
  const { data: categories, isLoading, error } = usePackageCategories();

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 px-4 sm:px-10 lg:px-16 mx-auto">
        <div className="max-w-8xl mx-auto px-4 sm:px-10 lg:px-16 text-center mb-16">
          <div className="h-12 w-64 bg-[#F0EBE4] rounded mx-auto mb-4 animate-pulse" />
          <div className="h-4 w-96 bg-[#F0EBE4] rounded mx-auto animate-pulse" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[...Array(4)].map((_, i) => (
              <CategorySkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !categories) {
    return (
      <div className="py-24 text-center text-[#8F877C]">
        Failed to load categories. Please try again later.
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="py-24 text-center text-[#8F877C]">
        No package categories available at the moment.
      </div>
    );
  }

  return (
    <section className="py-16 md:py-24 px-4 sm:px-10 lg:px-16 mx-auto">
      <div className="max-w-8xl mx-auto px-4 sm:px-10 lg:px-16 text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-serif font-semibold text-primary mb-4">
          Our <span className="text-secondary">Collections</span>
        </h2>
        <p className="text-muted max-w-2xl mx-auto">
          Discover our thoughtfully curated furnishing collections, each
          designed to bring style, comfort, and functionality to your home.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:px-16">
        {categories.map((category) => (
          <PackageCategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}
