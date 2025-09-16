/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#fde130',
                secondary: '#ff8b00',
                accent: '#daff00',
                background: '#f5f5f5',
                'background-secondary': '#3e3e3e',
                text: '#3e3e3e',
                link: '#1e90ff',
                border: '#e0e0e0',
                highlight: '#ff5733',
            },
            spacing: {
                'carousel': '680px',
            },
            borderRadius: {
                'lg': '12px',
                'xl': '16px',
            },
            boxShadow: {
                'card': '0 2px 10px rgba(0, 0, 0, 0.1)',
                'card-hover': '0 4px 20px rgba(0, 0, 0, 0.15)',
            },
        },
    },
    plugins: [],
}
