import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const SecondaryButton = ({
  label,
  href,
  className,
}: {
  label: string | React.ReactNode;
  href: string;
  className?: string;
}) => {
  return (
    <Link href={href}>
      <Button
        variant="outline"
        style={{
          backgroundColor: "#FFFFFF99",
        }}
        className={cn(
          "w-full sm:w-auto rounded-full border border-[#5D4E3C33] [#412A1F] hover:bg-white/90 h-auto py-2.5 md:px-6 md:h-max md:text-base font-medium sm:font-semibold transition-all duration-300 shadow-lg shadow-black/5 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/10",
          className,
        )}
      >
        {label}
      </Button>
    </Link>
  );
};
