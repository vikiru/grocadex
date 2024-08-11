/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,jsx,ts,tsx}',
        './screens/**/*.{js,jsx,ts,tsx}',
        './components/**/*.{js,jsx,ts,tsx}',
        './navigation/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        screens: {},
        colors: {
            text: '#E0E0E0',
            background: '#121212',
            primary: '#81C784',
            secondary: '#FFB74D',
            accent: '#64B5F6',
            'text-dark': '#212121',
            'background-dark': '#E8F5E9',
            'primary-dark': '#4CAF50',
            'secondary-dark': '#FF9800',
            'accent-dark': '#03A9F4',
        },
        fontFamily: {
            logo: [],
            heading: ['Baloo 2', 'sans-serif'],
            subheading: ['Nunito', 'sans-serif'],
            body: ['Open Sans', 'sans-serif'],
        },
        extend: {},
    },
    plugins: [],
};
