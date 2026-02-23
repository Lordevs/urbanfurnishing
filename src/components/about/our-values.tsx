"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const values = [
  {
    title: "Clarity",
    description:
      "Transparent pricing, clear timelines, and defined deliverables at every stage.",
  },
  {
    title: "Speed",
    description:
      "Structured processes designed for efficient delivery without compromising quality.",
  },
  {
    title: "Accountability",
    description:
      "One point of contact, measurable milestones, and responsibility that extends beyond installation.",
  },
  {
    title: "Quality",
    description:
      "Rigorous quality control and carefully curated suppliers ensure consistent results.",
  },
];

const OurValues = () => {
  return (
    <section className="w-full py-20 flex flex-col items-center">
      <div className="px-4 md:px-12 mx-auto w-full">
        {/* Intro Text block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 max-w-4xl mx-auto space-y-8 px-2 md:px-0">
          <p className="text-xl md:text-2xl lg:text-[26px] leading-relaxed text-[#9A8C7A] font-light">
            UH Furnishing is a turnkey furnishing and fit-out company built for
            the UAE property market. We work with investors, homeowners, and
            developers who need clarity, speed, and accountability.
          </p>
          <p className="text-sm md:text-[15px] leading-relaxed text-[#B2A081] font-light max-w-[95%]">
            Instead of overwhelming you with endless options, we&apos;ve created
            three structured package pathways. Each one is designed for a
            specific client type and property use, with transparent pricing and
            defined deliverables. This is furnishing made simple, predictable,
            and accountable.
          </p>
        </motion.div>

        {/* Values Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-6xl mx-auto">
          <Card className="bg-[#F0E9DD] py-0 gap-0 border-none rounded-none shadow-none">
            <CardContent className="px-8 md:px-16 py-16 md:py-24">
              <div className="text-center mb-16 md:mb-20">
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#B2A081] uppercase font-sans mb-4 block">
                  OUR VALUES
                </span>
                <h2 className="text-4xl md:text-5xl font-serif text-[#6b5c4a] font-light">
                  What We Stand For
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="flex flex-col space-y-4">
                    <h3 className="text-[22px] md:text-[26px] text-[#6b6256] tracking-wide font-light">
                      {value.title}
                    </h3>
                    <p className="text-[13px] md:text-[14px] leading-relaxed text-[#b1a798] font-light pr-4">
                      {value.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default OurValues;
