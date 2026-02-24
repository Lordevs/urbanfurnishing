"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROUTES } from "@/constants/route";
import { motion } from "framer-motion";

interface CtaSectionProps {
  badgeText?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function CtaSection({
  badgeText = "START YOUR PROJECT",
  title = "Ready to Get Started?",
  description = "Book a consultation to discuss your property and furnishing needs",
  buttonText = "Book Consultation",
  buttonLink = ROUTES.CONTACT,
}: CtaSectionProps) {
  return (
    <section className="relative w-full min-h-[600px] flex items-center justify-center py-16 md:py-24">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10 bg-[#4a3f35]">
        <Image
          src="/common/cta.webp"
          alt="Call to action background"
          fill
          className="object-cover object-center opacity-85"
          quality={100}
        />
      </div>

      {/* Glassmorphism Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-[90%] max-w-4xl mx-auto flex flex-col items-center justify-center px-4 sm:px-6 py-16 md:py-20 bg-white/10 backdrop-blur-[px] border border-white/20 text-white text-center shadow-sm">
        {/* Top Badge */}
        <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 border border-white/40 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-[#ebe6df] font-sans">
          <span className="w-1 h-1 rounded-full bg-[#ebe6df]" />
          {badgeText}
        </div>

        {/* Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] mb-8 font-light text-white leading-tight">
          {title}
        </h2>

        {/* Short Line */}
        <div className="w-16 h-px bg-white/40 mb-8" />

        {/* Subtitle */}
        <p className="font-light text-[14px] md:text-[15px] text-white/90 max-w-lg mx-auto mb-10 tracking-wide leading-relaxed">
          {description}
        </p>

        {/* Button */}
        <Link href={buttonLink}>
          <Button className="bg-white cursor-pointer hover:bg-[#f6f5f1] text-[#5D4E3C] border-none rounded-none w-[250px] py-5 h-auto text-[13px] font-medium tracking-wide flex items-center gap-2 transition-colors duration-300">
            {buttonText} <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}
