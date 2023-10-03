import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    colors: {
      primary: "#334654",
      secondary: "#264861",
      highlight: "#30D0D0",
      border: "#30D0D0",
      lightgray: "#D9D9D9",
      deepgray: "#969696",
      white: "#FFFFFF",
      black: "#000000",
      transparent: "rgba(0, 0, 0, 0)"
    },
    extend: {
      // backgroundImage: {
      //   "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      //   "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      // }
    }
  },
  plugins: []
}
export default config
