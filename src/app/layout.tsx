import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Smart Filling Technologies — Precision Filling & Packing Machinery",
    template: "%s | Smart Filling Technologies",
  },
  description:
    "Manufacturer of semi-automatic and automatic filling, capping, labelling, and packing machinery for pharmaceutical, pesticide, and food powder industries. Engineered in India, trusted across Asia and Africa.",
  keywords: [
    "filling machine",
    "packing machinery",
    "bottle filling machine",
    "auger filler",
    "pharmaceutical machinery",
    "pesticide filling",
    "powder filling machine",
    "capping machine",
    "labelling machine",
    "industrial machinery India",
    "Smart filling machines",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Smart Filling Technologies",
    title: "Smart Filling Technologies — Precision Filling & Packing Machinery",
    description:
      "SS304 stainless steel construction, PLC + servo control, 5–6 week delivery. Exporting to Asia & South Africa.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-graphite text-white antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
