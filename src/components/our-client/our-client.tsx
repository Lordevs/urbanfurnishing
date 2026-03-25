"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const clients = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  src: `/landing/home/our-client/client-${i + 1}.webp`,
  alt: `Client ${i + 1}`,
}));

export default function OurClient() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-8xl mx-auto px-4 sm:px-10 lg:px-16">
        <div className="text-center mb-12 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-serif font-semibold text-[#1a1a1a] tracking-tight mb-4">
            Our <span className="text-[#C9A76A]">Valued</span> Clients
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm md:text-base text-[#8F877C]">
            Proud to collaborate with some of the most respected names across
            industries.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12 items-center justify-items-center">
          {clients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="w-full flex justify-center items-center p-2">
              <div className="relative w-[140px] h-[90px] sm:w-[160px] sm:h-[100px] lg:w-[180px] lg:h-[110px]">
                <Image
                  src={client.src}
                  alt={client.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                  className="object-contain"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
