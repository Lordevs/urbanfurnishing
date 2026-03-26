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

export function PartnersMarquee({
  logos = [
    { src: "/logos/grosvenor.png", alt: "Grosvenor House" },
    { src: "/logos/royal.png", alt: "Royal Meridien" },
    { src: "/logos/creek.png", alt: "Dubai Creek Resort" },
    { src: "/logos/ritz.png", alt: "The Ritz-Carlton" },
    { src: "/logos/blue.png", alt: "Blue Waters" },
    { src: "/logos/ajman.png", alt: "Ajman Saray Resort" },
    { src: "/logos/andaz.png", alt: "Andaz" },
    { src: "/logos/kempinski.png", alt: "Kempinski Hotel" },
    { src: "/logos/hilton.png", alt: "Hiton Garden Inn" },
    { src: "/logos/anantara.png", alt: "Anantara" },
    { src: "/logos/rove.png", alt: "Rove Hotels" },
    { src: "/logos/stregis.png", alt: "St. Regis" },
  ],
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
