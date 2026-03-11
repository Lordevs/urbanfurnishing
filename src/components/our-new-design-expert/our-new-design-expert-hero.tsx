"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
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

export default function OurDesignExpertHero() {
  return (
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
          <Link href={ROUTES.BOOK_CONSULTATION}>
            <Button className="group rounded-full cursor-pointer bg-[#3D261C] hover:bg-[#2C1A11] text-white flex items-center justify-between gap-5 py-2 pr-2.5 pl-7 h-[52px] text-[15px] font-normal transition-all duration-300 shadow-lg border border-white/10 hover:border-white/25">
              Get in Touch
              <div className="bg-[#FFF8F0] rounded-full w-[36px] h-[36px] flex items-center justify-center text-[#412A1F] transition-transform duration-300 group-hover:scale-95 shrink-0">
                <ArrowUpRight className="h-[18px] w-[18px] stroke-[1.5] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Button>
          </Link>

          <Link href={ROUTES.PACKAGES}>
            <Button
              variant="outline"
              className="rounded-full bg-white/20 cursor-pointer backdrop-blur-md text-white hover:bg-white/30 h-[52px] px-8 text-[15px] font-normal transition-all duration-300 border border-white/20 hover:border-white/40 shadow-lg hover:-translate-y-0.5">
              Our Design Services
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
          <div
            className="px-8 sm:px-16 py-10 sm:py-8 rounded-[24px] sm:rounded-[28px]  shadow-lg flex flex-col gap-7 min-w-[320px] sm:min-w-[480px]"
            style={{
              background:
                "linear-gradient(135deg, #2A1F15 0%, #412A1F 45%, #5D4E3C 100%)",
            }}>
            <h3 className="text-white text-[17px] font-serif sm:text-[18px] font-medium text-center mb-1">
              Why Book With Us?
            </h3>
            <ul className="flex flex-col gap-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-4">
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
  );
}
