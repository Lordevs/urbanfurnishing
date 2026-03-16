"use client";

import { ArrowRight, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PackageOption {
  label: string;
  price: string;
}

interface PackageCardProps {
  title: string;
  description: string;
  image: string;
  badge: string;
  options: PackageOption[];
  href: string;
}

export function PackageCard({
  title,
  description,
  image,
  badge,
  options,
  href,
}: PackageCardProps) {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-gray-100 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Image Section */}
      <div className="relative h-[280px] w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-lg shadow-sm border border-white/20">
          <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider mb-0.5">
            Starting from
          </p>
          <p className="text-sm font-bold text-[#412A1F]">{badge}</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-gray-50">
            <Home className="w-5 h-5 text-[#412A1F]" />
          </div>
          <h3 className="text-xl font-serif font-semibold text-[#412A1F]">
            {title}
          </h3>
        </div>

        <p className="text-sm text-gray-500 leading-relaxed mb-6 line-clamp-3">
          {description}
        </p>

        {/* Pricing Options */}
        <div className="space-y-3 mb-8">
          {options.map((option, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
            >
              <span className="text-sm text-[#412A1F]/80">{option.label}</span>
              <span className="text-sm font-semibold text-[#412A1F]">
                from {option.price}
              </span>
            </div>
          ))}
        </div>

        {/* View Details Button */}
        <Link
          href={href}
          className="mt-auto flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-[#412A1F] text-white text-sm font-medium hover:bg-[#2C1A11] transition-colors group/btn"
        >
          View Details
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
