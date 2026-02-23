"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedNumber } from "@/components/ui/animated-number";

const HeroSection = () => {
  const stats = [
    {
      value: 500,
      suffix: "+",
      label: "PROPERTIES FURNISHED",
    },
    {
      value: 98,
      suffix: "%",
      label: "CLIENT SATISFACTION",
    },
    {
      value: 3,
      value2: 6,
      label: "WEEKS AVERAGE DELIVERY",
    },
  ];

  return (
    <section className="relative min-h-screen w-full flex flex-col">
      {/* Background Image Container */}
      <div className="relative h-[85vh] w-full">
        <Image
          src="/home/hero-image.webp"
          alt="Modern Interior Design"
          fill
          className="object-cover object-center"
          priority
        />

        {/* Glassmorphism Card Wrapper */}
        <div className="absolute inset-0 flex items-center justify-center p-2 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-5xl w-full bg-white/70 backdrop-blur-[2px] border border-white/40 rounded-[2.5rem] sm:pt-15 sm:pb-4 px-10 pt-20 pb-6 text-center space-y-2 lg:space-y-10 shadow-[0_25px_60px_rgba(0,0,0,0.1)] flex flex-col items-center">
            {/* Top Badge Overlay */}
            <div className="absolute top-9 left-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center gap-3 px-8 py-3 bg-white border border-black/5 shadow-[0_4px_15px_rgba(0,0,0,0.05)] rounded-none z-10 whitespace-nowrap">
              <span className="text-primary font-bold text-base">•</span>
              <span className="text-[10px] tracking-[0.4em] font-bold text-muted-foreground/60 uppercase">
                Turnkey Furnishing Solutions
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-[96px] font-serif font-semibold text-primary leading-28 tracking-tight ">
              Turnkey Furnishing <br />{" "}
              <span className="text-primary/60 font-serif font-semibold text-[96px]">
                & Fit-Out
              </span>
            </h1>

            {/* Subheading */}
            <p className="max-w-2xl text-xl md:text-2xl text-primary font-bold tracking-tight leading-relaxed">
              For investors, homeowners, and developers in the UAE
            </p>

            {/* Feature Boxes */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              {[
                "On-Time Delivery",
                "Clear Pricing",
                "End-to-End Management",
              ].map((label) => (
                <div
                  key={label}
                  className="px-10 py-4 bg-white/80 border border-black/5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] text-[11px] font-bold tracking-tight text-primary/80">
                  {label}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto">
              <Button className="w-full cursor-pointer sm:w-80 bg-primary hover:bg-primary/90 text-primary-foreground rounded-none py-8 text-sm font-bold tracking-wide flex items-center justify-center gap-3 group transition-all duration-300 shadow-2xl">
                Book Consultation
                <MoveRight className="h-5 w-5 transition-transform group-hover:translate-x-1.5" />
              </Button>
              <Button
                variant="outline"
                className="w-full cursor-pointer sm:w-80 border border-black/5 bg-white/80 backdrop-blur-sm hover:bg-white hover:text-primary/20 text-primary font-bold rounded-none py-8 text-sm tracking-wide transition-all duration-300 shadow-xl">
                View Packages
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="w-full bg-[#fdfcf9] py-6 border-t border-primary/5">
        <div className="w-full px-4 sm:px-10 lg:px-20 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className={`flex flex-col items-center ${
                  idx === 0
                    ? "md:items-center"
                    : idx === 2
                      ? "md:items-center"
                      : "md:items-center"
                } text-center ${idx === 0 ? "md:text-center" : idx === 2 ? "md:text-center" : ""}`}>
                <div className="text-4xl md:text-5xl lg:text-6xl font-sans font-extralight text-primary/80 tracking-tighter flex items-center leading-tight">
                  {stat.value2 ? (
                    <div className="flex items-center">
                      <AnimatedNumber value={stat.value} />
                      <span className="mx-0.5 opacity-30 font-thin">-</span>
                      <AnimatedNumber value={stat.value2} />
                    </div>
                  ) : (
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  )}
                </div>
                <div className="text-[8px] md:text-[9px] font-bold tracking-[0.2em] text-muted-foreground/40 uppercase font-sans mt-0.5">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
