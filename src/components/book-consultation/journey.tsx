"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "1",
    title: "Submit Request",
    description: "Fill out the form with your project details",
  },
  {
    number: "2",
    title: "Quick Response",
    description: "Get contacted within 24 hours to schedule",
  },
  {
    number: "3",
    title: "Consultation",
    description: "30-min expert consultation call",
  },
  {
    number: "4",
    title: "Get Proposal",
    description: "Receive customized package recommendation",
  },
];

export default function Journey() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-8xl mx-auto px-4 sm:px-10 lg:px-16">
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-[52px] font-serif font-semibold tracking-tight text-[#1a1a1a] mb-2">
            Your <span className="text-[#C9A76A] font-serif">Journey</span> With
            Us
          </h2>
          <p className="text-[#000000]/50 text-[18px] sm:text-[20px] font-light tracking-wide max-w-md mx-auto">
            From consultation to completion, here&apos;s what to expect
          </p>
        </div>

        <div className="max-w-8xl mx-auto relative px-4 sm:px-0">
          {/* Connecting Line (Desktop) */}
          <div
            className="hidden sm:block absolute top-[44px] left-[12%] right-[12%] h-px z-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(201, 167, 106, 0.2) 0%, #C9A76A 50%, rgba(201, 167, 106, 0.2) 100%)",
            }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-12 sm:gap-6 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="flex flex-col items-center text-center">
                {/* Number Box */}
                <div className="relative mb-6">
                  <div
                    className="w-[88px] h-[88px] rounded-[24px] flex items-center justify-center text-white text-[41px] font-medium"
                    style={{
                      background:
                        "linear-gradient(135deg, #C9A76A 0%, #B3905A 100%)",
                      boxShadow: "0 14px 24px rgba(201, 167, 106, 0.25)",
                    }}>
                    {step.number}
                  </div>

                  {/* Step 1 Ring Indicator */}
                  {index === 0 && (
                    <div className="absolute -top-[3px] -right-[3px] w-[20px] h-[20px] rounded-full border-4 border-[#C9A76A] bg-white" />
                  )}
                </div>

                <div className="flex flex-col gap-2.5 max-w-[320px]">
                  <h3 className="text-[22px] font-medium font-serif text-[#5D4E3C] tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-[#9B8B7A] text-[18px] font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
