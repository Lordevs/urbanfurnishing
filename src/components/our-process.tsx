"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    number: "01",
    title: "Choose Your Package",
    step: "STEP 1 OF 4",
  },
  {
    number: "02",
    title: "Confirm Scope & Timeline",
    step: "STEP 2 OF 4",
  },
  {
    number: "03",
    title: "Procurement & Installation",
    step: "STEP 3 OF 4",
  },
  {
    number: "04",
    title: "Property Ready",
    step: "STEP 4 OF 4",
  },
];

const OurProcess = () => {
  return (
    <section className="bg-[#fdfcf9] py-24 md:py-32 overflow-hidden">
      <div className="w-full px-4 sm:px-10 lg:px-20 mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] md:text-[11px] font-bold tracking-[0.4em] text-muted-foreground/40 uppercase font-sans">
            OUR PROCESS
          </motion.span>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#635647]">
              How We Work
            </h2>
            <p className="max-w-xl text-sm md:text-base leading-relaxed text-muted-foreground/60 font-sans">
              A simple, structured process designed for clarity and
              accountability
            </p>
          </motion.div>
        </div>

        {/* Steps Row */}
        <div className="flex flex-col md:flex-row items-stretch gap-0 w-full">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1 min-w-0">
              {/* Step Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="flex-1 h-full">
                <Card className="relative gap-0 py-00  bg-[#f8f5f0] border-none rounded-none shadow-none h-full overflow-visible">
                  {/* Dark Number Badge — overhanging top-left */}
                  <div className="absolute -top-4 left-6 z-20 w-11 h-11 bg-[#5c4d3d] flex items-center justify-center text-white/60 text-[11px] font-bold shadow-md">
                    {step.number}
                  </div>

                  <CardContent className="p-8 pt-12 flex flex-col justify-between h-full min-h-[220px] relative overflow-hidden">
                    {/* Large Faint Background Number */}
                    <span className="absolute -top-8 right-4 text-[120px] font-serif font-bold text-[#635647]/5 leading-none select-none pointer-events-none">
                      {step.number}
                    </span>

                    {/* Top thin divider */}
                    <div className="w-10 h-px bg-[#635647]/20 mb-6" />

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-serif text-[#635647] leading-snug flex-1">
                      {step.title}
                    </h3>

                    {/* Step label */}
                    <p className="text-[9px] font-bold tracking-[0.3em] text-[#635647]/40 uppercase font-sans mt-10">
                      {step.step}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Connector Arrow (between steps) */}
              {index !== steps.length - 1 && (
                <div className="hidden md:flex items-center px-3 shrink-0 z-10">
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-px bg-[#c5bdb4]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#c5bdb4]" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProcess;
