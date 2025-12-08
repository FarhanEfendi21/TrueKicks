import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SearchBar({ onClose }) {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef(null);
    const containerRef = useRef(null);
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

    // Focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
                setQuery("");
                setResults([]);
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") {
                setIsOpen(false);
                setQuery("");
                setResults([]);
                onClose?.();
            }
        };
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [onClose]);

    // Debounced search - only search by NAME
    useEffect(() => {
        if (query.trim().length < 2) {
            setResults([]);
            return;
        }

        const timer = setTimeout(async () => {
            setIsLoading(true);
            try {
                const [sneakersRes, apparelRes] = await Promise.all([
                    axios.get(`${API_URL}/api/sneakers`),
                    axios.get(`${API_URL}/api/apparel`),
                ]);

                const lowerQuery = query.toLowerCase();

                // Only filter by NAME
                const filterProducts = (products, type) =>
                    products
                        .filter((p) => p.name?.toLowerCase().includes(lowerQuery))
                        .map((p) => ({ ...p, productType: type }));

                const allResults = [
                    ...filterProducts(sneakersRes.data || [], "sneakers"),
                    ...filterProducts(apparelRes.data || [], "apparel"),
                ].slice(0, 5); // Limit to 5 results

                setResults(allResults);
            } catch (error) {
                console.error("Search error:", error);
                setResults([]);
            } finally {
                setIsLoading(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query, API_URL]);

    // Navigate to Sneakers page with keyword
    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate("/sneakers", { state: { keyword: query.trim() } });
            setQuery("");
            setIsOpen(false);
            setResults([]);
            onClose?.();
        }
    };

    // Navigate to product detail
    const handleResultClick = (item) => {
        navigate(`/product/${item.productType}/${item.id}`);
        setQuery("");
        setIsOpen(false);
        setResults([]);
    };

    const suggestions = [
        { label: "Air Jordan", page: "sneakers" },
        { label: "New Balance", page: "sneakers" },
        { label: "Hoodie", page: "apparel" },
        { label: "T-Shirt", page: "apparel" },
    ];

    return (
        <div ref={containerRef} className="relative">
            {/* Search Icon Button (Collapsed State) */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="group p-2.5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white 
                     bg-gray-100/80 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 
                     rounded-full transition-all duration-200"
                    title="Search products"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5 transition-transform group-hover:scale-110"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                </button>
            )}

            {/* Expanded Search Input */}
            {isOpen && (
                <div className="relative animate-fade-in">
                    <form onSubmit={handleSearch}>
                        <div
                            className="flex items-center gap-2 bg-white dark:bg-gray-900 
                          rounded-2xl shadow-lg shadow-gray-200/50 dark:shadow-black/20 
                          border border-gray-200 dark:border-gray-700 
                          focus-within:border-[#FF5500] focus-within:ring-2 focus-within:ring-orange-100 dark:focus-within:ring-orange-900/30
                          transition-all duration-200 px-4 py-2.5"
                        >
                            {/* Search Icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-5 h-5 text-gray-400 flex-shrink-0"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                />
                            </svg>

                            {/* Input */}
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search by product name..."
                                className="w-52 md:w-64 bg-transparent text-sm text-gray-900 dark:text-white 
                           placeholder-gray-400 focus:outline-none font-medium"
                            />

                            {/* Loading Spinner */}
                            {isLoading && (
                                <div className="w-4 h-4 border-2 border-gray-300 border-t-[#FF5500] rounded-full animate-spin" />
                            )}

                            {/* Clear Button */}
                            {query && !isLoading && (
                                <button
                                    type="button"
                                    onClick={() => setQuery("")}
                                    className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 
                             hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-4 h-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            )}

                            {/* Close Button */}
                            <button
                                type="button"
                                onClick={() => {
                                    setIsOpen(false);
                                    setQuery("");
                                    setResults([]);
                                }}
                                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 
                           hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-4 h-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </form>

                    {/* Dropdown Results */}
                    <div
                        className="absolute top-full right-0 mt-3 w-80 bg-white dark:bg-gray-900 
                        rounded-2xl shadow-2xl shadow-gray-200/50 dark:shadow-black/30 
                        border border-gray-100 dark:border-gray-800 overflow-hidden z-50"
                    >
                        {/* Live Search Results */}
                        {results.length > 0 && (
                            <div className="p-2">
                                <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold px-3 py-2">
                                    Products
                                </p>
                                <div className="space-y-1">
                                    {results.map((item) => (
                                        <button
                                            key={`${item.productType}-${item.id}`}
                                            onClick={() => handleResultClick(item)}
                                            className="w-full flex items-center gap-3 p-2.5 hover:bg-gray-50 dark:hover:bg-gray-800 
                                 rounded-xl transition-colors group text-left"
                                        >
                                            {/* Product Image */}
                                            <div
                                                className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center 
                                    justify-center overflow-hidden flex-shrink-0"
                                            >
                                                <img
                                                    src={item.image_url}
                                                    alt={item.name}
                                                    className="w-[80%] h-[80%] object-contain mix-blend-multiply 
                                     group-hover:scale-110 transition-transform"
                                                />
                                            </div>

                                            {/* Product Info */}
                                            <div className="flex-grow min-w-0">
                                                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-[#FF5500] transition-colors">
                                                    {item.name}
                                                </p>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span
                                                        className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${item.productType === "sneakers"
                                                                ? "bg-blue-100 text-blue-600"
                                                                : "bg-green-100 text-green-600"
                                                            }`}
                                                    >
                                                        {item.productType}
                                                    </span>
                                                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                                        Rp {(item.price / 1000).toLocaleString()}K
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Arrow */}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={2}
                                                stroke="currentColor"
                                                className="w-4 h-4 text-gray-300 group-hover:text-[#FF5500] 
                                   group-hover:translate-x-1 transition-all"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                                />
                                            </svg>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* No Results */}
                        {query.trim().length >= 2 && results.length === 0 && !isLoading && (
                            <div className="p-6 text-center">
                                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6 text-gray-400"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                                        />
                                    </svg>
                                </div>
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                    No products found
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    Try a different product name
                                </p>
                            </div>
                        )}

                        {/* Quick Suggestions (when empty) */}
                        {query.trim().length < 2 && (
                            <div className="p-3">
                                <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold px-2 mb-2">
                                    Try Searching
                                </p>
                                <div className="grid grid-cols-2 gap-1">
                                    {suggestions.map((item) => (
                                        <button
                                            key={item.label}
                                            onClick={() => {
                                                navigate(`/${item.page}`, {
                                                    state: { keyword: item.label },
                                                });
                                                setIsOpen(false);
                                                setQuery("");
                                            }}
                                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium 
                                 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 
                                 rounded-xl transition-colors group"
                                        >
                                            <span
                                                className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${item.page === "sneakers"
                                                        ? "bg-blue-100 text-blue-600"
                                                        : "bg-green-100 text-green-600"
                                                    }`}
                                            >
                                                {item.page === "sneakers" ? "👟" : "👕"}
                                            </span>
                                            <span className="group-hover:text-gray-900 dark:group-hover:text-white transition-colors truncate">
                                                {item.label}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
