/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				lightGray: {
					DEFAULT: '#F4f6f9',
					100: '#e5e8ec',
					200: '#cbd0d8',
				},
				darkGray: {
					DEFAULT: '#a9b1bc',
					100: '#646c77',
					200: '#424953',
				},
				darkGray: {
					DEFAULT: '#a9b1bc',
					100: '#646c77',
					200: '#424953',
				},
				skinTone: {
					DEFAULT: '#f4d0b5',
					100: '#f0c8a5',
					200: '#e4b693',
				},
				lavenderLight: {
					DEFAULT: '#f299ce',
					100: '#eb87bf',
					200: '#d670ac',
				},
				lavender: {
					DEFAULT: '#b3a5ef',
					100: '#ac92ea',
					200: '#967ada',
				},
				blueJeans: {
					DEFAULT: '#73b1f4',
					100: '#5e9cea',
					200: '#4b89da',
				},
				aqua: {
					DEFAULT: '#62ddbd',
					100: '#46cead',
					200: '#35bb9b',
				},
				grass: {
					DEFAULT: '#b4e080',
					100: '#9ed36a',
					200: '#8ac054',
				},
				sunflower: {
					DEFAULT: '#fcd277',
					100: '#fecd57',
					200: '#f5ba45',
				},
				bittersweet: {
					DEFAULT: '#fc8370',
					100: '#fb6d51',
					200: '#e8563f',
				},
				grapefruit: {
					DEFAULT: '#f76d82',
					100: '#ec5564',
					200: '#d94452',
				},
				third: {
					DEFAULT: '#1C768F',
					100: '#2e8ba5a6',
					200: '#45a9c5',
				},
				fourth: {
					DEFAULT: '#032539',
				},
				black: {
					DEFAULT: '#000',
					100: '#1E1E2D',
					200: '#232533',
				},
				gray: {
					100: '#CDCDE0',
				},
			},
			fontFamily: {
				pthin: ['Poppins-Thin', 'sans-serif'],
				pextralight: ['Poppins-ExtraLight', 'sans-serif'],
				plight: ['Poppins-Light', 'sans-serif'],
				pregular: ['Poppins-Regular', 'sans-serif'],
				pmedium: ['Poppins-Medium', 'sans-serif'],
				psemibold: ['Poppins-SemiBold', 'sans-serif'],
				pbold: ['Poppins-Bold', 'sans-serif'],
				pextrabold: ['Poppins-ExtraBold', 'sans-serif'],
				pblack: ['Poppins-Black', 'sans-serif'],
			},
		},
	},
	plugins: [],
}
