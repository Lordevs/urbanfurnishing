"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EMIRATES = [
  "Dubai",
  "Abu Dhabi",
  "Sharjah",
  "Ajman",
  "Umm Al Quwain",
  "Ras Al Khaimah",
  "Fujairah",
];

const addressSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  street_address: z.string().min(1, "Street address is required"),
  apartment_suite: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "Emirate is required"),
  postal_code: z.string().min(1, "Postal code is required"),
  country: z.string().default("United Arab Emirates"),
});

const formSchema = z.object({
  customer_email: z.string().email("Invalid email address"),
  customer_phone: z.string().min(5, "Invalid phone number"),
  sameAsBilling: z.boolean().default(false),
  shipping: addressSchema,
  billing: addressSchema.extend({
    company: z.string().optional(),
  }),
  special_instructions: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface AddressFormProps {
  onNext: (data: FormValues) => void;
  onBack: () => void;
}

export function AddressForm({ onNext, onBack }: AddressFormProps) {
  const [formData, setFormData] = useState<FormValues>({
    customer_email: "",
    customer_phone: "",
    sameAsBilling: false,
    shipping: {
      first_name: "",
      last_name: "",
      street_address: "",
      apartment_suite: "",
      city: "",
      state: "Dubai",
      postal_code: "",
      country: "United Arab Emirates",
    },
    billing: {
      first_name: "",
      last_name: "",
      street_address: "",
      apartment_suite: "",
      city: "",
      state: "Dubai",
      postal_code: "",
      country: "United Arab Emirates",
      company: "",
    },
    special_instructions: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleInputChange = (path: string, value: string | boolean) => {
    const parts = path.split('.');
    setFormData(prev => {
      let newState = { ...prev };
      
      if (parts.length === 1) {
        const key = parts[0] as keyof FormValues;
        if (key === "customer_email" || key === "customer_phone" || key === "special_instructions") {
          newState[key] = value as string;
        } else if (key === "sameAsBilling") {
          newState[key] = value as boolean;
        }
        
        // If sameAsBilling is toggled ON, sync all current shipping fields to billing
        if (key === "sameAsBilling" && value === true) {
          newState = {
            ...newState,
            billing: {
              ...newState.billing,
              first_name: newState.shipping.first_name,
              last_name: newState.shipping.last_name,
              street_address: newState.shipping.street_address,
              apartment_suite: newState.shipping.apartment_suite,
              city: newState.shipping.city,
              state: newState.shipping.state,
              postal_code: newState.shipping.postal_code,
            }
          };
        }
      } else if (parts.length === 2) {
        const section = parts[0] as "shipping" | "billing";
        const field = parts[1];
        const val = value as string;
        
        if (section === "shipping") {
          newState.shipping = { ...newState.shipping, [field]: val } as FormValues["shipping"];
        } else if (section === "billing") {
          newState.billing = { ...newState.billing, [field]: val } as FormValues["billing"];
        }
        
        // If we're updating a shipping field and sameAsBilling is ON, sync to billing
        if (section === "shipping" && newState.sameAsBilling) {
          newState.billing = {
            ...newState.billing,
            [field]: val
          } as FormValues["billing"];
        }
      }
      return newState;
    });

    // Clear error when user changes the field
    if (formErrors[path]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[path];
        return newErrors;
      });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = formSchema.safeParse(formData);
    if (result.success) {
      onNext(result.data);
    } else {
      const errors: Record<string, string> = {};
      result.error.issues.forEach(issue => {
        errors[issue.path.join('.')] = issue.message;
      });
      setFormErrors(errors);
    }
  };

  return (
    <motion.form
      onSubmit={handleFormSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full"
    >
      {/* Desktop View */}
      <div className="hidden lg:flex flex-col gap-6">
        <div className="mb-2">
          <h2 className="text-[22px] font-semibold font-serif text-[#0A0A0A]">
            Shipping & Billing Address
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
                    value={formData.shipping.first_name}
                    onChange={(e) => handleInputChange("shipping.first_name", e.target.value)}
                    placeholder="John"
                    className="h-[46px] bg-[#F5F5F5] border-none rounded-[8px] px-3.5 text-[14px] text-[#1A1A1A] placeholder:text-[#888888]/80 focus-visible:ring-1 focus-visible:ring-[#C9A76A]"
                  />
                  {formErrors["shipping.first_name"] && (
                    <span className="text-red-500 text-[11px] font-medium">{formErrors["shipping.first_name"]}</span>
                  )}
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#1A1A1A]">
                    Last Name
                  </label>
                  <Input
                    value={formData.shipping.last_name}
                    onChange={(e) => handleInputChange("shipping.last_name", e.target.value)}
                    placeholder="Doe"
                    className="h-[46px] bg-[#F5F5F5] border-none rounded-[8px] px-3.5 text-[14px] text-[#1A1A1A] placeholder:text-[#888888]/80 focus-visible:ring-1 focus-visible:ring-[#C9A76A]"
                  />
                  {formErrors["shipping.last_name"] && (
                    <span className="text-red-500 text-[11px] font-medium">{formErrors["shipping.last_name"]}</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-[#1A1A1A]">
                  Email Address
                </label>
                <Input
                  value={formData.customer_email}
                  onChange={(e) => handleInputChange("customer_email", e.target.value)}
                  placeholder="john.doe@example.com"
                  className="h-[46px] bg-[#F5F5F5] border-none rounded-[8px] px-3.5 text-[14px] text-[#1A1A1A] placeholder:text-[#888888]/80 focus-visible:ring-1 focus-visible:ring-[#C9A76A]"
                />
                {formErrors["customer_email"] && (
                  <span className="text-red-500 text-[11px] font-medium">{formErrors["customer_email"]}</span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-[#1A1A1A]">
                  Phone Number
                </label>
                <Input
                  value={formData.customer_phone}
                  onChange={(e) => handleInputChange("customer_phone", e.target.value)}
                  placeholder="+971 50 123 4567"
                  className="h-[46px] bg-[#F5F5F5] border-none rounded-[8px] px-3.5 text-[14px] text-[#1A1A1A] placeholder:text-[#888888]/80 focus-visible:ring-1 focus-visible:ring-[#C9A76A]"
                />
                {formErrors["customer_phone"] && (
                  <span className="text-red-500 text-[11px] font-medium">{formErrors["customer_phone"]}</span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-[#1A1A1A]">
                  Street Address
                </label>
                <Input
                  value={formData.shipping.street_address}
                  onChange={(e) => handleInputChange("shipping.street_address", e.target.value)}
                  placeholder="123 Main Street"
                  className="h-[46px] bg-[#F5F5F5] border-none rounded-[8px] px-3.5 text-[14px] text-[#1A1A1A] placeholder:text-[#888888]/80 focus-visible:ring-1 focus-visible:ring-[#C9A76A]"
                />
                {formErrors["shipping.street_address"] && (
                  <span className="text-red-500 text-[11px] font-medium">{formErrors["shipping.street_address"]}</span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-[#1A1A1A]">
                  Apartment, suite, etc. (optional)
                </label>
                <Input
                  value={formData.shipping.apartment_suite}
                  onChange={(e) => handleInputChange("shipping.apartment_suite", e.target.value)}
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
                    value={formData.shipping.city}
                    onChange={(e) => handleInputChange("shipping.city", e.target.value)}
                    placeholder="Dubai"
                    className="h-[46px] bg-[#F5F5F5] border-none rounded-[8px] px-3.5 text-[14px] text-[#1A1A1A] placeholder:text-[#888888]/80 focus-visible:ring-1 focus-visible:ring-[#C9A76A]"
                  />
                  {formErrors["shipping.city"] && (
                    <span className="text-red-500 text-[11px] font-medium">{formErrors["shipping.city"]}</span>
                  )}
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#1A1A1A]">
                    Emirate
                  </label>
                  <div className="relative">
                    <select
                      value={formData.shipping.state}
                      onChange={(e) => handleInputChange("shipping.state", e.target.value)}
                      className="w-full h-[46px] bg-[#F5F5F5] border-none rounded-[8px] px-3.5 text-[14px] text-[#1A1A1A] appearance-none outline-none focus-visible:ring-1 focus-visible:ring-[#C9A76A] cursor-pointer"
                    >
                      {EMIRATES.map(emirate => (
                        <option key={emirate} value={emirate}>{emirate}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888] pointer-events-none" />
                  </div>
                  {formErrors["shipping.state"] && (
                    <span className="text-red-500 text-[11px] font-medium">{formErrors["shipping.state"]}</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-[#1A1A1A]">
                  Postal Code
                </label>
                <Input
                  value={formData.shipping.postal_code}
                  onChange={(e) => handleInputChange("shipping.postal_code", e.target.value)}
                  placeholder="12345"
                  className="h-[46px] bg-[#F5F5F5] border-none rounded-[8px] px-3.5 text-[14px] text-[#1A1A1A] placeholder:text-[#888888]/80 focus-visible:ring-1 focus-visible:ring-[#C9A76A]"
                />
                {formErrors["shipping.postal_code"] && (
                  <span className="text-red-500 text-[11px] font-medium">{formErrors["shipping.postal_code"]}</span>
                )}
              </div>
            </div>
          </div>

          {/* Billing Address Column */}
          <div className="flex-1 border border-[#EBEBEB] rounded-[16px] p-6 lg:p-8 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.01)]">
            <h3 className="text-[16px] font-medium text-[#1A1A1A] mb-5">
              Billing Address
            </h3>

            <div className="flex flex-col gap-5">
              <label className="flex items-center gap-3 mb-2 cursor-pointer w-max">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={formData.sameAsBilling}
                    onChange={(e) => handleInputChange("sameAsBilling", e.target.checked)}
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

              <div className="flex flex-col gap-5">
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="flex-1 flex flex-col gap-1.5">
                    <label className="text-[13px] font-medium text-[#1A1A1A]">
                      First Name
                    </label>
                    <Input
                      value={formData.billing.first_name}
                      onChange={(e) => handleInputChange("billing.first_name", e.target.value)}
                      placeholder="John"
                      disabled={formData.sameAsBilling}
                      className={`h-[46px] border-none rounded-[8px] px-3.5 text-[14px] text-[#1A1A1A] placeholder:text-[#888888]/80 focus-visible:ring-1 focus-visible:ring-[#C9A76A] ${formData.sameAsBilling ? 'bg-[#F5F5F5]/50 cursor-not-allowed' : 'bg-[#F5F5F5]'}`}
                    />
                    {formErrors["billing.first_name"] && (
                      <span className="text-red-500 text-[11px] font-medium">{formErrors["billing.first_name"]}</span>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col gap-1.5">
                    <label className="text-[13px] font-medium text-[#1A1A1A]">
                      Last Name
                    </label>
                    <Input
                      value={formData.billing.last_name}
                      onChange={(e) => handleInputChange("billing.last_name", e.target.value)}
                      placeholder="Doe"
                      disabled={formData.sameAsBilling}
                      className={`h-[46px] border-none rounded-[8px] px-3.5 text-[14px] text-[#1A1A1A] placeholder:text-[#888888]/80 focus-visible:ring-1 focus-visible:ring-[#C9A76A] ${formData.sameAsBilling ? 'bg-[#F5F5F5]/50 cursor-not-allowed' : 'bg-[#F5F5F5]'}`}
                    />
                    {formErrors["billing.last_name"] && (
                      <span className="text-red-500 text-[11px] font-medium">{formErrors["billing.last_name"]}</span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#1A1A1A]">
                    Company (optional)
                  </label>
                  <Input
                    value={formData.billing.company}
                    onChange={(e) => handleInputChange("billing.company", e.target.value)}
                    placeholder="Acme Corp"
                    disabled={formData.sameAsBilling}
                    className={`h-[46px] border-none rounded-[8px] px-3.5 text-[14px] text-[#1A1A1A] placeholder:text-[#888888]/80 focus-visible:ring-1 focus-visible:ring-[#C9A76A] ${formData.sameAsBilling ? 'bg-[#F5F5F5]/50 cursor-not-allowed' : 'bg-[#F5F5F5]'}`}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#1A1A1A]">
                    Street Address
                  </label>
                  <Input
                    value={formData.billing.street_address}
                    onChange={(e) => handleInputChange("billing.street_address", e.target.value)}
                    placeholder="123 Main Street"
                    disabled={formData.sameAsBilling}
                    className={`h-[46px] border-none rounded-[8px] px-3.5 text-[14px] text-[#1A1A1A] placeholder:text-[#888888]/80 focus-visible:ring-1 focus-visible:ring-[#C9A76A] ${formData.sameAsBilling ? 'bg-[#F5F5F5]/50 cursor-not-allowed' : 'bg-[#F5F5F5]'}`}
                  />
                  {formErrors["billing.street_address"] && (
                    <span className="text-red-500 text-[11px] font-medium">{formErrors["billing.street_address"]}</span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#1A1A1A]">
                    Apartment, suite, etc. (optional)
                  </label>
                  <Input
                    value={formData.billing.apartment_suite}
                    onChange={(e) => handleInputChange("billing.apartment_suite", e.target.value)}
                    placeholder="Apt 4B"
                    disabled={formData.sameAsBilling}
                    className={`h-[46px] border-none rounded-[8px] px-3.5 text-[14px] text-[#1A1A1A] placeholder:text-[#888888]/80 focus-visible:ring-1 focus-visible:ring-[#C9A76A] ${formData.sameAsBilling ? 'bg-[#F5F5F5]/50 cursor-not-allowed' : 'bg-[#F5F5F5]'}`}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="flex-1 flex flex-col gap-1.5">
                    <label className="text-[13px] font-medium text-[#1A1A1A]">
                      City
                    </label>
                    <Input
                      value={formData.billing.city}
                      onChange={(e) => handleInputChange("billing.city", e.target.value)}
                      placeholder="Dubai"
                      disabled={formData.sameAsBilling}
                      className={`h-[46px] border-none rounded-[8px] px-3.5 text-[14px] text-[#1A1A1A] placeholder:text-[#888888]/80 focus-visible:ring-1 focus-visible:ring-[#C9A76A] ${formData.sameAsBilling ? 'bg-[#F5F5F5]/50 cursor-not-allowed' : 'bg-[#F5F5F5]'}`}
                    />
                    {formErrors["billing.city"] && (
                      <span className="text-red-500 text-[11px] font-medium">{formErrors["billing.city"]}</span>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col gap-1.5">
                    <label className="text-[13px] font-medium text-[#1A1A1A]">
                      Emirate
                    </label>
                    <div className="relative">
                      <select
                        value={formData.billing.state}
                        onChange={(e) => handleInputChange("billing.state", e.target.value)}
                        disabled={formData.sameAsBilling}
                        className={`w-full h-[46px] border-none rounded-[8px] px-3.5 text-[14px] text-[#1A1A1A] appearance-none outline-none focus-visible:ring-1 focus-visible:ring-[#C9A76A] cursor-pointer ${formData.sameAsBilling ? 'bg-[#F5F5F5]/50 cursor-not-allowed' : 'bg-[#F5F5F5]'}`}
                      >
                        {EMIRATES.map(emirate => (
                          <option key={emirate} value={emirate}>{emirate}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888] pointer-events-none" />
                    </div>
                    {formErrors["billing.state"] && (
                      <span className="text-red-500 text-[11px] font-medium">{formErrors["billing.state"]}</span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#1A1A1A]">
                    Postal Code
                  </label>
                  <Input
                    value={formData.billing.postal_code}
                    onChange={(e) => handleInputChange("billing.postal_code", e.target.value)}
                    placeholder="12345"
                    disabled={formData.sameAsBilling}
                    className={`h-[46px] border-none rounded-[8px] px-3.5 text-[14px] text-[#1A1A1A] placeholder:text-[#888888]/80 focus-visible:ring-1 focus-visible:ring-[#C9A76A] ${formData.sameAsBilling ? 'bg-[#F5F5F5]/50 cursor-not-allowed' : 'bg-[#F5F5F5]'}`}
                  />
                  {formErrors["billing.postal_code"] && (
                    <span className="text-red-500 text-[11px] font-medium">{formErrors["billing.postal_code"]}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-5 mt-4 pt-6 border-t border-[#F2F2F2]/60 pb-10">
          <Button
            type="button"
            onClick={onBack}
            variant="outline"
            className="w-full sm:w-auto h-[48px] px-8 rounded-[8px] border border-[#EBEBEB] text-[#1A1A1A] hover:bg-[#F9F9F9] font-medium text-[14.5px] shadow-sm cursor-pointer transition-transform"
          >
            Back to Cart
          </Button>
          <Button
            type="submit"
            className="w-full sm:w-auto h-[48px] bg-[#412A1F] hover:bg-[#2C1A11] text-white rounded-[8px] text-[14.5px] font-medium flex items-center justify-between sm:justify-center gap-4 px-2.5 sm:pl-6 sm:pr-2.5 pl-6 transition-all shadow-md cursor-pointer hover:shadow-lg"
          >
            Continue to Payment
            <div className="w-[32px] h-[32px] bg-white rounded-full flex items-center justify-center text-[#412A1F] shrink-0">
              <ArrowUpRight className="w-4 h-4 stroke-2" />
            </div>
          </Button>
        </div>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden flex flex-col gap-6 -mt-4">
        <h2 className="text-[20px] font-bold text-[#1a1a1a] flex items-center gap-2">
          Shipping{" "}
          <span className="text-[14px] font-normal text-[#888888]">⇋</span>{" "}
          Billing Address
        </h2>

        <div className="flex flex-col gap-5">
          <h3 className="text-[18px] font-bold text-[#1a1a1a]">Shipping Address</h3>
          {/* Names Row */}
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-[13px] text-[#888888] font-medium">
                First Name
              </label>
              <Input
                value={formData.shipping.first_name}
                onChange={(e) => handleInputChange("shipping.first_name", e.target.value)}
                placeholder="John"
                className="h-[52px] bg-[#F9FAFB] border-none rounded-[12px] px-4 text-[15px] focus-visible:ring-1 focus-visible:ring-[#C9A76A]"
              />
              {formErrors["shipping.first_name"] && (
                <span className="text-red-500 text-[10px] font-medium">{formErrors["shipping.first_name"]}</span>
              )}
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-[13px] text-[#888888] font-medium">
                Last Name
              </label>
              <Input
                value={formData.shipping.last_name}
                onChange={(e) => handleInputChange("shipping.last_name", e.target.value)}
                placeholder="Doe"
                className="h-[52px] bg-[#F9FAFB] border-none rounded-[12px] px-4 text-[15px] focus-visible:ring-1 focus-visible:ring-[#C9A76A]"
              />
              {formErrors["shipping.last_name"] && (
                <span className="text-red-500 text-[10px] font-medium">{formErrors["shipping.last_name"]}</span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[13px] text-[#888888] font-medium">
              Email Address
            </label>
            <Input
              value={formData.customer_email}
              onChange={(e) => handleInputChange("customer_email", e.target.value)}
              placeholder="john.doe@example.com"
              className="h-[52px] bg-[#F9FAFB] border-none rounded-[12px] px-4 text-[15px] focus-visible:ring-1 focus-visible:ring-[#C9A76A]"
            />
            {formErrors["customer_email"] && (
              <span className="text-red-500 text-[10px] font-medium">{formErrors["customer_email"]}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[13px] text-[#888888] font-medium">
              Phone Number
            </label>
            <Input
              value={formData.customer_phone}
              onChange={(e) => handleInputChange("customer_phone", e.target.value)}
              placeholder="+971 50 123 4567"
              className="h-[52px] bg-[#F9FAFB] border-none rounded-[12px] px-4 text-[15px] focus-visible:ring-1 focus-visible:ring-[#C9A76A]"
            />
            {formErrors["customer_phone"] && (
              <span className="text-red-500 text-[10px] font-medium">{formErrors["customer_phone"]}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[13px] text-[#888888] font-medium">
              Street Address
            </label>
            <Input
              value={formData.shipping.street_address}
              onChange={(e) => handleInputChange("shipping.street_address", e.target.value)}
              placeholder="123 Main Street"
              className="h-[52px] bg-[#F9FAFB] border-none rounded-[12px] px-4 text-[15px] focus-visible:ring-1 focus-visible:ring-[#C9A76A]"
            />
            {formErrors["shipping.street_address"] && (
              <span className="text-red-500 text-[10px] font-medium">{formErrors["shipping.street_address"]}</span>
            )}
          </div>

          {/* City / Postal Row */}
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-[13px] text-[#888888] font-medium">
                City
              </label>
              <Input
                value={formData.shipping.city}
                onChange={(e) => handleInputChange("shipping.city", e.target.value)}
                placeholder="Dubai"
                className="h-[52px] bg-[#F9FAFB] border-none rounded-[12px] px-4 text-[15px] focus-visible:ring-1 focus-visible:ring-[#C9A76A]"
              />
              {formErrors["shipping.city"] && (
                <span className="text-red-500 text-[10px] font-medium">{formErrors["shipping.city"]}</span>
              )}
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-[13px] text-[#888888] font-medium">
                Postal Code
              </label>
              <Input
                value={formData.shipping.postal_code}
                onChange={(e) => handleInputChange("shipping.postal_code", e.target.value)}
                placeholder="12345"
                className="h-[52px] bg-[#F9FAFB] border-none rounded-[12px] px-4 text-[15px] focus-visible:ring-1 focus-visible:ring-[#C9A76A]"
              />
              {formErrors["shipping.postal_code"] && (
                <span className="text-red-500 text-[10px] font-medium">{formErrors["shipping.postal_code"]}</span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[13px] text-[#888888] font-medium">
              Emirate
            </label>
            <div className="relative">
              <select
                value={formData.shipping.state}
                onChange={(e) => handleInputChange("shipping.state", e.target.value)}
                className="w-full h-[52px] bg-[#F9FAFB] border-none rounded-[12px] px-4 text-[15px] text-[#1a1a1a] appearance-none outline-none focus-visible:ring-1 focus-visible:ring-[#C9A76A] cursor-pointer"
              >
                {EMIRATES.map(emirate => (
                  <option key={emirate} value={emirate}>{emirate}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888] pointer-events-none" />
            </div>
          </div>

          {/* Billing Section Mobile */}
          <div className="flex flex-col gap-5 mt-6 pt-6 border-t border-[#F2F2F2]">
            <h3 className="text-[18px] font-bold text-[#1a1a1a]">Billing Address</h3>
            
            <label className="flex items-center gap-3 mb-2 cursor-pointer w-max">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={formData.sameAsBilling}
                  onChange={(e) => handleInputChange("sameAsBilling", e.target.checked)}
                  className="peer w-[20px] h-[20px] appearance-none border border-[#D9D9D9] rounded-[6px] bg-[#F9FAFB] checked:bg-[#412A1F] checked:border-[#412A1F] transition-colors cursor-pointer"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 pointer-events-none text-white">
                  <svg width="12" height="10" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <span className="text-[14px] font-medium text-[#1A1A1A]">Same as shipping address</span>
            </label>

            <div className="flex flex-col gap-5">
              <div className="flex gap-4">
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-[13px] text-[#888888] font-medium">First Name</label>
                  <Input
                    value={formData.billing.first_name}
                    onChange={(e) => handleInputChange("billing.first_name", e.target.value)}
                    placeholder="John"
                    disabled={formData.sameAsBilling}
                    className={`h-[52px] border-none rounded-[12px] px-4 text-[15px] focus-visible:ring-1 focus-visible:ring-[#C9A76A] ${formData.sameAsBilling ? 'bg-[#F9FAFB]/50' : 'bg-[#F9FAFB]'}`}
                  />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-[13px] text-[#888888] font-medium">Last Name</label>
                  <Input
                    value={formData.billing.last_name}
                    onChange={(e) => handleInputChange("billing.last_name", e.target.value)}
                    placeholder="Doe"
                    disabled={formData.sameAsBilling}
                    className={`h-[52px] border-none rounded-[12px] px-4 text-[15px] focus-visible:ring-1 focus-visible:ring-[#C9A76A] ${formData.sameAsBilling ? 'bg-[#F9FAFB]/50' : 'bg-[#F9FAFB]'}`}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] text-[#888888] font-medium">Street Address</label>
                <Input
                  value={formData.billing.street_address}
                  onChange={(e) => handleInputChange("billing.street_address", e.target.value)}
                  placeholder="123 Main Street"
                  disabled={formData.sameAsBilling}
                  className={`h-[52px] border-none rounded-[12px] px-4 text-[15px] focus-visible:ring-1 focus-visible:ring-[#C9A76A] ${formData.sameAsBilling ? 'bg-[#F9FAFB]/50' : 'bg-[#F9FAFB]'}`}
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-[13px] text-[#888888] font-medium">City</label>
                  <Input
                    value={formData.billing.city}
                    onChange={(e) => handleInputChange("billing.city", e.target.value)}
                    placeholder="Dubai"
                    disabled={formData.sameAsBilling}
                    className={`h-[52px] border-none rounded-[12px] px-4 text-[15px] focus-visible:ring-1 focus-visible:ring-[#C9A76A] ${formData.sameAsBilling ? 'bg-[#F9FAFB]/50' : 'bg-[#F9FAFB]'}`}
                  />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-[13px] text-[#888888] font-medium">Postal Code</label>
                  <Input
                    value={formData.billing.postal_code}
                    onChange={(e) => handleInputChange("billing.postal_code", e.target.value)}
                    placeholder="12345"
                    disabled={formData.sameAsBilling}
                    className={`h-[52px] border-none rounded-[12px] px-4 text-[15px] focus-visible:ring-1 focus-visible:ring-[#C9A76A] ${formData.sameAsBilling ? 'bg-[#F9FAFB]/50' : 'bg-[#F9FAFB]'}`}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <label className="text-[13px] text-[#888888] font-medium">
              Special Instructions
            </label>
            <textarea
              value={formData.special_instructions}
              onChange={(e) => handleInputChange("special_instructions", e.target.value)}
              placeholder="Any special delivery instructions..."
              className="min-h-[120px] bg-[#F9FAFB] border-none rounded-[12px] p-4 text-[15px] text-[#1a1a1a] placeholder:text-[#888888]/60 focus:outline-none focus:ring-1 focus:ring-[#C9A76A] resize-none"
            />
          </div>
        </div>

        {/* Mobile Action Buttons */}
        <div className="flex flex-col gap-4 mt-4 pb-10">
          <Button
            type="submit"
            className="w-full h-[56px] bg-[#412A1F] hover:bg-[#2C1A11] text-white rounded-[14px] text-[16px] font-bold shadow-lg"
          >
            Continue to Payment
          </Button>
          <button
            type="button"
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
