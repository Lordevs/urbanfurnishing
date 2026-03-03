import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the Privacy Policy for Urban Furnishing to understand how we collect, use, and protect your personal information.",
  openGraph: {
    title: "Privacy Policy - Urban Furnishing",
    description:
      "Understand how Urban Furnishing handles your data and privacy.",
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL || "https://urbanfurnishing.ae"}/privacy-policy`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_FRONTEND_URL || "https://urbanfurnishing.ae"}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Urban Furnishing Privacy Policy",
      },
    ],
  },
  twitter: {
    title: "Privacy Policy | Urban Furnishing",
    description:
      "Read our privacy policy to see how we protect your information.",
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
