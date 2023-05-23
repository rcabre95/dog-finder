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
          myBrown: {
            DEFAULT: "#a06631",
            light: "#B5876D",
            dark: "#402E32"
          },
          burnt: {
            DEFAULT: "#C86C34"
          },
          cream: {
            DEFAULT: "#FFF6ED"
          }
        }
    },
  },
  variants: {
    fill: ['hover', 'focus']
  },
  plugins: [],
}
