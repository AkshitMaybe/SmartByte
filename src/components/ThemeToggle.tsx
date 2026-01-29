import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={cn("h-8 w-14", className)} />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      aria-pressed={isDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative inline-flex h-8 w-14 items-center rounded-full border border-border bg-secondary/70 shadow-sm transition-colors duration-300",
        className
      )}
    >
      <span className="sr-only">Toggle theme</span>
      <span
        className={cn(
          "absolute left-1 top-1 h-6 w-6 rounded-full bg-background shadow-sm transition-transform duration-300",
          isDark && "translate-x-6"
        )}
      />
      <Sun
        className={cn(
          "absolute left-2 h-4 w-4 text-amber-500 transition-opacity duration-300",
          isDark ? "opacity-40" : "opacity-100"
        )}
      />
      <Moon
        className={cn(
          "absolute right-2 h-4 w-4 text-sky-400 transition-opacity duration-300",
          isDark ? "opacity-100" : "opacity-40"
        )}
      />
    </button>
  );
};
