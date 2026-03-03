import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Discover Urban Furnishing, a premier provider of complete furnishing packages for investors, end-users, and developers. Learn about our end-to-end managed interior design process and commitment to quality.",
  openGraph: {
    title: "About Urban Furnishing - Premium Interior Design",
    description:
      "Learn about our end-to-end managed process and how we help property owners transform their spaces with premium furnishing packages.",
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL || "https://urbanfurnishing.ae"}/about`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_FRONTEND_URL || "https://urbanfurnishing.ae"}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "About Urban Furnishing",
      },
    ],
  },
  twitter: {
    title: "About Urban Furnishing | Premium Furnishing Packages",
    description:
      "Discover our streamlined approach to property furnishing for investors and homeowners.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
