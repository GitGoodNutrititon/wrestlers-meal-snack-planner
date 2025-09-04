/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Bullard Nutrition Brand Colors
      colors: {
        brand: {
          charcoal: '#251f21',
          forest: '#006a39',
        },
        trust: {
          blue: '#1E40AF',
        },
        balance: {
          teal: '#0D9488',
        },
        action: {
          orange: '#F97316',
        },
        urgency: {
          red: '#B91329',
          'red-dark': '#8B0E1F',
        },
        bg: {
          white: '#FFFFFF',
          cream: '#FFFFFF',
          'light-blue': '#FFFFFF',
          'light-green': '#FFFFFF',
          'light-red': '#FEF2F2',
        },
        text: {
          primary: '#251f21',
          secondary: '#374151',
          muted: '#6B7280',
        },
        success: '#22C55E',
        warning: '#FCD34D',
        error: '#DC2626',
      },
      
      // Typography
      fontFamily: {
        'body': ['Open Sans', 'Roboto', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'heading': ['Inter', 'Poppins', 'Source Sans Pro', 'sans-serif'],
        'accent': ['Montserrat', 'Raleway', 'sans-serif'],
      },
      
      // Border radius for trust optimization
      borderRadius: {
        'pill': '50px',
      },
      
      // Box shadows with brand colors
      boxShadow: {
        'orange': '0 4px 20px rgba(249,115,22,0.25)',
        'blue': '0 4px 20px rgba(30,64,175,0.25)',
        'red': '0 4px 20px rgba(185,19,41,0.25)',
        'green': '0 4px 20px rgba(0,106,57,0.25)',
      },
      
      // Animation
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'spin': 'spin 1s linear infinite',
      },
      
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeInUp: {
          from: { 
            opacity: '0',
            transform: 'translateY(30px)',
          },
          to: { 
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [],
}
