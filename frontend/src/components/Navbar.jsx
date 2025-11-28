import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useCart } from "../Context/CartContext";
import { useWishlist } from "../Context/WishlistContext";

// ==================================================
// DATA MENU CATALOG
// ==================================================
const catalogCategories = [
  {
    title: "Popular Brands",
    items: ["Nike", "Adidas", "New Balance", "Puma", "Converse", "Vans", "Asics"],
  },
  {
    title: "Trending Models",
    items: [
      "Air Jordan 1",
      "Salomon XT-6",
      "Adidas Samba",
      "New Balance 530",
      "Puma Speedcat",
      "Nike P-6000",
    ],
  },
  {
    title: "Categories",
    items: ["Running", "Basketball", "Lifestyle", "Skateboarding", "Training", "Sandals"],
  },
  {
    title: "Collections",
    items: ["New Arrivals", "Best Sellers", "Sale & Deals"],
  },
];

// ==================================================
// NAVBAR COMPONENT
// ==================================================
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showCatalog, setShowCatalog] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { totalItems } = useCart();

  const navigate = useNavigate();
  const location = useLocation();
  const searchInputRef = useRef(null);

  // -----------------------------------------------
  // LOAD USER FROM LOCAL STORAGE
  // -----------------------------------------------
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedProfileImage = localStorage.getItem("profileImage");

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedProfileImage) setProfileImage(storedProfileImage);

    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // -----------------------------------------------
  // AUTO FOCUS SEARCH
  // -----------------------------------------------
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  // -----------------------------------------------
  // FUNCTIONS
  // -----------------------------------------------
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      navigate("/sneakers", { state: { keyword: searchTerm } });
      setShowSearch(false);
    }
  };

  const handleWishlistNav = (path) => {
    setShowWishlist(false);
    navigate(path);
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const isActive = (path) =>
    location.pathname === path
      ? "text-[#FF5500] font-bold"
      : "text-gray-600 hover:text-black";

  // ==================================================
  // RENDER
  // ==================================================
  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-poppins ${
          isScrolled || showCatalog
            ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
            : "bg-transparent py-5"
        }`}
        onMouseLeave={() => setShowCatalog(false)}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative">
          {/* ==================================================
             LOGO
          ================================================== */}
          <div className="flex-shrink-0 z-20">
            <Link
              to="/home"
              className={`flex items-center gap-2 group ${
                showSearch ? "hidden md:flex" : "flex"
              }`}
            >
              <h1 className="text-2xl md:text-3xl font-black italic tracking-tighter select-none">
                <span className="text-gray-900 group-hover:text-black transition-colors">
                  TRUE
                </span>
                <span className="text-[#FF5500]">KICKS</span>
              </h1>
            </Link>
          </div>

          {/* ==================================================
             SEARCH BAR OR MENU (CENTER)
          ================================================== */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            {showSearch ? (
              <div className="relative w-[200px] md:w-[500px] animate-fade-in">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search sneakers..."
                  className="w-full bg-gray-100 text-gray-800 px-5 py-2.5 rounded-full outline-none 
                             focus:ring-2 focus:ring-orange-500/50 transition-all text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleSearchSubmit}
                />

                <button
                  onClick={() => setShowSearch(false)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 p-1"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-8 text-sm font-bold tracking-wide">
                <Link to="/home" className={`${isActive("/home")} hover:scale-105 transition-transform`}>
                  HOME
                </Link>

                {/* CATALOG MENU */}
                <div
                  className="relative h-full flex items-center cursor-default"
                  onMouseEnter={() => setShowCatalog(true)}
                >
                  <div
                    className={`flex items-center gap-1 cursor-pointer transition-colors ${
                      showCatalog ? "text-black" : "text-gray-600 hover:text-black"
                    }`}
                  >
                    CATALOG
                    <svg
                      className={`w-3 h-3 transition-transform duration-300 ${
                        showCatalog ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>

                <Link to="/sneakers" className={`${isActive("/sneakers")} hover:scale-105 transition-transform`}>
                  SNEAKERS
                </Link>

                <Link to="/apparel" className={`${isActive("/apparel")} hover:scale-105 transition-transform`}>
                  APPAREL
                </Link>

                <Link
                  to="/sale"
                  className="text-red-500 font-bold hover:text-red-600 hover:scale-105 transition-transform"
                >
                  SALE
                </Link>
              </div>
            )}
          </div>

          {/* ==================================================
             ACTION BUTTONS (RIGHT)
          ================================================== */}
          <div className="flex items-center gap-3 md:gap-5 flex-shrink-0 z-20">
            {/* SEARCH BUTTON */}
            {!showSearch && (
              <button onClick={() => setShowSearch(true)} className="p-2 rounded-full hover:bg-black/5 transition-colors text-gray-600">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">

                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />

                </svg>

              </button>


            )}

            {/* WISHLIST BUTTON */}
            <div className="relative">
              <button
                onClick={() => setShowWishlist(!showWishlist)}
                className="p-2 rounded-full hover:bg-black/5 text-gray-600 transition relative"
              >
                🤍
                {wishlistItems.length > 0 && (
                  <span className="absolute top-1 right-0 bg-red-500 text-white text-[9px] w-4 h-4 
                                   rounded-full flex items-center justify-center border border-white">
                    {wishlistItems.length}
                  </span>
                )}
              </button>

              {/* WISHLIST DROPDOWN */}
              {showWishlist && (
                <div className="absolute top-full right-0 mt-4 w-80 bg-white rounded-2xl shadow-2xl
                                border border-gray-100 overflow-hidden z-50 animate-fade-in">
                  <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">
                      My Wishlist ({wishlistItems.length})
                    </h3>

                    <button
                      onClick={() => setShowWishlist(false)}
                      className="text-gray-400 hover:text-black"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="max-h-[300px] overflow-y-auto p-2 space-y-2">
                    {wishlistItems.length === 0 ? (
                      <div className="text-center py-8 text-gray-400 text-xs">
                        Your wishlist is empty. <br /> Start loving some shoes!
                      </div>
                    ) : (
                      wishlistItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 group"
                        >
                          <div className="w-14 h-14 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                            <img src={item.image} alt={item.name} className="w-[90%] mix-blend-multiply" />
                          </div>

                          <div
                            className="flex-grow min-w-0 cursor-pointer"
                            onClick={() => handleWishlistNav(`/product/sneakers/${item.id}`)}
                          >
                            <p className="text-xs font-bold text-gray-900 truncate">{item.name}</p>
                            <p className="text-xs text-gray-500">
                              Rp {(item.price / 1000).toLocaleString()}K
                            </p>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFromWishlist(item.id);
                            }}
                            className="p-2 text-gray-300 hover:text-red-500 transition"
                          >
                            🗑️
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* CART */}
            <button
              onClick={() => navigate("/cart")}
              className="hidden md:block p-2 rounded-full hover:bg-black/5 text-gray-600 relative transition"
            >
              🛒
              {totalItems > 0 && (
                <span className="absolute top-1 right-0 bg-[#FF5500] text-white text-[9px] w-4 h-4 
                                 rounded-full flex items-center justify-center border border-white">
                  {totalItems}
                </span>
              )}
            </button>

            {/* USER */}
            {user ? (
              <div className="hidden md:flex items-center gap-3">
                <Link
                  to="/profile"
                  className="group flex items-center gap-2.5 hover:bg-gray-50 rounded-full pr-3 py-1 transition"
                >
                  {/* Profile Picture Circle */}
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF5500] to-orange-600 
                                    flex items-center justify-center text-white text-sm font-bold shadow-md 
                                    ring-2 ring-white overflow-hidden">
                      {profileImage ? (
                        <img src={profileImage} className="w-full h-full object-cover" />
                      ) : (
                        getInitials(user.full_name)
                      )}
                    </div>

                    {/* Online Indicator */}
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
                  </div>

                  <div className="hidden lg:block text-left">
                    <p className="text-[10px] text-gray-500 leading-none">Hi,</p>
                    <p className="text-xs font-bold text-gray-900 group-hover:text-[#FF5500] transition">
                      {user.full_name?.split(" ")[0] || "User"}
                    </p>
                  </div>
                </Link>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full 
                             font-semibold text-xs uppercase tracking-wider hover:bg-gray-800 transition active:scale-95"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="hidden md:flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-full 
                           font-bold text-sm hover:bg-gray-800 transition active:scale-95"
              >
                Log In
              </button>
            )}
          </div>
        </div>

        {/* ==================================================
           MEGA MENU CATALOG
        ================================================== */}
        {showCatalog && (
          <div
            className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100
                       overflow-hidden transition-all duration-300 origin-top"
            onMouseEnter={() => setShowCatalog(true)}
            onMouseLeave={() => setShowCatalog(false)}
          >
            <div className="max-w-7xl mx-auto px-6 py-10">
              <div className="grid grid-cols-4 gap-8">
                {catalogCategories.map((category, index) => (
                  <div key={index}>
                    <h3 className="font-black text-gray-900 text-sm uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
                      {category.title}
                    </h3>

                    <ul className="space-y-2.5">
                      {category.items.map((item, idx) => {
                        let targetPath = "/sneakers";
                        let stateData = null;

                        if (category.title === "Collections") {
                          if (item === "Sale & Deals") targetPath = "/sale";
                          else if (item === "New Arrivals")
                            stateData = { scrollTo: "new-arrivals" };
                          else if (item === "Best Sellers")
                            stateData = { scrollTo: "best-sellers" };
                        } else {
                          const stateKey =
                            category.title === "Categories" ? "typeFilter" : "keyword";
                          stateData = { [stateKey]: item };
                        }

                        return (
                          <li key={idx}>
                            <Link
                              to={targetPath}
                              state={stateData}
                              onClick={() => setShowCatalog(false)}
                              className="text-gray-500 hover:text-[#FF5500] transition text-sm font-medium"
                            >
                              {item}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
