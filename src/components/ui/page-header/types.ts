import { ReactNode } from "react";

export interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  centered?: boolean;
}
