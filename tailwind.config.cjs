/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js}", "./*.{html,js}", "./src/scripts/*.{js,ts}"],
	theme: {
		extend: {
			gridTemplateRows: {
				10: "repeat(10, minmax(0,1fr))",
			},
			gridRowEnd: {
				10: "10",
				11: "11",
			},
			colors: {
				"text-color-title": "#000003ff",
				"text-color-subtitle": "#505050",
				"primary-theme-color": "#8d102eff",
				"secondary-theme-color": "#f9f1b2ff",
			},
		},
	},
	plugins: [],
};
