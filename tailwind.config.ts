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
      error: "#A93800",
      lightgray: "#D9D9D9",
      deepgray: "#969696",
      white: "#FFFFFF",
      black: "#000000",
      transparent: "rgba(0, 0, 0, 0)",
      label: {
        pending: "#00A3FF",
        approved: "#00C814",
        denied: "#FF4848"
      }
    }
  },
  plugins: []
}
export default config
