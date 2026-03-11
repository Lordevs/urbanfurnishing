"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const servicesData = [
  {
    id: "packages",
    title: "Select Packages",
    desc: "Browse our curated collections designed for every room. Complete furniture sets that work together perfectly.",
    img: "/landing/home/services/services-img-1.webp",
    features: [
      "Complete room solutions",
      "Pre-matched furniture sets",
      "Up to 30% savings",
    ],
  },
  {
    id: "shop",
    title: "Shop Individually",
    desc: "Pick and choose exactly what you need. Build your own style with our extensive single product collection.",
    img: "/landing/home/services/services-img-2.webp",
    features: [
      "1000+ unique pieces",
      "Mix and match styles",
      "Full flexibility",
    ],
  },
  {
    id: "expert",
    title: "Use Our Design Expert",
    desc: "Work with professional interior designers who bring your vision to life with personalized service.",
    img: "/landing/home/services/services-img-3.webp",
    features: [
      "1-on-1 consultation",
      "Custom design plans",
      "Full project management",
    ],
  },
];

export default function Services() {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  return (
    <section className="py-20 w-full px-4 sm:px-10 lg:px-16 max-w-8xl mx-auto bg-muted">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-serif font-semibold text-[#1a1a1a] mb-6">
          Three <span className="text-[#C9A76A]">Pathway</span> <br />
          Services
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
          Three distinct ways to furnish your space. Each designed to match your
          preferences, timeline, and budget.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {servicesData.map((service, idx) => {
          const isActive = activeCard === service.id;

          return (
            <motion.div
              key={service.id}
              className="relative rounded-[24px] overflow-visible cursor-pointer"
              onMouseEnter={() => setActiveCard(service.id)}
              onMouseLeave={() => setActiveCard(null)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}>
              <div
                className={`absolute inset-0 rounded-[24px] transition-opacity duration-300 z-0 pointer-events-none ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  background:
                    "linear-gradient(135deg, #72727D 2%, #C9A76A 4%, #C9A76A 48%, transparent 50%)",
                }}
              />

              <Card
                className={`relative flex flex-col h-full rounded-[23px] overflow-hidden transition-all duration-300 z-10 m-px border bg-[#FDFCF9] ${
                  isActive
                    ? "text-white border-transparent"
                    : "text-black border-[#E5E0DA]"
                }`}
                style={{
                  boxShadow: isActive
                    ? "0 20px 40px rgba(0,0,0,0.15)"
                    : "0 4px 6px rgba(0,0,0,0.02)",
                }}>
                {/* Expanding dark background from bottom right */}
                <div 
                   className="absolute inset-0 bg-[#251814] transition-all duration-500 ease-out z-0 pointer-events-none"
                   style={{
                     clipPath: isActive ? "circle(150% at 100% 100%)" : "circle(0% at 100% 100%)",
                   }}
                />

                {/* Background SVG for all states */}
                <div className="absolute inset-0 w-full h-full z-1 pointer-events-none opacity-100 transition-opacity duration-300">
                  <Image
                    src="/landing/home/services/services.svg"
                    alt="bg effect"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Card Content - relative to be above background */}
                <CardContent className="relative z-10 p-3 sm:p-4 flex flex-col h-full">
                  <div className="relative w-full aspect-4/3 sm:aspect-4/3 rounded-[16px] overflow-hidden mb-6 filter drop-shadow-sm">
                    {/* The images shown in the screenshot might have varying heights, but we enforce standard aspect ratio */}
                    <Image
                      src={service.img}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="px-2 pb-6 flex flex-col flex-1">
                    <h3
                      className={`text-xl sm:text-2xl font-semibold font-serif mb-3 transition-colors duration-300 ${
                        isActive ? "text-white" : "text-black"
                      }`}>
                      {service.title}
                    </h3>
                    <p
                      className={`text-[15px] mb-2 leading-relaxed transition-colors duration-300 ${
                        isActive ? "text-white/80" : "text-black"
                      }`}>
                      {service.desc}
                    </p>

                    <ul className="space-y-4 mb-2 mt-auto">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <div
                            className={`flex items-center justify-center w-5 h-5 rounded-full shrink-0 transition-colors duration-300 ${
                              isActive
                                ? "bg-[#C9A76A] text-white"
                                : "bg-[#544641] text-white"
                            }`}>
                            <Check className="w-3 h-3 stroke-3" />
                          </div>
                          <span
                            className={`text-sm font-medium transition-colors duration-300 ${
                              isActive ? "text-white/90" : "text-black"
                            }`}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Floating Arrow Button - Rendered always, visually toggled for smooth CSS transition */}
              <div
                className={`absolute -bottom-4 -right-4 z-20 transition-all duration-300 ease-out origin-top-left ${
                  isActive
                    ? "opacity-100 scale-100 pointer-events-auto"
                    : "opacity-0 scale-75 pointer-events-none"
                }`}>
                <div className="bg-[#F7F7F7] p-2 rounded-full">
                  <div className="w-12 h-12 bg-[#412A1F] text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-[#2b1b16] transition-colors">
                    <ArrowUpRight className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
