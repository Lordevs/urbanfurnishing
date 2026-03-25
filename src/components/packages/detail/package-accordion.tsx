"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function PackageAccordion({
  title,
  children,
  defaultOpen = false,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left group"
      >
        <span className="text-xs font-bold text-[#412A1F] uppercase tracking-wider">
          {title}
        </span>
        {isOpen ? (
          <Minus className="w-3.5 h-3.5 text-gray-800" />
        ) : (
          <Plus className="w-3.5 h-3.5 text-gray-800" />
        )}
      </button>
      {isOpen && (
        <div className="pb-6 animate-in fade-in slide-in-from-top-1">
          {children}
        </div>
      )}
    </div>
  );
}
