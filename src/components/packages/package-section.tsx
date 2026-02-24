"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check, ArrowRight, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROUTES } from "@/constants/route";

interface PackageSectionProps {
  packageNumber: string;
  badgeTitle: string;
  badgeIcon: LucideIcon;
  title: string;
  description: string;
  includedItems: string[];
  idealForItems: string[];
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
}

const PackageSection = ({
  packageNumber,
  badgeTitle,
  badgeIcon: BadgeIcon,
  title,
  description,
  includedItems,
  idealForItems,
  imageSrc,
  imageAlt,
  reverse = false,
}: PackageSectionProps) => {
  return (
    <section className="w-full bg-[#FCFBF9] py-10 md:py-16 overflow-hidden">
      <div className="w-full px-4 sm:px-10 lg:px-16 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: reverse ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`relative p-6 w-full mx-auto md:max-w-xl lg:max-w-none ${reverse ? "lg:order-2" : "lg:order-1"}`}>
            {/* Top-Left Corner Decoration */}
            <div className="absolute top-0 left-0 w-24 h-24 border-t border-l border-[#dcd7ce]" />

            {/* Bottom-Right Corner Decoration */}
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b border-r border-[#dcd7ce]" />

            {/* Main Image Container */}
            <div className="relative aspect-4/5 w-full overflow-hidden bg-gray-100">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                quality={95}
              />

              {/* Top Left Circle Badge */}
              <div className="absolute top-8 left-8 w-14 h-14 rounded-full bg-[#ebe6df]/90 backdrop-blur-sm shadow-sm flex items-center justify-center">
                <span className="text-[#8e8578] font-serif text-lg">
                  {packageNumber}
                </span>
              </div>

              {/* Bottom Overlay Box */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#f4ebd9]/80 backdrop-blur-md p-6 flex justify-between items-end border border-white/20">
                <div className="flex flex-col space-y-2">
                  <span className="text-[10px] md:text-[11px] font-bold tracking-widest text-[#8e8578] uppercase">
                    PACKAGE {packageNumber}
                  </span>
                  <h3 className="text-2xl font-serif text-[#5D4E3C] font-light">
                    {title}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full border border-[#d2cab9] flex items-center justify-center bg-[#ebe6df]/50 shrink-0">
                  <BadgeIcon
                    className="w-4 h-4 text-[#8e8578]"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Column */}
          <div
            className={`flex flex-col space-y-10 ${reverse ? "lg:pr-4 lg:order-1" : "lg:pl-4 lg:order-2"}`}>
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#ebe6df] border border-[#e0d9d0] text-[9px] md:text-[10px] font-bold tracking-widest text-[#9A8C7A] uppercase font-sans">
                <BadgeIcon className="w-3 h-3 text-[#9A8C7A]" />
                {badgeTitle}
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-serif text-[#6b6256] font-light leading-tight">
                {title}
              </h2>

              {/* Separator Line */}
              <div className="w-20 h-0.5 bg-[#d2cab9]" />

              <p className="text-[15px] md:text-[17px] leading-relaxed text-[#9a8c7a] font-light max-w-lg">
                {description}
              </p>
            </motion.div>

            {/* What's Included */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-px w-8 bg-[#d2cab9]" />
                <span className="text-[11px] font-bold tracking-widest text-[#8e8578] uppercase">
                  WHAT&apos;S INCLUDED
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                {includedItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full bg-[#ebe6df] flex items-center justify-center shrink-0 mt-0.5">
                      <Check
                        className="w-2.5 h-2.5 text-[#8e8578]"
                        strokeWidth={3}
                      />
                    </div>
                    <span className="text-[13px] md:text-[14px] text-[#6b6256] font-light">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Ideal For */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-px w-8 bg-[#d2cab9]" />
                <span className="text-[11px] font-bold tracking-widest text-[#8e8578] uppercase">
                  IDEAL FOR
                </span>
              </div>

              <div className="flex max-w-2xl flex-wrap gap-3">
                {idealForItems.map((item, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 bg-[#F6F5F1] text-[13px] text-[#6b6256] font-light border border-[#ebe6df]">
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-4">
              <Link href={ROUTES.CONTACT}>
                <Button className="bg-[#5D4E3C] hover:bg-[#4a3e2f] text-white rounded-none py-6 px-8 text-sm font-medium tracking-wide flex items-center gap-2 transition-all duration-300">
                  Book Consultation <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackageSection;
