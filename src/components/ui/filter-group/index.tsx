"use client";

import FilterButton from "../filter-button";
import { FilterGroupProps, FilterOption } from "./types";

export type { FilterOption };

export function FilterGroup({
  options,
  selectedId,
  onSelect,
  className = "",
}: FilterGroupProps) {
  return (
    <div className={`flex flex-wrap gap-3 justify-center mb-12 ${className}`}>
      {options.map((option) => (
        <FilterButton
          key={option.id}
          id={option.id}
          label={option.label}
          icon={option.icon}
          isActive={selectedId === option.id}
          onClick={() => onSelect(option.id)}
        />
      ))}
    </div>
  );
}

export default FilterGroup;

