"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check, ArrowDownRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { HeroSection } from "@/components/shared/hero-section";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/route";

const benefits = [
  "Free 30-minute consultation",
  "Expert guidance on package selection",
  "Transparent pricing estimate",
  "No pressure or commitment",
];

export default function SingleProductDetailHero() {
  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden relative w-full h-[85dvh] pb-15 sm:pb-0 flex flex-col pt-[100px] bg-[#3D261C] overflow-hidden sm:rounded-none">
        <div className="absolute inset-0 z-0">
          <Image
            src="/landing/packages/packages-hero-section.webp"
            alt="Single Detail Hero"
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
              className="text-[36px] font-semibold font-serif leading-tight text-white mb-5 tracking-tight">
              Expertly Curated <br />
              Room Collections
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[15px] leading-[1.6] text-white/95 mb-8 font-light pr-4">
              Designer-selected furniture packages that bring harmony to your
              space. Each collection is thoughtfully coordinated to save you
              time, money, and design guesswork
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-4">
              <Link href={ROUTES.BOOK_CONSULTATION} className="w-full">
                <Button className="w-full bg-[#3D261C] hover:bg-[#2C1A11] text-[#F3EFE7] rounded-full h-[52px] text-[15px] font-medium flex items-center justify-center gap-3 border shadow-none border-transparent">
                  Get in Touch
                  <div className="bg-[#FFF8F0] rounded-full w-[26px] h-[26px] flex items-center justify-center text-[#412A1F]">
                    <ArrowDownRight className="h-[14px] w-[14px] stroke-2" />
                  </div>
                </Button>
              </Link>
              <Link href={ROUTES.PACKAGES} className="w-full">
                <Button className="w-full bg-white/70 backdrop-blur-md text-[#412A1F] hover:bg-white/80 rounded-full h-[52px] text-[15px] font-medium flex items-center justify-center px-8 border-none shadow-none">
                  Explore Packages
                </Button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full bottom-card-wrapper mt-auto">
            <div className="bg-[#F5EFEA] rounded-[24px] p-6 shadow-xl w-full flex flex-col gap-5 border border-white/40">
              <h3 className="text-[#412A1F] text-[18px] font-sans font-semibold text-center mb-1">
                Why Book With Us?
              </h3>
              <ul className="flex flex-col gap-3.5">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-4">
                    <div className="w-[18px] h-[18px] rounded-full bg-[#C9A76A] flex items-center justify-center shrink-0">
                      <Check className="w-[12px] h-[12px] text-white stroke-3" />
                    </div>
                    <span className="text-[#412A1F]/90 text-[13px] font-medium tracking-wide">
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
          imageSrc="/landing/packages/packages-hero-section.webp"
          imageAlt="Packages Hero"
          title={<>Expertly Curated Room Collections</>}
          overlayGradient="bg-linear-to-r from-[#412A1F]/90 via-[#412A1F]/70 to-transparent"
          description="Designer-selected furniture packages that bring harmony to your space. Each collection is thoughtfully coordinated to save you time, money, and design guesswork"
          buttons={
            <>
              <Link href={ROUTES.BOOK_CONSULTATION}>
                <Button className="group rounded-full cursor-pointer bg-[#3D261C] hover:bg-[#2C1A11] text-[#F3EFE7] flex items-center justify-between gap-5 py-2 pr-2.5 pl-7 h-[52px] text-[15px] font-normal transition-all duration-300 shadow-lg border border-white/10 hover:border-white/25">
                  Get in Touch
                  <div className="bg-[#FFF8F0] rounded-full w-[36px] h-[36px] flex items-center justify-center text-[#412A1F] transition-transform duration-300 group-hover:scale-95 shrink-0">
                    <ArrowUpRight className="h-[25px] w-[25px] stroke-[1.5] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Button>
              </Link>

              <Link href={ROUTES.PACKAGES}>
                <Button
                  variant="outline"
                  className="rounded-full bg-white/70 cursor-pointer backdrop-blur-md text-[#412A1F] hover:bg-white/90 h-[56px] px-8 text-[14px] font-semibold transition-all duration-300 border-none shadow-lg hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/10">
                  Explore Packages
                </Button>
              </Link>
            </>
          }
          bottomCard={
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
              className="absolute bottom-0 right-0 bg-white p-3 sm:p-4 pb-0 pr-0 rounded-tl-[36px] rounded-br-[24px] z-20">
              <div className="px-2 sm:px-16 py-2 sm:py-7 rounded-[24px] sm:rounded-[28px] shadow-lg flex flex-col gap-7 min-w-[300px] sm:min-w-[480px] bg-[#FFF8F0]/70 backdrop-blur-sm border border-[#F0E9DD]">
                <h3 className="text-[#412A1F] text-[18px] font-serif sm:text-[20px] font-medium text-center mb-2">
                  Why Book With Us?
                </h3>
                <ul className="flex flex-col gap-5">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-5">
                      <div className="w-[22px] h-[22px] sm:w-[24px] sm:h-[24px] rounded-full bg-[#C9A76A] flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 text-white stroke-3" />
                      </div>
                      <span className="text-[#412A1F] text-[13px] sm:text-[14.5px] font-medium tracking-wide">
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
