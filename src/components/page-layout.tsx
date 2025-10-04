'use client';

import Header from "./header";
import { Footer } from "./footer";
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
    </>
  );
}
