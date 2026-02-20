"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";

const packages = [
  {
    number: "01",
    title: "Investor Turnkey",
    image: "/packages-1.webp",
    description:
      "Fast, rental-ready properties with neutral, market-tested design",
    href: "/services/investor",
  },
  {
    number: "02",
    title: "End-User Signature",
    image: "/packages-2.webp",
    description:
      "Personalised interiors that reflect your style with curated finishes",
    href: "/services/residential",
  },
  {
    number: "03",
    title: "Developer Solutions",
    image: "/packages-3.webp",
    description:
      "Scalable furnishing for multiple units with consistent quality",
    href: "/services/developer",
  },
];

const OurPackages = () => {
  return (
    <section className="bg-white py-24 md:py-32 overflow-hidden">
      <div className="w-full px-4 sm:px-10 lg:px-20 mx-auto">
        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 w-full">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="group flex flex-col space-y-6">
              {/* Image Container */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Number Overlay */}
                <div className="absolute top-4 left-6 z-10">
                  <span className="text-[80px] md:text-[100px] font-sans font-light text-black/5 leading-none select-none pointer-events-none">
                    {pkg.number}
                  </span>
                </div>

                {/* Overlay for hover depth */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
              </div>

              {/* Text Content - Left Aligned */}
              <div className="flex flex-col items-start space-y-3">
                <h3 className="text-2xl md:text-[28px] font-serif text-[#635647] font-medium leading-tight">
                  {pkg.title}
                </h3>

                <p className="text-sm leading-relaxed text-muted-foreground/70 font-sans max-w-[90%] text-left">
                  {pkg.description}
                </p>

                {/* EXPLORE Link */}
                <Link
                  href={pkg.href}
                  className="inline-flex items-center gap-2 pt-2 text-[10px] font-bold tracking-[0.25em] text-[#635647] uppercase group-hover:opacity-70 transition-opacity">
                  Explore <MoveRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurPackages;
