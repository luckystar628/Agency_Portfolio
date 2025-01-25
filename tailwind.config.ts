import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'theme-light': '#E3F2FD', // Light blue
        'theme-dark': '#0D47A1', // Dark blue
        'blue-500': '#3B82F6',
        'indigo-500': '#6366F1',
      },

      keyframes: {
        "fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },

      animation: {
        'scrollLeft': 'scrollLeft 30s linear infinite',
        'scrollRight': 'scrollRight 50s linear infinite',
        "fade-in-down": "fade-in-down 0.5s ease-out",
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}

export default config

