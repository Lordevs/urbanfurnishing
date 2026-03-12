"use client";

import { motion } from "framer-motion";
import { Trash2, Minus, Plus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { ActionButton } from "@/components/shared/action-button";
import { Button } from "@/components/ui/button";

import { ROUTES } from "@/constants/route";
import { useCart } from "@/context/cart-context";

export function CartItems() {
  const { items, increment, decrement, removeItem } = useCart();
  const router = useRouter();

  const formatPrice = (value: number) => {
    return `AED ${value.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="mb-2">
        <h2 className="text-[22px] font-semibold font-serif text-[#0A0A0A]">
          Shopping Cart
        </h2>
        <p className="text-[#888888] text-[14px] mt-1">
          {items.length} items in your cart
        </p>
      </div>

      {items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-20 bg-white border border-[#F2F2F2] rounded-[16px] mt-2 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
        >
          <div className="w-20 h-20 bg-[#F9F9F9] rounded-full flex items-center justify-center mb-5">
            <ShoppingCart
              className="w-8 h-8 text-[#DDDDDD]"
              strokeWidth={1.5}
            />
          </div>
          <h3 className="text-[18px] font-medium text-[#1A1A1A] mb-2">
            Your cart is empty
          </h3>
          <p className="text-[#888888] text-[14px] mb-8 text-center max-w-[280px]">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
          <ActionButton
            onClick={() => router.push(ROUTES.PACKAGES)}
            label="Start Shopping"
            className="h-[46px] px-8 bg-[#412A1F] hover:bg-[#2C1A11] text-white rounded-[10px] text-[14.5px] font-medium"
            showArrow={false}
          />
        </motion.div>
      ) : (
        items.map((item, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={item.id}
            className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-5 border border-[#F2F2F2] rounded-[16px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] bg-white"
          >
            <div className="flex items-center gap-5 w-full sm:w-auto">
              <div className="w-[100px] h-[100px] rounded-[12px] bg-[#F9F9F9] overflow-hidden relative shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-[16px] font-semibold text-[#1A1A1A] mb-1">
                  {item.name}
                </h3>
                {item.size && (
                  <span className="text-[13px] text-[#888888] mb-0.5">
                    Size: {item.size}
                  </span>
                )}
                {item.color && (
                  <span className="text-[13px] text-[#888888] mb-1.5">
                    Color: {item.color}
                  </span>
                )}
                <span className="text-[14px] font-medium text-[#888888]">
                  {formatPrice(item.price)}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end justify-between h-full sm:h-[100px] mt-4 sm:mt-0 w-full sm:w-auto">
              <button
                onClick={() => removeItem(item.id)}
                className="text-[#ef4444] hover:text-[#dc2626] transition-colors cursor-pointer mb-[30px] sm:mb-auto"
              >
                <Trash2 className="w-[16px] h-[16px]" strokeWidth={2} />
              </button>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => decrement(item.id)}
                  className="w-8 h-8 rounded-[8px] border border-[#EBEBEB] flex items-center justify-center text-[#1A1A1A] hover:bg-[#F9F9F9] transition-colors cursor-pointer shrink-0"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-[14px] font-medium text-[#1A1A1A] min-w-[12px] text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => increment(item.id)}
                  className="w-8 h-8 rounded-[8px] border border-[#EBEBEB] flex items-center justify-center text-[#1A1A1A] hover:bg-[#F9F9F9] transition-colors cursor-pointer shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
}
