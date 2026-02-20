"use client";

import { useEffect, useRef } from "react";
import {
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  motion,
} from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  className?: string;
  suffix?: string;
}

export function AnimatedNumber({
  value,
  className,
  suffix = "",
}: AnimatedNumberProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const displayValue = useTransform(springValue, (latest) =>
    Math.round(latest).toLocaleString(),
  );

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  return (
    <span ref={ref} className={className}>
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
}
