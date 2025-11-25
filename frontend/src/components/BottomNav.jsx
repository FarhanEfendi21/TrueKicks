import { useState, useEffect } from "react";
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

  // Tutup menu jika klik di luar (opsional logic, tapi bagus untuk UX)
  useEffect(() => {
    const closeMenu = () => setShowMenu(false);
    if(showMenu) window.addEventListener('click', closeMenu);
    return () => window.removeEventListener('click', closeMenu);
  }, [showMenu]);

  return (
    <>
      {/* ==================================================================
          1. DARK OVERLAY (BACKGROUND DIMMER)
          Muncul saat menu dibuka agar fokus ke menu
         ================================================================== */}
      <div 
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 md:hidden
        ${showMenu ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
      />

      {/* ==================================================================
          2. MENU OVERLAY (POPUP CONTENT)
         ================================================================== */}
      <div 
        onClick={(e) => e.stopPropagation()} // Mencegah menu tertutup saat diklik isinya
        className={`fixed bottom-28 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50 transition-all duration-500 cubic-bezier(0.175, 0.885, 0.32, 1.275) origin-bottom md:hidden
        ${showMenu ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-90 pointer-events-none"}`}
      >
        <div className="bg-[#1A1A1A] border border-white/10 rounded-3xl p-5 shadow-2xl shadow-black/50 overflow-hidden relative">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF5500]/10 blur-3xl rounded-full pointer-events-none"></div>

            <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-gray-400 tracking-widest uppercase">Quick Menu</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
                <MenuButton 
                    emoji="👟" title="Sneakers" subtitle="All Collections" 
                    onClick={() => handleNavigate('/sneakers')} 
                />
                <MenuButton 
                    emoji="👕" title="Apparel" subtitle="Streetwear" 
                    onClick={() => handleNavigate('/apparel')} 
                />
                <MenuButton 
                    emoji="🔥" title="Sale" subtitle="Hot Deals" 
                    onClick={() => handleNavigate('/sale')} 
                    highlight 
                />
                <MenuButton 
                    emoji="❤️" title="Wishlist" subtitle="Your Favorites" 
                    onClick={() => handleNavigate('/wishlist')} 
                />
            </div>
        </div>
      </div>


      {/* ==================================================================
          3. FLOATING CART BUTTON (Melayang di Kanan Bawah)
         ================================================================== */}
      <div className={`fixed bottom-24 right-6 z-40 md:hidden transition-all duration-300 ${showMenu ? 'blur-sm opacity-50' : 'opacity-100'}`}>
         <button
            onClick={() => navigate('/cart')}
            className="relative w-14 h-14 bg-black border border-gray-800 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform"
         >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            
            {/* Cart Badge */}
            {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF5500] text-white text-[10px] font-bold h-5 min-w-[20px] px-1 flex items-center justify-center rounded-full border-2 border-[#121212]">
                    {totalItems}
                </span>
            )}
         </button>
      </div>


      {/* ==================================================================
          4. BOTTOM NAV BAR (3 TOMBOL)
         ================================================================== */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[350px] z-50 md:hidden">
        
        {/* Container Utama (Pill Shape) */}
        <div className="bg-[#121212]/95 backdrop-blur-xl rounded-full px-8 h-[72px] flex justify-between items-center shadow-[0_8px_30px_rgb(0,0,0,0.4)] border border-white/5 relative">
          
          {/* --- TOMBOL KIRI: HOME --- */}
          <NavIcon 
             active={location.pathname === '/home'}
             onClick={() => handleNavigate('/home')}
             icon={<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.44 1.107-.44 1.547 0L21.75 12M4.125 18.75h15.75c1.035 0 1.875-.84 1.875-1.875V11.25M12 15a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />}
          />

          {/* --- TOMBOL TENGAH: PLUS MENU (Floating Effect) --- */}
          <div className="relative -top-6">
              <button 
                onClick={(e) => {
                    e.stopPropagation();
                    setShowMenu(!showMenu);
                }}
                className={`w-16 h-16 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,85,0,0.4)] transition-all duration-300 border-4 border-[#121212]
                    ${showMenu 
                        ? "bg-white text-black rotate-45 scale-90" 
                        : "bg-[#FF5500] text-white rotate-0 hover:scale-105"}`}
              >
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                 </svg>
              </button>
          </div>

          {/* --- TOMBOL KANAN: PROFILE --- */}
          <NavIcon 
             active={location.pathname === '/profile'}
             onClick={() => handleNavigate('/profile')}
             icon={<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" />}
          />

        </div>
      </div>
    </>
  );
}

// --- SUB-COMPONENT: ICON BUTTON ---
function NavIcon({ active, onClick, icon }) {
    return (
        <button 
           onClick={onClick}
           className={`flex flex-col items-center justify-center w-12 h-12 transition-all duration-300
             ${active ? "text-[#FF5500]" : "text-gray-500 hover:text-white"}`}
        >
           <svg xmlns="http://www.w3.org/2000/svg" fill={active ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={active ? 0 : 2} stroke="currentColor" className="w-7 h-7">
              {icon}
           </svg>
           {active && <div className="w-1 h-1 bg-[#FF5500] rounded-full mt-1 animate-pulse"></div>}
        </button>
    )
}

// --- SUB-COMPONENT: MENU ITEM BUTTON ---
function MenuButton({ emoji, title, subtitle, onClick, highlight }) {
    return (
        <button 
            onClick={onClick} 
            className={`flex items-center gap-3 p-3 rounded-2xl text-left transition-all active:scale-95 border
            ${highlight 
                ? "bg-gradient-to-r from-[#FF5500] to-orange-600 border-transparent text-white shadow-lg" 
                : "bg-white/5 border-white/5 hover:bg-white/10 text-gray-200"}`}
        >
            <span className="text-2xl">{emoji}</span>
            <div>
                <span className={`block font-bold text-sm ${highlight ? 'text-white' : 'text-gray-200'}`}>{title}</span>
                <span className={`block text-[10px] ${highlight ? 'text-white/80' : 'text-gray-500'}`}>{subtitle}</span>
            </div>
        </button>
    )
}