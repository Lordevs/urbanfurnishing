import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How We Work",
  description:
    "Learn about Urban Furnishing's seamless end-to-end process. From initial consultation to final installation, we manage every detail of your property furnishing project.",
  openGraph: {
    title: "How We Work - The Urban Furnishing Process",
    description:
      "Discover our streamlined, hassle-free process for delivering premium furnishing packages on time and within budget.",
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL || "https://urbanfurnishing.ae"}/how-we-work`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_FRONTEND_URL || "https://urbanfurnishing.ae"}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "How Urban Furnishing Works",
      },
    ],
  },
  twitter: {
    title: "How We Work | Urban Furnishing Process",
    description:
      "Discover our streamlined, hassle-free process for delivering premium furnishing packages on time.",
  },
};

export default function HowWeWorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
