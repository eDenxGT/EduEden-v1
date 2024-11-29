/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			keyframes: {
				bidirectionalFadeIn: {
				  '0%, 100%': { opacity: '0', transform: 'translateY(10px)' },
				  '40%, 60%': { opacity: '1', transform: 'translateY(0)' },
				  '100%': { opacity: '0', transform: 'translateY(-10px)' },
				},
				loading: {
				  '0%': { transform: 'translateX(-100%)' },
				  '100%': { transform: 'translateX(100%)' },
				},
			 },
			 animation: {
				bidirectionalFadeIn: 'bidirectionalFadeIn 4s infinite',
				loading: 'loading 1s infinite',
			 },
			colors: {
				primary: {
					DEFAULT: "#FF5722",
					dark: "#F4511E",
				},
			},
		},
	},
	plugins: [],
};
