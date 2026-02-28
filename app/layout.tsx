import type { Metadata } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";

const InterFont = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Startrail",
  description: "track your stars",
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
        <ToastContainer toastClassName={"glassmorphism text-white"} />
      </body>
    </html>
  );
}
