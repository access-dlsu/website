"use client";

import { HeroProps } from "./types";

export function Hero({
  title,
  subtitle,
  description,
  actions,
  className = "",
}: HeroProps) {
  return (
    <section className={`min-h-screen flex items-center justify-center px-6 ${className}`}>
      <div className="max-w-5xl mx-auto text-center space-y-8">
        <h1
<<<<<<< HEAD
          className="text-6xl md:text-7xl font-bold text-zinc-950 dark:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
=======
          className="text-6xl md:text-7xl font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
>>>>>>> origin/test
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
<<<<<<< HEAD
            className="text-2xl md:text-3xl text-zinc-700 dark:text-gray-200 max-w-3xl mx-auto drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
=======
            className="text-2xl md:text-3xl text-gray-200 max-w-3xl mx-auto drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
>>>>>>> origin/test
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {subtitle}
          </p>
        )}
        {description && (
          <p
<<<<<<< HEAD
            className="text-lg md:text-xl text-zinc-600 dark:text-gray-300 max-w-2xl mx-auto drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
=======
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
>>>>>>> origin/test
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {description}
          </p>
        )}
        {actions && (
          <div className="flex gap-4 justify-center flex-wrap">{actions}</div>
        )}
      </div>
    </section>
  );
}

export default Hero;

