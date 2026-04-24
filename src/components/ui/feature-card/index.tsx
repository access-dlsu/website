"use client";

import { ArrowRight } from "lucide-react";
import Card from "../card";
import { FeatureCardProps } from "./types";

export function FeatureCard({
  icon: Icon,
  title,
  description,
  linkText,
  href,
  className = "",
}: FeatureCardProps) {
  return (
    <Card href={href} className={`p-8 ${className}`}>
      <Icon className="w-12 h-12 text-green-400 mb-4 group-hover:scale-110 transition-transform" />
      <h3
        className="text-2xl font-bold text-white mb-3"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        {title}
      </h3>
      <p
<<<<<<< HEAD
        className="text-white/90 mb-4"
=======
        className="text-gray-300 mb-4"
>>>>>>> origin/test
        style={{ fontFamily: "var(--font-manrope)" }}
      >
        {description}
      </p>
      <span
<<<<<<< HEAD
        className="text-white flex items-center gap-2 font-semibold"
=======
        className="text-green-400 flex items-center gap-2 font-semibold"
>>>>>>> origin/test
        style={{ fontFamily: "var(--font-manrope)" }}
      >
        {linkText} <ArrowRight className="w-4 h-4" />
      </span>
    </Card>
  );
}

export default FeatureCard;

