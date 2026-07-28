/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        draw: {
          to: { strokeDashoffset: "0" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.8s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        glowPulse: "glowPulse 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
