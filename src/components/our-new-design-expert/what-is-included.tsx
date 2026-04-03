"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";

const inclusions = [
  "Discovery consultation with Elena",
  "Design direction and space planning",
  "Mood board and visual concept",
  "Furniture, lighting and accessory selection",
  "Material and finish guidance",
  "Bespoke joinery recommendations",
  "Procurement coordination",
  "Final styling and setup review",
];

export default function WhatIsIncluded() {
  return (
    <section className="py-24 lg:py-36 overflow-hidden">
      <div className="max-w-8xl mx-auto px-4 sm:px-10 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          {/* Left Column: Content Area */}
          <div className="lg:w-1/2 w-full">
            <div className="mb-12">
              <h2 className="text-4xl md:text-[56px] font-serif font-medium text-[#1A1A1A] tracking-tight leading-[1.1] mb-6">
                What is{" "}
                <span className="text-secondary font-serif italic">
                  Included
                </span>
              </h2>
              <p className="text-primary text-lg font-light leading-relaxed max-w-lg mb-10">
                A comprehensive approach to interior design, from initial
                concept to final installation oversight.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 lg:gap-y-8">
              {inclusions.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="flex items-start gap-4 group">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#FDF8F0] border border-[#F0EBE6] shrink-0 mt-0.5 transition-all group-hover:bg-[#C9A76A] group-hover:border-[#C9A76A]">
                    <Check
                      className="w-3.5 h-3.5 text-[#C9A76A] transition-colors group-hover:text-white"
                      strokeWidth={3}
                    />
                  </div>
                  <span className="text-[#412A1F] text-[16px] lg:text-[17px] font-medium tracking-tight leading-tight group-hover:text-[#C9A76A] transition-colors">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 pt-8 border-t border-[#F0EBE6]">
              <p className="text-sm italic text-[#8F877C]">
                * Bespoke joinery and procurement services are tailored to
                individual project requirements.
              </p>
            </div>
          </div>

          {/* Right Column: Image Area */}
          <div className="lg:w-1/2 w-full relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-4/5 sm:aspect-4/3 rounded-[32px] overflow-hidden shadow-2xl">
              <Image
                src="/landing/our-new-design-expert/design-direction-3.webp"
                alt="Bespoke Design Inclusion"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
            </motion.div>

            {/* Background Accent */}
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-[#FDFBF9] rounded-full -z-10 blur-3xl opacity-60" />
          </div>
        </div>
      </div>
    </section>
  );
}
