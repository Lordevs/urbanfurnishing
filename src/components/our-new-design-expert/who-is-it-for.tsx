"use client";

import { motion } from "framer-motion";

const audiences = [
  {
    number: "01",
    title: "Investors",
    description: "Who want a stronger rental impression and better performance",
  },
  {
    number: "02",
    title: "End-users",
    description: "Who want a refined, finished home",
  },
  {
    number: "03",
    title: "Developers",
    description: "Furnishing premium units or show apartments",
  },
  {
    number: "04",
    title: "Overseas owners",
    description: "Who need trusted on-ground design direction",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function WhoIsItFor() {
  return (
    <section className="py-24 lg:py-36 px-4 sm:px-10 lg:px-16 bg-[#FDFBF9] overflow-hidden">
      <div className="max-w-8xl mx-auto">
        <div className="text-center mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-[56px] font-serif font-medium text-[#1A1A1A] tracking-tight leading-[1.1]">
              Who this{" "}
              <span className="text-[#C9A76A] font-serif italic">Service</span>{" "}
              is for
            </h2>
            <div className="mt-8 w-16 h-px bg-[#C9A76A]/40 mx-auto" />
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10"
        >
          {audiences.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{ y: -10 }}
              className="group relative bg-white border border-[#F0EBE6] p-10 lg:p-12 rounded-[24px] flex flex-col items-center text-center gap-6 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:border-[#E8DFC9] overflow-hidden"
            >
              {/* Decorative Background Number */}
              <span className="absolute top-6 right-8 text-[80px] font-serif font-bold text-[#C9A76A]/5 select-none pointer-events-none group-hover:text-[#C9A76A]/10 transition-colors">
                {item.number}
              </span>

              {/* Icon Container */}
              <div className="relative z-10 w-12 h-12 rounded-full border border-[#F0EBE6] flex items-center justify-center transition-colors group-hover:border-[#C9A76A]/30">
                <div className="w-2 h-2 rounded-full bg-[#C9A76A]" />
              </div>

              <div className="relative z-10 flex flex-col gap-4">
                <h3 className="text-2xl md:text-[28px] font-serif font-medium text-[#412A1F] tracking-tight">
                  {item.title}
                </h3>
                <p className="text-[#8F877C] text-[16px] leading-[1.6] font-light tracking-wide">
                  {item.description}
                </p>
              </div>

              {/* Bottom Accent */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#C9A76A] transition-all duration-500 group-hover:w-full rounded-b-[24px]" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
