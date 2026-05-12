import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#4B8EC8",
        "brand-dark": "#2F6FA6",
        ink: "#1F2A3A",
        "ink-2": "#475467",
        "ink-3": "#94A3B8",
        warm: "#F4A621",
        "warm-dark": "#C77F08",
        cw: {
          green: "#2E8B57",
          "green-soft": "#E6F4ED",
          red: "#DC4136",
          "red-soft": "#FBEAE9",
          bg: "#FAF7F2",
          surface: "#FFFFFF",
          line: "#E7E2D8",
        },
        cloth: {
          red: "#D9434A",
          yellow: "#F4C842",
          blue: "#3B82F6",
          green: "#5BA055",
          white: "#F5F5F0",
        },
      },
      fontFamily: {
        display: ["var(--font-bricolage)", "var(--font-jakarta)", "system-ui", "sans-serif"],
        body: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        hindi: ["var(--font-hind)", "var(--font-jakarta)", "system-ui", "sans-serif"],
        malayalam: ["var(--font-malayalam)", "var(--font-jakarta)", "system-ui", "sans-serif"],
        tamil: ["var(--font-tamil)", "var(--font-jakarta)", "system-ui", "sans-serif"],
        bengali: ["var(--font-bengali)", "var(--font-jakarta)", "system-ui", "sans-serif"],
        odia: ["var(--font-odia)", "var(--font-jakarta)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
