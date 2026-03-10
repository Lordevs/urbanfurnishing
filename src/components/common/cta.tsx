"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "5x", label: "Higher retention rate" },
  { value: "20", label: "Recurring clients" },
  { value: "15", label: "Years Excellence" },
  { value: "98%", label: "Client Satisfaction" },
];

export default function CTA() {
  return (
    <section>
      <div className="max-w-8xl mx-auto px-4 sm:px-10 lg:px-16">
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
                Let's <span className="text-[#C9A76A] font-serif">Design</span>{" "}
                Your Space Together
              </h2>

              <p className="text-white text-[15px] sm:text-[16px] leading-[1.8] font-light mb-10 max-w-[90%]">
                Speak with our furnishing experts to plan, style, and optimize
                your room with the right package and pieces.
              </p>

              <div>
                <Button className="rounded-full cursor-pointer bg-[#412A1F] hover:bg-[#2D1A12] text-white flex items-center gap-6 pr-1.5 pl-6 h-12 text-[13px] font-normal transition-all shadow-none border-none group">
                  Book Now
                  <div className="bg-white rounded-full p-1.5 text-[#412A1F] transition-transform group-hover:scale-105">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </Button>
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
