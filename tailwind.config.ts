import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1C1B1A",
        paper: "#FAF9F6",
        brand: {
          DEFAULT: "#0F5D4D",
          light: "#3F8A79",
          dark: "#0A3F34",
        },
        accent: "#E4B343",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "16px",
      },
    },
  },
  plugins: [],
};
export default config;
