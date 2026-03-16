"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";

import { HeroSection } from "@/components/shared/hero-section";
import { ROUTES } from "@/constants/route";

import { PrimaryButton } from "../common/primary-button";
import { SecondaryButton } from "../common/secondary-button";

const benefits = [
  "Free 30-minute consultation",
  "Expert guidance on package selection",
  "Transparent pricing estimate",
  "No pressure or commitment",
];

export default function OurDesignExpertHero() {
  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden relative w-full h-auto flex flex-col pt-20 bg-[#3D261C] overflow-hidden sm:rounded-none">
        <div className="absolute inset-0 z-0">
          <Image
            src="/landing/our-new-design-expert/our-design-expert.webp"
            alt="Our Design Expert"
            fill
            className="object-cover w-full h-full opacity-60 mix-blend-overlay"
            priority
          />
        </div>
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-[#412A1F]/95 via-[#412A1F]/70 to-[#412A1F]/30 z-0 pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-center h-full px-5 pb-6 mt-4 gap-8">
          <div className="flex flex-col">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[36px] font-semibold font-serif leading-tight text-white mb-5 tracking-tight"
            >
              Your Personal <br />
              <span className="text-[#C9A76A] font-serif">Design Expert</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[15px] leading-[1.6] text-white/95 mb-8 font-light pr-4"
            >
              Transform your space with professional interior design guidance.
              From concept to completion, we bring your vision to life with
              personalized service.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-4"
            >
              <PrimaryButton
                href={ROUTES.BOOK_CONSULTATION}
                label="Get in Touch"
                mbLabel="Get in Touch"
              />
              <SecondaryButton
                href={ROUTES.OUR_NEW_DESIGN_EXPERT}
                label="Our Design Services"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full bottom-card-wrapper mt-auto"
          >
            <div
              className="rounded-[24px] p-6 shadow-xl w-full flex flex-col gap-5 border border-white/20"
              style={{
                background:
                  "linear-gradient(135deg, #2A1F15 0%, #412A1F 45%, #5D4E3C 100%)",
              }}
            >
              <h3 className="text-[#FFFFFF] text-[18px] font-serif font-medium text-center mb-1">
                Why Book With Us?
              </h3>
              <ul className="flex flex-col gap-3.5">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-4">
                    <div className="w-[18px] h-[18px] rounded-full bg-[#C9A76A] flex items-center justify-center shrink-0">
                      <Check className="w-[12px] h-[12px] text-white stroke-3" />
                    </div>
                    <span className="text-[#FFFFFF]/90 text-[13px] font-light tracking-wide">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Desktop view */}
      <div className="hidden md:block">
        <HeroSection
          imageSrc="/landing/our-new-design-expert/our-design-expert.webp"
          imageAlt="Our Design Expert"
          overlayGradient="bg-[#170D0D]/50"
          title={
            <>
              Your Personal{" "}
              <span className="text-[#C9A76A] font-serif">Design Expert</span>
            </>
          }
          description="Transform your space with professional interior design guidance. From concept to completion, we bring your vision to life with personalized service."
          buttons={
            <>
              <PrimaryButton
                href={ROUTES.BOOK_CONSULTATION}
                label="Get in Touch"
                mbLabel="Get in Touch"
              />

              <SecondaryButton
                href={ROUTES.OUR_NEW_DESIGN_EXPERT}
                label="Our Design Services"
              />
            </>
          }
          bottomCard={
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
              className="absolute bottom-0 right-0 bg-white p-3 sm:p-4 pb-0 pr-0 rounded-tl-[36px] rounded-br-[24px] z-20"
            >
              <div
                className="p-2 sm:p-5 rounded-[24px] sm:rounded-[28px]  shadow-lg flex flex-col gap-2 min-w-[250px] sm:min-w-[400px]"
                style={{
                  background:
                    "linear-gradient(135deg, #2A1F15 0%, #412A1F 45%, #5D4E3C 100%)",
                }}
              >
                <h3 className="text-white text-[17px] font-serif sm:text-[18px] font-medium text-center mb-1">
                  Why Book With Us?
                </h3>
                <ul className="flex flex-col gap-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] rounded-full bg-[#C9A76A] flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-white stroke-3" />
                      </div>
                      <span className="text-white text-[13px] sm:text-[14px] font-light tracking-wide">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          }
        />
      </div>
    </>
  );
}
