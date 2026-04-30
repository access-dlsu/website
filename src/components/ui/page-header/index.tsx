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
        className="text-5xl font-bold text-zinc-950 dark:text-white"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        {title}
      </h1>
      {description && (
        <p
          className={`text-xl text-zinc-600 dark:text-gray-300 ${
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
