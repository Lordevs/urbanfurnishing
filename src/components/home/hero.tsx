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
      <div className="relative w-full h-screen overflow-hidden rounded-[24px] flex flex-col justify-center px-8 sm:px-16 lg:px-24">
        {/* Background & Overlay */}
        <Image
          src="/landing/home/hero-section.webp"
          alt="Modern Architecture"
          fill
          className="object-cover w-full h-full"
          priority
        />
        <div className="absolute inset-0  bg-linear-to-b from-[#170D0D]/70 via-[#170D0D]/40 to-transparent" />

        {/* Content */}
        <div className="relative z-10 max-w-6xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[76px] font-serif font-semibold tracking-tight text-white mb-6 leading-[1.1]">
            Design Your Space. Define <br className="hidden sm:block" />
            Your Comfort.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-base sm:text-lg lg:text-3xl text-white/90 leading-relaxed mb-10 max-w-4xl font-light">
            Explore curated room packages and premium furnishing essentials
            crafted to transform your home into a modern, functional, and
            beautifully styled living space all in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-5">
            <Link href={ROUTES.BOOK_CONSULTATION}>
              <Button className="group rounded-full cursor-pointer bg-[#412A1F] hover:bg-[#352219] text-white flex items-center justify-between gap-4 py-2 pr-2 pl-7 h-[56px] sm:h-[60px] text-sm sm:text-base font-medium transition-all duration-300 shadow-lg shadow-black/10 border-none">
                Get in Touch
                <div className="bg-white rounded-full p-2.5 sm:p-3 text-[#412A1F] transition-transform duration-300 group-hover:scale-95">
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Button>
            </Link>

            <Link href={ROUTES.PACKAGES}>
              <Button
                variant="outline"
                className="rounded-full bg-white/70 cursor-pointer backdrop-blur-md text-[#412A1F] hover:bg-white/90 h-[56px] sm:h-[60px] px-8 text-sm sm:text-base font-semibold transition-all duration-300 border-none shadow-lg shadow-black/5 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/10">
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
          className="absolute bottom-0 right-0 bg-white px-6 rounded-tl-[32px] rounded-br-[24px] py-10 sm:py-12 lg:py-22 flex items-center gap-10 sm:gap-14 z-20 shadow-none">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 items-center text-center">
              <span className="text-3xl sm:text-4xl lg:text-[44px] leading-none font-medium text-[#412A1F]">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm text-gray-500 font-medium whitespace-nowrap">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
