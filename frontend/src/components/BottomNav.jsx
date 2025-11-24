import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../Context/CartContext";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { totalItems } = useCart();
  
  // State untuk membuka/menutup Menu Kategori
  const [showMenu, setShowMenu] = useState(false);

  // Helper untuk navigasi
  const handleNavigate = (path) => {
    navigate(path);
    setShowMenu(false);
  };

  return (
    <>
      {/* ==================================================================
          1. MENU OVERLAY (POPUP KATEGORI)
          Muncul dari bawah dengan animasi slide-up & scale
         ================================================================== */}
      <div 
        className={`fixed bottom-28 left-1/2 -translate-x-1/2 w-[92%] max-w-sm z-40 transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) origin-bottom
        ${showMenu ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-90 pointer-events-none"}`}
      >
        <div className="bg-[#111]/90 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-5 shadow-2xl shadow-black/50">
            <div className="flex justify-between items-center mb-4 px-2">
                <span className="text-xs font-bold text-gray-400 tracking-widest uppercase">Quick Access</span>
                <button onClick={() => setShowMenu(false)} className="bg-white/10 rounded-full p-1 hover:bg-white/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-white">
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                </button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
                <button onClick={() => handleNavigate('/sneakers')} className="relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-2xl group text-left hover:ring-1 hover:ring-white/20 transition-all">
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity text-4xl">👟</div>
                    <span className="block text-white font-bold text-sm mb-1">Sneakers</span>
                    <span className="block text-xs text-gray-400">Browse all kicks</span>
                </button>

                <button onClick={() => handleNavigate('/apparel')} className="relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-2xl group text-left hover:ring-1 hover:ring-white/20 transition-all">
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity text-4xl">👕</div>
                    <span className="block text-white font-bold text-sm mb-1">Apparel</span>
                    <span className="block text-xs text-gray-400">Streetwear style</span>
                </button>

                <button onClick={() => handleNavigate('/sale')} className="relative overflow-hidden bg-gradient-to-r from-red-600 to-orange-600 p-4 rounded-2xl group text-left col-span-2 shadow-lg shadow-orange-900/20">
                     <div className="flex items-center justify-between">
                        <div>
                            <span className="block text-white font-black text-lg italic">SALE & DEALS</span>
                            <span className="block text-xs text-white/80">Up to 50% OFF selected items</span>
                        </div>
                        <div className="text-3xl animate-pulse">🔥</div>
                     </div>
                </button>

                <button onClick={() => handleNavigate('/catalog')} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-gray-300 transition-colors col-span-2 border border-white/5">
                    View Full Catalog Directory →
                </button>
            </div>
        </div>
      </div>


      {/* ==================================================================
          2. FLOATING CART BUTTON (FAB)
          Tombol bulat melayang di kanan bawah
         ================================================================== */}
      <button
        onClick={() => handleNavigate('/cart')}
        className={`md:hidden fixed bottom-24 right-5 z-50 group transition-all duration-500 ease-in-out
          ${showMenu ? 'translate-y-24 opacity-0' : 'translate-y-0 opacity-100'}`}
      >
        <div className="relative bg-black text-white p-4 rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.5)] border border-gray-700 active:scale-90 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.926 1.672a10.476 10.476 0 01.335-1.672A2.25 2.25 0 016.173 4.5h11.654c.96 0 1.764.724 1.926 1.672a10.476 10.476 0 01.335-1.672A2.25 2.25 0 0117.827 4.5H7.5zM6 6a2.25 2.25 0 014.5 0v.75h-4.5V6z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M2.25 9.75a.75.75 0 01.75-.75h18a.75.75 0 01.75.75v8.25c0 1.883-1.309 3.452-3.07 3.71-.128.477-.557.84-1.07.84h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a1.125 1.125 0 011.125-1.125h1.5c.513 0 .942.363 1.07.84.959-.214 1.68-.99 1.68-1.93v-5.25H12v6.75a.75.75 0 01-1.5 0V11.25H4.5v7.5c0 .94.722 1.716 1.68 1.93.128-.477.557-.84 1.07-.84h1.5a1.125 1.125 0 011.125 1.125v1.5a1.125 1.125 0 01-1.125 1.125h-1.5a1.125 1.125 0 01-1.07-.84C3.56 21.452 2.25 19.883 2.25 18V9.75z" clipRule="evenodd" />
          </svg>
          
          {/* Badge Jumlah Item */}
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#FF5500] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#1A1A1A] animate-bounce">
              {totalItems}
            </span>
          )}
        </div>
      </button>


      {/* ==================================================================
          3. BOTTOM NAVIGATION BAR (MAIN)
          Navbar utama yang melayang di bawah
         ================================================================== */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50 md:hidden">
        
        {/* Container: Hitam Glassmorphism */}
        <div className="bg-[#0F0F0F]/90 backdrop-blur-xl rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] px-2 py-2 flex justify-between items-center border border-white/5 h-[70px]">
          
          {/* --- HOME --- */}
          <NavButton 
            active={location.pathname === '/home'} 
            onClick={() => handleNavigate('/home')}
            icon={<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.44 1.107-.44 1.547 0L21.75 12M4.125 18.75h15.75c1.035 0 1.875-.84 1.875-1.875V11.25M12 15a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />}
          />

          {/* --- SEARCH --- */}
          <NavButton 
            active={location.pathname === '/sneakers'} 
            onClick={() => handleNavigate('/sneakers')}
            icon={<path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />}
          />

          {/* --- MENU TRIGGER (CENTER BUTTON) --- */}
          <div className="relative -top-6 mx-2">
             <button 
                onClick={() => setShowMenu(!showMenu)}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 active:scale-90 border-4 border-[#FAFAFA]
                    ${showMenu 
                        ? "bg-white text-black rotate-45" 
                        : "bg-[#FF5500] text-white rotate-0 hover:scale-105"}`}
             >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
             </button>
          </div>

          {/* --- WISHLIST (NAVBAR) --- */}
          <NavButton 
            active={location.pathname === '/wishlist'} 
            onClick={() => handleNavigate('/wishlist')}
            icon={
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            }
          />

          {/* --- PROFILE --- */}
          <NavButton 
            active={location.pathname === '/profile'} 
            onClick={() => handleNavigate('/profile')}
            icon={<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" />}
          />
          
        </div>
      </div>
    </>
  );
}

// --- COMPONENT KECIL UNTUK TOMBOL BIASA ---
function NavButton({ active, onClick, icon }) {
    return (
        <button 
            onClick={onClick} 
            className="relative flex-1 h-full flex items-center justify-center group"
        >
            <div className={`transition-all duration-300 ${active ? "text-[#FF5500]" : "text-gray-400 group-hover:text-white"}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill={active ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={active ? 0 : 2} stroke="currentColor" className="w-6 h-6">
                    {icon}
                </svg>
            </div>
            {/* Indikator titik bawah jika aktif */}
            {active && (
                <span className="absolute bottom-2 w-1 h-1 bg-[#FF5500] rounded-full"></span>
            )}
        </button>
    )
}