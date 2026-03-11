"use client";

import { useState } from "react";
import { CheckoutSteps } from "@/components/cart/checkout-steps";
import { CartItems } from "@/components/cart/cart-items";
import { OrderSummary } from "@/components/cart/order-summary";
import { AddressForm } from "@/components/cart/address-form";

export default function CartContent() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-10 lg:px-16 py-12 lg:py-20 w-full min-h-[60vh]">
      <CheckoutSteps currentStep={currentStep} />
      
      {currentStep === 1 && (
        <div className="flex flex-col lg:flex-row gap-10 mt-2 relative items-start w-full">
          <div className="flex-1 w-full shrink">
            <CartItems />
          </div>
          
          <OrderSummary onProceed={() => setCurrentStep(2)} />
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
    </div>
  );
}
