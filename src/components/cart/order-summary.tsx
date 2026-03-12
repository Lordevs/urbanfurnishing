"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Loader2, Tag, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/cart-context";
import { useValidatePromo } from "@/hooks/mutations/use-validate-promo";
import type { PromoValidateResponse } from "@/types/api";

interface OrderSummaryProps {
  onProceed?: () => void;
  appliedPromo?: PromoValidateResponse | null;
  onApplyPromo?: (promo: PromoValidateResponse | null) => void;
}

export function OrderSummary({
  onProceed,
  appliedPromo,
  onApplyPromo,
}: OrderSummaryProps) {
  const { items } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const {
    mutate: validatePromo,
    isPending,
    isError,
    error,
  } = useValidatePromo();

  const subtotal = items.reduce((acc, item) => {
    return acc + (item.price || 0) * item.quantity;
  }, 0);

  const discount =
    appliedPromo?.valid && appliedPromo.discount_amount
      ? Number(appliedPromo.discount_amount)
      : 0;

  // Assuming a consistent currency, or pass it down. "AED" matches existing UI code.
  const currencySymbol = "AED ";

  const total = subtotal - discount;

  const handleApplyPromo = () => {
    if (!promoCode.trim()) return;
    validatePromo(
      { code: promoCode.trim(), subtotal },
      {
        onSuccess: (res) => {
          onApplyPromo?.(res);
        },
      },
    );
  };

  const formatPrice = (value: number) => {
    return `${currencySymbol}${value.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="bg-white border border-[#EBEBEB] rounded-[16px] p-6 lg:p-7 shadow-[0_2px_10px_rgba(0,0,0,0.02)] w-full lg:w-[380px] shrink-0 h-max"
    >
      <h3 className="text-[18px] font-medium text-[#1A1A1A] mb-7">
        Order Summary
      </h3>

      <div className="flex flex-col gap-5 mb-7">
        <div className="flex justify-between items-center text-[14px]">
          <span className="text-[#333333]">Subtotal</span>
          <span className="font-semibold text-[#1A1A1A]">
            {formatPrice(subtotal)}
          </span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between items-center text-[14px]">
            <span className="text-green-600 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" />
              Promo ({appliedPromo?.code})
            </span>
            <span className="font-semibold text-green-600">
              -{formatPrice(discount)}
            </span>
          </div>
        )}
      </div>

      <div className="w-full h-px bg-[#EBEBEB] mb-7" />

      <div className="flex justify-between items-center mb-8">
        <span className="text-[16px] font-medium text-[#1A1A1A]">Total</span>
        <span className="text-[18px] font-bold text-[#1A1A1A]">
          {formatPrice(total)}
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {appliedPromo?.valid ? (
          <div className="flex items-center justify-between px-4 py-3 bg-green-50/50 border border-green-200 rounded-[8px]">
            <div className="flex items-center gap-2 text-green-700 text-[13px] font-medium">
              <Tag className="w-3.5 h-3.5" />
              <span>{appliedPromo.code} applied!</span>
            </div>
            <button onClick={() => onApplyPromo?.(null)}>
              <X className="w-4 h-4 text-green-700 hover:text-green-900" />
            </button>
          </div>
        ) : (
          <>
            <Input
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleApplyPromo()}
              placeholder="Enter promo code"
              className="h-[48px] bg-[#F9F9F9] border-none rounded-[8px] px-4 text-[14px] text-[#1A1A1A] placeholder:text-[#888888] focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            {isError && (
              <p className="text-red-500 text-[12px]">
                {error?.message ?? "Invalid promo code."}
              </p>
            )}
            <Button
              onClick={handleApplyPromo}
              disabled={isPending || !promoCode.trim() || items.length === 0}
              variant="outline"
              className="w-full h-[48px] rounded-[8px] border border-[#EBEBEB] text-[#1A1A1A] hover:bg-[#F9F9F9] font-medium text-[14px] shadow-sm cursor-pointer hover:-translate-y-0.5 transition-transform"
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Apply Code"
              )}
            </Button>
          </>
        )}
        <Button
          onClick={onProceed}
          disabled={items.length === 0}
          className="w-full h-[52px] mt-2 bg-[#412A1F] hover:bg-[#2C1A11] disabled:bg-[#412A1F]/50 disabled:cursor-not-allowed text-white rounded-[10px] text-[14.5px] font-medium flex items-center justify-between px-6 transition-all shadow-md cursor-pointer hover:shadow-lg hover:-translate-y-0.5"
        >
          Proceed to Checkout
          <div className="w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center text-[#412A1F] shrink-0">
            <ArrowUpRight className="w-4 h-4 stroke-2" />
          </div>
        </Button>
      </div>
    </motion.div>
  );
}
