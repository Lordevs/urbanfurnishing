"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { navItems } from "@/lib/nav-items";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="w-full px-4 sm:px-10 lg:px-16">
        <div className="flex h-20 items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative h-10 w-12 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo.svg"
                alt="UF Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xl font-light tracking-tight text-primary">
              Furnishing
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-2 text-xs font-semibold tracking-[0.2em] transition-colors hover:text-primary ${
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}>
                <item.icon className="h-4 w-4" />
                {item.title.toUpperCase()}
                {pathname === item.href && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 h-0.5 w-full bg-primary"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link href="/contact">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-none px-8 py-6 text-sm font-medium tracking-wide transition-all duration-300 hover:shadow-lg">
                Book Consultation
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
                  className="text-gray-600 hover:bg-transparent">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[300px] border-r bg-white p-0">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <div className="flex flex-col py-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}>
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-4 px-6 py-4 text-sm font-semibold tracking-widest transition-colors hover:bg-primary/5 ${
                          pathname === item.href
                            ? "text-primary bg-primary/5"
                            : "text-muted-foreground"
                        }`}>
                        <item.icon
                          className={`h-5 w-5 ${
                            pathname === item.href
                              ? "text-primary"
                              : "text-muted-foreground/60"
                          }`}
                        />
                        {item.title.toUpperCase()}
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <div className="p-6 border-t mt-auto">
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    <Button className="w-full  bg-primary hover:bg-primary/90 text-primary-foreground rounded-none py-6 text-sm font-medium tracking-wide">
                      Book Consultation
                    </Button>
                  </Link>
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
