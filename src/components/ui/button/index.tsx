"use client";

import Link from "next/link";
import { ButtonProps } from "./types";

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const variantClasses = {
    primary: "hero-button-primary text-white",
    secondary: "hero-button-secondary text-gray-300",
  };

  return (
    <Link
      href={href}
      className={`px-8 py-4 rounded-full transition-all font-semibold text-lg hover:scale-105 ${variantClasses[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

export default Button;

