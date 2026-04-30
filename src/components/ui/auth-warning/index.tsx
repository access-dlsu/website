"use client";

import { Lock } from "lucide-react";
import { AuthWarningProps } from "./types";

export function AuthWarning({
  title,
  message,
  icon: Icon = Lock,
  isFading = false,
  className = "",
}: AuthWarningProps) {
  return (
    <div
      className={`auth-warning-container ${isFading ? "auth-warning-fade-out" : ""} ${className}`}
    >
      <Icon className="w-12 h-12 text-zinc-500 dark:text-gray-400 mx-auto mb-4" />
      <h3
        className="text-xl font-semibold text-zinc-950 dark:text-white mb-2"
        style={{ fontFamily: "var(--font-manrope)" }}
      >
        {title}
      </h3>
      <p
        className="text-zinc-600 dark:text-gray-400"
        style={{ fontFamily: "var(--font-manrope)" }}
      >
        {message}
      </p>
    </div>
  );
}

export default AuthWarning;

