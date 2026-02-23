"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const differences = [
  "Consultation-first approach to match you with the right package",
  "Fixed-price packages with no hidden costs",
  "Dedicated site lead for every project",
  "UAE-focused with deep market knowledge",
  "Post-handover support included",
  "Scalable solutions from single units to bulk developments",
];

const OurApproach = () => {
  return (
    <section className="w-full py-20">
      <div className="max-w-6xl px-4 md:px-12 mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full aspect-square md:aspect-4/5 lg:aspect-square overflow-hidden">
            <Image
              src="/about/our-approach.webp"
              alt="Our Approach"
              fill
              className="object-cover"
              quality={95}
            />
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col space-y-8 lg:pl-4">
            <h2 className="text-4xl md:text-5xl lg:text-[44px] tracking-wide font-serif text-[#6b5c4a] font-light mb-4">
              Why We&apos;re Different
            </h2>

            <div className="flex flex-col">
              {differences.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="group flex flex-col">
                  <div className="flex items-start gap-4 py-5 md:py-6 relative">
                    <span className="text-[#9A8C7A] text-[18px] leading-none mt-0.5">
                      &bull;
                    </span>
                    <p className="text-[13px] md:text-[14.5px] text-[#8e8578] font-light leading-snug">
                      {item}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurApproach;
