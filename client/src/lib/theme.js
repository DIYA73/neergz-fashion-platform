import { createContext, useContext } from "react";

const THEME_STORAGE_KEY = "neergz_theme";
const THEME_LIGHT = "light";
const THEME_DARK = "dark";

export const ThemeContext = createContext({
  theme: THEME_LIGHT,
  setTheme: () => {},
  toggleTheme: () => {}
});

export function getPreferredTheme() {
  if (typeof window === "undefined") {
    return THEME_LIGHT;
  }

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === THEME_LIGHT || stored === THEME_DARK) {
    return stored;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? THEME_DARK : THEME_LIGHT;
}

export function applyTheme(theme) {
  if (typeof document === "undefined") {
    return;
  }
  document.documentElement.setAttribute("data-theme", theme);
}

export function persistTheme(theme) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
}

export function useTheme() {
  return useContext(ThemeContext);
}

export function nextTheme(theme) {
  return theme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
}
