"use client";

import { motion } from "framer-motion";

import { HeroSection } from "@/components/shared/hero-section";
import { ROUTES } from "@/constants/route";

import { PrimaryButton } from "../common/primary-button";
import { SecondaryButton } from "../common/secondary-button";

const stats = [
  { label: "Properties Furnished", mobileLabel: "Projects", value: "500+" },
  { label: "Client Satisfaction", mobileLabel: "Satisfied", value: "98%" },
  { label: "Years Excellence", mobileLabel: "Years", value: "15+" },
];

export default function HomeHero() {
  return (
    <HeroSection
      imageSrc="/landing/home/hero-section.webp"
      imageAlt="Modern Architecture"
      heightClass="h-auto md:h-[50dvh] gap-10 pt-20"
      title="Design Your Space. Define Your Comfort."
      description="Explore curated room packages and premium furnishing essentials crafted to transform your home into a modern, functional, and beautifully styled living space all in one place."
      buttons={
        <>
          <PrimaryButton
            href={ROUTES.BOOK_CONSULTATION}
            label="Get in Touch"
            mbLabel="Get Started"
            className="rounded-xl sm:rounded-full bg-[#C3A16A] sm:bg-[#3D261C] hover:bg-[#b08e58] sm:hover:bg-[#2C1A11]"
            iconClassName="hidden sm:flex"
          />

          <SecondaryButton
            label="Explore Products"
            href={ROUTES.SINGLE_PRODUCTS}
            className="w-full sm:w-auto rounded-xl sm:rounded-full bg-transparent sm:bg-white/70 border border-white/50 sm:border-none backdrop-blur-md text-white sm:text-[#412A1F] hover:bg-white/10 sm:hover:bg-white/90 py-6 px-6 text-base font-medium sm:font-semibold transition-all duration-300 shadow-lg shadow-black/5 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/10"
          />
        </>
      }
      bottomCard={
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="md:absolute bottom-4 right-4 sm:bottom-0 sm:right-0 z-0 bg-[#F9F9F9] sm:bg-white px-5 sm:px-6 rounded-[24px] sm:rounded-tl-[32px] sm:rounded-br-[24px] sm:rounded-bl-none sm:rounded-tr-none py-6 sm:py-12 2xl:py-14 flex justify-evenly sm:justify-start items-center gap-6 sm:gap-14 shadow-xl sm:shadow-none w-full sm:w-auto mx-auto mb-5 sm:mb-0"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col gap-1 sm:gap-2 items-center text-center"
            >
              <span className="text-[28px] sm:text-4xlleading-none font-bold sm:font-medium text-[#412A1F]">
                {stat.value}
              </span>
              <span className="text-[11px] sm:text-xs text-[#7A7A7A] sm:text-gray-500 font-medium whitespace-nowrap">
                <span className="sm:hidden">{stat.mobileLabel}</span>
                <span className="hidden sm:inline">{stat.label}</span>
              </span>
            </div>
          ))}
        </motion.div>
      }
    />
  );
}
