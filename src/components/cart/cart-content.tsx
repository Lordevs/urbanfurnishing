"use client";

import { CheckoutSteps } from "@/components/cart/checkout-steps";
import { CartItems } from "@/components/cart/cart-items";
import { OrderSummary } from "@/components/cart/order-summary";

export default function CartContent() {
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-10 lg:px-16 py-12 lg:py-20 w-full">
      <CheckoutSteps />

      <div className="flex flex-col lg:flex-row gap-10 mt-2 relative items-start w-full">
        <div className="flex-1 w-full shrink">
          <CartItems />
        </div>

        <OrderSummary />
      </div>
    </div>
  );
}
