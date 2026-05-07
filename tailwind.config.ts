import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#020617", // Deep Space Blue
        primary: {
          DEFAULT: "#7c3aed", // Futuristic Cyan
          glow: "rgba(0, 242, 255, 0.5)",
        },
        secondary: {
          DEFAULT: "#7000ff", // Electric Purple
          glow: "rgba(112, 0, 255, 0.5)",
        },
      },
      fontFamily: {
        orbitron: ["var(--font-orbitron)"],
        inter: ["var(--font-inter)"],
      },
      backgroundImage: {
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;