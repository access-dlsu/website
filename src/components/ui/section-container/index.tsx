"use client";

import { SectionContainerProps } from "./types";

export function SectionContainer({
  children,
  className = "",
  containerClassName = "",
}: SectionContainerProps) {
  return (
    <section className={`py-20 px-6 ${className}`}>
      <div className={`max-w-7xl mx-auto ${containerClassName}`}>{children}</div>
    </section>
  );
}

export default SectionContainer;

