"use client";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import type { PackageAddOn } from "@/types/api";

interface PackageAddOnsProps {
  addOns: PackageAddOn[];
  selectedAddOnIds: string[];
  onToggle: (id: string) => void;
}

export function PackageAddOns({
  addOns,
  selectedAddOnIds,
  onToggle,
}: PackageAddOnsProps) {
  if (!addOns || addOns.length === 0) return null;

  return (
    <section className="py-20 border-t border-muted-foreground/10">
      <div className="max-w-8xl mx-auto px-4 sm:px-10 lg:px-16">
        <div className="mb-10">
          <h2 className="text-[15px] font-bold text-secondary uppercase tracking-[0.2em]">
            Available Add-ons
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {addOns.map((addon) => {
            const isSelected = selectedAddOnIds.includes(addon.id);
            return (
              <div
                key={addon.id}
                onClick={() => onToggle(addon.id)}
                className={cn(
                  "group relative p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer flex flex-col ring-offset-white",
                  isSelected
                    ? "bg-secondary/10 border-secondary/10"
                    : "bg-secondary/20 border-secondary/10 hover:border-secondary/10",
                )}>
                <div className="flex justify-between items-start mb-3">
                  {/* Select Circle */}
                  <div
                    className={cn(
                      "w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 shrink-0",
                      isSelected
                        ? "bg-secondary border-secondary"
                        : "bg-white border-gray-200 group-hover:border-gray-300",
                    )}>
                    {isSelected && (
                      <Check className="w-4 h-4 text-white stroke-[3px]" />
                    )}
                  </div>

                  {/* Price Label */}
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="text-[17px] font-bold text-[#1A1614] tracking-tight">
                      +AED {Number(addon.price).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Text Content */}
                <div className="flex-1">
                  <h3 className="text-[18px] font-bold text-[#1A1614] mb-0.5 leading-tight capitalize">
                    {addon.title}
                  </h3>
                  <p className="text-[13px] text-[#A89E94] font-medium leading-normal">
                    {addon.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
