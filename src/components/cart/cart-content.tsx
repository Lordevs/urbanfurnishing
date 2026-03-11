"use client";

import { useState } from "react";
import { CheckoutSteps } from "@/components/cart/checkout-steps";
import { CartItems } from "@/components/cart/cart-items";
import { OrderSummary } from "@/components/cart/order-summary";
import { AddressForm } from "@/components/cart/address-form";
import { PaymentForm } from "@/components/cart/payment-form";
import { useCart } from "@/lib/cart-context";
import Image from "next/image";
import { Lock, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { ROUTES } from "@/constants/route";
import { useRouter } from "next/navigation";

export default function CartContent() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const { items, increment, decrement, removeItem } = useCart();

  const subtotal = items.reduce((acc, item) => {
    const numericPrice = parseFloat(
      item.price.replace(/,/g, "").replace(/[^\d.]/g, "")
    );
    return acc + (numericPrice || 0) * item.quantity;
  }, 0);

  const tax = subtotal * 0.05; // 5% matching screenshot
  const total = subtotal + tax;

  const currencyMatch =
    items.length > 0 ? items[0].price.match(/^[^\d]+/) : null;
  const currencySymbol = currencyMatch ? currencyMatch[0] : "AED ";

  const formatPrice = (value: number) => {
    return `${currencySymbol}${value.toLocaleString("en-US", {
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-10 lg:px-16 py-12 lg:py-20 w-full min-h-[60vh] bg-[#F8F9FB] lg:bg-transparent">
      <div className="hidden lg:block w-full">
        <CheckoutSteps currentStep={currentStep} />
      </div>
      
      {currentStep === 1 && (
        <div className="flex flex-col lg:flex-row gap-10 mt-2 relative items-start w-full">
          {/* Desktop View */}
          <div className="hidden lg:block flex-1 w-full shrink">
            <CartItems />
          </div>

          <div className="hidden lg:block">
            <OrderSummary onProceed={() => setCurrentStep(2)} />
          </div>

          {/* Mobile View - Exact match to screenshot */}
          <div className="flex lg:hidden flex-col w-full gap-5 -mt-8 sm:mt-0">
            <div className="flex justify-between items-center px-1 mb-2">
              <h1 className="text-[24px] font-bold text-[#1a1a1a]">Checkout</h1>
              <span className="text-[14px] text-[#666666]/80 font-medium">
                {items.length} items
              </span>
            </div>

            {items.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 bg-white border border-[#F2F2F2] rounded-[24px] mt-2 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
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
                <Button
                  onClick={() => router.push(ROUTES.PACKAGES)}
                  className="h-[46px] px-8 bg-[#412A1F] hover:bg-[#2C1A11] text-white rounded-[10px] text-[14.5px] font-medium transition-all shadow-md cursor-pointer hover:shadow-lg hover:-translate-y-0.5"
                >
                  Start Shopping
                </Button>
              </motion.div>
            ) : (
              <>
                <div className="flex flex-col gap-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#F5F5F5]"
                    >
                      <div className="flex gap-4 mb-5">
                        <div className="w-[84px] h-[84px] bg-[#F8F9FB] rounded-[16px] overflow-hidden relative shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col justify-center gap-1">
                          <h3 className="text-[15px] font-bold text-[#1a1a1a] leading-tight">
                            {item.name}
                          </h3>
                          <p className="text-[13px] text-[#888888] font-medium italic">
                            Living Room Package
                          </p>
                          <span className="text-[17px] font-bold text-[#1a1a1a] mt-1">
                            {item.price}
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-1">
                        <div className="flex items-center bg-[#F8F9FB] rounded-full px-4 h-10 w-32 justify-between">
                          <button
                            onClick={() => decrement(item.id)}
                            className="text-[#1a1a1a] text-[18px] font-medium p-1 cursor-pointer"
                          >
                            −
                          </button>
                          <span className="text-[15px] font-bold text-[#1a1a1a]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => increment(item.id)}
                            className="text-[#1a1a1a] text-[18px] font-medium p-1 cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[13px] font-semibold text-[#FF4D4D] cursor-pointer hover:opacity-80 transition-opacity"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary Card */}
                <div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#F5F5F5] mt-2 mb-10">
                  <h3 className="text-[18px] font-bold text-[#1a1a1a] mb-6">
                    Order Summary
                  </h3>

                  <div className="flex flex-col gap-5 mb-7">
                    <div className="flex justify-between items-center text-[14px]">
                      <span className="text-[#888888] font-medium">
                        Subtotal
                      </span>
                      <span className="font-bold text-[#1a1a1a]">
                        {formatPrice(subtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[14px]">
                      <span className="text-[#888888] font-medium">
                        Shipping
                      </span>
                      <span className="font-bold text-[#10B981]">Free</span>
                    </div>
                    <div className="flex justify-between items-center text-[14px]">
                      <span className="text-[#888888] font-medium">
                        Tax (5%)
                      </span>
                      <span className="font-bold text-[#1a1a1a]">
                        {formatPrice(tax)}
                      </span>
                    </div>
                  </div>

                  <div className="w-full h-px bg-[#F5F5F5] mb-6" />

                  <div className="flex justify-between items-center mb-10">
                    <span className="text-[16px] font-bold text-[#1a1a1a]">
                      Total
                    </span>
                    <span className="text-[22px] font-bold text-[#1a1a1a]">
                      {formatPrice(total)}
                    </span>
                  </div>

                  <Button
                    onClick={() => setCurrentStep(2)}
                    disabled={items.length === 0}
                    className="w-full h-[64px] bg-[#3B2820] hover:bg-[#2C1A11] text-white rounded-[18px] text-[16px] font-bold flex items-center justify-center gap-3 transition-all shadow-md active:scale-95"
                  >
                    <Lock className="w-5 h-5" />
                    Proceed to Checkout
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="mt-2 w-full">
          <AddressForm 
            onBack={() => setCurrentStep(1)} 
            onNext={() => setCurrentStep(3)} 
          />
        </div>
      )}

      {currentStep === 3 && (
        <div className="mt-2 w-full">
          <PaymentForm 
            onBack={() => setCurrentStep(2)} 
            onSubmit={() => console.log('Order Placed!')} 
          />
        </div>
      )}
    </div>
  );
}
