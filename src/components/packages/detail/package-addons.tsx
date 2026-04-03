"use client";

import { Check } from "lucide-react";
import Image from "next/image";

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
                  "group relative p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer flex gap-4 ring-offset-white",
                  isSelected
                    ? "bg-secondary/15 border-secondary/20 shadow-md"
                    : "bg-card border-secondary/10 hover:border-secondary/20 hover:bg-secondary/5",
                )}>
                
                {/* Left Side: Image Container */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-xl overflow-hidden bg-muted/20">
                  <Image
                    src={addon.image || "/package-details/placeholder.webp"}
                    alt={addon.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Selection Overlay */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-secondary/20 backdrop-blur-[1px] flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center shadow-lg border border-white/20">
                        <Check className="w-5 h-5 stroke-[3px]" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Side: Content */}
                <div className="flex flex-col flex-1 justify-between py-0.5">
                  <div>
                    <h3 className="text-lg font-bold text-primary leading-tight capitalize mb-1">
                      {addon.title}
                    </h3>
                    <p className="text-[13px] text-muted-foreground font-medium leading-snug line-clamp-2">
                      {addon.description}
                    </p>
                  </div>
                  
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[16px] font-bold text-primary tracking-tight">
                      +AED {Number(addon.price).toLocaleString()}
                    </span>
                    
                    {!isSelected && (
                      <div className="w-6 h-6 rounded-full border-2 border-secondary/20 group-hover:border-secondary/60 flex items-center justify-center transition-all duration-300">
                        <Check className="w-3 h-3 text-secondary/0 group-hover:text-secondary group-hover:opacity-40 transition-all" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
