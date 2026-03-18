"use client";

import { motion } from "framer-motion";
import { Trash2, Check, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { useCart } from "@/context/cart-context";
import type { CartItem } from "@/context/cart-context";
import { usePackageDetail } from "@/hooks/queries/use-package-detail";

interface PackageCartItemProps {
  item: CartItem;
  index: number;
}

export function PackageCartItem({ item, index }: PackageCartItemProps) {
  const { removeItem, updateItem } = useCart();
  const { data: pkg, isLoading } = usePackageDetail(item.slug);
  const [isOptionsOpen, setIsOptionsOpen] = useState(true);

  const formatPrice = (value: number) => {
    return `AED ${value.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
  };

  const handlePropertyChange = (propertyId: string) => {
    if (!pkg) return;
    const property = pkg.properties.find((p) => p.id === propertyId);
    if (!property) return;

    // Calculate new total price with existing add-ons
    const addOnsTotal = (item.selectedAddOns || []).reduce(
      (sum, addon) => sum + addon.price,
      0,
    );

    updateItem(item.id, {
      name: `${pkg.name} - ${property.name}`,
      price: Number(property.price) + addOnsTotal,
      selectedPropertyId: property.id,
    });
  };

  const toggleAddOn = (addonId: string) => {
    if (!pkg) return;
    const addon = pkg.add_ons.find((a) => a.id === addonId);
    if (!addon) return;

    const isSelected = item.selectedAddOnIds?.includes(addonId);
    let newAddOnIds = item.selectedAddOnIds || [];
    let newAddOns = item.selectedAddOns || [];

    if (isSelected) {
      newAddOnIds = newAddOnIds.filter((id) => id !== addonId);
      newAddOns = newAddOns.filter((a) => a.id !== addonId);
    } else {
      newAddOnIds = [...newAddOnIds, addonId];
      newAddOns = [
        ...newAddOns,
        { id: addon.id, title: addon.title, price: Number(addon.price) },
      ];
    }

    // Get current property price
    const currentProperty = pkg.properties.find(
      (p) => p.id === item.selectedPropertyId,
    );
    const basePrice = Number(currentProperty?.price || item.price);
    const addonsTotal = newAddOns.reduce((sum, a) => sum + a.price, 0);

    updateItem(item.id, {
      selectedAddOnIds: newAddOnIds,
      selectedAddOns: newAddOns,
      price: basePrice + addonsTotal,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex flex-col border border-[#F2F2F2] rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] bg-white overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between p-4 sm:p-6 items-stretch">
        <div className="flex items-center gap-6 w-full sm:w-auto">
          <div className="w-[110px] h-[110px] rounded-[18px] bg-[#F9F9F9] overflow-hidden relative shrink-0 border border-gray-50 shadow-sm">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col flex-1 h-full py-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold text-[#C9A76A] bg-[#C9A76A]/5 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Furnishing Package
              </span>
            </div>
            <h3 className="text-[17px] font-bold text-[#1A1A1A] mb-1">
              {item.packageBaseName || item.name.split(" - ")[0]}
            </h3>
            <p className="text-[14px] text-[#888888] font-medium mb-auto">
              {item.name.split(" - ")[1] || "Default Property"}
            </p>
            <span className="text-[18px] font-bold text-[#1A1A1A]">
              {formatPrice(item.price)}
            </span>
          </div>
        </div>

        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between mt-6 sm:mt-0 w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0 py-1">
          <button
            onClick={() => removeItem(item.id)}
            className="text-[#ef4444] hover:text-[#dc2626] transition-colors cursor-pointer flex items-center gap-2 text-[13px] font-semibold sm:mt-[22px]">
            <Trash2 className="w-[16px] h-[16px]" strokeWidth={2} />
            <span className="sm:hidden">Remove</span>
          </button>
          <button
            onClick={() => setIsOptionsOpen(!isOptionsOpen)}
            className="flex items-center gap-2 text-[15px] font-bold text-[#412A1F] hover:text-[#C9A76A] transition-colors">
            Customize Options
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${isOptionsOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      {isOptionsOpen && pkg && (
        <div className="px-6 pb-8 pt-2 bg-[#FAFAFA] border-t border-[#F5F5F5] animate-in slide-in-from-top-2 duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Property Selection */}
            <div>
              <p className="text-[11px] font-bold text-[#1A1A1A]/40 uppercase tracking-widest mb-4">
                Change Property Type
              </p>
              <div className="flex flex-col gap-2">
                {pkg.properties.map((prop) => (
                  <button
                    key={prop.id}
                    onClick={() => handlePropertyChange(prop.id)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                      item.selectedPropertyId === prop.id
                        ? "bg-[#412A1F] border-[#412A1F] text-white shadow-md"
                        : "bg-white border-[#EEEEEE] text-[#1A1A1A] hover:border-[#412A1F]/30"
                    }`}>
                    <span className="text-[13px] font-semibold">
                      {prop.name}
                    </span>
                    <span
                      className={`text-[13px] font-bold ${item.selectedPropertyId === prop.id ? "text-white/80" : "text-[#888888]"}`}>
                      AED {Number(prop.price).toLocaleString()}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Add-ons Selection */}
            {pkg.add_ons.length > 0 && (
              <div>
                <p className="text-[11px] font-bold text-[#1A1A1A]/40 uppercase tracking-widest mb-4">
                  Available Add-ons
                </p>
                <div className="flex flex-col gap-2">
                  {pkg.add_ons.map((addon) => {
                    const isSelected = item.selectedAddOnIds?.includes(
                      addon.id,
                    );
                    return (
                      <button
                        key={addon.id}
                        onClick={() => toggleAddOn(addon.id)}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                          isSelected
                            ? "bg-white border-[#412A1F] text-[#412A1F] ring-1 ring-[#412A1F]"
                            : "bg-white border-[#EEEEEE] text-[#1A1A1A] hover:border-[#412A1F]/30"
                        }`}>
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                              isSelected
                                ? "bg-[#412A1F] border-[#412A1F]"
                                : "bg-white border-[#DDDDDD]"
                            }`}>
                            {isSelected && (
                              <Check className="w-3.5 h-3.5 text-white" />
                            )}
                          </div>
                          <div className="flex flex-col items-start">
                            <span className="text-[13px] font-semibold">
                              {addon.title}
                            </span>
                            {addon.description && (
                              <span className="text-[11px] text-[#888888] line-clamp-1">
                                {addon.description}
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="text-[13px] font-bold text-[#1A1A1A]">
                          +AED {Number(addon.price).toLocaleString()}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {isLoading && isOptionsOpen && (
        <div className="p-10 flex justify-center bg-[#FAFAFA] border-t border-[#F5F5F5]">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#412A1F]"></div>
        </div>
      )}
    </motion.div>
  );
}
