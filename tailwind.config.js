/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],

  theme: {
    extend: {
      colors: {
        "primary-500": "#FFC831",
        "primary-400": "#FFDA64",
        "black-01": "#15141B",
        "gray-30": "#F9FAFB",
        "gray-150": "#F3F5F7",
        "gray-250": "#EFF2F5",
        "gray-450": "#919eab",
        "gray-650": "#637381",
        "gray-850": "#212B36",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
