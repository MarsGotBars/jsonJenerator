/** @type {import('tailwindcss').Config} */
const spanSafeList = ["bg-green-400",]
const num = 12
for(let i = 0; i < num; i++){
  spanSafeList.push(`col-span-${i}`)
}
module.exports = {
  safelist: spanSafeList,
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      animation:{
        'fade-in': 'fade-in 300ms ease-in forwards',
        'fade-out': 'fade-out 300ms ease-out forwards',
      },
      keyframes: {
        'fade-in':{
          '0%': {opacity: '0'},
          '100%:': {opacity: '1'}
        },
        'fade-out':{
          '0%': {opacity: '0'},
          '100%:': {opacity: '1'}
        },
      },
      colors:{
        red: "#EF4444",
        "darkRed": "#B91C1C",
      }
    },
  },
  plugins: [],
}

