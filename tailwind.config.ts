import type { Config } from "tailwindcss";

/** Colors resolve to CSS variables (RGB triplets) defined in app/globals.css for light and dark themes. */
function token(name: string) {
  return `rgb(var(--${name}) / <alpha-value>)`;
}

const config: Config = {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: token("bg"),
        "bg-subtle": token("bg-subtle"),
        surface: token("surface"),
        "surface-2": token("surface-2"),
        line: token("line"),
        ink: token("ink"),
        "ink-2": token("ink-2"),
        muted: token("muted"),
        brand: token("brand"),
        "brand-2": token("brand-2"),
        "brand-soft": token("brand-soft"),
        "on-brand": token("on-brand"),
        accent: token("accent"),
        "accent-ink": token("accent-ink")
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"]
      },
      boxShadow: {
        card: "0 1px 2px rgb(var(--shadow) / 0.06), 0 8px 24px -12px rgb(var(--shadow) / 0.18)",
        lift: "0 2px 4px rgb(var(--shadow) / 0.06), 0 18px 40px -16px rgb(var(--shadow) / 0.32)"
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" }
        },
        "pop-in": {
          from: { opacity: "0", transform: "translateY(-6px) scale(0.98)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" }
        }
      },
      animation: {
        "fade-in": "fade-in 160ms ease-out",
        "pop-in": "pop-in 180ms cubic-bezier(0.2, 0.8, 0.2, 1)"
      }
    }
  },
  plugins: []
};

export default config;
