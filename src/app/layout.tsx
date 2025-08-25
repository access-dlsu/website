import type { Metadata, Viewport } from "next";
import React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

import "./globals.css";

export const metadata: Metadata = {
  title: "ACCESS DLSU",
  description: "The official website of ACCESS DLSU, the professional organization for Computer Engineering students.",
  authors: [{ name: "ACCESS DLSU", url: "https://fb.com/AccessDLSU" }],
  keywords: ["ACCESS", "DLSU", "De La Salle University", "Computer Engineering"],
  openGraph: {
    title: "ACCESS DLSU",
    description: "The official website of ACCESS DLSU, the professional organization for Computer Engineering students.",
    images: [{
      url: "https://accessdlsu.com/logo/access_wordmark.png",
    }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@access_cares",
    creator: "@access_cares",
    title: "ACCESS DLSU",
    description: "The official website of ACCESS DLSU, the professional organization for Computer Engineering students.",
    images: ["https://accessdlsu.com/logo/access_wordmark.png"],
  },
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
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
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
