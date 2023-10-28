/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line no-undef, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
  plugins: [require('flowbite/plugin')],
};
