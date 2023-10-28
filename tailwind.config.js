/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
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
    },
    extend: {
      fontFamily: {
        sans: ['Sen', 'sans-serif'],
      },
    },
  },
  // eslint-disable-next-line no-undef, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
  plugins: [require('flowbite/plugin')],
};
