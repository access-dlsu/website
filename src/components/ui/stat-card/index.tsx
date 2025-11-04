"use client";

import Card from "../card";
import { StatCardProps } from "./types";

export function StatCard({
  icon: Icon,
  value,
  title,
  description,
  className = "",
}: StatCardProps) {
  return (
    <Card className={`p-8 text-center ${className}`}>
      <Icon className="w-12 h-12 text-green-400 mb-4 group-hover:scale-110 transition-transform mx-auto" />
      <div
        className="text-5xl font-bold text-green-400 mb-3"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        {value}
      </div>
      <h3
        className="text-2xl font-bold text-white mb-3"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        {title}
      </h3>
      <p
        className="text-gray-300 mb-4"
        style={{ fontFamily: "var(--font-manrope)" }}
      >
        {description}
      </p>
    </Card>
  );
}

export default StatCard;

