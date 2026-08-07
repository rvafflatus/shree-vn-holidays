import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://desitrails.vipgaming.in'),
  title: {
    default: "DesiTrails - Explore, Experience, Embrace India",
    template: "%s | DesiTrails",
  },
  description: "Discover the best holiday tour packages, handcrafted cultural trails, and custom travel experiences across India with DesiTrails.",
  keywords: ["DesiTrails", "India tour packages", "holiday packages", "travel agency", "rajasthan tours", "cultural trails"],
  authors: [{ name: "DesiTrails" }],
  creator: "DesiTrails",
  verification: {
    google: "8oSb-59XB5ukJvL2PalBkt09gKZ12aIyL-eW0sZ2l8w",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://desitrails.vipgaming.in",
    title: "DesiTrails - Explore, Experience, Embrace India",
    description: "Discover the best holiday tour packages and custom travel experiences across India.",
    siteName: "DesiTrails",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "DesiTrails Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DesiTrails - Explore, Experience, Embrace India",
    description: "Discover the best holiday tour packages and custom travel experiences across India.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        <Navbar /> 
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}