"use client";

import { ElementType } from "react";
import { TextProps, TextVariant } from "./types";

const variantStyles: Record<TextVariant, string> = {
  h1: "text-5xl font-bold text-zinc-950 dark:text-white",
  h2: "text-3xl font-bold text-zinc-950 dark:text-white",
  h3: "text-xl font-semibold text-zinc-950 dark:text-white",
  h4: "text-lg font-semibold text-zinc-950 dark:text-white",
  body: "text-zinc-600 dark:text-gray-300",
  "body-relaxed": "text-zinc-600 dark:text-gray-300 leading-relaxed",
  description: "text-zinc-600 dark:text-gray-300 text-xl",
  caption: "text-sm font-semibold text-zinc-500 dark:text-gray-400 uppercase tracking-wide",
  label: "text-sm text-zinc-500 dark:text-gray-400",
};

const variantFonts: Record<TextVariant, string> = {
  h1: "var(--font-poppins)",
  h2: "var(--font-poppins)",
  h3: "var(--font-poppins)",
  h4: "var(--font-poppins)",
  body: "var(--font-manrope)",
  "body-relaxed": "var(--font-manrope)",
  description: "var(--font-manrope)",
  caption: "var(--font-manrope)",
  label: "var(--font-manrope)",
};

const defaultAs: Record<TextVariant, ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  body: "p",
  "body-relaxed": "p",
  description: "p",
  caption: "span",
  label: "span",
};

export function Text({
  children,
  variant = "body",
  as,
  className = "",
}: TextProps) {
  const Component = (as || defaultAs[variant]) as ElementType;
  const style = { fontFamily: variantFonts[variant] };

  return (
    <Component
      className={`${variantStyles[variant]} ${className}`}
      style={style}
    >
      {children}
    </Component>
  );
}

export default Text;

