"use client";

import { motion } from "framer-motion";
import { Sparkles, Users, Clock, Shield, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const commitments = [
  {
    number: "01",
    icon: Users,
    title: "One Site Lead",
    description: "Single point of contact from consultation to handover",
  },
  {
    number: "02",
    icon: Clock,
    title: "Clear Milestones",
    description: "Transparent timeline with defined checkpoints",
  },
  {
    number: "03",
    icon: Shield,
    title: "Defined Scope",
    description: "Everything documented upfront, no surprises",
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "Quality Control",
    description: "Rigorous checks at every stage of delivery",
  },
];

const OurCommitment = () => {
  return (
    <section className="w-full mx-auto bg-[#F0E9DD]/20 py-20 my-24">
      <div className="w-full px-4 sm:px-10 lg:px-16 mx-auto flex flex-col items-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#f4f1eb] border border-[#e8e4db] text-[9px] md:text-[10px] font-bold tracking-[0.2em] md:tracking-[0.25em] text-[#9A8C7A] uppercase font-sans mb-8 md:mb-10">
          <Sparkles className="w-3 h-3 text-[#9A8C7A]" />
          OUR COMMITMENT
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-[54px] font-serif text-[#6b5c4a] leading-tight mb-8 md:mb-10 font-light text-center">
          Design + Execution + Accountability
        </motion.h2>

        {/* Decorative Separator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-4 opacity-50 mb-16 md:mb-20">
          <div className="h-px w-8 md:w-16 bg-[#b2a081]" />
          <div className="w-1.5 h-1.5 rotate-45 bg-[#b2a081]" />
          <div className="h-px w-8 md:w-16 bg-[#b2a081]" />
        </motion.div>

        {/* Commitments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 w-full">
          {commitments.map((item, index) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}>
              <Card className="bg-[#f6f5f1] gap-0 py-0 border-none rounded-none shadow-none h-full relative overflow-hidden group">
                <CardContent className="p-8 md:p-10 flex flex-col space-y-6">
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-full border border-[#d2cab9] flex items-center justify-center shrink-0 bg-[#ebe6df]">
                    <item.icon
                      className="w-4 h-4 text-[#8e8578]"
                      strokeWidth={2}
                    />
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col space-y-2 z-10 relative">
                    <h3 className="text-xl md:text-[22px] text-[#6b6256] tracking-wide font-light">
                      {item.title}
                    </h3>
                    <div className="w-12 h-px bg-[#d2cab9] my-2" />
                    <p className="text-[13px] md:text-[14px] leading-relaxed text-[#b1a798] font-light max-w-[85%]">
                      {item.description}
                    </p>
                  </div>

                  {/* Large Background Number */}
                  <div className="absolute top-15 -translate-y-1/2 right-2 z-0 pointer-events-none select-none">
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

export default OurCommitment;
