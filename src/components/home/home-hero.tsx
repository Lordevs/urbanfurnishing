"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { ActionButton } from "@/components/shared/action-button";
import { HeroSection } from "@/components/shared/hero-section";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/route";

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
      heightClass="h-[75dvh] min-[430px]:h-[62dvh] sm:h-screen"
      title={
        <>
          Design Your Space. <br />
          Define Your Comfort.
        </>
      }
      description="Explore curated room packages and premium furnishing essentials crafted to transform your home into a modern, functional, and beautifully styled living space all in one place."
      buttons={
        <>
          <ActionButton
            href={ROUTES.BOOK_CONSULTATION}
            label="Get in Touch"
            mobileLabel="Get Started"
          />

          <ActionButton
            href={ROUTES.PACKAGES}
            label="Explore Packages"
            mobileLabel="View Portfolio"
            variant="outline"
          />
        </>
      }
      bottomCard={
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="absolute bottom-4 right-4  sm:bottom-0 sm:right-0 bg-[#F9F9F9] sm:bg-white px-5 sm:px-6 rounded-[24px] sm:rounded-tl-[32px] sm:rounded-br-[24px] sm:rounded-bl-none sm:rounded-tr-none py-6 sm:py-12 lg:py-22 flex justify-between sm:justify-start items-center gap-6 sm:gap-14 z-20 shadow-xl sm:shadow-none w-[300px] sm:w-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col gap-1 sm:gap-2 items-center text-center">
              <span className="text-[28px] sm:text-4xl lg:text-[44px] leading-none font-bold sm:font-medium text-[#412A1F]">
                {stat.value}
              </span>
              <span className="text-[11px] sm:text-xs lg:text-sm text-[#7A7A7A] sm:text-gray-500 font-medium whitespace-nowrap">
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
