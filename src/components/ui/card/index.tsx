"use client";

import Link from "next/link";
import { CardProps, cardSizeClasses } from "./types";

export function Card({
  children,
  className = "",
  size = "md",
  href,
}: CardProps) {
  const cardContent = (
    <div
      className={`
        glass-card-3d p-8 rounded-2xl transition-all group
        ${cardSizeClasses[size]}
        ${className}
      `}
    >
      {children}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className={size === "full" ? "block w-full" : "block"}>
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

export default Card;
