/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      transitionProperty: {
        'width': 'width ',
        'bottom': 'bottom',
        'height': 'height',
      },
      width:{
        "device-width": "360px"
      },
      height:{
        "device-height":"640px"
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
