"use client";

import { useState } from "react";

import { AddressForm } from "@/components/cart/address-form";
import { CartItems } from "@/components/cart/cart-items";
import { CheckoutSteps } from "@/components/cart/checkout-steps";
import { OrderSummary } from "@/components/cart/order-summary";
import { PaymentForm } from "@/components/cart/payment-form";
import type { AddressData } from "@/components/cart/payment-form";
import type { PromoValidateResponse } from "@/types/api";

export default function CartContent() {
  const [currentStep, setCurrentStep] = useState(1);
  const [addressData, setAddressData] = useState<AddressData | null>(null);
  const [appliedPromo, setAppliedPromo] =
    useState<PromoValidateResponse | null>(null);

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-10 lg:px-16 py-12 lg:py-20 w-full min-h-[60vh]">
      <CheckoutSteps currentStep={currentStep} />

      {currentStep === 1 && (
        <div className="flex flex-col lg:flex-row gap-10 mt-2 relative items-start w-full">
          <div className="flex-1 w-full shrink">
            <CartItems />
          </div>

          <OrderSummary
            onProceed={() => setCurrentStep(2)}
            appliedPromo={appliedPromo}
            onApplyPromo={setAppliedPromo}
          />
        </div>
      )}

      {currentStep === 2 && (
        <div className="mt-2 w-full">
          <AddressForm
            onBack={() => setCurrentStep(1)}
            onNext={(data: AddressData) => {
              setAddressData(data);
              setCurrentStep(3);
            }}
          />
        </div>
      )}

      {currentStep === 3 && (
        <div className="mt-2 w-full">
          <PaymentForm
            onBack={() => setCurrentStep(2)}
            addressData={addressData}
            appliedPromo={appliedPromo}
          />
        </div>
      )}
    </div>
  );
}
