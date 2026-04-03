import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

export const PrimaryButton = ({
  href,
  label,
  mbLabel,
  className,
  iconClassName,
}: {
  href: string;
  label: string;
  mbLabel?: string;
  className?: string;
  iconClassName?: string;
}) => {
  return (
    <Link href={href}>
      <Button
        className={cn(
          "w-full sm:w-auto group rounded-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center sm:justify-between sm:gap-3 py-2 sm:pr-2 sm:pl-7 h-11 md:h-12 text-sm md:text-[15px] font-normal transition-all duration-300 shadow-none sm:border border-[#413D3D] hover:border-[#413D3D]/25",
          className,
        )}>
        <span className="sm:hidden text-white">{mbLabel || label}</span>
        <span className="hidden sm:inline text-white">{label}</span>
        <div
          className={cn(
            "flex bg-[#FFF8F0] rounded-full w-[26px] h-[26px] md:w-[30px] md:h-[30px] items-center justify-center text-[#412A1F] transition-transform duration-300 group-hover:scale-95 shrink-0",
            iconClassName,
          )}>
          <Image
            src="/common/arrow-up.svg"
            alt="Arrow Up"
            width={16}
            height={16}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 w-3.5 h-3.5 md:h-4 md:w-4"
          />
        </div>
      </Button>
    </Link>
  );
};
