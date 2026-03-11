"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Mail, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/route";

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
      <div className="bg-card py-20 border-b border-[#F0EBE6]">
        <div className="max-w-8xl mx-auto px-4 sm:px-10 lg:px-16 flex flex-col lg:flex-row gap-12 lg:gap-24 items-center justify-between">
          <div className="lg:w-[45%] w-full">
            <div className="inline-flex items-center justify-center border border-[#EAEADF] bg-white rounded-full px-5 py-2 mb-6 shadow-sm">
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.15em] text-[#5D4E3C] uppercase">
                Newsletter
              </span>
            </div>
            <h2 className="text-[32px] sm:text-[42px] font-serif font-medium tracking-tight text-[#302B27] mb-5">
              Get Design{" "}
              <span className="text-[#C9A76A] font-serif">Inspiration</span>
            </h2>
            <p className="text-[#8F877C] text-[14px] sm:text-[15px] leading-[1.8] tracking-wide font-light max-w-[95%]">
              Join our community for curated interior tips, new collection
              launches, and exclusive promotions.
            </p>
          </div>

          <div className="lg:w-full w-full flex flex-col items-start lg:items-end">
            <div className="w-full ">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="rounded-full border border-[#EAEADF] shadow-sm focus-visible:ring-1 focus-visible:ring-[#C9A76A]/30 px-6 h-12 lg:h-[50px] flex-1 text-[13.5px] text-[#302B27] placeholder:text-[#B0B0B0] bg-white font-light w-full"
                />
                <Button className="group rounded-full bg-[#3D261C] hover:bg-[#2C1A11] text-[#F3EFE7] flex items-center justify-between xl:justify-center gap-4 py-2 pr-1.5 pl-6 h-12 lg:h-[50px] text-[14px] font-medium transition-all duration-300 shadow-sm border-none shrink-0 w-full sm:w-[155px] cursor-pointer">
                  Subscribe
                  <div className="bg-[#FDF4E7] rounded-full p-[7px] text-[#3D261C] transition-transform duration-300 group-hover:scale-95">
                    <ArrowUpRight className="h-[16px] w-[16px] transition-transform duration-300 group-hover:translate-x-px group-hover:-translate-y-px stroke-[1.5]" />
                  </div>
                </Button>
              </div>
              <p className="text-[#B0B0B0] text-[11px] sm:text-[12px] mt-3 sm:ml-4 font-light tracking-wide">
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
                        href={ROUTES.SINGLE_PRODUCTS}
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
                        href={ROUTES.PACKAGES}
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
                        href={ROUTES.SINGLE_PRODUCTS}
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
                        href={ROUTES.HOME}
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
                href={ROUTES.PRIVACY_POLICY}
                className="text-[#A3A3A3] hover:text-white text-[10px] sm:text-[11px] font-light tracking-wide transition-colors">
                Privacy
              </Link>
              <Link
                href={ROUTES.TERMS_OF_SERVICE}
                className="text-[#A3A3A3] hover:text-white text-[10px] sm:text-[11px] font-light tracking-wide transition-colors">
                Terms
              </Link>
              <Link
                href={ROUTES.PRIVACY_POLICY}
                className="text-[#A3A3A3] hover:text-white text-[10px] sm:text-[11px] font-light tracking-wide transition-colors">
                Cookies
              </Link>
              <Link
                href={ROUTES.HOME}
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
