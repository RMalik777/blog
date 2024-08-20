import { useState, useEffect } from "react";

import { Moon, Sun, Contrast } from "lucide-react";

import { Button } from "@/components/ui/button";

export function DarkMode() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme === "light" || localTheme === "dark" || localTheme === "system") setTheme(localTheme);
    else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.removeProperty("color-scheme");
    }
  }, []);

  useEffect(() => {
    if (theme === "system") {
      localStorage.removeItem("theme");
      document.documentElement.classList.remove("dark");
      document.documentElement.style.removeProperty("color-scheme");
    } else {
      localStorage.setItem("theme", theme);
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
        document.documentElement.style.colorScheme = "dark";
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.style.colorScheme = "light";
      }
    }
  }, [theme]);

  return (
    <Button
      aria-label="Dark mode toggle"
      variant="ghost"
      size="icon"
      onClick={() => {
        setTheme((prev) => {
          if (prev === "light") return "dark";
          if (prev === "dark") return "system";
          return "light";
        });
      }}>
      <Sun
        className={
          "h-[1.2rem] w-[1.2rem] transition-all ease-out " +
          (theme == "light" ? "rotate-0 scale-100" : "-rotate-0 scale-0")
        }
      />
      <Moon
        className={
          "absolute h-[1.2rem] w-[1.2rem] transition-all ease-out " +
          (theme == "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0")
        }
      />
      <Contrast
        className={
          "absolute h-[1.2rem] w-[1.2rem] transition-all ease-out " +
          (theme == "system" ? "rotate-0 scale-100" : "rotate-90 scale-0")
        }
      />
    </Button>
  );
}
