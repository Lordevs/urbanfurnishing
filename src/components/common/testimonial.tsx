"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Testimonial() {
  return (
    <section className="relative w-full h-[600px] sm:h-[500px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/common/testimonial.webp"
          alt="Interior design showcase"
          fill
          className="object-cover w-full h-full"
          priority
        />
      </div>

      {/* Overlay Gradient */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(90deg, #412A1F 0%, rgba(65, 42, 31, 0.9) 5%, rgba(65, 42, 31, 0.7) 40%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-20 max-w-8xl mx-auto px-4 sm:px-10 lg:px-16 h-full flex items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl flex flex-col gap-6 sm:gap-8">
          {/* Quote Icon */}
          <div className="relative w-10 h-10 sm:w-[48px] sm:h-[40px] opacity-90">
            <Image
              src="/common/double-qoutes.svg"
              alt="Quote"
              fill
              className="object-contain"
            />
          </div>

          <p className="text-white text-[18px] sm:text-[23px] leading-[1.6] font-light tracking-wide max-w-full">
            Working with UH Furnishing transformed how we approach property
            investments. The clarity and predictability they bring is unmatched
            in the market.
          </p>

          <div className="flex items-center gap-4 mt-2">
            <div className="w-12 h-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white text-[15px] font-medium shrink-0">
              JK
            </div>
            <div className="flex flex-col">
              <span className="text-white text-[14px] font-medium tracking-wide">
                John Khalil
              </span>
              <span className="text-white/60 text-[12px] font-light">
                Property Investor, Dubai
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
