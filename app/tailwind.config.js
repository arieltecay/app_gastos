/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            screens: {
                'below-700': { 'max': '700px' },
            },
        },
        plugins: [],
    }
};
