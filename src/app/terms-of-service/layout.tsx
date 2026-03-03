import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Review the Terms of Service for Urban Furnishing. These terms outline the rules and regulations for the use of our furnishing and design services.",
  openGraph: {
    title: "Terms of Service - Urban Furnishing",
    description:
      "Important terms and conditions for using Urban Furnishing services.",
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL || "https://urbanfurnishing.ae"}/terms-of-service`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_FRONTEND_URL || "https://urbanfurnishing.ae"}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Urban Furnishing Terms of Service",
      },
    ],
  },
  twitter: {
    title: "Terms of Service | Urban Furnishing",
    description:
      "Read the rules and regulations for using our furnishing services.",
  },
};

export default function TermsOfServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
