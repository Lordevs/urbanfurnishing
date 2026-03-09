"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Mail, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const quickLinks = [
  "Living Room",
  "Bedroom",
  "Dining Room",
  "Office",
  "Outdoor",
  "Accessories",
];

const packages = [
  "Investor Turnkey",
  "End-User Signature",
  "Developer Solutions",
  "Custom Projects",
  "Pricing",
];

const singleItems = [
  "About Us",
  "Portfolio",
  "Process",
  "Testimonials",
  "Careers",
  "Contact",
];

const ourServices = [
  "Design Blog",
  "Style Guide",
  "FAQs",
  "Delivery Info",
  "Warranty",
  "Support",
];

export default function Footer() {
  return (
    <footer className="w-full pt-20">
      {/* Newsletter Section */}
      <div className="bg-card py-20">
        <div className="max-w-8xl mx-auto px-4 sm:px-10 lg:px-16 flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
          <div className="lg:w-[45%] w-full">
            <div className="inline-block border border-[#E8E8E8] bg-white rounded-full px-5 py-2 mb-6 shadow-sm">
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.15em] text-[#605a5a] uppercase">
                Newsletter
              </span>
            </div>
            <h2 className="text-[32px] sm:text-[42px] font-serif font-medium tracking-tight text-[#1a1a1a] mb-5">
              Get Design <span className="text-[#C9A76A]">Inspiration</span>
            </h2>
            <p className="text-[#A3A3A3] text-[14px] sm:text-[15px] leading-[1.8] tracking-wide font-light max-w-[95%]">
              Join our community for curated interior tips, new collection
              launches, and exclusive promotions.
            </p>
          </div>

          <div className="lg:w-[55%] w-full flex flex-col items-start lg:items-end">
            <div className="w-full max-w-xl">
              <div className="relative flex flex-col sm:flex-row items-center bg-white rounded-[32px] sm:rounded-full border border-[#E8E8E8] shadow-sm p-2 sm:p-1.5 focus-within:ring-1 focus-within:ring-[#C9A76A]/30 transition-all gap-2 sm:gap-0">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="border-none shadow-none focus-visible:ring-0 px-6 h-12 flex-1 text-[13px] sm:text-[14px] text-gray-700 placeholder:text-[#B0B0B0] bg-transparent font-light"
                />
                <Button className="rounded-full bg-[#412A1F] hover:bg-[#2D1A12] text-white flex items-center justify-between sm:justify-center w-full sm:w-auto gap-12 sm:gap-6 px-6 sm:pr-2 sm:pl-6 h-12 sm:h-12 text-[13px] font-normal transition-all shadow-none shrink-0 border-none group">
                  Subscribe
                  <div className="bg-white rounded-full p-2 sm:p-1.5 text-[#412A1F] transition-transform group-hover:scale-105">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </Button>
              </div>
              <p className="text-[#B0B0B0] text-[11px] sm:text-[12px] mt-4 ml-4 font-light tracking-wide">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Section */}
      <div className="bg-[linear-gradient(180deg,#402A1E_90%)] pt-24 pb-10">
        <div className="max-w-8xl mx-auto px-4 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">
            {/* Brand Column */}
            <div className="lg:col-span-4 flex flex-col">
              <Image
                src="/common/logo.svg"
                alt="UFF Logo"
                width={70}
                height={70}
                className="mb-8 opacity-70 invert sepia hue-rotate-15 contrast-75 brightness-150"
              />

              <p className="text-[#D0CACA] text-[12px] sm:text-[13px] leading-[1.8] font-light mb-10 max-w-[85%] pr-4 tracking-wide">
                Redefining luxury living through expertly curated furnishing
                solutions. From concept to completion, we bring your vision to
                life.
              </p>

              <div className="flex flex-col gap-5 text-[#E0Dcd8] text-[13px] font-light">
                <div className="flex items-center gap-3 w-full">
                  <Phone className="w-4 h-4 text-[#C9A76A]" strokeWidth={1.5} />
                  <span className="tracking-wide">+971 50 123 4567</span>
                </div>
                <div className="flex items-center gap-3 w-full">
                  <Mail className="w-4 h-4 text-[#C9A76A]" strokeWidth={1.5} />
                  <span className="tracking-wide">hello@urbanheights.ae</span>
                </div>
                <div className="flex items-center gap-3 w-full">
                  <MapPin
                    className="w-4 h-4 text-[#C9A76A]"
                    strokeWidth={1.5}
                  />
                  <span className="tracking-wide">Dubai, UAE</span>
                </div>
              </div>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
              <div className="flex flex-col">
                <h4 className="text-[#B3935B] text-[10px] sm:text-[11px] font-semibold tracking-widest mb-8 uppercase">
                  Quick Links
                </h4>
                <ul className="flex flex-col gap-6">
                  {quickLinks.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="text-[#D0CACA] hover:text-white text-[12px] sm:text-[13px] font-light tracking-wide transition-colors">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col">
                <h4 className="text-[#B3935B] text-[10px] sm:text-[11px] font-semibold tracking-widest mb-8 uppercase">
                  Packages
                </h4>
                <ul className="flex flex-col gap-6">
                  {packages.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="text-[#D0CACA] hover:text-white text-[12px] sm:text-[13px] font-light tracking-wide transition-colors">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col">
                <h4 className="text-[#B3935B] text-[10px] sm:text-[11px] font-semibold tracking-widest mb-8 uppercase">
                  Single Items
                </h4>
                <ul className="flex flex-col gap-6">
                  {singleItems.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="text-[#D0CACA] hover:text-white text-[12px] sm:text-[13px] font-light tracking-wide transition-colors">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col">
                <h4 className="text-[#B3935B] text-[10px] sm:text-[11px] font-semibold tracking-widest mb-8 uppercase">
                  Our Services
                </h4>
                <ul className="flex flex-col gap-6">
                  {ourServices.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="text-[#D0CACA] hover:text-white text-[12px] sm:text-[13px] font-light tracking-wide transition-colors">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-[#8B7C6E]/20 gap-6">
            <p className="text-[#A3A3A3] text-[10px] sm:text-[11px] font-light tracking-wide">
              &copy; {new Date().getFullYear()} Urban Finishing LLC. All rights
              reserved.
            </p>
            <div className="flex items-center flex-wrap justify-center gap-6 sm:gap-8">
              <Link
                href="#"
                className="text-[#A3A3A3] hover:text-white text-[10px] sm:text-[11px] font-light tracking-wide transition-colors">
                Privacy
              </Link>
              <Link
                href="#"
                className="text-[#A3A3A3] hover:text-white text-[10px] sm:text-[11px] font-light tracking-wide transition-colors">
                Terms
              </Link>
              <Link
                href="#"
                className="text-[#A3A3A3] hover:text-white text-[10px] sm:text-[11px] font-light tracking-wide transition-colors">
                Cookies
              </Link>
              <Link
                href="#"
                className="text-[#A3A3A3] hover:text-white text-[10px] sm:text-[11px] font-light tracking-wide transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
