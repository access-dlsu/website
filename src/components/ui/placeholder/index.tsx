"use client";

import * as LucideIcons from "lucide-react";
import Card from "../card";
import { PlaceholderProps } from "./types";

export function Placeholder({
  title = "Coming Soon",
  message = "This content is currently being developed. Please check back later.",
  icon = "History",
  className = "",
  cardSize = "full",
  children,
}: PlaceholderProps) {
  // Dynamically get the icon component from Lucide icons with proper typing
  const IconComponent = LucideIcons[icon] as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;
  const Icon = IconComponent || LucideIcons.History;

  return (
    <Card size={cardSize} className={`p-12 ${className}`}>
      <div className="flex flex-col items-center space-y-6">
        <Icon className="w-16 h-16 text-green-400" />
        <div className="space-y-4">
          <h2
<<<<<<< HEAD
            className="text-2xl font-bold text-zinc-950 dark:text-white text-center"
=======
            className="text-2xl font-bold text-white text-center"
>>>>>>> origin/test
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {title}
          </h2>
          <p
<<<<<<< HEAD
            className="text-zinc-600 dark:text-gray-400 text-lg text-center"
=======
            className="text-gray-400 text-lg text-center"
>>>>>>> origin/test
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {message}
          </p>
          {children}
        </div>
      </div>
    </Card>
  );
}

export default Placeholder;
