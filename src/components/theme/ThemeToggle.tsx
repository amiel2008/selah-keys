"use client";

import { useTheme } from "./ThemeProvider";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={isDark ? "Modo claro" : "Modo oscuro"}
      className={`fixed top-4 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/80 bg-white text-lg shadow-xl shadow-slate-200/50 transition-all duration-300 hover:scale-105 hover:shadow-slate-300/60 dark:border-zinc-700 dark:bg-zinc-900 dark:shadow-black/40 dark:hover:border-zinc-600 ${className}`}
    >
      <span className="transition-transform duration-300" aria-hidden>
        {isDark ? "☀️" : "🌙"}
      </span>
    </button>
  );
}
