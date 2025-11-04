"use client";

import { FilterButtonProps } from "./types";

export function FilterButton({
  label,
  icon: Icon,
  isActive,
  onClick,
  className = "",
}: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`category-filter ${isActive ? "category-filter-active" : ""} flex items-center gap-2 px-6 py-3 font-medium text-gray-300 ${className}`}
      style={{ fontFamily: "var(--font-manrope)" }}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
}

export default FilterButton;

