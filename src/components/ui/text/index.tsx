"use client";

import { TextProps } from "./types";

const variantStyles: Record<TextProps["variant"], string> = {
  h1: "text-5xl font-bold text-white",
  h2: "text-3xl font-bold text-white",
  h3: "text-xl font-semibold text-white",
  h4: "text-lg font-semibold text-white",
  body: "text-gray-300",
  "body-relaxed": "text-gray-300 leading-relaxed",
  description: "text-gray-300 text-xl",
  caption: "text-sm font-semibold text-gray-400 uppercase tracking-wide",
  label: "text-sm text-gray-400",
};

const variantFonts: Record<TextProps["variant"], string> = {
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

const defaultAs: Record<TextProps["variant"], TextProps["as"]> = {
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
  const Component = as || defaultAs[variant];
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

