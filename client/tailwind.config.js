/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
          colors: {
        primary: {
          DEFAULT: '#ffffff', // Main white background
          light: '#f8f9fa',   // Slightly lighter white
          dark: '#e9ecef',    // Slightly darker white
        },
        secondary: {
          DEFAULT: '#adb5bd', // Neutral gray
          light: '#dee2e6',   // Lighter gray
          dark: '#6c757d',    // Darker gray
        },
        accent: {
          DEFAULT: '#0d6efd', // Blue for buttons/links
          hover: '#0056b3',   // Darker blue on hover
        },
        danger: '#dc3545', // Red for errors
        success: '#28a745', // Green for success
        warning: '#ffc107', // Yellow for warnings
      },
      screens: {
        // Custom breakpoints
        'xs': '480px', // Extra small devices
        'sm': '640px', // Small devices
        'md': '768px', // Medium devices
        'lg': '1024px', // Large devices
        'xl': '1280px', // Extra large devices
        '2xl': '1536px', // Ultra large devices
      },
    },
  },
  plugins: [],
}

