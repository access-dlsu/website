import { LucideIcon } from "lucide-react";

export interface FilterOption {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface FilterGroupProps {
  options: FilterOption[];
  selectedId: string;
  onSelect: (id: string) => void;
  className?: string;
}

