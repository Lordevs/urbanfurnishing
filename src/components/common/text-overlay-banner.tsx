"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface TextOverlayBannerProps {
  imageSrc: string;
  imageAlt?: string;
  text: React.ReactNode;
}

const TextOverlayBanner = ({
  imageSrc,
  imageAlt = "Interior Detail",
  text,
}: TextOverlayBannerProps) => {
  return (
    <section className="relative w-full h-[40vh] md:h-[80vh] overflow-hidden">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover"
        quality={95}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Text Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-4xl text-[45px] font-sans font-light text-white leading-[1.3] md:leading-[1.4] tracking-wide">
          {text}
        </motion.h2>
      </div>
    </section>
  );
};

export default TextOverlayBanner;
