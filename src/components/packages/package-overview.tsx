"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const comparisonData = [
  {
    title: "TIMELINE",
    items: [
      { number: "1", text: "2-3 weeks" },
      { number: "2", text: "4-6 weeks" },
      { number: "3", text: "6-12 weeks" },
    ],
  },
  {
    title: "CUSTOMIZATION",
    items: [
      { number: "1", text: "Limited" },
      { number: "2", text: "Moderate" },
      { number: "3", text: "Template-based" },
    ],
  },
  {
    title: "BEST VALUE FOR",
    items: [
      { number: "1", text: "ROI & Speed" },
      { number: "2", text: "Quality & Personal" },
      { number: "3", text: "Scale & Consistency" },
    ],
  },
];

const PackageOverview = () => {
  return (
    <section className="w-full bg-[#f6f5f1] py-16 md:py-32">
      <div className="w-full px-4 sm:px-10 lg:px-16 mx-auto flex flex-col items-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#ebe6df] border border-[#e8e4db] text-[9px] md:text-[10px] font-bold tracking-widest text-[#9A8C7A] uppercase font-sans mb-8 md:mb-10">
          <span className="w-1 h-1 rounded-full bg-[#9A8C7A]" />
          QUICK COMPARISON
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-serif text-[#6b5c4a] leading-tight mb-8 font-light text-center">
          Package Overview
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

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full">
          {comparisonData.map((col, index) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}>
              <Card className="bg-[#FCFBF9] gap-0 py-0 border-none rounded-none shadow-sm h-full relative overflow-hidden group">
                <CardContent className="p-6 sm:p-8 md:p-10 flex flex-col space-y-8 h-full">
                  <h3 className="text-[11px] font-bold tracking-widest text-[#9A8C7A] uppercase font-sans">
                    {col.title}
                  </h3>

                  <div className="flex flex-col space-y-6">
                    {col.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-7 h-7 rounded-full bg-[#ebe6df] flex items-center justify-center shrink-0">
                          <span className="text-[11px] text-[#8e8578] font-medium">
                            {item.number}
                          </span>
                        </div>
                        <span className="text-[14px] md:text-[15px] text-[#6b6256] font-light">
                          {item.text}
                        </span>
                      </div>
                    ))}
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

export default PackageOverview;
