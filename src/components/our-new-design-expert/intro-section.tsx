"use client";

import { motion } from "framer-motion";

export default function IntroSection() {
  return (
    <section className="py-24 sm:py-32 px-4 sm:px-10 lg:px-16  overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-8 md:gap-12">
          <h2 className="text-[26px] md:text-[44px] font-serif font-medium leading-[1.3] text-primary tracking-tight">
            Design Signature is UH Furnishing’s{" "}
            <span className="text-secondary font-serif italic">
              elevated design offering
            </span>
            , led by Elena Falconer for investors, end-users and developers who
            want their property to feel considered, complete and{" "}
            <span className="text-secondary font-serif italic">
              commercially strong
            </span>
            .
          </h2>

          <div className="w-20 h-px bg-secondary/30 mx-auto" />

          <p className="text-muted-foreground text-base md:text-[22px] font-light leading-relaxed max-w-3xl mx-auto tracking-wide">
            This is not standard furnishing. It is a tailored design direction
            built around the property, the client and the intended outcome.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
