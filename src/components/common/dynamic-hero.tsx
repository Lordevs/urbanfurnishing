"use client";

import { motion } from "framer-motion";

interface PageHeroProps {
  badgeText: string;
  title: React.ReactNode;
  description: React.ReactNode;
}

const DynamicHero = ({ badgeText, title, description }: PageHeroProps) => {
  return (
    <section className="w-full bg-[#F7F3ED] py-32 flex flex-col items-center justify-center text-center">
      <div className="max-w-3xl px-6 md:px-12 mx-auto flex flex-col items-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#f4f1eb] border border-[#e8e4db] text-[9px] md:text-[10px] font-bold tracking-[0.2em] md:tracking-[0.25em] text-[#9A8C7A] uppercase font-sans mb-8 md:mb-10">
          <span className="w-1 h-1 rounded-full bg-[#8B7355]" />
          {badgeText}
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-[86px] font-serif text-[#6b5c4a] leading-tight mb-8 md:mb-10 lg:mb-12 font-light">
          {title}
        </motion.h1>

        {/* Decorative Separator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-4 opacity-50 mb-8 md:mb-10">
          <div className="h-px w-8 md:w-16 bg-[#b2a081]" />
          <div className="w-1.5 h-1.5 rotate-45 bg-[#b2a081]" />
          <div className="h-px w-8 md:w-16 bg-[#b2a081]" />
        </motion.div>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-[15px] md:text-[18px] text-[#9A8C7A] font-light font-sans max-w-xl leading-relaxed mx-auto">
          {description}
        </motion.p>
      </div>
    </section>
  );
};

export default DynamicHero;
