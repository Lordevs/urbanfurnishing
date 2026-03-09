"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu } from "lucide-react";
import { navItems } from "@/lib/nav-items";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/route";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}>
      <div className="w-full px-4 sm:px-10 lg:px-16">
        <div className="flex h-20 items-center justify-between">
          {/* Logo Section */}
          <Link
            href={ROUTES.HOME}
            className="flex items-center gap-2 group shrink-0">
            <div className="relative h-10 w-12 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/common/logo.svg"
                alt="UF Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-[#412A1F]/90 text-white"
                      : "text-foreground hover:text-primary"
                  }`}>
                  {item.title}
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center">
            <Link href={ROUTES.BOOK_CONSULTATION}>
              <Button className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-3 pr-2 pl-7 h-12 text-sm font-medium transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]">
                Get in Touch
                <div className="bg-white rounded-full p-1.5 text-primary flex items-center justify-center">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open navigation menu"
                  className="text-primary hover:bg-primary/5">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] bg-white p-0">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b">
                    <SheetTitle className="text-xl font-light tracking-tight text-primary">
                      Navigation
                    </SheetTitle>
                  </div>

                  <div className="flex-1 overflow-y-auto py-4">
                    {navItems.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center gap-4 px-8 py-4 text-md font-medium transition-all ${
                            isActive
                              ? "text-primary bg-primary/5 border-l-4 border-primary"
                              : "text-muted-foreground hover:bg-gray-50"
                          }`}>
                          <item.icon
                            className={`h-5 w-5 ${isActive ? "text-primary" : "text-muted-foreground"}`}
                          />
                          {item.title}
                        </Link>
                      );
                    })}
                  </div>

                  <div className="p-8 border-t bg-gray-50/50">
                    <Link
                      href={ROUTES.BOOK_CONSULTATION}
                      onClick={() => setIsOpen(false)}>
                      <Button className="w-full rounded-full bg-[#412A1F] hover:bg-primary/90 text-white flex items-center justify-between px-8 h-14 text-md font-medium shadow-lg transition-transform active:scale-95">
                        Get in Touch
                        <div className="bg-white rounded-full p-2 text-[#412A1F]">
                          <ArrowUpRight className="h-5 w-5" />
                        </div>
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
