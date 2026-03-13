"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

import { ROUTES } from "@/constants/route";
import { usePackageCategories } from "@/hooks/queries/use-categories";
import { usePackages } from "@/hooks/queries/use-packages";
import type { PackageListItem } from "@/types/api";

import { ProductGrid, GridItemProps } from "../shared/product-grid";

const TAG_COLOR: Record<string, string> = {
  BEST_SELLER: "bg-[#D1B072]",
  PREMIUM: "bg-[#D1B072]",
  VALUE_PACK: "bg-[#D1B072]",
  NEW: "bg-[#D1B072]",
};

function toGridItem(pkg: PackageListItem): GridItemProps {
  const actualPrice = parseFloat(pkg.actual_price);
  const discountedPrice = pkg.discounted_price
    ? parseFloat(pkg.discounted_price)
    : undefined;

  const price = discountedPrice ?? actualPrice;
  const originalPrice = discountedPrice ? actualPrice : undefined;

  const saving = pkg.money_saved
    ? Math.round(parseFloat(pkg.money_saved))
    : undefined;

  const badges: GridItemProps["badges"] = [];
  if (pkg.tag) {
    badges.push({
      text: pkg.tag.replace("_", " "),
      color: TAG_COLOR[pkg.tag] ?? "bg-[#D1B072]",
    });
  }
  if (pkg.discount_percentage) {
    badges.push({
      text: `-${pkg.discount_percentage}% OFF`,
      color: "bg-[#1A1A1A]",
    });
  }

  return {
    id: pkg.id,
    slug: pkg.slug,
    category: pkg.category_name?.toUpperCase() ?? "",
    title: pkg.name,
    description: pkg.short_description ?? "",
    price,
    originalPrice,
    saveText: saving ? `Save AED ${saving.toLocaleString()}` : undefined,
    badges,
    image: pkg.thumbnail ?? "/landing/packages/packages-product-img-1.webp",
    itemType: "PACKAGE",
    isInStock: pkg.is_in_stock ?? true,
  };
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-[24px] overflow-hidden border border-[#F2F2F2] animate-pulse"
        >
          <div className="aspect-4/3 bg-[#F0EBE4]" />
          <div className="p-5 flex flex-col gap-3">
            <div className="h-3 w-16 bg-[#F0EBE4] rounded" />
            <div className="h-6 w-3/4 bg-[#F0EBE4] rounded" />
            <div className="h-4 w-full bg-[#F0EBE4] rounded" />
            <div className="h-4 w-5/6 bg-[#F0EBE4] rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function AllPackages() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const selectedCategorySlug = searchParams.get("category");
  const searchQuery = searchParams.get("search") || "";
  const currentPage = Number(searchParams.get("page")) || 1;
  const PAGE_SIZE = 6;

  const { data: categoryData } = usePackageCategories();
  const { data, isLoading } = usePackages({
    ...(selectedCategorySlug ? { category__slug: selectedCategorySlug } : {}),
    ...(searchQuery ? { search: searchQuery } : {}),
    page: currentPage,
    page_size: PAGE_SIZE,
  });

  const categoryLabels = [
    "All",
    ...(categoryData ?? []).map((c: { name: string }) => c.name),
  ];
  const categoryMap = Object.fromEntries(
    (categoryData ?? []).map((c: { name: string; slug: string }) => [
      c.name,
      c.slug,
    ]),
  );

  const items = (data?.results ?? []).map(toGridItem);

  if (isLoading) {
    return (
      <section className="px-4 sm:px-10 lg:px-16 max-w-8xl mx-auto pb-24">
        <div className="bg-white border border-[#EDEDED] rounded-[24px] p-5 lg:p-6 mb-12 animate-pulse">
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-9 w-24 bg-[#F0EBE4] rounded-full" />
            ))}
          </div>
        </div>
        <GridSkeleton />
      </section>
    );
  }

  const activeCategoryName =
    selectedCategorySlug && categoryData
      ? (categoryData.find(
          (c: { slug: string; name: string }) =>
            c.slug === selectedCategorySlug,
        )?.name ?? "All")
      : "All";

  const handleCategoryChange = (cat: string) => {
    const slug = cat === "All" ? null : categoryMap[cat];
    const newParams = new URLSearchParams(searchParams.toString());
    if (slug) {
      newParams.set("category", slug);
    } else {
      newParams.delete("category");
    }
    // Reset to page 1 on category change
    newParams.delete("page");
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  const handleSearchChange = (query: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (query) {
      newParams.set("search", query);
    } else {
      newParams.delete("search");
    }
    newParams.delete("page");
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (page > 1) {
      newParams.set("page", String(page));
    } else {
      newParams.delete("page");
    }
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const totalPages = data?.count ? Math.ceil(data.count / PAGE_SIZE) : 1;

  return (
    <ProductGrid
      title="All Packages"
      categories={categoryLabels}
      items={items}
      activeCategory={activeCategoryName}
      detailRoute={(id) => ROUTES.PACKAGES_DETAIL(id)}
      onCategoryChange={handleCategoryChange}
      searchQuery={searchQuery}
      onSearchChange={handleSearchChange}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
}
