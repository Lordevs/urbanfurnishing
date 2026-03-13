"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/route";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Essential",
    price: "5,000",
    description:
      "Perfect for single rooms or small spaces needing a design refresh",
    features: [
      "Initial consultation (1 hour)",
      "Room mood board",
      "Color palette selection",
      "Furniture recommendations",
      "Shopping list with links",
      "Email support for 30 days",
    ],
    buttonText: "Get Started",
    buttonClass: "bg-[#412A1F] hover:bg-[#504437] text-[#FFFDFB]",
    cardClass:
      "border border-[#F2EAE3] shadow-[0px_4px_24px_rgba(0,0,0,0.02)] transform translate-y-3 lg:translate-y-2 lg:translate-x-2",
    badge: null,
    hasPerRoom: true,
  },
  {
    name: "Premium",
    price: "12,000",
    description:
      "Comprehensive design service for complete room transformations",
    features: [
      "Multiple consultations",
      "3D room renderings",
      "Custom furniture sourcing",
      "Detailed floor plans",
      "Styling & accessory curation",
      "Installation coordination",
      "Priority support for 90 days",
    ],
    buttonText: "Get Started",
    buttonClass: "bg-[#C4A36B] hover:bg-[#B3905A] text-white",
    cardClass:
      "border border-[#E8DFC9] shadow-[0px_10px_40px_rgba(201,167,106,0.15)] bg-white z-10 lg:-translate-y-4 lg:scale-[1.02]",
    badge: { text: "Most Popular", color: "bg-[#C4A36B] text-white" },
    hasPerRoom: true,
  },
  {
    name: "Signature",
    price: "25,000",
    description:
      "Full-service luxury design experience for entire homes or commercial spaces",
    features: [
      "Unlimited consultations",
      "Full home design concept",
      "Bespoke furniture design",
      "Project management",
      "On-site styling team",
      "White-glove installation",
      "Lifetime design support",
      "Quarterly refresh visits",
    ],
    buttonText: "Get Started",
    buttonClass: "bg-[#412A1F] hover:bg-[#2C1A11] text-[#FFFDFB]",
    cardClass:
      "border border-[#F2EAE3] shadow-[0px_4px_24px_rgba(0,0,0,0.02)] transform translate-y-3 lg:translate-y-2 lg:-translate-x-2",
    badge: { text: "Premium", color: "bg-[#C4A36B] text-white" },
    hasPerRoom: false,
    hasDemoWatermark: true,
  },
];

const mobilePlans = [
  {
    name: "Essential",
    badge: "POPULAR",
    badgeColor: "bg-[#C9A76A] text-white",
    pricePrefix: "AED 1,299",
    hasDemo: false,
    priceSuffix: "",
    postfix: "/ project",
    features: [
      "1 Room Design",
      "Virtual Consultation",
      "Mood Board Creation",
      "Shopping List",
      "Email Support",
    ],
    buttonText: "Get Started",
  },
  {
    name: "Premium",
    badge: "BEST VALUE",
    badgeColor: "bg-[#C9A76A] text-white",
    pricePrefix: "AED 3,999",
    hasDemo: true,
    postfix: "/ project",
    features: [
      "Up to 3 Rooms",
      "In-Person + Virtual",
      "3D Visualization",
      "Furniture Sourcing",
      "Priority Support",
      "Styling Session",
    ],
    buttonText: "Choose Premium",
  },
  {
    name: "Signature",
    badge: "ELITE",
    badgeColor: "bg-[#000000] text-white",
    pricePrefix: "AED 7,999",
    hasDemo: false,
    priceSuffix: "",
    postfix: "/ project",
    features: [
      "Unlimited Rooms",
      "Full Home Design",
      "Advanced 3D Renders",
      "Project Management",
      "24/7 Dedicated Support",
      "Installation Included",
      "Post-Design Care",
    ],
    buttonText: "Go Signature",
  },
];

