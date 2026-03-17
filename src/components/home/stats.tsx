"use client";

import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const stats = [
  {
    label: "Properties Furnished",
    mobileLabel: "Projects",
    value: 500,
    suffix: "+",
  },
  {
    label: "Client Satisfaction",
    mobileLabel: "Satisfied",
    value: 98,
    suffix: "%",
  },
  {
    label: "Years Excellence",
    mobileLabel: "Years",
    value: 15,
    suffix: "+",
  },
];

function Counter({
  value,
  direction = "up",
}: {
  value: number;
  direction?: "up" | "down";
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px 0px" });

  const spring = useSpring(direction === "up" ? 0 : value, {
    mass: 1,
    stiffness: 250,
    damping: 20,
  });

  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString(),
  );

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

export default function Stats() {
  return (
    <section className="bg-white pt-2 lg:py-10">
      <div className="max-w-8xl mx-auto px-4 sm:px-10 lg:px-16">
        <div className="grid grid-cols-3 gap-4 sm:gap-14 lg:gap-24 items-center justify-items-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col gap-1.5 sm:gap-3 items-center text-center group">
              <span className="text-3xl sm:text-5xl leading-none font-serif font-bold text-[#412A1F] tracking-tight group-hover:text-[#C9A76A] transition-colors duration-300">
                <Counter value={stat.value} />
                {stat.suffix}
              </span>
              <div className="flex flex-col">
                <span className="text-[10px] sm:text-[13px] lg:text-sm text-[#7A7A7A] font-medium tracking-wide whitespace-nowrap uppercase">
                  <span className="sm:hidden">{stat.mobileLabel}</span>
                  <span className="hidden sm:inline">{stat.label}</span>
                </span>
                <div className="w-8 h-0.5 bg-[#C9A76A]/30 mx-auto mt-2 sm:mt-3 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
