"use client";

import { PackageCard } from "./package-card";

const PACKAGES_DATA = [
  {
    title: "Investor Turnkey Package",
    description: "Designed for rental properties and investment apartments. Fully furnished, rental-ready homes delivered quickly and professionally.",
    image: "/landing/packages/packages-product-img-1.webp",
    badge: "AED 24,900",
    href: "/packages?category=investor-turnkey",
    options: [
      { label: "Studio", price: "AED 24,900" },
      { label: "1 Bedroom", price: "AED 34,900" },
      { label: "2 Bedroom", price: "AED 49,900" },
      { label: "3 Bedroom", price: "AED 69,900" },
    ],
  },
  {
    title: "End-User Signature Package",
    description: "A refined furnishing solution for homeowners who want their property to feel personal, layered and thoughtfully styled.",
    image: "/landing/packages/packages-product-img-2.webp",
    badge: "AED 49,000",
    href: "/packages?category=end-user-signature",
    options: [
      { label: "1 Bedroom", price: "AED 49,000" },
      { label: "2 Bedroom", price: "AED 69,000" },
      { label: "3 Bedroom", price: "AED 95,000" },
      { label: "Villa", price: "AED 145,000" },
    ],
  },
  {
    title: "Developer Solutions",
    description: "Furnishing solutions for show apartments and villas. Spaces styled for sales and viewings that impress buyers.",
    image: "/landing/packages/packages-product-img-3.webp",
    badge: "AED 39,000",
    href: "/packages?category=developer-solutions",
    options: [
      { label: "Studio show unit", price: "AED 39,000" },
      { label: "1 Bedroom show unit", price: "AED 55,000" },
      { label: "2 Bedroom show unit", price: "AED 75,000" },
    ],
  },
  {
    title: "Custom Projects",
    description: "Bespoke furnishing solutions for villas, penthouses, luxury residences and hospitality spaces requiring a curated design approach.",
    image: "/landing/packages/packages-product-img-4.webp",
    badge: "AED 150,000",
    href: "/packages?category=custom-projects",
    options: [
      { label: "Custom projects", price: "AED 150,000" },
    ],
  },
];

export function OurPackages() {
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
          {PACKAGES_DATA.map((pkg, idx) => (
            <PackageCard key={idx} {...pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}
