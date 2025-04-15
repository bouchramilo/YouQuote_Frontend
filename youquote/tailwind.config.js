/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'text': '#192a51',
        'background': '#f6f7f9',
        'primary': '#aaa1cb',
        'secondary': '#d5c6e0',
        'accent': '#967aa1',
      },
      fontFamily: {
        'zen': ['Zen Old Mincho', 'serif'],
      },
    },
  },
  plugins: [],
}