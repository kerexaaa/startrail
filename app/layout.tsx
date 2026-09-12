import type { Metadata } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";

const InterFont = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Startrail | Interactive Solar System",
  description: "An interactive, 3D visualization of the Solar System. Explore planets, moons, and astronomical data in real-time.",
  metadataBase: new URL("https://startrail.codes"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Startrail | Interactive Solar System",
    description: "An interactive, 3D visualization of the Solar System. Explore planets, moons, and astronomical data in real-time.",
    url: "https://startrail.codes",
    siteName: "Startrail",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Startrail | Interactive Solar System",
    description: "An interactive, 3D visualization of the Solar System. Explore planets, moons, and astronomical data in real-time.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased relative ${InterFont.className}`}>
        {children}
        <SpeedInsights />
        <Analytics />
        <ToastContainer
          toastClassName={"glassmorphism text-white"}
          position="top-center"
        />
      </body>
    </html>
  );
}
