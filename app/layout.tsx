import type { Metadata } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";

const InterFont = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Startrail",
  description: "track your stars",
  robots: {
    index: false,
    follow: false,
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
