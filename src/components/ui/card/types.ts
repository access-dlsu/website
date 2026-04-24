import { ReactNode } from "react";

export type CardSize = "sm" | "md" | "lg" | "xl" | "full";

export interface CardProps {
  children: ReactNode;
  className?: string;
  size?: CardSize;
  href?: string;
}

export const cardSizeClasses: Record<CardSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "w-full",
};
