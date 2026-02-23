"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    number: "01",
    title: "We Review Your Inquiry",
    description:
      "Our team reviews your message and property details within 24 hours.",
  },
  {
    number: "02",
    title: "Schedule a Consultation",
    description:
      "We arrange a call or meeting to discuss your specific requirements and timeline.",
  },
  {
    number: "03",
    title: "Receive Your Proposal",
    description:
      "Get a detailed proposal with package recommendation, pricing, and project timeline.",
  },
];

const WhatHappensNext = () => {
  return (
    <section className="w-full py-24">
      <div className="w-full px-4 sm:px-10 lg:px-16 mx-auto flex flex-col items-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#f4f1eb] border border-[#e8e4db] text-[9px] md:text-[10px] font-bold tracking-widest text-[#9A8C7A] uppercase font-sans mb-8 md:mb-10">
          <span className="w-1 h-1 rounded-full bg-[#9A8C7A]" />
          WHAT HAPPENS NEXT
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-[54px] font-serif text-[#6b5c4a] leading-tight mb-16 md:mb-20 font-light text-center">
          Your Journey With Us
        </motion.h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl">
          {steps.map((item, index) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}>
              <Card className="bg-[#f6f5f1] gap-0 py-0 border-none rounded-none shadow-none h-full relative overflow-hidden group">
                <CardContent className="p-8 md:p-10 flex flex-col space-y-6 h-full min-h-[300px]">
                  {/* Small Circle Number */}
                  <div className="w-10 h-10 rounded-full border border-[#d2cab9] flex items-center justify-center shrink-0 bg-[#ebe6df]">
                    <span className="text-[14px] text-[#8e8578] font-medium">
                      {item.number}
                    </span>
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col space-y-4 z-10 relative grow">
                    <h3 className="text-xl md:text-[22px] text-[#6b6256] tracking-wide font-light">
                      {item.title}
                    </h3>
                    <div className="w-12 h-px bg-[#d2cab9]" />
                    <p className="text-[14px] md:text-[15px] leading-relaxed text-[#a89f91] font-light max-w-[90%]">
                      {item.description}
                    </p>
                  </div>

                  {/* Large Background Number */}
                  <div className="absolute top-16 -translate-y-1/2 right-4 md:right-8 z-0 pointer-events-none select-none">
                    <span className="text-[90px] font-sans font-extralight text-[#9a8c7a] opacity-[0.05]">
                      {item.number}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatHappensNext;
