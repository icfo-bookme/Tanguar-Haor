/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    
  ],
  theme: {
    extend: {
      container: {
        center: true, // Centers the container
        padding: '0', // Removes default padding
      },
      colors: {
        background: "var(--background)", // Ensure this variable is defined in your CSS
        foreground: "var(--foreground)", // Ensure this variable is defined in your CSS
      },
    },
  },
  plugins: [],
};
