"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ActionButtonProps {
  label: string;
  mobileLabel?: string;
  href?: string;
  className?: string;
  containerClassName?: string;
  showArrow?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline";
  icon?: React.ReactNode;
  iconContainerClassName?: string;
}

export function ActionButton({
  label,
  mobileLabel,
  href,
  className,
  containerClassName,
  showArrow = true,
  onClick,
  type = "button",
  variant = "primary",
  icon,
  iconContainerClassName,
}: ActionButtonProps) {
  const isPrimary = variant === "primary";
  const isOutline = variant === "outline";

  const content = (
    <Button
      type={type}
      onClick={onClick}
      className={cn(
        "group transition-all duration-300 shadow-lg cursor-pointer",
        isPrimary &&
          "w-full sm:w-auto rounded-xl sm:rounded-full bg-[#C3A16A] sm:bg-[#3D261C] hover:bg-[#b08e58] sm:hover:bg-[#2C1A11] text-white flex items-center justify-center sm:justify-between sm:gap-5 py-2 px-6 sm:px-2.5 sm:pr-2.5 sm:pl-7 h-[48px] sm:h-[52px] text-base sm:text-[15px] font-medium sm:font-normal border-none sm:border sm:border-white/10 sm:hover:border-white/25",
        isOutline &&
          "w-full sm:w-auto rounded-xl sm:rounded-full bg-transparent sm:bg-white/70 border border-white/50 sm:border-none backdrop-blur-md text-white sm:text-[#412A1F] hover:bg-white/10 sm:hover:bg-white/90 h-[48px] sm:h-[60px] px-8 text-base font-medium sm:font-semibold shadow-black/5 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/10 flex items-center justify-center",
        className,
      )}>
      <span className="sm:hidden">{mobileLabel || label}</span>
      <span className="hidden sm:inline">{label}</span>

      {(showArrow || icon) && isPrimary && (
        <div
          className={cn(
            "hidden sm:flex bg-[#FFF8F0] rounded-full w-[30px] h-[30px] items-center justify-center text-[#412A1F] transition-transform duration-300 group-hover:scale-95 shrink-0 ml-4 sm:ml-0",
            iconContainerClassName,
          )}>
          {icon || (
            <Image
              src="/common/arrow-up.svg"
              alt="Arrow Up"
              width={12}
              height={12}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          )}
        </div>
      )}
    </Button>
  );

  if (href) {
    return (
      <Link href={href} className={cn("w-full sm:w-auto", containerClassName)}>
        {content}
      </Link>
    );
  }

  return content;
}
