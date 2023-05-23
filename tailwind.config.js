/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        },
        colors: {
          myOrange: {
            DEFAULT: "#ffa820"
          },
          myPurple: {
            DEFAULT: "#380c3c"
          },
          mylight: {
            DEFAULT: "#fbdfb3"
          },
          myBrown: {
            DEFAULT: "#a06631",
            light: "#ccb49c"
          }
        }
    },
  },
  plugins: [],
}
