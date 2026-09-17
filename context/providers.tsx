"use client";

import * as React from "react";

type Theme = "light" | "dark" | "system";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<Theme>(() => {
    return (localStorage.getItem("geoharvest-theme") as Theme | null) ?? "system";
  });

  React.useEffect(() => {
    const isDark = theme === "dark" || (
      theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches
    );
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("geoharvest-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
