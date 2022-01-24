const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig} */
module.exports = {
  content: ["src/**/*.{js,jsx,ts,tsx}"],
  plugins: [
    require("@tailwindcss/typography"),
    require('tw-elements/dist/plugin'),
    require("daisyui")],
  theme: {
    fontFamily: {
      sans: ['"Plus Jakarta Sans"', ...fontFamily.sans],
    },
  },
};
