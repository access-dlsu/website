import { LucideIcon } from "lucide-react";

export interface AuthWarningProps {
  title: string;
  message: string;
  icon?: LucideIcon;
  isFading?: boolean;
  className?: string;
}

