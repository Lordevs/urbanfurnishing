"use client";

import { motion } from "framer-motion";

const WhoWeServe = () => {
  return (
    <section className="w-full py-16 md:py-24 flex flex-col items-center justify-center text-center">
      <div className="max-w-3xl px-6 md:px-12 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6">
          {/* Top Badge label */}
          <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-[#B2A081] uppercase font-sans mb-4 block">
            WHO WE SERVE
          </span>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#6b6256] font-light mb-6">
            Built for the UAE Market
          </h2>

          {/* Paragraph */}
          <p className="text-[13.5px] md:text-[15px] leading-relaxed text-[#b1a798] font-light font-sans max-w-2xl mx-auto">
            Our structured packages are specifically designed for the Dubai and
            UAE property market, serving investors looking for rental-ready
            units, homeowners seeking personalised interiors, and developers
            needing scalable solutions.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoWeServe;
