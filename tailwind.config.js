/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	important: '#root',
	theme: {
		extend: {
			colors: {
				bar: '#404d69',
			},
		},
	},
	corePlugins: {
		// Remove the Tailwind CSS preflight styles so it can use Material UI's preflight instead (CssBaseline).
		preflight: false,
	},
	plugins: [],
};
