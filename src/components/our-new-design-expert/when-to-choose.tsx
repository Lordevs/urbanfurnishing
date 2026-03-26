"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { ROUTES } from "@/constants/route";

import { PrimaryButton } from "../common/primary-button";

const reasons = [
  {
    title: "When a package is not enough",
    description:
      "Standard furnishing can leave gaps. Design Signature provides a complete, curated response to your space.",
    icon: "/landing/home/how-we-work/consultation.svg",
  },
  {
    title: "When the layout needs proper design thinking",
    description:
      "We optimize every square inch, ensuring flow, proportion and functionality are perfectly balanced.",
    icon: "/landing/home/how-we-work/design-selection.svg",
  },
  {
    title: "When the property needs a stronger visual identity",
    description:
      "For premium units that need to stand out with a cohesive, luxury aesthetic that commands attention.",
    icon: "/landing/home/how-we-work/delivery-install.svg",
  },
  {
    title: "When you want Elena directly involved",
    description:
      "Direct collaboration with our Creative Director for projects that require a higher level of personal design direction.",
    icon: "/landing/home/how-we-work/after-care.svg",
  },
];

export default function WhenToChoose() {
  return (
    <section
      id="when-to-choose"
      className="py-20 lg:py-28 bg-[#FDFBF9] overflow-hidden"
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-10 lg:px-16">
        {/* Mobile View */}
        <div className="flex flex-col lg:hidden">
          <h2 className="text-3xl font-serif font-bold text-[#1a1a1a] mb-8 tracking-tight text-center">
            When to choose{" "}
            <span className="text-[#C9A76A]">Design Signature</span>
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full aspect-[1.5] rounded-[16px] overflow-hidden mb-10 shadow-sm"
          >
            <Image
              src="/landing/home/how-we-work/work-img.webp"
              alt="When to choose UH"
              fill
              className="object-cover"
            />
          </motion.div>

          <div className="flex flex-col gap-4">
            {reasons.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 p-6 rounded-[16px] bg-white border border-[#F0EBE6] shadow-xs"
              >
                <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-[#C9A76A] text-white">
                  <ArrowRight className="w-5 h-5" strokeWidth={2} />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-[17px] font-serif font-bold text-[#1a1a1a] mb-1 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[#8F877C] text-[13px] leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:flex flex-col lg:flex-row gap-20 lg:gap-28 items-center">
          {/* Left Column */}
          <div className="lg:w-[45%] w-full relative">
            <div className="relative z-20 mb-12">
              <h2 className="text-[32px] sm:text-[50px] font-serif font-medium tracking-tight text-[#1a1a1a] mb-8 leading-[1.1]">
                When to choose <br />
                <span className="text-[#C9A76A] font-serif italic">
                  Design Signature
                </span>
              </h2>

              <PrimaryButton
                href={ROUTES.BOOK_CONSULTATION}
                label="Book a Design Call"
                mbLabel="Book a Design Call"
                className="h-auto shadow-none"
              />
            </div>

            <div className="relative mt-8 sm:mt-12 lg:mt-16">
              {/* background text */}
              <div className="absolute top-0 lg:-top-[25px] left-0 select-none font-serif pointer-events-none z-0 opacity-[0.06]">
                <p className="text-[#B37531] text-[130px] font-semibold tracking-normal leading-none italic">
                  Signature
                </p>
              </div>

              {/* Main Image */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-20 pt-16 rounded-[16px] overflow-hidden w-full"
              >
                <div className="aspect-[1.5] relative w-full">
                  <Image
                    src="/landing/home/how-we-work/work-img.webp"
                    alt="Design Signature"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column - Steps/Reasons */}
          <div className="lg:w-[55%] w-full flex flex-col justify-center mt-8 lg:mt-0">
            <div className="divide-y divide-[#F0EAE3]">
              {reasons.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="py-10 first:pt-0 last:pb-0 flex items-start gap-8 group"
                >
                  <div className="relative shrink-0 mt-1">
                    <div className="w-[64px] h-[64px] rounded-full bg-[#F5EFE9] flex items-center justify-center border border-[#F0EBE6] transition-transform group-hover:scale-105">
                      <Image
                        src={item.icon}
                        alt={item.title}
                        width={30}
                        height={30}
                        className="w-[30px] h-[30px] object-contain opacity-80"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <h3 className="text-[22px] sm:text-[25px] font-serif font-medium tracking-tight text-[#412A1F]">
                      {item.title}
                    </h3>
                    <p className="text-[#8F877C] text-[15px] sm:text-[16px] leading-[1.7] tracking-wide max-w-xl font-light">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
