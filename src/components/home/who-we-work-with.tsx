"use client";

import { motion } from "framer-motion";
import { Users, Home, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const audiences = [
  {
    number: "01",
    title: "Investors",
    icon: Users,
    description:
      "Buy-to-let owners who need fast, rental-ready properties with proven market appeal",
  },
  {
    number: "02",
    title: "Homeowners",
    icon: Home,
    description:
      "Residents seeking personalised interiors that reflect their style while staying within budget",
  },
  {
    number: "03",
    title: "Developers",
    icon: Building2,
    description:
      "Property managers and developers requiring scalable solutions for multiple units",
  },
];

const WhoWeWorkWith = () => {
  return (
    <section className="bg-white py-16 md:py-32 overflow-hidden">
      <div className="w-full px-4 sm:px-10 lg:px-20 mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] md:text-[11px] font-bold tracking-[0.4em] text-muted-foreground/40 uppercase font-sans">
            Who We Serve
          </motion.span>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-6">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#635647]">
              Who We Work With
            </h2>
            <div className="h-0.5 w-20 bg-[#635647]/20 mx-auto" />
          </motion.div>
        </div>

        {/* Audience Cards Grid - Matching Layout Width */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12 w-full">
          {audiences.map((item, index) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="h-full flex">
              <Card className="relative py-0 gap-0 w-full bg-[#f8f5f0] border-none rounded-none shadow-none group overflow-visible flex flex-col">
                <CardContent className="p-8 lg:p-14 flex flex-col items-center text-center space-y-8 grow justify-between">
                  {/* Corner Badge - Overlapping */}
                  <div className="absolute -top-3 -right-3 w-14 h-14 bg-[#5c4d3d] flex items-center justify-center text-white/50 text-[11px] font-bold shadow-[0_4px_15px_rgba(0,0,0,0.2)] z-20">
                    {item.number}
                  </div>

                  {/* Icon & Background Number Section */}
                  <div className="relative h-32 w-full flex items-center justify-center">
                    <span className="absolute right-[-10%] md:right-[-18%] lg:right-[-12%] top-[-40%] sm:top-[-65%] text-[120px] sm:text-[180px] font-serif font-light text-black/1.5 leading-none select-none pointer-events-none">
                      {item.number}
                    </span>

                    <div className="relative p-8 inline-flex bg-primary/5 items-center justify-center">
                      <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-black/10" />
                      <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-black/10" />
                      <item.icon className="w-10 h-10 text-[#635647] stroke-1" />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="space-y-6 flex flex-col items-center w-full relative z-10">
                    <h3 className="text-2xl lg:text-[32px] font-serif text-[#635647]">
                      {item.title}
                    </h3>

                    <div className="h-px w-20 bg-black/5" />

                    <p className="text-sm md:text-base leading-relaxed text-muted-foreground/60 max-w-[280px] font-sans">
                      {item.description}
                    </p>
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

export default WhoWeWorkWith;
