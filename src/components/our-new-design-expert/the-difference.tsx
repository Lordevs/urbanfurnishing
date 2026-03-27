"use client";

import { motion } from "framer-motion";

export default function TheDifference() {
  return (
    <section className="py-24 sm:py-32 bg-[#1A1A1A] text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-10 md:gap-14"
        >
          <div className="flex flex-col gap-4">
            <span className="text-[#C9A76A] text-xs md:text-sm font-bold tracking-[0.2em] uppercase">
              The Design Signature difference
            </span>
            <h2 className="text-[32px] md:text-[56px] font-serif font-medium leading-[1.2] tracking-tight max-w-4xl">
              A standard furnishing package makes a property functional.{" "}
              <span className="text-[#C9A76A] font-serif italic">Design Signature makes it intentional.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-end">
            <p className="text-[18px] md:text-[24px] font-light leading-relaxed text-white/80 max-w-2xl">
              The difference is in the decisions that define how a space is
              experienced: layout, proportion, lighting, materials, storage, and
              visual balance.
            </p>
            <div className="flex flex-col gap-6">
               <div className="h-px w-full bg-white/10" />
               <p className="text-[20px] md:text-[28px] font-serif font-medium text-[#C9A76A]">
                  The result is a property that feels complete, not assembled.
               </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
