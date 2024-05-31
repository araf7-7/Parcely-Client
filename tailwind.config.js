/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {},
    fontFamily :{
      abc: ["Roboto Condensed", "serif"],
      reddit: ["Reddit Mono", "monospace"],
    
    }
  },
  plugins: [require("daisyui")],
}

