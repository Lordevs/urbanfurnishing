import { Inter } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";
import { CartProvider } from "@/lib/cart-context";
import { Toaster } from "@/components/ui/sonner";
import { Metadata } from "next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const lufga = localFont({
  src: [
    { path: "./font/LufgaThin.woff", weight: "100", style: "normal" },
    { path: "./font/LufgaThinItalic.woff", weight: "100", style: "italic" },
    { path: "./font/LufgaExtraLight.woff", weight: "200", style: "normal" },
    {
      path: "./font/LufgaExtraLightItalic.woff",
      weight: "200",
      style: "italic",
    },
    { path: "./font/LufgaLight.woff", weight: "300", style: "normal" },
    { path: "./font/LufgaLightItalic.woff", weight: "300", style: "italic" },
    { path: "./font/LufgaRegular.woff", weight: "400", style: "normal" },
    { path: "./font/LufgaItalic.woff", weight: "400", style: "italic" },
    { path: "./font/LufgaMedium.woff", weight: "500", style: "normal" },
    { path: "./font/LufgaMediumItalic.woff", weight: "500", style: "italic" },
    { path: "./font/LufgaSemiBold.woff", weight: "600", style: "normal" },
    { path: "./font/LufgaSemiBoldItalic.woff", weight: "600", style: "italic" },
    { path: "./font/LufgaBold.woff", weight: "700", style: "normal" },
    { path: "./font/LufgaBoldItalic.woff", weight: "700", style: "italic" },
    { path: "./font/LufgaExtraBold.woff", weight: "800", style: "normal" },
    {
      path: "./font/LufgaExtraBoldItalic.woff",
      weight: "800",
      style: "italic",
    },
    { path: "./font/LufgaBlack.woff", weight: "900", style: "normal" },
    { path: "./font/LufgaBlackItalic.woff", weight: "900", style: "italic" },
  ],
  variable: "--font-lufga",
});

export const metadata: Metadata = {
  title: "Urban Furnishing",
  description: "Urban Furnishing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${lufga.variable} antialiased`}
        suppressHydrationWarning>
        <CartProvider>
          <Navbar />
          <Toaster richColors position="top-right" duration={3000} />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
