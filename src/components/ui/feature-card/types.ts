import { LucideIcon } from "lucide-react";

export interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  linkText: string;
  href?: string;
  className?: string;
}

