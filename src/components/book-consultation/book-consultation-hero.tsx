"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { ROUTES } from "@/constants/route";

import { PrimaryButton } from "../common/primary-button";
import { SecondaryButton } from "../common/secondary-button";
import { HeroSection } from "../shared/hero-section";

export default function BookConsultationHero() {
  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden relative w-full h-auto flex flex-col pt-20 bg-[#3D261C] overflow-hidden sm:rounded-none">
        <div className="absolute inset-0 z-0">
          <Image
            src="/landing/book-consultation/book-consultation-hero-section.webp"
            alt="Book Consultation"
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
              Redefining <br />
              <span className="text-[#C9A76A] font-serif">Furnishing</span>{" "}
              Excellence
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[15px] leading-[1.6] text-white/95 mb-8 font-light pr-4"
            >
              Transforming properties with clarity, speed, and unwavering
              accountability
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
        </div>
      </div>

      {/* Desktop view */}
      <div className="hidden md:block">
        <HeroSection
          imageSrc="/landing/book-consultation/book-consultation-hero-section.webp"
          imageAlt="Book Consultation"
          title={
            <>
              Redefining{" "}
              <span className="text-[#C9A76A] font-serif">Furnishing</span>{" "}
              Excellence
            </>
          }
          titleClassName="max-w-3xl"
          overlayGradient="bg-[#170D0D]/40"
          description="Transforming properties with clarity, speed, and unwavering accountability"
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
        />
      </div>
    </>
  );
}
