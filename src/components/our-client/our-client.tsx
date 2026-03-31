"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { Marquee, MarqueeContent, MarqueeItem } from "@/components/ui/marquee";

const clients = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  src: `/landing/home/our-client/client-${i + 1}.webp`,
  alt: `Client ${i + 1}`,
}));

const firstRow = clients;
const secondRow = [...clients].reverse();

export default function OurClient() {
  return (
    <section className="py-16 lg:pb-24 pt-8">
      <div className="max-w-8xl mx-auto px-4 sm:px-10 lg:px-16">
        <div className="text-center mb-12 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-serif font-semibold text-[#1a1a1a] tracking-tight mb-4"
          >
            Our <span className="text-[#C9A76A]">Valued</span> Clients
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm md:text-base text-[#8F877C]"
          >
            Proud to collaborate with some of the most respected names across
            industries.
          </motion.p>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee className="relative">
            <MarqueeContent pauseOnHover autoFill speed={40}>
              {firstRow.map((client) => (
                <MarqueeItem key={client.id} className="px-6 sm:px-10">
                  <div className="relative w-[140px] h-[90px] sm:w-[160px] sm:h-[100px] lg:w-[180px] lg:h-[110px]">
                    <Image
                      src={client.src}
                      alt={client.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                      className="object-contain"
                    />
                  </div>
                </MarqueeItem>
              ))}
            </MarqueeContent>
          </Marquee>

          <Marquee className="relative mt-4 sm:mt-8">
            <MarqueeContent direction="right" pauseOnHover autoFill speed={40}>
              {secondRow.map((client) => (
                <MarqueeItem key={client.id} className="px-6 sm:px-10">
                  <div className="relative w-[140px] h-[90px] sm:w-[160px] sm:h-[100px] lg:w-[180px] lg:h-[110px]">
                    <Image
                      src={client.src}
                      alt={client.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                      className="object-contain"
                    />
                  </div>
                </MarqueeItem>
              ))}
            </MarqueeContent>
          </Marquee>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-white to-transparent dark:from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-white to-transparent dark:from-background"></div>
        </div>
      </div>
    </section>
  );
}
