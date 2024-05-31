/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],

  theme: {
    extend: {},
    fontFamily: {
      abc: ["Roboto Condensed", "serif"],
      reddit: ["Reddit Mono", "monospace"],

    }
  },
  plugins: [require("daisyui"), flowbite.plugin(),],
}

