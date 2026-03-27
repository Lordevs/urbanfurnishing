"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { HeroSection } from "@/components/shared/hero-section";
import { ROUTES } from "@/constants/route";

import { PrimaryButton } from "../common/primary-button";
// import { SecondaryButton } from "../common/secondary-button";

export default function OurDesignExpertHero() {
  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden relative w-full h-auto flex flex-col pt-30 bg-[#3D261C] overflow-hidden sm:rounded-none">
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
              className="text-[32px] font-semibold font-serif leading-tight text-white mb-5 tracking-tight">
              Design Signature by <br />
              <span className="text-[#C9A76A] font-serif">Elena Falconer</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-sm leading-[1.6] text-white/95 mb-8 font-light pr-4">
              A tailored interior design service for clients who want more than
              a standard furnishing package.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-4">
              <PrimaryButton
                href={ROUTES.BOOK_CONSULTATION}
                label="Book a Design Call"
                mbLabel="Book a Design Call"
              />
              {/* <SecondaryButton
                href={ROUTES.OUR_NEW_DESIGN_EXPERT}
                label="Our Design Services"
              /> */}
            </motion.div>
          </div>
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
              Design Signature by <br />
              <span className="text-[#C9A76A] font-serif">Elena Falconer</span>
            </>
          }
          description="A tailored interior design service for clients who want more than a standard furnishing package."
          buttons={
            <>
              <PrimaryButton
                href={ROUTES.BOOK_CONSULTATION}
                label="Book a Design Call"
                mbLabel="Book a Design Call"
              />

              {/* <SecondaryButton
                href={ROUTES.OUR_NEW_DESIGN_EXPERT}
                label="Our Design Services"
              /> */}
            </>
          }
        />
      </div>
    </>
  );
}
