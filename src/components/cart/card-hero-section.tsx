"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/route";
import { HeroSection } from "@/components/shared/hero-section";

const benefits = [
  "Free 30-minute consultation",
  "Expert guidance on package selection",
  "Transparent pricing estimate",
  "No pressure or commitment",
];

export default function CartHeroSection() {
  return (
    <HeroSection
      imageSrc="/landing/single-products/single-products.webp"
      imageAlt="Packages Hero"
      title={
        <>
          Expertly Curated{" "}
          <span className="text-[#C9A76A] font-serif">Room Products.</span>{" "}
        </>
      }
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
          <div className="px-8 sm:px-16 py-10 sm:py-7 rounded-[24px] sm:rounded-[28px] shadow-lg flex flex-col gap-7 min-w-[320px] sm:min-w-[480px] bg-[#FFF8F0]/70 backdrop-blur-sm border border-[#F0E9DD]">
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
  );
}
