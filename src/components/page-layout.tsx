'use client';

import Header from "./header";
import { Footer } from "./footer";
import ScrollToTopButton from "./scroll-to-top-button";
import { DuoFold } from "./duo-fold";
import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      {/* Duo-like frosted-glass fold: inert unless the device is in a
          segmented (folded) posture. */}
      <DuoFold />
      <Header />
      {children}
      <Footer />
      <ScrollToTopButton />
    </>
  );
}
