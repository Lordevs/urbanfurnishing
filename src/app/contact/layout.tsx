import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Urban Furnishing. We provide tailored interior design solutions and turnkey furnishing packages for properties. Contact us today.",
  openGraph: {
    title: "Contact Urban Furnishing",
    description:
      "Ready to furnish your property? Get in touch with our team of experts to discuss our tailored furnishing packages today.",
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL || "https://urbanfurnishing.ae"}/contact`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_FRONTEND_URL || "https://urbanfurnishing.ae"}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Contact Urban Furnishing",
      },
    ],
  },
  twitter: {
    title: "Contact Urban Furnishing | Furnishing Packages",
    description:
      "Ready to furnish your property? Get in touch with our team to discuss our tailored interior design solutions.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
