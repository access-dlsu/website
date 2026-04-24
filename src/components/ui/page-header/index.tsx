"use client";

import { PageHeaderProps } from "./types";

export function PageHeader({
  title,
  description,
  children,
  className = "",
  centered = true,
}: PageHeaderProps) {
  return (
    <div
      className={`space-y-6 ${centered ? "text-center" : ""} ${className}`}
    >
      <h1
<<<<<<< HEAD
        className="text-5xl font-bold text-zinc-950 dark:text-white"
=======
        className="text-5xl font-bold text-white"
>>>>>>> origin/test
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        {title}
      </h1>
      {description && (
        <p
<<<<<<< HEAD
          className={`text-xl text-zinc-600 dark:text-gray-300 ${
=======
          className={`text-xl text-gray-300 ${
>>>>>>> origin/test
            centered ? "max-w-3xl mx-auto" : ""
          }`}
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          {description}
        </p>
      )}
      {children}
    </div>
  );
}

export default PageHeader;
