"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    title: "Consultation",
    description:
      "We understand your vision, budget, and timeline to create a tailored plan.",
    icon: "/landing/home/how-we-work/consultation.svg",
  },
  {
    title: "Design Selection",
    description:
      "Our team curates furniture and finishes that match your aesthetic and needs.",
    icon: "/landing/home/how-we-work/design-selection.svg",
  },
  {
    title: "Delivery Install",
    description:
      "Professional installation with attention to every detail, on schedule.",
    icon: "/landing/home/how-we-work/delivery-install.svg",
  },
  {
    title: "After Care",
    description:
      "Ongoing support and warranty coverage for complete peace of mind.",
    icon: "/landing/home/how-we-work/after-care.svg",
  },
];

export default function HowWeWork() {
  return (
    <section id="how-we-work" className="py-24 bg-card overflow-hidden">
      <div className="max-w-8xl mx-auto px-4 sm:px-10 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          {/* Left Column */}
          <div className="lg:w-[45%] w-full relative">
            <div className="relative z-20 mb-12">
              <h2 className="text-[32px] sm:text-[42px]  font-medium tracking-tight text-[#1a1a1a] mb-6">
                How We <span className="text-[#C9A76A]">Work</span>
              </h2>

              <Button className="rounded-full bg-[#412A1F] hover:bg-[#2D1A12] text-white flex items-center gap-6 pr-1.5 pl-6 h-10 text-[12px] font-normal transition-all shadow-none border-none">
                Get In Touch
                <div className="bg-white rounded-full p-1 text-[#412A1F]">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </Button>
            </div>

            <div className="relative mt-8 sm:mt-12 lg:mt-16">
              {/* "Approach" Background Text */}
              <div className="absolute top-0 lg:-top-[25px] left-0 select-none pointer-events-none z-0 opacity-[0.06]">
                <p className="text-[#B37531] text-[80px] sm:text-[130px] lg:text-[120px] font-semibold tracking-normal leading-none">
                  Approach
                </p>
              </div>

              {/* Main Image */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-20 pt-15 rounded-[16px] overflow-hidden w-full">
                <div className="aspect-[1.5] relative w-full">
                  <Image
                    src="/landing/home/how-we-work/work-img.webp"
                    alt="How We Work"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column - Steps */}
          <div className="lg:w-[55%] w-full flex flex-col justify-center mt-8 lg:mt-0">
            <div className="divide-y divide-[#F0EAE3]">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="py-10 first:pt-0 last:pb-0 flex items-start gap-8 group">
                  <div className="relative shrink-0 mt-0.5">
                    <div className="w-[60px] h-[60px] rounded-full bg-[#F5EFE9] flex items-center justify-center">
                      <Image
                        src={step.icon}
                        alt={step.title}
                        width={30}
                        height={30}
                        className="w-[30px] h-[30px] object-contain"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 pt-1 sm:pt-2">
                    <h3 className="text-[18px] sm:text-[20px] font-medium tracking-tight text-[#1a1a1a]">
                      {step.title}
                    </h3>
                    <p className="text-[#A3A3A3] text-[13px] sm:text-[13px] leading-[1.8] tracking-wide max-w-[95%] font-light">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
