"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export interface StepEvenProps {
  stepNumber: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  features: string[];
}

const Stepeven = ({
  stepNumber,
  title,
  description,
  imageSrc,
  imageAlt,
  features,
}: StepEvenProps) => {
  return (
    <section className="w-full mx-auto px-4 sm:px-10 lg:px-16 my-12 md:my-20">
      <div className="w-full bg-[#F7F3ED] py-12 md:py-20 px-6 sm:px-12 lg:px-20 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* Left Column: Content */}
        <div className="flex flex-col space-y-8 order-2 lg:order-1 lg:pr-10">
          {/* Badge & Heading Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6">
            {/* Step Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#ebe6df] border border-[#e0d9d0] text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-[#9A8C7A] uppercase font-sans">
              <span className="w-1 h-1 rounded-full bg-[#827159]" />
              STEP {stepNumber}
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-serif text-[#6b6256] font-light leading-tight">
              {title}
            </h2>

            {/* Separator Line */}
            <div className="w-16 h-px bg-[#8e8578] opacity-60" />

            <p className="text-[14px] md:text-[18px] max-w-[600px] leading-relaxed text-[#9a8c7a] font-light">
              {description}
            </p>
          </motion.div>

          {/* Features List */}
          <div className="flex flex-col space-y-3 pt-2">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="w-full bg-[#F7F3ED] py-7 px-6 max-w-[700px] flex items-center gap-4 border border-[#8B7355]/30">
                {/* Check Circle */}
                <div className="w-6 h-6 rounded-full border border-[#8B7355] flex items-center justify-center shrink-0 bg-[#f4ebd9]/30">
                  <Check
                    className="w-3.5 h-3.5 text-[#a89b88]"
                    strokeWidth={2.5}
                  />
                </div>
                <span className="text-[15px] md:text-[16px] text-[#8e8578] font-light">
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Image with Decorative Borders */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative pl-6 pt-6 pr-6 pb-6 w-full mx-auto lg:max-w-none order-1 lg:order-2">
          {/* Top-Left Corner Decoration */}
          <div className="absolute top-0 left-0 w-16 md:w-24 h-16 md:h-24 border-t border-l border-[#dcd7ce]" />

          {/* Bottom-Right Corner Decoration */}
          <div className="absolute bottom-0 right-0 w-16 md:w-24 h-16 md:h-24 border-b border-r border-[#dcd7ce]" />

          {/* Image Container */}
          <div className="relative aspect-4/3 w-full overflow-hidden">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              quality={100}
            />
          </div>

          {/* Floating Badge */}
          <div className="absolute right-11 top-11 lg:top-15 lg:right-15 z-10 lg:w-14 lg:h-14 w-8 h-8 rounded-full bg-[#8B7355] backdrop-blur-sm shadow flex items-center justify-center translate-x-1/2 -translate-y-1/2">
            <span className="text-white font-serif text-lg md:text-xl">
              {stepNumber}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Stepeven;
