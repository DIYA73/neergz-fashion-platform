import { useTheme } from "../lib/theme.js";

export default function ThemeToggleButton({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`theme-toggle ${className}`.trim()}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <span className="theme-toggle-icon" aria-hidden="true">{isDark ? "SUN" : "MOON"}</span>
      <span className="theme-toggle-text">{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}
