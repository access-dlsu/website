'use client';

import Header from "./header";
import { Footer } from "./footer";
import ScrollToTopButton from "./scroll-to-top-button";
import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <ScrollToTopButton />
    </>
  );
}
