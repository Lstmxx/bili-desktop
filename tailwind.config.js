/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	important: '#root',
	theme: {
		extend: {
			colors: {
				primary: '#fb729a',
				blue: '#00AEEC',
				border: '#f1f2f3',
				info: "#999"
			},
		},
	},
	corePlugins: {
		// Remove the Tailwind CSS preflight styles so it can use Material UI's preflight instead (CssBaseline).
		preflight: false,
	},
	plugins: [],
};
