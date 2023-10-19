import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
			fontFamily: {
				sans: ['Montserrat', ...defaultTheme.fontFamily.sans]
			},
      colors: {
        green: '#04838F',
        gray: '#7B7B7B'
      },
		},
  },
  plugins: [],
}

