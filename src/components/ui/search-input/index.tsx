"use client";

import { Search } from "lucide-react";
import { SearchInputProps } from "./types";

export function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  icon: Icon = Search,
  className = "",
}: SearchInputProps) {
  return (
    <div className={`mb-8 ${className}`}>
      <div className="relative max-w-2xl mx-auto search-bar">
<<<<<<< HEAD
        <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500 dark:text-gray-400 w-5 h-5 z-10 pointer-events-none" />
=======
        <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10 pointer-events-none" />
>>>>>>> origin/test
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
<<<<<<< HEAD
          className="w-full pl-12 pr-4 py-3 bg-transparent text-zinc-950 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-gray-400 focus:outline-none relative"
=======
          className="w-full pl-12 pr-4 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none relative"
>>>>>>> origin/test
          style={{ fontFamily: "var(--font-manrope)" }}
        />
      </div>
    </div>
  );
}

export default SearchInput;

