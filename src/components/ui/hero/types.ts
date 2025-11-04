import { ReactNode } from "react";

export interface HeroProps {
  title: ReactNode;
  subtitle?: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}

