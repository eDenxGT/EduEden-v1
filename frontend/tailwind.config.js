/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
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
