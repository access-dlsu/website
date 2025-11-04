import { LucideIcon } from "lucide-react";

export interface FilterButtonProps {
  id: string;
  label: string;
  icon: LucideIcon;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

