"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Clock, Loader2, Lock, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { type DefaultValues, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useContact } from "@/hooks/mutations/use-contact";
import {
  contactSchema,
  type ContactFormValues,
} from "@/schemas/contact.schema";

// Label → backend enum value maps
const PACKAGE_OPTIONS = [
  { label: "Studio Package", value: "STUDIO" },
  { label: "Apartment Package", value: "APARTMENT" },
  { label: "Room Package", value: "ROOM" },
  { label: "Single Product", value: "SINGLE_PRODUCT" },
  { label: "Not Sure Yet", value: "NOT_SURE" },
] as const;

const TIMELINE_OPTIONS = [
  { label: "As Soon as Possible", value: "ASAP" },
  { label: "Within 1 Month", value: "1_MONTH" },
  { label: "1–3 Months", value: "3_MONTHS" },
  { label: "3–6 Months", value: "6_MONTHS" },
  { label: "Flexible", value: "FLEXIBLE" },
] as const;

const PROPERTY_TYPES = ["Studio", "1 BR", "2 BR", "3 BR+"] as const;

const CONTACT_METHODS = [
  { label: "Phone Call", value: "PHONE" },
  { label: "Email", value: "EMAIL" },
  { label: "WhatsApp", value: "WHATSAPP" },
] as const;

const INPUT_CLASS =
  "bg-[#FFF8F0] border-[#E8E1DA] focus-visible:ring-[#C9A76A]/30 h-[50px] text-[13px] font-light rounded-[8px]";

const SELECT_CLASS =
  "appearance-none w-full cursor-pointer bg-[#FFF8F0] border border-[#E8E1DA] text-[#412A1F] h-[50px] text-[13px] font-light rounded-[8px] px-3 focus:outline-none focus:ring-1 focus:ring-[#C9A76A]/30 transition-all";

