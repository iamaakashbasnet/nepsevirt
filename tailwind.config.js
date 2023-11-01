/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      heading: [
        'Jost',
        'ui-sans-serif',
        'system-ui',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      sans: [
        'Sen',
        'ui-sans-serif',
        'system-ui',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      serif: ['ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      mono: [
        'ui-monospace',
        'SFMono-Regular',
        'Menlo',
        'Monaco',
        'Consolas',
        '"Liberation Mono"',
        '"Courier New"',
        'monospace',
      ],
    },
    extend: {},
  },
  // eslint-disable-next-line no-undef, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: ['light', 'dark'],
    base: true,
    styled: true,
    utils: true,
    rtl: false,
    prefix: '',
    logs: true,
  },
};
