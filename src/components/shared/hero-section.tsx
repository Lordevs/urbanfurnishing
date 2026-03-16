"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { cn } from "@/lib/utils";

export interface HeroSectionProps {
  imageSrc: string;
  imageAlt?: string;
  overlayGradient?: string;
  heightClass?: string;
  title: React.ReactNode;
  description: React.ReactNode;
  buttons: React.ReactNode;
  bottomCard?: React.ReactNode;
  titleClassName?: string;
}

export function HeroSection({
  imageSrc,
  imageAlt = "Hero Background",
  overlayGradient = "bg-linear-to-b from-[#170D0D]/70 via-[#170D0D]/40 to-transparent",
  heightClass = "h-[50dvh]",
  title,
  description,
  buttons,
  bottomCard,
  titleClassName,
}: HeroSectionProps) {
  return (
    <section className="px-0 sm:px-10 lg:px-16 max-w-8xl mx-auto">
      <div
        className={`relative w-full ${heightClass} overflow-hidden sm:rounded-[24px] flex flex-col justify-center px-4 sm:px-16 lg:px-24`}
      >
        {/* Background & Overlay */}
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover w-full h-full"
          priority
        />
        <div className={`absolute inset-0 ${overlayGradient}`} />

        {/* Content */}
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={cn(
              "text-[40px] leading-[1.1] sm:text-5xl md:text-[50px] font-serif font-semibold tracking-tight text-white mb-2 max-w-2xl",
              titleClassName,
            )}
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-base sm:text-xl text-white/90 leading-relaxed mb-6 sm:mb-10 max-w-2xl font-light"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-5 w-full sm:w-auto mt-2 sm:mt-0"
          >
            {buttons}
          </motion.div>
        </div>

        {/* Bottom Card */}
        {bottomCard}
      </div>
    </section>
  );
}
