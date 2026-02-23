"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutHeroSection() {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/about/about-hero.webp"
          alt="About Us"
          fill
          className="object-cover object-center"
          priority
          quality={100}
        />
      </div>

      {/* Centered Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white font-normal tracking-wide">
          About Us
        </h1>
      </motion.div>
    </section>
  );
}
