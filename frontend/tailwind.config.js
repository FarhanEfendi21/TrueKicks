/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 1. Font Family (Kode Lama Anda)
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], 
        poppins: ['Poppins', 'sans-serif'],
      },
      // 2. Warna Custom (Kode Lama Anda)
      colors: {
        primary: '#2563EB', 
      },
      // 3. ANIMASI BARU (Wajib untuk Marquee & Hero Section)
      animation: {
        marquee: 'marquee 25s linear infinite', // Animasi teks berjalan
        blob: "blob 7s infinite", // Animasi background bulat di Hero
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-down': 'fadeInDown 0.8s ease-out',
      },
      // 4. KEYFRAMES (Definisi Gerakan)
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}