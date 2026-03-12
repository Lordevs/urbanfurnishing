"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

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
          <Link href={ROUTES.BOOK_CONSULTATION} className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto group rounded-xl sm:rounded-full bg-[#C3A16A] sm:bg-[#3D261C] hover:bg-[#b08e58] sm:hover:bg-[#2C1A11] text-white flex items-center justify-center sm:justify-between sm:gap-5 py-2 px-6 sm:px-2.5 sm:pr-2.5 sm:pl-7 h-[48px] sm:h-[52px] text-base sm:text-[15px] font-medium sm:font-normal transition-all duration-300 shadow-lg border-none sm:border sm:border-white/10 sm:hover:border-white/25">
              <span className="sm:hidden">Get Started</span>
              <span className="hidden sm:inline text-white">Get in Touch</span>
              <div className="hidden sm:flex bg-[#FFF8F0] rounded-full w-[30px] h-[30px] items-center justify-center text-[#412A1F] transition-transform duration-300 group-hover:scale-95 shrink-0 ml-4 sm:ml-0">
                <Image
                  src="/common/arrow-up.svg"
                  alt="Arrow Up"
                  width={12}
                  height={12}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
            </Button>
          </Link>

          <Link href={ROUTES.PACKAGES} className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto rounded-xl sm:rounded-full bg-transparent sm:bg-white/70 border border-white/50 sm:border-none backdrop-blur-md text-white sm:text-[#412A1F] hover:bg-white/10 sm:hover:bg-white/90 h-[48px] sm:h-[60px] px-8 text-base font-medium sm:font-semibold transition-all duration-300 shadow-lg shadow-black/5 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/10">
              <span className="sm:hidden">View Portfolio</span>
              <span className="hidden sm:inline">Explore Packages</span>
            </Button>
          </Link>
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
