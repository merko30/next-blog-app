import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "0rem",
        md: "0rem",
        lg: "0rem",
      },
    },
    extend: {
      colors: {
        primary: {
          bg: colors.orange[50],
          light: colors.orange[400],
          main: colors.orange[600],
          dark: colors.orange[700],
          text: colors.orange[950],
        },
        secondary: {
          bg: colors.blue[50],
          light: colors.blue[400],
          main: colors.blue[600],
          dark: colors.blue[700],
          text: colors.blue[950],
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
