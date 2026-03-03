import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Furnishing Packages",
  description:
    "Explore our three structured furnishing pathways: Investor Turnkey, End User Signature, and Developer Bulk. Find the perfect tailored package for your property.",
  openGraph: {
    title: "Urban Furnishing Packages - Investor, End User & Developer",
    description:
      "Tailored furnishing solutions. Each package is priced clearly with defined scope and timeline, designed for different client types and property needs.",
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL || "https://urbanfurnishing.ae"}/packages`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_FRONTEND_URL || "https://urbanfurnishing.ae"}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Urban Furnishing Packages",
      },
    ],
  },
  twitter: {
    title: "Furnishing Packages | Urban Furnishing",
    description:
      "Tailored furnishing solutions priced clearly with defined scope and timelines for your property needs.",
  },
};

export default function HowWeWorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
