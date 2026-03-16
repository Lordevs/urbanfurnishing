"use client";

import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/route";

import { PrimaryButton } from "../common/primary-button";
import { SecondaryButton } from "../common/secondary-button";
import { HeroSection } from "../shared/hero-section";

export default function CartHeroSection() {
  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden relative w-full h-auto flex flex-col pt-20 bg-[#3D261C] overflow-hidden sm:rounded-none">
        <div className="absolute inset-0 z-0">
          <Image
            src="/landing/single-products/single-products.webp"
            alt="Cart Hero"
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
              Expertly Curated <br />
              <span className="text-[#C9A76A] font-serif">Room Products.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[15px] leading-[1.6] text-white/95 mb-8 font-light pr-4"
            >
              Designer-selected furniture packages that bring harmony to your
              space. Each collection is thoughtfully coordinated to save you
              time, money, and design guesswork
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-4"
            >
              <Link href={ROUTES.BOOK_CONSULTATION} className="w-full">
                <Button className="w-full bg-[#3D261C] hover:bg-[#2C1A11] text-[#F3EFE7] rounded-full h-[52px] text-[15px] font-medium flex items-center justify-center gap-3 border shadow-none border-transparent">
                  Get in Touch
                  <div className="bg-[#FFF8F0] rounded-full w-[26px] h-[26px] flex items-center justify-center text-[#412A1F]">
                    <ArrowDownRight className="h-[14px] w-[14px] stroke-2" />
                  </div>
                </Button>
              </Link>
              <Link href={ROUTES.SINGLE_PRODUCTS} className="w-full">
                <Button className="w-full bg-white/70 backdrop-blur-md text-[#412A1F] hover:bg-white/80 rounded-full h-[52px] text-[15px] font-medium flex items-center justify-center px-8 border-none shadow-none">
                  Explore Products
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Desktop view */}
      <div className="hidden md:block">
        <HeroSection
          imageSrc="/landing/single-products/single-products.webp"
          imageAlt="Packages Hero"
          title={
            <>
              Expertly Curated{" "}
              <span className="text-[#C9A76A] font-serif">
                Room Products.
              </span>{" "}
            </>
          }
          titleClassName="max-w-3xl"
          overlayGradient="bg-linear-to-r from-[#412A1F]/90 via-[#412A1F]/70 to-transparent"
          description="Designer-selected furniture packages that bring harmony to your space. Each collection is thoughtfully coordinated to save you time, money, and design guesswork"
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
