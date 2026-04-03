"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "We understand the property, the client and the objective",
  },
  {
    number: "02",
    title: "Design Direction",
    description: "Mood board, layout thinking and aesthetic concept",
  },
  {
    number: "03",
    title: "Selection",
    description: "Furniture, finishes and elements defined and approved",
  },
  {
    number: "04",
    title: "Installation",
    description: "Full setup managed with final styling oversight",
  },
];

export default function HowItWorksSteps() {
  return (
    <section className="py-20 lg:py-28 px-4 sm:px-10 lg:px-16 overflow-hidden">
      <div className="max-w-8xl mx-auto">
        <div className="mb-16 md:mb-24">
          <h2 className="text-4xl md:text-[56px] font-serif font-medium text-primary tracking-tight leading-[1.1] mb-6 text-center">
            How it{" "}
            <span className="text-secondary font-serif italic">Works</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 relative">
          {/* Connector Line for Desktop */}
          <div className="hidden lg:block absolute top-[25px] left-0 w-full h-px bg-[#F0EBE6] z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative z-10 flex flex-col gap-6 items-center justify-center md:items-start md:justify-start">
              <div className="w-12 h-12 rounded-full bg-white border-2 border-[#C9A76A] flex items-center justify-center text-[#C9A76A] font-serif font-bold text-lg shadow-sm">
                {step.number}
              </div>
              <div className="flex flex-col gap-3 text-center md:text-left">
                <h3 className="text-xl md:text-[22px] font-serif font-semibold text-[#412A1F]">
                  {step.title}
                </h3>
                <p className="text-[#8F877C] text-[15px] leading-relaxed font-light tracking-wide max-w-[220px]">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
