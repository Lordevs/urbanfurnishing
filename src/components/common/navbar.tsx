"use client";

import { ArrowUpRight, Menu, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { ROUTES } from "@/constants/route";
import { useCart } from "@/context/cart-context";
import { navItems } from "@/lib/nav-items";

import { PrimaryButton } from "./primary-button";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const { items } = useCart();

  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Pages that feature a dark hero section and need a transparent navbar with white text at the top
  const pagesWithHero = [
    ROUTES.HOME,
    ROUTES.PACKAGES,
    ROUTES.OUR_NEW_DESIGN_EXPERT,
    ROUTES.BOOK_CONSULTATION,
    ROUTES.CART,
    ROUTES.SINGLE_PRODUCTS,
  ];

  // Specific check: /packages/[id] NO hero, but /single-products/[id] DOES have a hero
  const hasHero =
    pagesWithHero.includes(pathname) ||
    pathname.startsWith(ROUTES.SINGLE_PRODUCTS);

  // Use scrolled style if scrolled OR if the page doesn't have a hero
  const isNavOpaque = isScrolled || !hasHero;

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isNavOpaque ? "bg-white/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      {/* Promo Banner */}
      <Link
        href={ROUTES.PACKAGES}
        className={`flex h-10 w-full items-center justify-center px-4 transition-all duration-300 bg-primary text-white`}
      >
        <p className="text-[10px] sm:text-[11px] font-medium tracking-widest text-center">
          15% OFF BULK ORDERS — VISIT OUR PACKAGES STORE →
        </p>
      </Link>

      <div className="w-full px-4 sm:px-10 lg:px-16">
        <div className="flex h-18 items-center justify-between">
          {/* Logo Section */}
          <Link
            href={ROUTES.HOME}
            className="flex items-center gap-2 group shrink-0"
          >
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
              const isActive =
                item.href === ROUTES.HOME
                  ? pathname === item.href
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-[#412A1F]/90 text-white"
                      : isNavOpaque
                        ? "text-[#412A1F] hover:text-primary"
                        : "text-white hover:text-white/80"
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Cart Icon - Both Mobile (visible) and Desktop */}
            <Link
              href={ROUTES.CART}
              className="relative p-2.5 rounded-full hover:bg-white/10 transition-colors group"
            >
              <ShoppingCart
                className={`h-6 w-6 transition-colors ${
                  isNavOpaque ? "text-[#412A1F]" : "text-white"
                } group-hover:text-primary`}
              />
              {mounted && totalQuantity > 0 && (
                <span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#C9A76A] text-[10px] font-bold text-white shadow-sm ring-2 ring-white animate-in zoom-in-50 duration-300">
                  {totalQuantity}
                </span>
              )}
            </Link>

            {/* Desktop CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <PrimaryButton
                href={ROUTES.BOOK_CONSULTATION}
                label="Get in Touch"
                mbLabel="Get in Touch"
              />
            </div>

            {/* Mobile Menu Trigger */}
            <div className="lg:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Open navigation menu"
                    className={`h-11 w-11 ${
                      isNavOpaque ? "text-[#412A1F]" : "text-white"
                    } hover:bg-white/10`}
                  >
                    <Menu className="h-7 w-7" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[320px] bg-white p-0">
                  <div className="flex flex-col h-full">
                    <SheetTitle className="sr-only">Navigation</SheetTitle>

                    {/* Mobile Sidebar Logo */}
                    <div className="p-6 border-b border-gray-100/50">
                      <Link
                        href={ROUTES.HOME}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2 group"
                      >
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
                    </div>

                    <div className="flex-1 overflow-y-auto">
                      {navItems.map((item) => {
                        const isActive =
                          item.href === ROUTES.HOME
                            ? pathname === item.href
                            : pathname.startsWith(item.href);
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-4 px-4 py-4 text-md font-medium transition-all ${
                              isActive
                                ? "text-primary bg-primary/5 border-l-4 border-primary"
                                : "text-muted-foreground hover:bg-gray-50"
                            }`}
                          >
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
                        onClick={() => setIsOpen(false)}
                      >
                        <Button className="w-full rounded-full bg-[#412A1F] hover:bg-primary/90 text-white flex items-center justify-between px-8 h-14 text-md font-medium shadow-lg transition-transform active:scale-95 cursor-pointer">
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
      </div>
    </nav>
  );
};

export default Navbar;
