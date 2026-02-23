"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const InteriorDetail = () => {
  return (
    <section className="relative w-full h-[40vh] md:h-[80vh] overflow-hidden">
      <Image
        src="/home/Interior-detail.webp"
        alt="Interior Detail"
        fill
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Text Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-5xl text-4xl md:text-6xl lg:text-[72px] font-sans font-normal text-white leading-[1.15] md:leading-[1.2] tracking-wide">
          Delivered on time. <br />
          Priced clearly. <br />
          Managed end-to-end.
        </motion.h2>
      </div>
    </section>
  );
};

export default InteriorDetail;
