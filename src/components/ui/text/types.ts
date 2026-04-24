import { ReactNode } from "react";

export type TextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "body"
  | "body-relaxed"
  | "description"
  | "caption"
  | "label";

export type TextAs = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";

export interface TextProps {
  children: ReactNode;
  variant?: TextVariant;
  as?: TextAs;
  className?: string;
}

