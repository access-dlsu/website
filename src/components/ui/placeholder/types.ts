import * as LucideIcons from "lucide-react";

// Extract the valid icon names from LucideIcons
type LucideIconName = keyof typeof LucideIcons;

export interface PlaceholderProps {
  title?: string;
  message?: string;
  icon?: LucideIconName;
  className?: string;
  cardSize?: "sm" | "md" | "lg" | "xl" | "full";
  children?: React.ReactNode;
}
