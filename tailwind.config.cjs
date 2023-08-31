import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#313233',
        selection: '#95a5ac40',
        background: '#fcfcfc',
        divider: '#5d676a',
      },
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
      },
      animation: {
        'ticker-loop': '20s infinite linear ticker-loop',
      },
      keyframes: {
        'ticker-loop': {
          '0%': {
            transform: 'translatex(0)',
          },
          '100%': {
            transform: 'translatex(-100%)',
          },
        },
      },
    },
  },
  plugins: [],
};
