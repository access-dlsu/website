"use client";

import { EmptyStateProps } from "./types";

export function EmptyState({ message, className = "" }: EmptyStateProps) {
  return (
    <div className={`text-center py-12 ${className}`}>
      <p
<<<<<<< HEAD
        className="text-zinc-600 dark:text-gray-400 text-lg"
=======
        className="text-gray-400 text-lg"
>>>>>>> origin/test
        style={{ fontFamily: "var(--font-manrope)" }}
      >
        {message}
      </p>
    </div>
  );
}

export default EmptyState;

