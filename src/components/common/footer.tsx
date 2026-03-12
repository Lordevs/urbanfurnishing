"use client";

import {
  ArrowUpRight,
  MapPin,
  Mail,
  Phone,
  ArrowDownRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ActionButton } from "@/components/shared/action-button";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { ROUTES } from "@/constants/route";
import { navItems } from "@/lib/nav-items";

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

const ourServices = [
  "Select Packages",
  "Shop Individually",
  "Use Our Design Expert",
];

export default function Footer() {
  return (
    <footer className="w-full pt-20">
      {/* Mobile Newsletter Section */}
      <div className="lg:hidden bg-card py-16 px-5 border-b border-[#F0EBE6] w-full">
        <div className="flex flex-col items-start w-full">
          <div className="inline-flex items-center justify-center border border-[#F0EBE6] bg-white rounded-full px-6 py-2 mb-6 shadow-sm">
            <span className="text-[11px] font-semibold tracking-[0.15em] text-[#5D4E3C] uppercase">
              Newsletter
            </span>
          </div>
          <h2 className="text-[32px] font-serif font-medium tracking-tight text-[#412A1F] mb-4 leading-tight">
            Get Design <span className="text-[#C9A76A] font-serif">Inspiration</span>
          </h2>
          <p className="text-[#8F877C] text-[15px] leading-relaxed tracking-wide font-light mb-8">
            Join our community for curated interior tips, new collection launches, and exclusive promotions.
          </p>

          <div className="w-full flex flex-col items-center">
            <div className="flex flex-row items-center gap-3 w-full">
              <Input
                type="email"
                placeholder="Your email address"
                className="rounded-full border border-[#F0EBE6] shadow-sm focus-visible:ring-1 focus-visible:ring-[#C9A76A]/30 px-6 h-[54px] flex-[1.5] text-[14px] text-[#302B27] placeholder:text-[#B0B0B0] bg-white font-light min-w-0"
              />
              <ActionButton
                label="Subscribe"
                className="bg-[#3D261C] hover:bg-[#2C1A11] text-[#F3EFE7] rounded-full h-[54px] text-[15px] w-auto flex-1 px-5"
                icon={<ArrowDownRight className="h-[14px] w-[14px] stroke-2" />}
                iconContainerClassName="bg-white w-[26px] h-[26px] flex text-[#3D261C] ml-2"
                showArrow={false}
              />
            </div>
            <p className="text-[#B0B0B0] text-[12px] mt-4 font-light tracking-wide text-center">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>

      {/* Desktop Newsletter Section */}
      <div className="hidden lg:block bg-card py-20 border-b border-[#F0EBE6]">
        <div className="max-w-8xl mx-auto px-10 lg:px-16 flex flex-row gap-24 items-center justify-between">
          <div className="w-[45%]">
            <div className="inline-flex items-center justify-center border border-[#EAEADF] bg-white rounded-full px-5 py-2 mb-6 shadow-sm">
              <span className="text-[11px] font-semibold tracking-[0.15em] text-[#5D4E3C] uppercase">
                Newsletter
              </span>
            </div>
            <h2 className="text-[42px] font-serif font-medium tracking-tight text-[#302B27] mb-5">
              Get Design{" "}
              <span className="text-[#C9A76A] font-serif">Inspiration</span>
            </h2>
            <p className="text-[#8F877C] text-[15px] leading-[1.8] tracking-wide font-light max-w-[95%]">
              Join our community for curated interior tips, new collection
              launches, and exclusive promotions.
            </p>
          </div>

          <div className="w-full flex flex-col items-end">
            <div className="w-[80%] max-w-[900px]">
              <div className="flex flex-row items-center gap-3">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="rounded-full border border-[#EAEADF] shadow-sm focus-visible:ring-1 focus-visible:ring-[#C9A76A]/30 px-6 h-[50px] flex-1 text-[13.5px] text-[#302B27] placeholder:text-[#B0B0B0] bg-white font-light w-full"
                />
                <ActionButton
                  label="Subscribe"
                  className="bg-[#3D261C] hover:bg-[#2C1A11] text-[#F3EFE7] py-2 pr-1.5 pl-6 h-[50px] text-[14px] font-medium w-[155px]"
                  iconContainerClassName="bg-[#FDF4E7] p-[7px] text-[#3D261C] flex"
                />
              </div>
              <p className="text-[#B0B0B0] text-[12px] mt-3 ml-4 font-light tracking-wide">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Section */}
      <div className="bg-[#402A1F]/95 pt-24 pb-10">
        <div className="max-w-8xl mx-auto px-4 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">
            {/* Brand Column */}
            <div className="lg:col-span-4 flex flex-col">
              <Image
                src="/common/logo.svg"
                alt="UFF Logo"
                width={80}
                height={80}
                className="mb-8 opacity-90 brightness-0 invert-[.7] sepia-[.4] saturate-[.8] hue-rotate-10"
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
                <h4 className="text-[#C9A76A] text-[10px] sm:text-[11px] font-bold tracking-widest mb-8 uppercase">
                  SHOP
                </h4>
                <ul className="flex flex-col gap-6">
                  {quickLinks.map((link) => (
                    <li key={link}>
                      <Link
                        href={ROUTES.SINGLE_PRODUCTS}
                        className="text-[#D0CACA] hover:text-white text-[12px] sm:text-[13px] font-normal tracking-wide transition-colors">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col">
                <h4 className="text-[#C9A76A] text-[10px] sm:text-[11px] font-bold tracking-widest mb-8 uppercase">
                  Packages
                </h4>
                <ul className="flex flex-col gap-6">
                  {packages.map((link) => (
                    <li key={link}>
                      <Link
                        href={ROUTES.PACKAGES}
                        className="text-[#D0CACA] hover:text-white text-[12px] sm:text-[13px] font-normal tracking-wide transition-colors">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col">
                <h4 className="text-[#C9A76A] text-[10px] sm:text-[11px] font-bold tracking-widest mb-8 uppercase">
                  COMPANY
                </h4>
                <ul className="flex flex-col gap-6">
                  {navItems.map((item) => (
                    <li key={item.title}>
                      <Link
                        href={item.href}
                        className="text-[#D0CACA] hover:text-white text-[12px] sm:text-[13px] font-normal tracking-wide transition-colors">
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col">
                <h4 className="text-[#C9A76A] text-[10px] sm:text-[11px] font-bold tracking-widest mb-8 uppercase">
                  Services
                </h4>
                <ul className="flex flex-col gap-6">
                  {ourServices.map((link) => (
                    <li key={link}>
                      <Link
                        href={`${ROUTES.HOME}#services`}
                        className="text-[#D0CACA] hover:text-white text-[12px] sm:text-[13px] font-normal tracking-wide transition-colors">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-white/10 gap-6">
            <p className="text-[#A3A3A3] text-[11px] font-normal tracking-wide">
              &copy; {new Date().getFullYear()} Urban Finishing LLC. All rights
              reserved.
            </p>
            <div className="flex items-center flex-wrap justify-center gap-6 sm:gap-8">
              <Link
                href={ROUTES.PRIVACY_POLICY}
                className="text-[#A3A3A3] hover:text-white text-[11px] font-normal tracking-wide transition-colors">
                Privacy
              </Link>
              <Link
                href={ROUTES.TERMS_AND_CONDITION}
                className="text-[#A3A3A3] hover:text-white text-[11px] font-normal tracking-wide transition-colors">
                Terms
              </Link>
              <Link
                href={ROUTES.COOKIES_POLICY}
                className="text-[#A3A3A3] hover:text-white text-[11px] font-normal tracking-wide transition-colors">
                Cookies
              </Link>
              {/* <Link
                href={ROUTES.HOME}
                className="text-[#A3A3A3] hover:text-white text-[11px] font-normal tracking-wide transition-colors">
                Sitemap
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
