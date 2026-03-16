"use client";

import { HeroSection } from "@/components/shared/hero-section";
import { ROUTES } from "@/constants/route";

import { PrimaryButton } from "../common/primary-button";
import { SecondaryButton } from "../common/secondary-button";

export default function HomeHero() {
  return (
    <HeroSection
      imageSrc="/landing/home/hero-section.webp"
      imageAlt="Modern Architecture"
      heightClass="h-auto md:h-[80dvh] gap-10 pb-20 pt-40"
      title="Design Your Space. Define Your Comfort."
      description="Explore curated room packages and premium furnishing essentials crafted to transform your home into a modern, functional, and beautifully styled living space all in one place."
      buttons={
        <>
          <PrimaryButton
            href={ROUTES.BOOK_CONSULTATION}
            label="Get in Touch"
            mbLabel="Get Started"
            className="rounded-xl sm:rounded-full bg-[#C3A16A] sm:bg-[#3D261C] hover:bg-[#b08e58] sm:hover:bg-[#2C1A11] text-sm"
            iconClassName="hidden sm:flex"
          />

          <SecondaryButton
            label="Explore Products"
            href={ROUTES.SINGLE_PRODUCTS}
            className="w-full sm:w-auto rounded-xl sm:rounded-full bg-transparent sm:bg-white/70 border border-white/50 sm:border-none backdrop-blur-md text-white sm:text-[#412A1F] hover:bg-white/10 sm:hover:bg-white/90 md:text-base font-medium sm:font-semibold transition-all duration-300 shadow-lg shadow-black/5 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/10"
          />
        </>
      }
    />
  );
}
