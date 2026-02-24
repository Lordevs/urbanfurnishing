"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MoveRight, CheckCircle2, Component } from "lucide-react";

const features = [
  {
    num: "01",
    text: "One dedicated site lead",
  },
  {
    num: "02",
    text: "Clear milestones and checkpoints",
  },
  {
    num: "03",
    text: "Defined scope, no surprises",
  },
  {
    num: "04",
    text: "Post-handover support",
  },
];

const SignatureDesign = () => {
  return (
    <section className="bg-white py-16 md:py-32 overflow-hidden">
      <div className="w-full px-4 sm:px-10 lg:px-20 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col space-y-8">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#f8f5f0] self-start border border-[#e8e6df]">
              <Component className="w-3.5 h-3.5 text-[#8e8578]" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#8e8578] uppercase font-sans">
                SIGNATURE DESIGN
              </span>
            </div>

            {/* Heading & Line */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#5c4d3d] leading-tight">
                Led by Elena Falconer
              </h2>
              <div className="w-16 h-px bg-[#5c4d3d]/30" />
            </div>

            {/* Paragraph */}
            <p className="text-base md:text-lg leading-relaxed text-[#5c4d3d]/80 font-sans max-w-lg">
              UH Furnishing blends investor-focused efficiency with elevated
              design thinking. With more than a decade of experience delivering
              refined interiors for international clients across Europe, Elena
              ensures each project balances speed, quality, and long-term value.
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 md:mt-4">
              {features.map((feature) => (
                <div
                  key={feature.num}
                  className="relative p-6 bg-[#fdfaf6] border border-[#f3efe8] flex flex-col pt-8">
                  {/* Faint Number Offset */}
                  <span className="absolute top-2 right-4 text-[64px] font-sans font-extralight text-[#635647]/5 leading-none select-none pointer-events-none">
                    {feature.num}
                  </span>

                  {/* Icon */}
                  <div className="mb-4">
                    <CheckCircle2
                      className="w-4 h-4 text-[#8e8578]"
                      strokeWidth={2}
                    />
                  </div>

                  {/* Divider Line inside the block */}
                  <div className="w-6 h-px bg-[#5c4d3d]/20 mb-4" />

                  {/* Feature Text */}
                  <p className="text-[13px] font-medium text-[#5c4d3d]/80 font-sans pr-4 relative z-10 leading-relaxed">
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Link */}
            <div className="pt-4">
              <Link
                href="#"
                className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.25em] text-[#5c4d3d] uppercase hover:opacity-70 transition-opacity">
                EXPLORE SIGNATURE DESIGN{" "}
                <MoveRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
          </motion.div>

          {/* Right Column - Image with Decorators */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative lg:ml-10 hidden lg:block">
            {/* Top-Left Border Decorator */}
            <div className="absolute -top-6 -left-6 md:-top-8 md:-left-8 w-16 h-16 md:w-24 md:h-24 border-t border-l border-[#dcd7ce] z-0" />

            {/* Bottom-Right Border Decorator */}
            <div className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 w-16 h-16 md:w-24 md:h-24 border-b border-r border-[#dcd7ce] z-0" />

            {/* Image Wrapper */}
            <div className="relative z-10 w-full aspect-4/5 rounded-[0.8rem] overflow-hidden bg-transparent shadow-xl">
              <Image
                src="/home/signature-design.webp"
                alt="Elena Falconer"
                fill
                className="object-cover scale-[1.15]"
                quality={95}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SignatureDesign;
