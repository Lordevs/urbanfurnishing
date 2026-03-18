"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/route";

import { PrimaryButton } from "./primary-button";

export default function SignatureDesign() {
  return (
    <section
      id="design-expert"
      className="w-full lg:py-20 px-4 py-10` sm:px-10 lg:px-16 max-w-8xl mx-auto bg-white overflow-hidden">

      <div className="block lg:hidden">
        <h2 className="text-3xl sm:text-[32px] font-serif font-semibold tracking-tight mb-4 leading-[1.2]">
          <span className="text-[#3D261C] font-serif">Our </span>
          <span className="text-[#C9A76A] font-serif">Signature Design</span>
          <br />
          <span className="text-[#3D261C] font-serif">Service</span>
        </h2>
        <p className="text-[#5D4E3C]/80 text-[13px] leading-[1.6] mb-8 pr-4">
          Experience personalized interior design with our expert team. We
          transform your vision into reality through comprehensive consultation,
          custom designs, and seamless execution.
        </p>

        <ul className="flex flex-col gap-4 mb-8">
          {[
            "Free Consultation",
            "Custom 3D Designs",
            "Professional Installation",
            "Lifetime Support",
          ].map((item, idx) => (
            <li key={idx} className="flex items-center gap-3">
              <div className="w-[22px] h-[22px] rounded-full bg-[#FDF8F0] flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 text-[#C9A76A]" strokeWidth={3} />
              </div>
              <span className="text-[#3D261C] text-[13px] font-semibold">
                {item}
              </span>
            </li>
          ))}
        </ul>

        <Link href={`${ROUTES.OUR_NEW_DESIGN_EXPERT}#design-call`}>
          <button className="bg-[#3D261C] text-white text-[12px] px-6 py-3.5 rounded-[6px] font-medium mb-10 tracking-wide hover:bg-[#2C1A11] transition-colors cursor-pointer">
            Book Consultation
          </button>
        </Link>

        <div className="relative w-full aspect-3/4 overflow-hidden rounded-[16px]">
          <Image
            src="/common/signature-design-img.webp"
            alt="Signature Design Service"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:w-[55%] flex flex-col justify-center">
          <h2 className="text-[32px] sm:text-[42px] font-medium tracking-tight font-serif text-[#5D4E3C] mb-8">
            Our{" "}
            <span className="text-[#C9A76A] font-serif">Signature Design</span>{" "}
            Service
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

            <p className="italic text-[#603D2C] text-[14px] leading-[1.8] mb-3 mt-1 pr-6 tracking-wide">
              &quot;Every space tells a story. Our mission is to help you tell
              yours through thoughtfully curated interiors that combine
              functionality with timeless elegance.&quot;
            </p>
            <p className="text-[11px] text-[#5D4E3C]/60">
              Elena Falconer, Founder & CEO
            </p>
          </div>

          <p className="text-[#5D4E3C]/60 text-[13px] sm:text-[13px] leading-[1.8] tracking-wide mb-12 max-w-[95%] font-light">
            With over 15 years of experience in luxury property development and
            interior design, Elena founded Urban Finishing to bridge the gap
            between vision and reality. Her commitment to excellence and client
            satisfaction has made Urban Finishing the preferred choice for
            discerning property owners across the UAE.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-14 sm:gap-24 mb-10">
            <div className="flex flex-col gap-1.5 items-center sm:items-start text-center sm:text-left">
              <span className="text-2xl sm:text-[28px] font-medium text-[#8D7366]">
                15+
              </span>
              <span className="text-[11px] text-[#5D4E3C]/50 font-normal">
                Years Experience
              </span>
            </div>
            <div className="flex flex-col gap-1.5 items-center sm:items-start text-center sm:text-left">
              <span className="text-2xl sm:text-[28px] font-medium text-[#8D7366]">
                500+
              </span>
              <span className="text-[11px] text-[#5D4E3C]/50 font-normal">
                Happy Clients
              </span>
            </div>
            <div className="flex flex-col gap-1.5 items-center sm:items-start text-center sm:text-left">
              <span className="text-2xl sm:text-[28px] font-medium text-[#8D7366]">
                98%
              </span>
              <span className="text-[11px] text-[#5D4E3C]/50 font-normal">
                Success Rate
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <PrimaryButton
              href={`${ROUTES.OUR_NEW_DESIGN_EXPERT}#design-call`}
              label="Meet the Team"
              mbLabel="Meet the Team"
              className="h-auto shadow-none"
            />

            <Button
              asChild
              variant="outline"
              className="rounded-full border border-[#DED4C6] bg-transparent text-[#5D4E3C] hover:bg-[#FDF4E7]/40 hover:text-[#3D261C] h-12 px-8 text-[14.5px] font-medium transition-all duration-300 shadow-none cursor-pointer">
              <Link href={ROUTES.OUR_NEW_DESIGN_EXPERT}>Our Story</Link>
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
