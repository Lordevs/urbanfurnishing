"use client";

export function CheckoutSteps({ currentStep = 1 }: { currentStep?: number }) {
  const steps = [
    { id: 1, name: "Cart", active: currentStep >= 1 },
    { id: 2, name: "Address", active: currentStep >= 2 },
    { id: 3, name: "Payment", active: currentStep >= 3 },
  ];
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-6 mb-8 w-full border-b border-[#F2F2F2]/60 pb-8">
      <h1 className="text-3xl font-semibold font-serif text-[#0A0A0A] mb-8 sm:mb-0">
        Checkout
      </h1>

      <div className="flex items-center gap-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex items-center gap-3">
              <div
                className={`flex items-center justify-center w-[30px] h-[30px] rounded-full text-[13px] font-medium shrink-0 ${
                  step.active
                    ? "bg-[#4B3B33] text-white"
                    : "bg-[#F2F2F2] text-[#888888]"
                }`}>
                {step.id}
              </div>
              <span
                className={`text-[14px] font-medium ${
                  step.active ? "text-[#1A1A1A]" : "text-[#888888]"
                }`}>
                {step.name}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div className="w-10 sm:w-16 h-px bg-[#EBEBEB] mx-4 sm:mx-6" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
