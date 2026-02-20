"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Choose Your Package",
    description: "STEP 1 OF 4",
  },
  {
    number: "02",
    title: "Confirm Scope & Timeline",
    description: "STEP 2 OF 4",
  },
  {
    number: "03",
    title: "Procurement & Installation",
    description: "STEP 3 OF 4",
  },
  {
    number: "04",
    title: "Property Ready",
    description: "STEP 4 OF 4",
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
            <h2 className="text-4xl md:text-6xl font-serif text-[#635647]">
              How We Work
            </h2>
            <p className="max-w-xl text-sm md:text-base leading-relaxed text-muted-foreground/60 font-sans">
              A simple, structured process designed for clarity and
              accountability
            </p>
          </motion.div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative flex flex-col items-center">
              {/* Connecting Line (Desktop only) */}
              {index !== steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-4 w-8 items-center justify-center z-0 translate-x-1/2">
                  <div className="h-px w-full bg-[#635647]/20" />
                  <div className="w-1.5 h-1.5 bg-[#dcd7cf] absolute" />
                </div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="w-full relative group">
                {/* Card Container */}
                <div className="bg-[#f8f5f0] h-[280px] w-full relative p-8 flex flex-col justify-end">
                  {/* Floating Number Badge */}
                  <div className="absolute top-8 left-8 w-10 h-10 bg-[#5c4d3d] flex items-center justify-center text-white/50 text-xs font-bold z-20 shadow-sm">
                    {step.number}
                  </div>

                  {/* Large Background Number */}
                  <div className="absolute top-8 right-8 z-0">
                    <span className="text-[100px] font-serif leading-none text-[#635647]/5 select-none pointer-events-none">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 space-y-4 pb-2">
                    {/* Small Divider */}
                    <div className="w-8 h-px bg-[#635647]/20 mb-6" />

                    <h3 className="text-xl font-serif text-[#635647] leading-tight min-h-[56px] flex items-end">
                      {step.title}
                    </h3>

                    <div className="pt-8">
                      <p className="text-[9px] font-bold tracking-[0.25em] text-[#635647]/40 uppercase font-sans">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProcess;
