"use client";

import { EmptyStateProps } from "./types";

export function EmptyState({ message, className = "" }: EmptyStateProps) {
  return (
    <div className={`text-center py-12 ${className}`}>
      <p
        className="text-gray-400 text-lg"
        style={{ fontFamily: "var(--font-manrope)" }}
      >
        {message}
      </p>
    </div>
  );
}

export default EmptyState;

