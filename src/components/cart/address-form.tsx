"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AddressFormProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

export function AddressForm({ onNext, onBack }: AddressFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // We only need the form values, we don't care if 'sameAsBilling' is checked
    // because we can just read it from formData.
    const isSameAsBilling = formData.get("sameAsBilling") === "on";

    const shipping = {
      first_name: formData.get("shipping.first_name") as string,
      last_name: formData.get("shipping.last_name") as string,
      street_address: formData.get("shipping.street_address") as string,
      apartment_suite: formData.get("shipping.apartment_suite") as string,
      city: formData.get("shipping.city") as string,
      state: formData.get("shipping.state") as string,
      postal_code: formData.get("shipping.postal_code") as string,
      country: "United Arab Emirates", // Using UAE as before
    };

    const billing = isSameAsBilling
      ? shipping
      : {
          first_name: formData.get("billing.first_name") as string,
          last_name: formData.get("billing.last_name") as string,
          company: formData.get("billing.company") as string,
          street_address: formData.get("billing.street_address") as string,
          apartment_suite: formData.get("billing.apartment_suite") as string,
          city: formData.get("billing.city") as string,
          state: formData.get("billing.state") as string,
          postal_code: formData.get("billing.postal_code") as string,
          country: "United Arab Emirates",
        };

    const payload = {
      customer_email: formData.get("customer_email") as string,
      customer_phone: formData.get("customer_phone") as string,
      shipping,
      billing,
    };

    onNext(payload);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full"
    >
      {/* Desktop View */}
      <div className="hidden lg:flex flex-col gap-6">
        <div className="mb-2">
          <h2 className="text-[22px] font-semibold font-serif text-[#0A0A0A]">
            Shipping Billing Address
          </h2>
          <p className="text-[#888888] text-[14px] mt-1">
            Please provide your delivery and billing information
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full">
          {/* Shipping Address Column */}
          <div className="flex-1 border border-[#EBEBEB] rounded-[16px] p-6 lg:p-8 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.01)]">
            <h3 className="text-[16px] font-medium text-[#1A1A1A] mb-6">
              Shipping Address
            </h3>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#1A1A1A]">
                    First Name
                  </label>
                  <Input
                    placeholder="John"
                    className="h-[46px] bg-[#F5F5F5] border-none rounded-[8px] px-3.5 text-[14px] text-[#1A1A1A] placeholder:text-[#888888]/80 focus-visible:ring-1 focus-visible:ring-[#C9A76A]"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#1A1A1A]">
                    Last Name
                  </label>
                  <Input
                    placeholder="Doe"
                    className="h-[46px] bg-[#F5F5F5] border-none rounded-[8px] px-3.5 text-[14px] text-[#1A1A1A] placeholder:text-[#888888]/80 focus-visible:ring-1 focus-visible:ring-[#C9A76A]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-[#1A1A1A]">
                  Email Address
                </label>
                <Input
                  placeholder="john.doe@example.com"
                  className="h-[46px] bg-[#F5F5F5] border-none rounded-[8px] px-3.5 text-[14px] text-[#1A1A1A] placeholder:text-[#888888]/80 focus-visible:ring-1 focus-visible:ring-[#C9A76A]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-[#1A1A1A]">
                  Phone Number
                </label>
                <Input
                  placeholder="+91 98765 43210"
                  className="h-[46px] bg-[#F5F5F5] border-none rounded-[8px] px-3.5 text-[14px] text-[#1A1A1A] placeholder:text-[#888888]/80 focus-visible:ring-1 focus-visible:ring-[#C9A76A]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-[#1A1A1A]">
                  Street Address
                </label>
                <Input
                  placeholder="123 Main Street"
                  className="h-[46px] bg-[#F5F5F5] border-none rounded-[8px] px-3.5 text-[14px] text-[#1A1A1A] placeholder:text-[#888888]/80 focus-visible:ring-1 focus-visible:ring-[#C9A76A]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-[#1A1A1A]">
                  Apartment, suite, etc. (optional)
                </label>
                <Input
                  placeholder="Apt 4B"
                  className="h-[46px] bg-[#F5F5F5] border-none rounded-[8px] px-3.5 text-[14px] text-[#1A1A1A] placeholder:text-[#888888]/80 focus-visible:ring-1 focus-visible:ring-[#C9A76A]"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-5">
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#1A1A1A]">
                    City
                  </label>
                  <Input
                    placeholder="Mumbai"
                    className="h-[46px] bg-[#F5F5F5] border-none rounded-[8px] px-3.5 text-[14px] text-[#1A1A1A] placeholder:text-[#888888]/80 focus-visible:ring-1 focus-visible:ring-[#C9A76A]"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#1A1A1A]">
                    State
                  </label>
                  <div className="relative">
                    <select
                      defaultValue=""
                      className="w-full h-[46px] bg-[#F5F5F5] border-none rounded-[8px] px-3.5 text-[14px] text-[#888888]/80 appearance-none outline-none focus-visible:ring-1 focus-visible:ring-[#C9A76A] cursor-pointer"
                    >
                      <option value="" disabled>
                        Select state
                      </option>
                      <option value="MH">Maharashtra</option>
                      <option value="DL">Delhi</option>
                      <option value="KA">Karnataka</option>
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888] pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-[#1A1A1A]">
                  Postal Code
                </label>
                <Input
                  placeholder="400001"
                  className="h-[46px] bg-[#F5F5F5] border-none rounded-[8px] px-3.5 text-[14px] text-[#1A1A1A] placeholder:text-[#888888]/80 focus-visible:ring-1 focus-visible:ring-[#C9A76A]"
                />
              </div>
            </div>
          </div>

          {/* Billing Address Column */}
          <div className="flex-1 border border-[#EBEBEB] rounded-[16px] p-6 lg:p-8 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.01)]">
            <div className="flex flex-col gap-5">
              <h3 className="text-[16px] font-medium text-[#1A1A1A] mb-1">
                Billing Address
              </h3>

              <label className="flex items-center gap-3 mb-1 cursor-pointer w-max">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    className="peer w-[18px] h-[18px] appearance-none border border-[#D9D9D9] rounded-[4px] bg-[#F5F5F5] checked:bg-[#412A1F] checked:border-[#412A1F] transition-colors cursor-pointer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 pointer-events-none text-white">
                    <svg
                      width="10"
                      height="8"
                      viewBox="0 0 10 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 4L3.5 6.5L9 1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <span className="text-[13.5px] font-medium text-[#1A1A1A]">
                  Same as shipping address
                </span>
              </label>

              <div className="flex flex-col sm:flex-row gap-5">
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#1A1A1A]">
                    First Name
                  </label>
                  <Input
                    placeholder="John"
                    className="h-[46px] bg-[#F5F5F5] border-none rounded-[8px] px-3.5 text-[14px] text-[#1A1A1A] placeholder:text-[#888888]/80 focus-visible:ring-1 focus-visible:ring-[#C9A76A]"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#1A1A1A]">
                    Last Name
                  </label>
                  <Input
                    placeholder="Doe"
                    className="h-[46px] bg-[#F5F5F5] border-none rounded-[8px] px-3.5 text-[14px] text-[#1A1A1A] placeholder:text-[#888888]/80 focus-visible:ring-1 focus-visible:ring-[#C9A76A]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-[#1A1A1A]">
                  Company (optional)
                </label>
                <Input
                  placeholder="Acme Corp"
                  className="h-[46px] bg-[#F5F5F5] border-none rounded-[8px] px-3.5 text-[14px] text-[#1A1A1A] placeholder:text-[#888888]/80 focus-visible:ring-1 focus-visible:ring-[#C9A76A]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-[#1A1A1A]">
                  Street Address
                </label>
                <Input
                  placeholder="123 Main Street"
                  className="h-[46px] bg-[#F5F5F5] border-none rounded-[8px] px-3.5 text-[14px] text-[#1A1A1A] placeholder:text-[#888888]/80 focus-visible:ring-1 focus-visible:ring-[#C9A76A]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-[#1A1A1A]">
                  Apartment, suite, etc. (optional)
                </label>
                <Input
                  placeholder="Apt 4B"
                  className="h-[46px] bg-[#F5F5F5] border-none rounded-[8px] px-3.5 text-[14px] text-[#1A1A1A] placeholder:text-[#888888]/80 focus-visible:ring-1 focus-visible:ring-[#C9A76A]"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-5">
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#1A1A1A]">
                    City
                  </label>
                  <Input
                    placeholder="Mumbai"
                    className="h-[46px] bg-[#F5F5F5] border-none rounded-[8px] px-3.5 text-[14px] text-[#1A1A1A] placeholder:text-[#888888]/80 focus-visible:ring-1 focus-visible:ring-[#C9A76A]"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#1A1A1A]">
                    State
                  </label>
                  <div className="relative">
                    <select
                      defaultValue=""
                      className="w-full h-[46px] bg-[#F5F5F5] border-none rounded-[8px] px-3.5 text-[14px] text-[#888888]/80 appearance-none outline-none focus-visible:ring-1 focus-visible:ring-[#C9A76A] cursor-pointer"
                    >
                      <option value="" disabled>
                        Select state
                      </option>
                      <option value="MH">Maharashtra</option>
                      <option value="DL">Delhi</option>
                      <option value="KA">Karnataka</option>
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888] pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-[#1A1A1A]">
                  Postal Code
                </label>
                <Input
                  placeholder="400001"
                  className="h-[46px] bg-[#F5F5F5] border-none rounded-[8px] px-3.5 text-[14px] text-[#1A1A1A] placeholder:text-[#888888]/80 focus-visible:ring-1 focus-visible:ring-[#C9A76A]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-5 mt-4 pt-6 border-t border-[#F2F2F2]/60 pb-10">
          <Button
            onClick={onBack}
            variant="outline"
            className="w-full sm:w-auto h-[48px] px-8 rounded-[8px] border border-[#EBEBEB] text-[#1A1A1A] hover:bg-[#F9F9F9] font-medium text-[14.5px] shadow-sm cursor-pointer transition-transform"
          >
            Back to Cart
          </Button>
          <Button
            onClick={onNext}
            className="w-full sm:w-auto h-[48px] bg-[#412A1F] hover:bg-[#2C1A11] text-white rounded-[8px] text-[14.5px] font-medium flex items-center justify-between sm:justify-center gap-4 px-2.5 sm:pl-6 sm:pr-2.5 pl-6 transition-all shadow-md cursor-pointer hover:shadow-lg"
          >
            Continue to Payment
            <div className="w-[32px] h-[32px] bg-white rounded-full flex items-center justify-center text-[#412A1F] shrink-0">
              <ArrowUpRight className="w-4 h-4 stroke-2" />
            </div>
          </Button>
        </div>
      </div>

      {/* Mobile View - Exact match to screenshot */}
      <div className="lg:hidden flex flex-col gap-6 -mt-4">
        <h2 className="text-[20px] font-bold text-[#1a1a1a] flex items-center gap-2">
          Shipping{" "}
          <span className="text-[14px] font-normal text-[#888888]">⇋</span>{" "}
          Billing Address
        </h2>

        <div className="flex flex-col gap-5">
          {/* Names Row */}
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-[13px] text-[#888888] font-medium">
                First Name
              </label>
              <Input
                placeholder="John"
                className="h-[52px] bg-[#F9FAFB] border-none rounded-[12px] px-4 text-[15px] focus-visible:ring-1 focus-visible:ring-[#C9A76A]"
              />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-[13px] text-[#888888] font-medium">
                Last Name
              </label>
              <Input
                placeholder="Doe"
                className="h-[52px] bg-[#F9FAFB] border-none rounded-[12px] px-4 text-[15px] focus-visible:ring-1 focus-visible:ring-[#C9A76A]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[13px] text-[#888888] font-medium">
              Email Address
            </label>
            <Input
              placeholder="john.doe@example.com"
              className="h-[52px] bg-[#F9FAFB] border-none rounded-[12px] px-4 text-[15px] focus-visible:ring-1 focus-visible:ring-[#C9A76A]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[13px] text-[#888888] font-medium">
              Phone Number
            </label>
            <Input
              placeholder="+971 50 123 4567"
              className="h-[52px] bg-[#F9FAFB] border-none rounded-[12px] px-4 text-[15px] focus-visible:ring-1 focus-visible:ring-[#C9A76A]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[13px] text-[#888888] font-medium">
              Street Address
            </label>
            <Input
              placeholder="123 Main Street"
              className="h-[52px] bg-[#F9FAFB] border-none rounded-[12px] px-4 text-[15px] focus-visible:ring-1 focus-visible:ring-[#C9A76A]"
            />
          </div>

          {/* City / Postal Row */}
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-[13px] text-[#888888] font-medium">
                City
              </label>
              <Input
                placeholder="Dubai"
                className="h-[52px] bg-[#F9FAFB] border-none rounded-[12px] px-4 text-[15px] focus-visible:ring-1 focus-visible:ring-[#C9A76A]"
              />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-[13px] text-[#888888] font-medium">
                Postal Code
              </label>
              <Input
                placeholder="12345"
                className="h-[52px] bg-[#F9FAFB] border-none rounded-[12px] px-4 text-[15px] focus-visible:ring-1 focus-visible:ring-[#C9A76A]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[13px] text-[#888888] font-medium">
              Country
            </label>
            <div className="relative">
              <select
                defaultValue=""
                className="w-full h-[52px] bg-[#F9FAFB] border-none rounded-[12px] px-4 text-[15px] text-[#1a1a1a] appearance-none outline-none focus-visible:ring-1 focus-visible:ring-[#C9A76A] cursor-pointer"
              >
                <option value="" disabled>
                  Select country
                </option>
                <option value="UAE">United Arab Emirates</option>
                <option value="SA">Saudi Arabia</option>
                <option value="QA">Qatar</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888] pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[13px] text-[#888888] font-medium">
              Special Instructions
            </label>
            <textarea
              placeholder="Any special delivery instructions..."
              className="min-h-[120px] bg-[#F9FAFB] border-none rounded-[12px] p-4 text-[15px] text-[#1a1a1a] placeholder:text-[#888888]/60 focus:outline-none focus:ring-1 focus:ring-[#C9A76A] resize-none"
            />
          </div>
        </div>

        {/* Mobile Action Buttons */}
        <div className="flex flex-col gap-4 mt-4 pb-10">
          <Button
            onClick={onNext}
            className="w-full h-[56px] bg-[#412A1F] hover:bg-[#2C1A11] text-white rounded-[14px] text-[16px] font-bold shadow-lg"
          >
            Continue to Payment
          </Button>
          <button
            onClick={onBack}
            className="w-full py-2 text-[15px] font-medium text-[#888888] hover:text-[#1a1a1a] transition-colors"
          >
            Back to Cart
          </button>
        </div>
      </div>
    </motion.form>
  );
}
