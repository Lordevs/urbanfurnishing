"use client";

import { ArrowUp } from "lucide-react";
import { useState, useEffect, useRef } from "react";

import { cn } from "@/lib/utils";
import { usePackages } from "@/hooks/queries/use-packages";
import { useProducts } from "@/hooks/queries/use-products";


const SECTIONS = [
  { id: "packages", label: "Select Packages" },
  { id: "single-items", label: "Shop Individually" },
  { id: "design-expert", label: "Use Our Design Expert" },
];

export default function PathwayNav() {
  const { data: packagesData } = usePackages({ is_featured: true, page_size: 4 });
  const { data: productsData } = useProducts({ is_featured: true, page_size: 4 });

  const hasPackages = (packagesData?.results?.length ?? 0) > 0;
  const hasProducts = (productsData?.results?.length ?? 0) > 0;

  const visibleSections = SECTIONS.filter((section) => {
    if (section.id === "packages") return hasPackages;
    if (section.id === "single-items") return hasProducts;
    return true;
  });

  const [activeSection, setActiveSection] = useState<string>(
    visibleSections[0]?.id || "packages",
  );

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((entry) => entry.isIntersecting);
        if (intersecting.length > 0) {
          const activeEntry = intersecting.reduce((prev, current) =>
            prev.intersectionRatio > current.intersectionRatio ? prev : current,
          );
          setActiveSection(activeEntry.target.id);
        }
      },
      {
        rootMargin: "-20% 0px -50% 0px",
        threshold: 0.1,
      },
    );

    visibleSections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });


    const handleScroll = () => {
      if (document.documentElement.scrollTop < 300) {
        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].id);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [visibleSections]);

  // Update horizontally scrolled pill container when active section changes
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const activeBtn = container.querySelector(
      `[data-section="${activeSection}"]`,
    ) as HTMLElement;
    if (activeBtn) {
      const scrollLeft =
        activeBtn.offsetLeft -
        container.offsetWidth / 2 +
        activeBtn.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [activeSection]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const scrollToHero = () => {
    const el = document.getElementById("hero");
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="hidden md:block sticky top-15 z-40 w-full px-4 sm:px-10 lg:px-16 max-w-8xl mx-auto py-4 sm:py-10 pointer-events-none -mt-4 mb-4">
      <div
        ref={scrollContainerRef}
        className="inline-flex items-center gap-2 p-1.5 rounded-full bg-card backdrop-blur-md border border-[#F0EBE3] shadow-md pointer-events-auto transition-all overflow-x-auto max-w-full no-scrollbar relative">
        <button
          onClick={scrollToHero}
          className="w-10 h-10 rounded-full cursor-pointer border border-gray-100 flex items-center justify-center bg-white shadow-sm shrink-0 hover:bg-gray-50 transition-colors"
          title="Scroll to Top">
          <ArrowUp className="w-4 h-4 text-gray-500" />
        </button>
        {visibleSections.map((section) => {

          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              data-section={section.id}
              onClick={() => scrollToSection(section.id)}
              className={cn(
                "px-4 sm:px-6 py-2.5 cursor-pointer  rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap",
                isActive
                  ? "bg-[#412A1F]/90 text-white shadow-sm"
                  : "bg-white text-gray-600 shadow-sm hover:shadow-md",
              )}>
              {section.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
