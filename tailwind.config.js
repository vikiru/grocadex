/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,jsx,ts,tsx}',
        './screens/**/*.{js,jsx,ts,tsx}',
        './components/**/*.{js,jsx,ts,tsx}',
        './navigation/**/*.{js,jsx,ts,tsx}',
    ],
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
            },
        },
    },

    plugins: [],
};
