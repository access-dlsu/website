"use client";

import { SectionHeaderProps } from "./types";

export function SectionHeader({ title, className = "" }: SectionHeaderProps) {
  return (
    <h2
<<<<<<< HEAD
      className={`text-4xl md:text-5xl font-bold text-zinc-950 dark:text-white text-center mb-16 ${className}`}
=======
      className={`text-4xl md:text-5xl font-bold text-white text-center mb-16 ${className}`}
>>>>>>> origin/test
      style={{ fontFamily: "var(--font-poppins)" }}
    >
      {title}
    </h2>
  );
}

export default SectionHeader;

