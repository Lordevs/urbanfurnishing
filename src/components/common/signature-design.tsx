"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SignatureDesign() {
  return (
    <section
      id="design-expert"
      className=" w-full px-4 sm:px-10 lg:px-16 max-w-8xl mx-auto bg-white">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:w-[55%] flex flex-col justify-center">
          <h2 className="text-[32px] sm:text-[42px] font-medium tracking-tight text-[#412A1F] mb-8">
            Our <span className="text-[#C9A76A]">Signature Design</span> Service
          </h2>

          {/* Quote Block */}
          <div className="relative border-l border-[#DFD1B8] pl-5 mb-8">
            {/* Custom Quote Icon Positioned on Top of the line */}
            <div className="absolute -left-[14px] -top-1 bg-white pb-2 pr-2">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#D3C3A8]">
                <path
                  d="M9 11C9 12.6569 7.65685 14 6 14H4C4 16.2091 5.79086 18 8 18V20C4.68629 20 2 17.3137 2 14V11V9V7C2 5.89543 2.89543 5 4 5H6C7.65685 5 9 6.34315 9 8V11ZM19 11C19 12.6569 17.6569 14 16 14H14C14 16.2091 15.7909 18 18 18V20C14.6863 20 12 17.3137 12 14V11V9V7C12 5.89543 12.8954 5 14 5H16C17.6569 5 19 6.34315 19 8V11Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <p className="italic text-[#907A6D] text-[14px] leading-[1.8] mb-3 mt-1 pr-6 tracking-wide">
              "Every space tells a story. Our mission is to help you tell yours
              through thoughtfully curated interiors that combine functionality
              with timeless elegance."
            </p>
            <p className="text-[11px] text-[#A69C92]">
              Elena Falconer, Founder & CEO
            </p>
          </div>

          <p className="text-[#A3A3A3] text-[13px] sm:text-[13px] leading-[1.8] tracking-wide mb-12 max-w-[95%] font-light">
            With over 15 years of experience in luxury property development and
            interior design, Elena founded Urban Finishing to bridge the gap
            between vision and reality. Her commitment to excellence and client
            satisfaction has made Urban Finishing the preferred choice for
            discerning property owners across the UAE.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-14 sm:gap-24 mb-10">
            <div className="flex flex-col gap-1.5 items-center sm:items-start text-center sm:text-left">
              <span className="text-2xl sm:text-[28px] font-medium text-[#412A1F]">
                15+
              </span>
              <span className="text-[11px] text-[#B0B0B0] font-normal">
                Years Experience
              </span>
            </div>
            <div className="flex flex-col gap-1.5 items-center sm:items-start text-center sm:text-left">
              <span className="text-2xl sm:text-[28px] font-medium text-[#412A1F]">
                500+
              </span>
              <span className="text-[11px] text-[#B0B0B0] font-normal">
                Happy Clients
              </span>
            </div>
            <div className="flex flex-col gap-1.5 items-center sm:items-start text-center sm:text-left">
              <span className="text-2xl sm:text-[28px] font-medium text-[#412A1F]">
                98%
              </span>
              <span className="text-[11px] text-[#B0B0B0] font-normal">
                Success Rate
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <Button className="rounded-full bg-[#412A1F] hover:bg-[#412A1F]/90 text-white flex items-center gap-2 pr-1.5 pl-5 h-10 text-[12px] font-normal transition-all duration-300 shadow-none border-none">
              Meet the Team
              <div className="bg-white rounded-full p-1 text-[#412A1F]">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-[#E8E8E8] text-[#818181] hover:bg-gray-50 hover:text-gray-900 h-10 px-8 text-[12px] font-normal transition-all duration-300 shadow-none">
              Our Story
            </Button>
          </div>
        </motion.div>

        {/* Right Content / Image Formatted As Perfect Rectangle With Rounded Edges */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:w-[45%] w-full flex justify-end">
          <div className="relative w-full h-[85vh]  overflow-hidden">
            <Image
              src="/common/signature-design-img.webp"
              alt="Elena Falconer, Founder & CEO"
              fill
              className="object-cover rounded-[16px]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
