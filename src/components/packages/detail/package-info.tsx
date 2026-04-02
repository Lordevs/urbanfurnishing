import { ShoppingBasket } from "lucide-react";
import { PrimaryButton } from "@/components/common/primary-button";
import { SecondaryButton } from "@/components/common/secondary-button";
import type { PackageDetail, PackageProperty } from "@/types/api";
import { cn } from "@/lib/utils";

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
      {/* Title */}
      <h1 className="text-2xl sm:text-[32px] font-serif text-[#3D261C] leading-tight mb-2">
        {pkg.name} Package
      </h1>

      {/* Property Tabs */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2.5">
          {pkg.properties.map((type, idx) => (
            <button
              key={type.id}
              onClick={() => setSelectedTypeIndex(idx)}
              className={cn(
                "px-5 py-2.5 rounded-full text-[13px] font-medium transition-all duration-300 border",
                selectedTypeIndex === idx
                  ? "bg-[#3D261C] border-[#3D261C] text-white shadow-lg shadow-black/5"
                  : "bg-white border-gray-200 text-[#5D4E3C] hover:border-[#3D261C]/30",
              )}>
              {type.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Section */}
      <div className="mb-5">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl sm:text-[40px] font-serif text-[#3D261C] leading-none">
            AED {Number(selectedType?.price || 0).toLocaleString()}
          </span>
          {selectedType?.price && (
            <span className="text-lg text-gray-400 line-through decoration-gray-300">
              {Number(Number(selectedType.price) * 1.15).toLocaleString(
                undefined,
                { maximumFractionDigits: 0 },
              )}
            </span>
          )}
        </div>
        <p className="text-[#C9A76A] text-sm font-medium mt-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A76A] animate-pulse" />
          Ready for delivery (9-12 days)
        </p>
      </div>

      {/* CTA Buttons - Using Common Components with custom styling */}
      <div className="flex flex-col gap-4 mt-4">
        {/* Place Order */}
        <div onClick={handleAddToCart} className="w-full cursor-pointer">
          <PrimaryButton
            href="#"
            label="Place Order Now"
            className="w-full! bg-[#412A1F] border-0 hover:bg-[#2C1A11] rounded-2xl h-14 sm:w-full! justify-center! sm:justify-center! relative"
            iconClassName="absolute right-2"
          />
        </div>

        <SecondaryButton
          href={`https://wa.me/971501234567?text=Hi, I am interested in the ${pkg.name} package`}
          label="Chat with Us on WhatsApp"
          className="w-full! bg-white text-[#412A1F] border border-[#412A1F]/20 hover:bg-gray-50 rounded-2xl h-14 sm:w-full! text-md font-bold px-6 flex items-center justify-center"
        />
      </div>
    </div>
  );
}
