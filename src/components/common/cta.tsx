"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ActionButton } from "@/components/shared/action-button";
import { ROUTES } from "@/constants/route";

const stats = [
  { value: "5x", label: "Higher retention rate" },
  { value: "20", label: "Recurring clients" },
  { value: "15", label: "Years Excellence" },
  { value: "98%", label: "Client Satisfaction" },
];

const mobileStats = [
  { value: "500+", label: "Projects Completed" },
  { value: "15", label: "Years Experience" },
  { value: "20+", label: "Design Awards" },
  { value: "98%", label: "Client Satisfaction" },
];

export default function CTA() {
  return (
    <section className="w-full">
      {/* Mobile View */}
      <div className="flex flex-col lg:hidden w-full bg-linear-to-b from-[#412A1F] to-[#5D4E3C] py-20 px-6">
        <div className="flex flex-col text-center items-center">
          <h2 className="text-[32px]  font-bold font-serif text-white mb-4 leading-tight max-w-[280px]">
            Let&apos;s Design Your Space Together
          </h2>
          <p className="text-white/80 text-[15px] leading-relaxed mb-10 max-w-[310px]">
            Start your interior design journey today with a free consultation
            from our expert team
          </p>

          <div className="flex flex-col gap-4 w-full max-w-[340px] mb-16">
            <ActionButton
              href={ROUTES.BOOK_CONSULTATION}
              label="Book Free Consultation"
              className="py-6 rounded-[12px] text-[15px] bg-[#C9A76A] hover:bg-[#B3905A]"
              showArrow={false}
            />
            <ActionButton
              href={ROUTES.PACKAGES}
              label="View Our Work"
              variant="outline"
              className="py-6 rounded-[12px] text-[15px] border-white/40 hover:bg-white/10"
            />
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-12 w-full max-w-[340px]">
            {mobileStats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <span className="text-[40px] font-sans font-bold text-[#C9A76A] leading-none mb-3 flex items-center gap-1">
                  {stat.value.replace("+", "").replace("%", "")}
                  <span className="text-[24px]">
                    {stat.value.includes("+")
                      ? "+"
                      : stat.value.includes("%")
                        ? "%"
                        : ""}
                  </span>
                </span>
                <span className="text-[13px] text-white/90 text-center font-light">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block max-w-8xl mx-auto px-4 sm:px-10 lg:px-16 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-[24px] overflow-hidden bg-[#433B35]">
          {/* Background SVG */}
          <div className="absolute inset-0 z-0 select-none pointer-events-none">
            <Image
              src="/common/image-with-fallback.svg"
              alt="Background"
              fill
              className="object-cover object-center opacity-80"
              quality={100}
            />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-20 p-10 sm:p-14 lg:p-20">
            {/* Left Content */}
            <div className="lg:w-[45%] w-full flex flex-col justify-center">
              <h2 className="text-[32px] sm:text-[42px] font-serif font-medium tracking-tight text-white mb-6 leading-[1.2]">
                Let&apos;s{" "}
                <span className="text-[#C9A76A] font-serif">Design</span> Your
                Space Together
              </h2>

              <p className="text-white text-[15px] sm:text-[16px] leading-[1.8] font-light mb-10 max-w-[90%]">
                Speak with our furnishing experts to plan, style, and optimize
                your room with the right package and pieces.
              </p>

              <div>
                <ActionButton
                  href={ROUTES.BOOK_CONSULTATION}
                  label="Book Now"
                  className="bg-[#412A1F] hover:bg-[#2D1A12] pr-1.5 pl-6 h-12 text-[13px] font-normal"
                />
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:w-[55%] w-full grid grid-cols-1 sm:grid-cols-2 gap-x-12 sm:gap-x-16 gap-y-12 sm:gap-y-14 content-center">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex flex-col border-t border-[#FFCD96] pt-6 relative">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-4xl sm:text-5xl font-serif font-normal text-white tracking-tight">
                      {stat.value}
                    </span>
                    <ArrowUpRight
                      className="text-[#FFCD96] w-12 h-12"
                      strokeWidth={1}
                    />
                  </div>
                  <span className="text-[12px] sm:text-[13px] text-white font-light tracking-wide">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
