import { MessageCircle, ShoppingBasket } from "lucide-react";
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
  selectedAddOnIds: string[];
}

export function PackageInfo({
  pkg,
  selectedTypeIndex,
  setSelectedTypeIndex,
  handleAddToCart,
  selectedType,
  selectedAddOnIds,
}: PackageInfoProps) {
  const addOnsTotal = pkg.add_ons
    .filter((a) => selectedAddOnIds.includes(a.id))
    .reduce((sum, a) => sum + Number(a.price), 0);

  const totalPrice = Number(selectedType?.price || 0) + addOnsTotal;
  const originalPrice = totalPrice * 1.15;
  return (
    <div className="flex flex-col">
      {/* Title */}
      <h1 className="text-xl sm:text-[32px] font-serif text-[#3D261C] leading-tight mb-2">
        {pkg.name} Package
      </h1>

      {/* Property Tabs */}
      <div className="mb-3 sm:mb-4">
        <div className="flex flex-wrap gap-2 sm:gap-2.5">
          {pkg.properties.map((type, idx) => (
            <button
              key={type.id}
              onClick={() => setSelectedTypeIndex(idx)}
              className={cn(
                "px-4 py-1.5 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-medium transition-all duration-300 border",
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
          <span className="text-2xl sm:text-[40px] font-serif text-[#3D261C] leading-none">
            AED {totalPrice.toLocaleString()}
          </span>
          {totalPrice > 0 && (
            <span className="text-lg text-gray-400 line-through decoration-gray-300">
              {originalPrice.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
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
            className="w-full! bg-[#412A1F] border-0 hover:bg-[#2C1A11] rounded-2xl h-12 sm:h-14 sm:w-full! justify-center! sm:justify-center! relative text-white"
            iconClassName="absolute right-4"
          />
        </div>

        <SecondaryButton
          href={`${process.env.NEXT_PUBLIC_WHATS_APP}?text=Hi, I am interested in the ${pkg.name} package`}
          label={
            <div className="flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-[#412A1F]">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>Chat with Us on WhatsApp</span>
            </div>
          }
          className="w-full! bg-white text-[#412A1F] border border-[#412A1F]/20 hover:bg-gray-50 rounded-2xl h-12 sm:h-14 sm:w-full! text-md font-bold px-6"
        />
      </div>
    </div>
  );
}
