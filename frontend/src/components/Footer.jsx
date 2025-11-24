import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#1F1F1F] text-white pt-16 pb-24 font-poppins">
      <div className="container mx-auto px-6">
        
        {/* === BAGIAN ATAS: SOSMED & LOGO === */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 relative">
          
          {/* 1. Social Media Icons (Posisi Kiri di Desktop) */}
          <div className="flex space-x-6 mb-8 md:mb-0 md:absolute md:left-0 md:top-2">
            {/* Twitter */}
            <a href="#" className="hover:text-orange-500 transition">
              <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
              </svg>
            </a>
            {/* Facebook */}
            <a href="#" className="hover:text-orange-500 transition">
              <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" className="hover:text-orange-500 transition">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>

          {/* 2. Logo Tengah (Centered) */}
          <div className="w-full text-center">
            <h2 className="text-4xl font-black italic tracking-tighter select-none">
              TRUE<span className="text-[#FF5500]">KICKS</span>
            </h2>
            <p className="text-gray-300 text-sm mt-2 font-medium">200% Money Back Guarantee</p>
          </div>
        </div>


        {/* === BAGIAN BAWAH: GRID 4 KOLOM === */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
          
          {/* Kolom 1: Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4 text-gray-300">
              <li><a href="#" className="hover:text-[#FF5500] transition">My Account</a></li>
              <li><a href="#" className="hover:text-[#FF5500] transition">My Cart</a></li>
              <li><a href="#" className="hover:text-[#FF5500] transition">My Wishlist</a></li>
              <li><a href="#" className="hover:text-[#FF5500] transition">Track My Order</a></li>
            </ul>
          </div>

          {/* Kolom 2: Helpful Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">Helpful Links</h3>
            <ul className="space-y-4 text-gray-300">
              <li><a href="#" className="hover:text-[#FF5500] transition">Snap</a></li>
              <li><a href="#" className="hover:text-[#FF5500] transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#FF5500] transition">FAQ</a></li>
              <li><a href="#" className="hover:text-[#FF5500] transition">Terms and Conditions</a></li>
              <li><a href="#" className="hover:text-[#FF5500] transition">Contact Us</a></li>
            </ul>
          </div>

          {/* Kolom 3: Our Information */}
          <div>
            <h3 className="font-bold text-lg mb-6">Our Information</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>Magelang, Indonesia</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>+628157642387</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>farhanefendi71@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Get in Touch (Form) */}
          <div>
            <h3 className="font-bold text-lg mb-4">Get in Touch</h3>
            <p className="text-gray-300 mb-4">Register with your current gmail</p>
            
            <div className="flex h-12">
              <input 
                type="email" 
                placeholder="Your email here" 
                className="flex-1 bg-[#6B6B6B] text-white px-4 py-2 text-sm outline-none placeholder-gray-300"
              />
              <button className="bg-[#FF8A5B] w-12 flex items-center justify-center hover:bg-[#FF5500] transition">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}