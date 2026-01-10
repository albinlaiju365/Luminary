/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // LUMIÈRE / Luminary Palette
                white: "#FFFFFF",
                sand: {
                    50: "#F9F7F4",
                    100: "#F0E6D2", // Champagne/Sand
                    200: "#E6E0D4", // Base Sand
                    300: "#D6CDB8",
                    900: "#5C5546", // Text on sand
                },
                sage: {
                    50: "#F4F7F4",
                    100: "#D1D9CE", // Light Sage
                    200: "#B8C4B4",
                    900: "#3A4538", // Text on sage
                },
                text: {
                    main: "#1A1A1A", // Soft Black
                    muted: "#666666", // Muted Grey
                    light: "#999999",
                }
            },
            fontFamily: {
                serif: ["var(--font-playfair)", "serif"],
                sans: ["var(--font-inter)", "sans-serif"],
            },
            borderRadius: {
                '3xl': '1.5rem',
                '4xl': '2rem',
                'soft': '24px',
            },
            boxShadow: {
                'soft': '0 20px 50px rgba(0,0,0,0.03)',
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
            },
            animation: {
                'fade-in': 'fadeIn 1.2s ease-out forwards',
                'slide-up': 'slideUp 1s ease-out forwards',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        },
    },
    plugins: [],
}
