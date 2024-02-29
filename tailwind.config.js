/** @type {import('tailwindcss').Config} */
const spanSafeList = ["bg-green-400",]
const num = 12
for(let i = 0; i < 12; i++){
  spanSafeList.push(`col-span-${i}`)
}
module.exports = {
  safelist: spanSafeList,
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors:{
        red: "#EF4444",
        "darkRed": "#B91C1C",
      }
    },
  },
  plugins: [],
}

