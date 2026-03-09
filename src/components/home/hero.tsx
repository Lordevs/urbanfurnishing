"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/route";

const stats = [
  { label: "Properties Furnished", value: "500+" },
  { label: "Client Satisfaction", value: "98%" },
  { label: "Years Excellence", value: "15+" },
];

export default function Hero() {
  return (
    <section
      id="home-hero"
      className="px-4 sm:px-10 lg:px-16 max-w-8xl mx-auto">
      <div className="relative w-full h-screen rounded-[16px] flex flex-col justify-center px-8 sm:px-16 lg:px-24">
        {/* Background & Overlay */}
        <Image
          src="/landing/home/hero-section.webp"
          alt="Modern Architecture"
          fill
          className="object-cover rounded-[16px]"
          priority
        />
        <div className="absolute inset-0 bg-[#170D0D]/40 rounded-[16px]" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl lg:text-[64px] font-semibold tracking-tight text-white mb-6 leading-[1.1]">
            Design Your Space. Define <br />
            Your Comfort.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-base sm:text-xl text-white  leading-relaxed mb-8 max-w-2xl">
            Explore curated room packages and premium furnishing essentials
            crafted to transform your home into a modern, functional, and
            beautifully styled living space all in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-5">
            <Link href={ROUTES.BOOK_CONSULTATION}>
              <Button className="rounded-full  bg-[#412A1F] hover:bg-[#4A3125]/90 text-white flex items-center gap-2 pr-1.5 pl-6 h-13 text-xs sm:text-sm font-medium transition-all duration-300 shadow-none border-none">
                Get in Touch
                <div className="bg-white rounded-full p-1 text-[#412A1F]">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </Button>
            </Link>

            <Link href={ROUTES.PACKAGES}>
              <Button
                variant="outline"
                className="rounded-full bg-white/70 backdrop-blur-md text-[#4A3125] hover:bg-white/80 h-13 px-6 text-xs sm:text-sm font-medium transition-all duration-300 shadow-none border-none">
                Explore Packages
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="absolute bottom-0 right-0 bg-white px-4 rounded-tl-[24px] rounded-br-[16px] py-10 sm:py-12 lg:py-22 flex items-center gap-10 z-20 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col gap-1.5 items-center text-center">
              <span className="text-3xl sm:text-3xl lg:text-4xl font-medium text-[#4A3125]">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm text-[#1a1a1a]/40 font-medium whitespace-nowrap">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
