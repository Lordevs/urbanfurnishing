import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number as AED currency for the UAE market.
 * e.g. formatAED(5000) → "AED 5,000"
 * e.g. formatAED(1299.50) → "AED 1,299.50"
 */
export function formatAED(amount: number): string {
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}
