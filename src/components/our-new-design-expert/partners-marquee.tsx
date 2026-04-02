"use client";

import Image from "next/image";

import {
  Marquee,
  MarqueeContent,
  MarqueeItem,
  MarqueeFade,
} from "@/components/ui/marquee";

type PartnerLogo = {
  src: string;
  alt: string;
};

type PartnersMarqueeProps = {
  logos?: PartnerLogo[];
  speed?: number;
};

const clients = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  src: `/landing/home/our-client/client-${i + 1}.webp`,
  alt: `Client ${i + 1}`,
}));

export function PartnersMarquee({
  logos = clients,
  speed = 40,
}: PartnersMarqueeProps) {
  return (
    <section className="py-6 md:py-8">
      <div className="container mx-auto px-4">
        <Marquee className="relative">
          <MarqueeFade side="left" />
          <MarqueeContent speed={speed} gradient={false} pauseOnHover autoFill>
            {logos.map((logo, idx) => (
              <MarqueeItem
                className="h-16 md:h-18 w-auto px-6"
                key={`${logo.alt}-${idx}`}
              >
                <div className="relative h-full w-[110px] md:w-[170px]">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    className="object-contain"
                    loading="lazy"
                  />
                </div>
              </MarqueeItem>
            ))}
          </MarqueeContent>
          <MarqueeFade side="right" />
        </Marquee>
      </div>
    </section>
  );
}