export default function ServiceLevels() {
  return (
    <>
      {/* Mobile View */}
      <section className="md:hidden flex flex-col py-6 sm:py-12 px-4 bg-white relative">
        <div className="text-center mb-8">
          <h2 className="text-[25px] font-serif font-bold text-[#1A1A1A] mb-3 tracking-tight">
            Service Levels
          </h2>
          <p className="text-[#666666] text-[13px] font-medium leading-[1.6] max-w-[300px] mx-auto">
            Choose the perfect design package for your needs and budget
          </p>
        </div>

        <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
          {mobilePlans.map((plan, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[16px] border border-[#F0F0F0] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[18px] font-serif font-bold text-[#1A1A1A]">
                  {plan.name}
                </h3>
                <span
                  className={cn(
                    "text-[10px] font-bold px-3 py-1 rounded-[6px] tracking-wide uppercase",
                    plan.badgeColor,
                  )}>
                  {plan.badge}
                </span>
              </div>

              <div className="flex items-baseline gap-1.5 mb-6">
                <div className="flex items-baseline font-serif text-[28px] font-bold text-[#1A1A1A] tracking-normal">
                  {plan.pricePrefix}
                </div>
                <span className="text-[13px]  text-[#888888] font-medium">
                  {plan.postfix}
                </span>
              </div>

              <ul className="flex flex-col gap-3.5 mb-8">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-3">
                    <Check className="w-[16px] h-[16px] text-[#C9A76A] stroke-3" />
                    <span className="text-[13.5px] text-[#444444] font-medium">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link href={ROUTES.BOOK_CONSULTATION} className="w-full">
                <Button className="w-full h-[52px] bg-[#422C20] hover:bg-[#3D261C] text-white rounded-[12px] text-[14px] font-medium shadow-sm transition-all focus:ring-0">
                  {plan.buttonText}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Desktop View */}
      <section className="hidden md:block pb-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          {/* Header */}
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-[44px] font-bold font-serif tracking-tight text-[#111111] mb-4">
              Service Levels
            </h2>
            <p className="text-[#8F877C] text-[15px] sm:text-[18px] font-light max-w-2xl mx-auto leading-relaxed">
              Choose the perfect service tier that matches your
              <br className="hidden sm:block" /> design needs and budget
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-[1100px] mx-auto pt-4 relative">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={cn(
                  "relative flex flex-col bg-white rounded-[24px] sm:rounded-[32px] p-8 sm:px-10 sm:py-12 transition-all duration-300",
                  plan.cardClass,
                )}>
                {/* Top Badge */}
                {plan.badge && (
                  <div className="absolute top-6 sm:top-8 right-6 sm:right-8">
                    <span
                      className={cn(
                        "text-[10px] sm:text-[11px] font-medium px-4 py-1.5 rounded-[8px] sm:rounded-[10px] capitalize tracking-wide",
                        plan.badge.color,
                      )}>
                      {plan.badge.text}
                    </span>
                  </div>
                )}

                {/* Title & Price */}
                <div className="">
                  <h3 className="text-2xl sm:text-[28px] font-serif font-semibold text-[#412A1F] mb-6">
                    {plan.name}
                  </h3>

                  <div className=" sm:mb-6 flex flex-col">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[38px] sm:text-[42px] font-serif font-semibold text-[#C4A36B] tracking-tight leading-none">
                        AED {plan.price}
                      </span>

                      {plan.hasPerRoom && (
                        <span className="text-[14px] sm:text-[15px] text-[#A69C90] font-light ml-0.5">
                          per
                        </span>
                      )}

                      {plan.hasDemoWatermark && (
                        <div className="flex flex-col justify-end text-[#C4A36B] ml-1 mb-1.5">
                          {/* Envato Demo Watermark exactly as it appears in the design snapshot */}
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-[20px] h-[20px]">
                            <path
                              d="M11.999 2.053C11.999 2.053 8.653 6.014 8.653 9.475C8.653 11.238 10.152 12.668 12 12.668C13.848 12.668 15.347 11.238 15.347 9.475C15.347 6.014 11.999 2.053 11.999 2.053Z"
                              fill="currentColor"
                            />
                            <path
                              d="M16.992 8.3C16.992 8.3 14.164 11.957 14.164 14.864C14.164 16.345 15.364 17.545 16.845 17.545C18.327 17.545 19.527 16.345 19.527 14.864C19.527 11.957 16.992 8.3 16.992 8.3Z"
                              fill="currentColor"
                            />
                            <path
                              d="M7 8.3C7 8.3 4.173 11.957 4.173 14.864C4.173 16.345 5.373 17.545 6.855 17.545C8.336 17.545 9.536 16.345 9.536 14.864C9.536 11.957 7 8.3 7 8.3Z"
                              fill="currentColor"
                            />
                            <text
                              x="50%"
                              y="22"
                              className="text-[6px] font-bold fill-current tracking-widest"
                              textAnchor="middle">
                              DEMO
                            </text>
                          </svg>
                        </div>
                      )}
                    </div>

                    {plan.hasPerRoom && (
                      <span className="text-[14px] sm:text-[15px] text-[#A69C90] font-light mt-1 w-full text-left">
                        room
                      </span>
                    )}
                  </div>

                  <p className="text-[#A69C90] text-[14px] leading-[1.7] font-light min-h-[60px] sm:pr-8">
                    {plan.description}
                  </p>
                </div>

                {/* Gentle separator */}
                <div className="h-px w-full bg-[#f6f2ef] mb-6 sm:mb-8" />

                {/* Features List */}
                <div className="flex-1 mb-8 sm:mb-10">
                  <ul className="flex flex-col gap-4">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3.5">
                        <div className="mt-1 shrink-0 text-[#C4A36B]">
                          <Check className="w-[14px] h-[14px] stroke-[2.5]" />
                        </div>
                        <span className="text-[#8B857F] text-[13.5px] sm:text-[14px] font-light leading-snug">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <Link href={ROUTES.BOOK_CONSULTATION} className="w-full">
                  <Button
                    className={cn(
                      "w-full h-[52px] sm:h-[56px] rounded-[10px] sm:rounded-[12px] text-[15px] font-normal transition-all shadow-none hover:-translate-y-0.5 hover:shadow-lg",
                      plan.buttonClass,
                    )}>
                    {plan.buttonText}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
