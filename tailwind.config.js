const { fontFamily, spacing } = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // COLORS
      colors: {
        'bgWhite': '#FCFCFC',
        'bgDark': '#FCFCFC',
        'text-dark': '#313233',
        'link-color': '#5d676a',
        'link-hover': 'rgb(93 103 106 / 0.7)',
        'gray': {
          0: '#fff',
          100: '#fafafa',
          200: '#eaeaea',
          300: '#999999',
          400: '#888888',
          500: '#666666',
          600: '#444444',
          700: '#333333',
          800: '#222222',
          900: '#111111',
        },
      },
      // TYPOGRAPHY
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
      // Breakpoints
      screens: {
        '-2xl': { max: '1440px' },
        // => @media (max-width: 1440px) { ... }

        '-xl': { max: '1279px' },
        // => @media (max-width: 1279px) { ... }

        '-lg': { max: '1024px' },
        // => @media (max-width: 1023px) { ... }

        '-2md': { max: '834px' },
        // => @media (max-width: 834px) { ... }

        '-md': { max: '767px' },
        // => @media (max-width: 767px) { ... }

        '-sm': { max: '639px' },
        // => @media (max-width: 639px) { ... }

        '-xs': { max: '428px' },
        // => @media (max-width: 639px) { ... }
      },

      animation: {
        'ticker-loop': '20s infinite linear ticker-loop',
        'preview-popup': '150ms cubic-bezier(0,.79,.19,.99) preview-popup',
        'toast-slide-in': '150ms cubic-bezier(0,.79,.19,.99) toast-slide-in',
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
        'preview-popup': {
          '0%': {
            transform: 'scale(0.3) translateY(2px)',
            opacity: 0,
          },
          '100%': {
            transform: 'scale(1) translateY(0)',
            opacity: 1,
          },
        },
        'toast-slide-in': {
          '0%': {
            transform: 'scale(0.3) translateX(calc(100% + 1rem))',
            opacity: 0,
          },
          '100%': {
            transform: 'scale(1) translateX(0)',
            opacity: 1,
          },
        },
      },

      typography: theme => ({
        DEFAULT: {
          css: {
            'color': '#313233',
            'a': {
              'color': theme('colors.link-color'),
              'text-decoration-color': 'rgb(93 103 106 / 0.6)',
              ' text-underline-offset': '2px',
              '&:hover': {
                opacity: 0.7,
              },
              'code': { color: theme('colors.link-color') },
            },
            'h2,h3,h4': {
              'font-weight': '700',
              'margin-top': '2em',
              'margin-bottom': '1em',
              'line-height': '1.3333',
              'letter-spacing': '-.02em',
              'font-variation-settings': "'wght' 700",
              'scroll-margin-top': spacing[32],
            },
            'li': {
              'margin-top': '0.5em',
              'margin-bottom': '0.5em',
            },
            'thead': {
              borderBottomColor: theme('colors.gray.200'),
            },
            'code': { color: theme('colors.pink.500') },
            'blockquote p:first-of-type::before': false,
            'blockquote p:last-of-type::after': false,
          },
        },
        dark: {
          // css: {
          //   'color': theme('colors.gray.200'),
          //   'a': {
          //     'color': theme('colors.blue.400'),
          //     '&:hover': {
          //       color: theme('colors.blue.600'),
          //     },
          //     'code': { color: theme('colors.blue.400') },
          //   },
          //   'blockquote': {
          //     borderLeftColor: theme('colors.gray.700'),
          //     color: theme('colors.gray.300'),
          //   },
          //   'h2,h3,h4': {
          //     'color': theme('colors.gray.100'),
          //     'scroll-margin-top': spacing[32],
          //   },
          //   'hr': { borderColor: theme('colors.gray.700') },
          //   'ol': {
          //     li: {
          //       '&:before': { color: theme('colors.gray.500') },
          //     },
          //   },
          //   'ul': {
          //     li: {
          //       '&:before': { backgroundColor: theme('colors.gray.500') },
          //     },
          //   },
          //   'strong': { color: theme('colors.gray.100') },
          //   'thead': {
          //     color: theme('colors.gray.100'),
          //     borderBottomColor: theme('colors.gray.600'),
          //   },
          //   'tbody': {
          //     tr: {
          //       borderBottomColor: theme('colors.gray.700'),
          //     },
          //   },
          // },
        },
      }),
    },
  },
  variants: {
    typography: ['dark'],
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(function (helpers) {
      // variants that help styling Radix-UI components
      dataStateVariant('open', helpers);
      dataStateVariant('closed', helpers);
      dataStateVariant('on', helpers);
      dataStateVariant('checked', helpers);
      dataStateVariant('unchecked', helpers);
    }),
  ],
};

function dataStateVariant(
  state,
  {
    addVariant, // for registering custom variants
    e, // for manually escaping strings meant to be used in class names
  }
) {
  addVariant(`data-state-${state}`, ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.${e(
        `data-state-${state}${separator}${className}`
      )}[data-state='${state}']`;
    });
  });

  addVariant(`group-data-state-${state}`, ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.group[data-state='${state}'] .${e(
        `group-data-state-${state}${separator}${className}`
      )}`;
    });
  });

  addVariant(`peer-data-state-${state}`, ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.peer[data-state='${state}'] ~ .${e(
        `peer-data-state-${state}${separator}${className}`
      )}`;
    });
  });
}
