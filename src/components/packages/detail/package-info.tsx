"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/route";
import type { PackageDetail, PackageProperty } from "@/types/api";

interface PackageInfoProps {
  pkg: PackageDetail;
  selectedTypeIndex: number;
  setSelectedTypeIndex: (index: number) => void;
  handleAddToCart: () => void;
  selectedType?: PackageProperty;
}

export function PackageInfo({
  pkg,
  selectedTypeIndex,
  setSelectedTypeIndex,
  handleAddToCart,
  selectedType,
}: PackageInfoProps) {
  return (
    <div className="flex flex-col">
      <h1 className="text-4xl sm:text-5xl font-serif font-medium text-[#412A1F] mb-4">
        {pkg.name}
      </h1>
      <p className="text-2xl font-regular text-[#412A1F] mb-8">
        AED{" "}
        {Number(
          selectedType?.price || pkg.starting_price || 0,
        ).toLocaleString()}
      </p>

      {pkg.properties.length > 0 && (
        <div className="mb-10">
          <p className="text-xs text-[#4A5565] font-medium mb-4">
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
                    : "bg-white border-[#D1D5DC] text-[#412A1F] hover:border-[#412A1F]/20"
                }`}
              >
                <span className="text-sm">{type.name}</span>
                <span
                  className={`text-sm ${selectedTypeIndex === idx ? "text-white" : "text-[#412A1F]"}`}
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
          <Link href={ROUTES.BOOK_CONSULTATION}>Schedule Consultation</Link>
        </Button>
      </div>

      <div className="mt-10 space-y-1">
        <p className="text-sm text-gray-500">Need help deciding?</p>
        <p className="text-sm text-gray-500">
          <Link
            href={ROUTES.BOOK_CONSULTATION}
            className="text-[#412A1F] font-bold underline underline-offset-4 decoration-[#412A1F]/30 hover:decoration-[#412A1F]"
          >
            Contact our team
          </Link>{" "}
          for a personalized consultation
        </p>
      </div>
    </div>
  );
}
