import type { Metadata } from "next";
import { Cormorant, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";
import { Toaster } from "@/components/ui/sonner";

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_FRONTEND_URL || "https://urbanfurnishing.ae",
  ),
  title: {
    default: "Urban Furnishing - Premium Furnishing Packages & Interior Design",
    template: "%s | Urban Furnishing",
  },
  description:
    "Expertly crafted furnishing packages designed for investors, end-users, and developers. Delivered on time. Priced clearly. Managed end-to-end.",
  keywords: [
    "furnishing packages",
    "turnkey furnishing",
    "interior design Dubai",
    "investor furniture packs",
    "developer furnishing solutions",
    "custom furniture",
    "Urban Furnishing",
    "property furnishing",
    "signature interior design",
  ],
  authors: [{ name: "Urban Furnishing" }],
  creator: "Urban Furnishing",
  publisher: "Urban Furnishing",
  // Icons and logos
  icons: {
    icon: [
      { url: "/common/logo.svg", sizes: "32x32", type: "image/svg+xml" },
      { url: "/common/logo.svg", sizes: "16x16", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/common/logo.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
    other: [{ rel: "mask-icon", url: "/common/logo.svg", color: "#8E7D62" }],
  },
  // Open Graph metadata
  openGraph: {
    title: "Urban Furnishing - Premium Furnishing Packages & Interior Design",
    description:
      "Three structured pathways for property furnishing: Investor Turnkey, End User Signature, and Developer Bulk. Managed end-to-end.",
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL || "https://urbanfurnishing.ae"}/`,
    siteName: "Urban Furnishing",
    locale: "en_AE",
    type: "website",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_FRONTEND_URL || "https://urbanfurnishing.ae"}/opengraph-image.png`,
        alt: "Urban Furnishing OpenGraph Image",
      },
    ],
  },
  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Urban Furnishing | Premium Furnishing Packages",
    description:
      "Delivered on time. Priced clearly. Managed end-to-end. Explore our furnishing packages designed for properties.",
    images: [
      `${process.env.NEXT_PUBLIC_FRONTEND_URL || "https://urbanfurnishing.ae"}/opengraph-image.png`,
    ],
  },
  // Additional meta tags
  other: {
    "msapplication-TileColor": "#8E7D62",
    "msapplication-TileImage": `${process.env.NEXT_PUBLIC_FRONTEND_URL || "https://urbanfurnishing.ae"}/common/logo.svg`,
    "application-name": "Urban Furnishing",
    "apple-mobile-web-app-title": "Urban Furnishing",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${cormorant.variable} ${inter.variable} antialiased`}
        suppressHydrationWarning>
        <Navbar />
        <Toaster richColors position="top-right" duration={3000} closeButton />
        {children}
        <Footer />
      </body>
    </html>
  );
}
