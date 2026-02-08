/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#ee2b8c",
                "background-light": "#f8f6f7",
                "background-dark": "#221019",
                "card-dark": "#331926",
                "surface-dark": "#341a28",
                "accent-dark": "#361b29",
            },
            fontFamily: {
                "display": ["Plus Jakarta Sans", "sans-serif"]
            },
            borderRadius: {
                "DEFAULT": "1rem",
                "lg": "2rem",
                "xl": "3rem",
                "2xl": "4rem",
                "full": "9999px"
            },
            spacing: {
                '18': '4.5rem',
            },
            backgroundImage: {
                'campus-pattern': "url('https://www.transparenttextures.com/patterns/cubes.png')",
            },
            boxShadow: {
                "glow": "0 0 20px -5px rgba(238, 43, 140, 0.3)"
            }
        },
    },
    plugins: [
        // We need to install these plugins if used, but for now standard tailwind is enough.
        // The HTML used CDN plugins forms and container-queries.
        // I should probably install them: @tailwindcss/forms @tailwindcss/container-queries
    ],
}
