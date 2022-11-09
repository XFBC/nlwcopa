/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{tsx,jsx}'],
  theme: {
    extend: {
      backgroundImage: {
        bgEffects: 'url(/bg/bg-effects.png)'
      },
      colors: {
        yellowCopa: {
          500: '#F7DD43'
        },
        greenCopa: {
          500: '#129E57'
        },
        gray: {
          900: '#121214'
        }
      }
    }
  },
  plugins: []
}
