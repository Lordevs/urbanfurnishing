import type { Metadata } from "next";
import { Cormorant, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";
import CtaSection from "@/components/common/cta-section";

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
        className={`${cormorant.variable} ${inter.variable} antialiased`}
        suppressHydrationWarning>
        <Navbar />
        {children}
        <CtaSection />
        <Footer />
      </body>
    </html>
  );
}
