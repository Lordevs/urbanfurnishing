"use client";

import { Search, Loader2 } from "lucide-react";
import { useState } from "react";

import { ActionButton } from "./action-button";

import { Input } from "@/components/ui/input";

interface TrackOrderFormProps {
  onSearch: (orderNumber: string) => void;
  isLoading?: boolean;
  initialValue?: string;
}

export function TrackOrderForm({
  onSearch,
  isLoading,
  initialValue = "",
}: TrackOrderFormProps) {
  const [orderNumber, setOrderNumber] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderNumber.trim()) {
      onSearch(orderNumber.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
      <div className="relative group">
        <Input
          type="text"
          placeholder="Enter Order Number (e.g. UF-20260309-00001)"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          className="h-[60px] pl-14 pr-32 bg-card border-border rounded-[16px] text-[16px] text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-1 focus-visible:ring-secondary shadow-sm group-hover:shadow-md transition-all font-medium"
        />
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Search className="w-5 h-5" />
        </div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <ActionButton
            type="submit"
            disabled={!orderNumber.trim()}
            loading={isLoading}
            label="Track Now"
            className="h-[46px] bg-[#31231e] hover:bg-[#3D261C] text-white rounded-[12px] px-6 text-[14px] font-bold"
            showArrow={false}
          />
        </div>
      </div>
      <p className="mt-4 text-center text-muted-foreground text-[13px] font-medium">
        Find your order number in your confirmation email.
      </p>
    </form>
  );
}
