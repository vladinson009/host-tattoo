import { defineConfig } from 'tailwindcss';

export default defineConfig({
  theme: {
    extend: {
      fontFamily: {
        gothic: ["'Arthur Gothic'", 'serif'], // Add custom font
      },
    },
  },
  plugins: [],
});
