export default {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Tailwind should process your JSX/TSX files
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // Adds Roboto as the default sans-serif font
        custom: ['CustomFont', 'serif'], // Adds a custom font family
      },
    },
  },
  plugins: [],
};
