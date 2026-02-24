import { ROUTES } from "@/constants/route";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#FAFAFA]  border-t border-[#F2F0E8] pt-12 md:pt-20 pb-8 px-4 sm:px-6 md:px-12 lg:px-24 text-[#9A8C7A]">
      <div className=" mx-auto flex flex-col">
        <div className="flex flex-col lg:flex-row justify-between mb-16 md:mb-24 gap-12">
          {/* Logo & Description */}
          <div className="max-w-md">
            <div className="flex items-end gap-3 mb-6">
              <Image
                src="/common/logo.svg"
                alt="UH Furnishing Logo"
                width={48}
                height={40}
                className="w-12 h-auto"
              />
              <span className="text-xl font-light tracking-wide text-[#8E7D62]">
                Furnishing
              </span>
            </div>
            <p className="font-light text-sm leading-relaxed max-w-sm">
              Turnkey furnishing & fit-out solutions for investors,{" "}
              <br className="hidden sm:block" />
              homeowners, and developers across the UAE.
            </p>
          </div>

          {/* Links Columns */}
          <div className="flex flex-col sm:flex-row gap-12 sm:gap-16 md:gap-48 mr-0 lg:mr-4 xl:mr-20">
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-widest text-[#B2A081] mb-6">
                Company
              </h4>
              <ul className="space-y-4 text-[13px] font-light">
                <li>
                  <Link
                    href={ROUTES.ABOUT}
                    className="hover:text-[#8E7D62] hover:font-bold hover:underline transition-all duration-300">
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href={ROUTES.HOW_WE_WORK}
                    className="hover:text-[#8E7D62] hover:font-bold hover:underline transition-all duration-300">
                    How We Work
                  </Link>
                </li>
                <li>
                  <Link
                    href={ROUTES.PACKAGES}
                    className="hover:text-[#8E7D62] hover:font-bold hover:underline transition-all duration-300">
                    Packages
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-widest text-[#B2A081] mb-6">
                Contact
              </h4>
              <ul className="space-y-4 text-[13px] font-light">
                <li>
                  <Link
                    href={ROUTES.CONTACT}
                    className="hover:text-[#8E7D62] hover:font-bold hover:underline transition-all duration-300">
                    Book Consultation
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="w-full h-px bg-[#EAE6DF] mb-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-[11px] font-light tracking-wide gap-4 text-center md:text-left">
          <p>© 2026 UH Furnishing. All rights reserved.</p>
          <div className="flex items-center justify-center md:justify-end gap-6 md:gap-8">
            <Link
              href={ROUTES.PRIVACY_POLICY}
              className="hover:text-[#8E7D62] hover:font-bold hover:underline transition-all duration-300">
              Privacy Policy
            </Link>
            <Link
              href={ROUTES.TERMS_OF_SERVICE}
              className="hover:text-[#8E7D62] hover:font-bold hover:underline transition-all duration-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
