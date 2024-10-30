/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,jsx,ts,tsx}', './src/app/**/*.{js,jsx,ts,tsx}'],
    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            screens: {},
            colors: {
                text: '#212121',
                background: '#E8F5E9',
                primary: '#4CAF50',
                secondary: '#FF9800',
                accent: '#03A9F4',

                'text-dark': '#E0E0E0',
                'background-dark': '#121212',
                'primary-dark': '#81C784',
                'secondary-dark': '#FFB74D',
                'accent-dark': '#64B5F6',
            },
            fontFamily: {
                logo: [],
                heading: ['Baloo 2', 'sans-serif'],
                subheading: ['Lora', 'serif'],
                body: ['Open Sans', 'sans-serif'],
                lato: ['Lato', 'sans-serif'],
                roboto: ['Roboto', 'sans-serif'],
                montserrat: ['Montserrat', 'sans-serif'],
                poppins: ['Poppins', 'sans-serif'],
                nunito: ['Nunito', 'sans-serif'],
                dmSans: ['DM Sans', 'sans-serif'],
                dmMono: ['DM Mono', 'monospace'],
            },
        },
    },

    plugins: [],
};
