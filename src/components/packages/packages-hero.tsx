"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { ROUTES } from "@/constants/route";

import { PrimaryButton } from "../common/primary-button";
import { SecondaryButton } from "../common/secondary-button";
import { HeroSection } from "../shared/hero-section";

export default function PackagesHero() {
  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden relative w-full h-auto flex flex-col pt-30 bg-[#3D261C] overflow-hidden sm:rounded-none">
        <div className="absolute inset-0 z-0">
          <Image
            src="/landing/packages/packages-hero-section.webp"
            alt="Packages Hero"
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
              Complete <span className="text-secondary font-serif">Room</span>{" "}
              <span className="text-secondary font-serif">Packages.</span>{" "}
              Complete{" "}
              <span className="text-secondary font-serif">Peace of Mind</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-sm leading-[1.6] text-white/95 mb-8 font-light pr-4">
              Expertly curated furniture collections designed to transform any
              space. Save up to 35% compared to buying pieces individually.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-4">
              <PrimaryButton
                href={ROUTES.BOOK_CONSULTATION}
                label="Get in Touch"
                mbLabel="Get in Touch"
              />

              <SecondaryButton
                label="Explore Products"
                href={ROUTES.SINGLE_PRODUCTS}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Desktop view */}
      <div className="hidden md:block">
        <HeroSection
          imageSrc="/landing/packages/packages-hero-section.webp"
          imageAlt="Packages Hero"
          title={
            <>
              Complete{" "}
              <span className="text-secondary font-serif">Room Packages.</span>{" "}
              Complete{" "}
              <span className="text-secondary font-serif">Peace of Mind</span>
            </>
          }
          titleClassName="max-w-4xl"
          overlayGradient="bg-linear-to-r from-[#412A1F]/90 via-[#412A1F]/70 to-transparent"
          description="Expertly curated furniture collections designed to transform any space. Save up to 35% compared to buying pieces individually."
          buttons={
            <>
              <PrimaryButton
                href={ROUTES.BOOK_CONSULTATION}
                label="Get in Touch"
                mbLabel="Get in Touch"
              />

              <SecondaryButton
                label="Explore Products"
                href={ROUTES.SINGLE_PRODUCTS}
              />
            </>
          }
        />
      </div>
    </>
  );
}
