import type { Metadata, Viewport } from "next";
import React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

import "./globals.css";

export const metadata: Metadata = {
  title: "ACCESS DLSU",
  description: "The official website of ACCESS DLSU.",
};
export const viewport: Viewport = {
  themeColor: "#26602f",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
