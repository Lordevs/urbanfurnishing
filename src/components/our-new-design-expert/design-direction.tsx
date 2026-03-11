"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const BASE = "/landing/our-new-design-expert";

export default function DesignDirection() {
  return (
    <section className="w-full py-20 px-4 sm:px-10 lg:px-16 max-w-8xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-[46px] font-serif font-bold tracking-tight text-[#000000] mb-3 sm:mb-4">
          Design Direction
        </h2>
        <p className="text-[#000000]/50 text-[15px] sm:text-[18px] font-light max-w-lg mx-auto leading-[1.7]">
          Explore our diverse portfolio of design styles and find
          <br className="hidden sm:block" /> the perfect aesthetic for your
          space
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:gap-5">
        {/* TOP BLOCK */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 w-full items-stretch">
          {/* Left large */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[42%] relative rounded-[20px] sm:rounded-[24px] overflow-hidden min-h-[350px] sm:min-h-[450px] lg:min-h-0">
            <Image
              src={`${BASE}/design-direction-1.webp`}
              alt="Design Direction 1"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </motion.div>

          {/* Right staggered grid */}
          <div className="w-full lg:w-[58%] flex gap-4 sm:gap-5 min-h-[400px] sm:min-h-[500px] lg:min-h-[640px]">
            {/* Col 1 */}
            <div className="flex-1 flex flex-col gap-4 sm:gap-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative rounded-[20px] sm:rounded-[24px] overflow-hidden flex-[0.43] w-full">
                <Image
                  src={`${BASE}/design-direction-2.webp`}
                  alt="Design Direction 2"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative rounded-[20px] sm:rounded-[24px] overflow-hidden flex-[0.57] w-full">
                <Image
                  src={`${BASE}/design-direction-4.webp`}
                  alt="Design Direction 4"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            </div>

            {/* Col 2 */}
            <div className="flex-1 flex flex-col gap-4 sm:gap-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="relative rounded-[20px] sm:rounded-[24px] overflow-hidden flex-[0.57] w-full">
                <Image
                  src={`${BASE}/design-direction-3.webp`}
                  alt="Design Direction 3"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="relative rounded-[20px] sm:rounded-[24px] overflow-hidden flex-[0.43] w-full">
                <Image
                  src={`${BASE}/design-direction-5.webp`}
                  alt="Design Direction 5"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* BOTTOM BLOCK */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {[
            {
              src: `${BASE}/design-direction-6.webp`,
              alt: "Design Direction 6",
              delay: 0.3,
            },
            {
              src: `${BASE}/design-direction-7.webp`,
              alt: "Design Direction 7",
              delay: 0.35,
            },
            {
              src: `${BASE}/design-direction-8.webp`,
              alt: "Design Direction 8",
              delay: 0.4,
            },
          ].map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: img.delay }}
              className="relative rounded-[20px] sm:rounded-[24px] overflow-hidden w-full h-[240px] sm:h-[240px] lg:h-[300px]">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
