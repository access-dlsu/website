"use client";

import { SectionHeaderProps } from "./types";

export function SectionHeader({ title, className = "" }: SectionHeaderProps) {
  return (
    <h2
      className={`text-4xl md:text-5xl font-bold text-white text-center mb-16 ${className}`}
      style={{ fontFamily: "var(--font-poppins)" }}
    >
      {title}
    </h2>
  );
}

export default SectionHeader;