const ChevronDown = () => (
  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      className="text-[#8F877C]"
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

const FieldError = ({ message }: { message?: string }) =>
  message ? (
    <p className="text-red-500 text-[11px] mt-1 font-light">{message}</p>
  ) : null;

export default function ConsultationForm() {
  const { mutate, isPending, isSuccess } = useContact();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      marketing_consent: false,
    } as DefaultValues<ContactFormValues>,
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const selectedPropertyType = watch("property_type");

  const selectedContactMethod = watch("preferred_contact");

  const onSubmit = (data: ContactFormValues) => {
    mutate(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <section className="pt-12 pb-24 bg-card">
      <div className="max-w-8xl mx-auto px-4 sm:px-10 lg:px-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-[#1a1a1a] mb-4">
            Book <span className="text-[#C9A76A] font-serif">Free</span>{" "}
            Consultation
          </h2>
          <p className="text-[#8F877C] text-base sm:text-lg font-light tracking-wide">
            Book free Consultation and get the guide
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 max-w-8xl mx-auto items-start">
          {/* Left Sidebar */}
          <div className="lg:w-[35%] w-full self-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-8 sm:p-10 rounded-[32px] shadow-lg w-full"
              style={{
                background:
                  "linear-gradient(135deg, #2A1F15 0%, #412A1F 45%, #5D4E3C 100%)",
              }}
            >
              <div className="inline-flex items-center justify-center border border-white/20 bg-white/10 rounded-full px-4 py-1.5 mb-8">
                <span className="text-[10px] font-semibold tracking-[0.15em] text-[#E0Dcd8] uppercase">
                  CONTACT DETAILS
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-medium text-white mb-3">
                Get In Touch
              </h3>
              <p className="text-[#E0Dcd8]/80 text-[13px] font-light mb-10 tracking-wide">
                We&apos;re here to help bring your vision to life
              </p>

              <div className="flex flex-col gap-5">
                {[
                  { icon: Phone, label: "Call Us", value: "+971 50 123 4567" },
                  { icon: Mail, label: "Email", value: "info@uhfurnishing.ae" },
                  { icon: MapPin, label: "Office", value: "Dubai, UAE" },
                  {
                    icon: Clock,
                    label: "Hours",
                    value: "Sun – Thu: 9AM – 6PM",
                  },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-center gap-4 bg-white/25 p-4 sm:p-5 rounded-[16px]"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#C9A76A] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white/80 text-[11px] font-light mb-0.5">
                        {label}
                      </span>
                      <span className="text-white text-[13px] font-medium tracking-wide">
                        {value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Form */}
          <div className="lg:w-[65%] w-full">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 sm:p-12 lg:p-14 rounded-[32px] shadow-sm border border-[#F0EBE6]"
            >
              <div className="inline-flex items-center justify-center border border-[#EAEADF] bg-[#FCFAF8] rounded-full px-4 py-1.5 mb-6">
                <span className="text-[10px] font-semibold tracking-[0.15em] text-[#C9A76A] uppercase">
                  CONSULTATION FORM
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-serif font-medium text-[#1a1a1a] mb-4 tracking-tight">
                Let&apos;s Start Your{" "}
                <span className="text-[#C9A76A] font-serif">Journey</span>
              </h3>
              <p className="text-[#8F877C] text-[13px] sm:text-[14px] font-light mb-12 tracking-wide">
                Fill in the details below and we&apos;ll get back to you within
                24 hours to schedule your consultation.
              </p>

              {isSuccess ? (
                <div className="bg-[#F6F9F3] border border-[#C9A76A]/30 rounded-[16px] p-8 text-center flex flex-col items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#C9A76A]/10 flex items-center justify-center">
                    <svg
                      className="w-7 h-7 text-[#C9A76A]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h4 className="text-[#1a1a1a] text-xl font-semibold">
                    Inquiry Submitted!
                  </h4>
                  <p className="text-[#8F877C] text-[13px] font-light leading-relaxed">
                    Thank you for reaching out. Our team will contact you within
                    24 hours.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-6"
                  noValidate
                >
                  {/* Name Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[12px] text-[#412A1F] font-medium tracking-wide">
                        First Name <span className="text-[#C9A76A]">*</span>
                      </label>
                      <Input
                        {...register("first_name")}
                        placeholder="John"
                        className={INPUT_CLASS}
                        aria-invalid={!!errors.first_name}
                      />
                      <FieldError message={errors.first_name?.message} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[12px] text-[#412A1F] font-medium tracking-wide">
                        Last Name <span className="text-[#C9A76A]">*</span>
                      </label>
                      <Input
                        {...register("last_name")}
                        placeholder="Doe"
                        className={INPUT_CLASS}
                        aria-invalid={!!errors.last_name}
                      />
                      <FieldError message={errors.last_name?.message} />
                    </div>
                  </div>

                  {/* Email + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[12px] text-[#412A1F] font-medium tracking-wide">
                        Email Address <span className="text-[#C9A76A]">*</span>
                      </label>
                      <Input
                        {...register("email")}
                        type="email"
                        placeholder="john@example.com"
                        className={INPUT_CLASS}
                        aria-invalid={!!errors.email}
                      />
                      <FieldError message={errors.email?.message} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[12px] text-[#412A1F] font-medium tracking-wide">
                        Phone Number <span className="text-[#C9A76A]">*</span>
                      </label>
                      <Input
                        {...register("phone_number")}
                        type="tel"
                        placeholder="+971 50 123 4567"
                        className={INPUT_CLASS}
                        aria-invalid={!!errors.phone_number}
                      />
                      <FieldError message={errors.phone_number?.message} />
                    </div>
                  </div>

                  {/* Package Interest + Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[12px] text-[#412A1F] font-medium tracking-wide">
                        Package Interest
                      </label>
                      <div className="relative">
                        <select
                          {...register("package_interest")}
                          className={SELECT_CLASS}
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Select a package
                          </option>
                          {PACKAGE_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>
                              {o.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[12px] text-[#412A1F] font-medium tracking-wide">
                        Project Timeline
                      </label>
                      <div className="relative">
                        <select
                          {...register("project_timeline")}
                          className={SELECT_CLASS}
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Select timeline
                          </option>
                          {TIMELINE_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>
                              {o.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown />
                      </div>
                    </div>
                  </div>

                  {/* Property Type */}
                  <div className="flex flex-col gap-3 mt-2">
                    <label className="text-[12px] text-[#412A1F] font-medium tracking-wide">
                      Property Type
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {PROPERTY_TYPES.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() =>
                            setValue(
                              "property_type",
                              selectedPropertyType === type ? "" : type,
                            )
                          }
                          className={`flex-1 min-w-[100px] h-[50px] rounded-[8px] text-[13px] font-medium transition-all cursor-pointer ${
                            selectedPropertyType === type
                              ? "bg-[#C9A76A]/5 border border-[#C9A76A] text-[#412A1F]"
                              : "bg-[#FFF8F0] border border-[#E8E1DA] text-[#8F877C] hover:border-[#C9A76A]/50"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Project Description */}
                  <div className="flex flex-col gap-2 mt-2">
                    <label className="text-[12px] text-[#412A1F] font-medium tracking-wide">
                      Tell Us About Your Project
                    </label>
                    <Textarea
                      {...register("project_description")}
                      placeholder="Share details about your property, design preferences, budget range, or any specific requirements..."
                      className="bg-[#FFF8F0] border-[#E8E1DA] focus-visible:ring-[#C9A76A]/30 min-h-[120px] text-[13px] font-light rounded-[8px] resize-y p-4 placeholder:text-[#8F877C]/70"
                    />
                  </div>

                  {/* Preferred Contact Method */}
                  <div className="flex flex-col gap-3 mt-2">
                    <label className="text-[12px] text-[#412A1F] font-medium tracking-wide">
                      Preferred Contact Method
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {CONTACT_METHODS.map(({ label, value }) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() =>
                            setValue(
                              "preferred_contact",
                              selectedContactMethod === value
                                ? undefined
                                : value,
                            )
                          }
                          className={`flex-1 min-w-[120px] h-[50px] rounded-[8px] text-[13px] font-medium transition-all cursor-pointer ${
                            selectedContactMethod === value
                              ? "bg-[#C9A76A]/5 border border-[#C9A76A] text-[#412A1F]"
                              : "bg-[#FFF8F0] border border-[#E8E1DA] text-[#8F877C] hover:border-[#C9A76A]/50"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Marketing Consent */}
                  <div className="bg-[#FFF8F0] border border-[#E8E1DA] rounded-[8px] p-4 mt-2 flex items-start gap-3">
                    <input
                      {...register("marketing_consent")}
                      type="checkbox"
                      id="marketing_consent"
                      className="mt-0.5 h-4 w-4 accent-[#C9A76A] cursor-pointer"
                    />
                    <label
                      htmlFor="marketing_consent"
                      className="text-[#8F877C] text-[11px] leading-relaxed font-light cursor-pointer"
                    >
                      I agree to receive communications from UH Furnishing
                      regarding my consultation request. I understand that my
                      information will be kept confidential and I can
                      unsubscribe at any time.
                    </label>
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="group w-full rounded-full cursor-pointer bg-[#3D261C] hover:bg-[#2C1A11] text-[#F3EFE7] flex items-center justify-between gap-4 py-2 pr-2 pl-8 h-[56px] text-[14px] font-medium transition-all duration-300 shadow-md border-none mt-4 disabled:opacity-70"
                  >
                    <span className="flex-1 text-center pr-4">
                      {isPending ? "Submitting..." : "Book Free Consultation"}
                    </span>
                    <div className="bg-[#FDF4E7] rounded-full p-2.5 text-[#3D261C] transition-transform duration-300 group-hover:scale-95 shrink-0">
                      {isPending ? (
                        <Loader2 className="h-[18px] w-[18px] animate-spin" />
                      ) : (
                        <Image
                          src="/common/arrow-up.svg"
                          alt="Arrow Up"
                          width={12}
                          height={12}
                          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      )}
                    </div>
                  </Button>

                  <div className="flex items-center justify-center gap-2 mt-2">
                    <Lock className="w-3 h-3 text-[#C9A76A]" />
                    <span className="text-[#8F877C] text-[11px] font-light tracking-wide">
                      Your information is secure and will never be shared
                    </span>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
