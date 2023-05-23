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
      theme: {
        colors: {
          palatte: {
            orange: "#ffa820",
            purple: "#380c3c",
            skin: "#fbdfb3",
            brown: {
              DEFAULT: "#a06631",
              light: "#ccb49c"
            }
          }
        }
      }
    },
  },
  plugins: [],
}
