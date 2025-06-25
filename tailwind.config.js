/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        deepseek: {
          primary: '#0a192f',
          secondary: '#172a45',
          accent: '#64ffda',
          text: '#ccd6f6',
          textSecondary: '#8892b0',
        },
      },
    },
  },
  plugins: [],
}

