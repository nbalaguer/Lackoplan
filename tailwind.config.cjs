/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        warrior: "#C69B6D",
        paladin: "#F48CBA",
        hunter: "#AAD372",
        rogue: "#FFF468",
        priest: "#FFFFFF",
        shaman: "#0070DD",
        mage: "#3FC7EB",
        warlock: "#8788EE",
        monk: "#00FF98",
        druid: "#FF7C0A",
        demonhunter: "#A330C9",
        deathknight: "#C41E3A",
        evoker: "#33937F",
        general: "#6079bf",
        contrast: {
          dark: "#FFFFFF",
          light: "#000000",
        },
      },
    },
  },
  plugins: [],
}
