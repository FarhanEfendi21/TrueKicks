import React from "react";
import airJordan from "../assets/airjordan.png";
import nikeHome from "../assets/nike-Home.png";

const SneakersBanner = ({ searchKeyword }) => {
    return (
        <div className="relative bg-gray-900 rounded-2xl md:rounded-3xl p-6 md:p-10 mb-6 md:mb-10 overflow-hidden min-h-[180px] md:min-h-[220px]">
            {/* Noise/Texture Overlay */}
            <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]"></div>

            {/* Left Sneaker with Starburst */}
            <div className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 w-[100px] md:w-[180px] lg:w-[220px]">
                <svg className="absolute inset-0 w-full h-full scale-125" viewBox="0 0 100 100" fill="white">
                    <polygon points="50,0 61,35 97,35 68,57 79,91 50,70 21,91 32,57 3,35 39,35" />
                </svg>
                <img src={airJordan} alt="Sneaker Left" className="relative z-10 w-full object-contain rotate-[-15deg] drop-shadow-2xl" />
            </div>

            {/* Right Sneaker with Starburst */}
            <div className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 w-[100px] md:w-[180px] lg:w-[220px]">
                <svg className="absolute inset-0 w-full h-full scale-125" viewBox="0 0 100 100" fill="white">
                    <polygon points="50,0 61,35 97,35 68,57 79,91 50,70 21,91 32,57 3,35 39,35" />
                </svg>
                <img src={nikeHome} alt="Sneaker Right" className="relative z-10 w-full object-contain rotate-[15deg] drop-shadow-2xl scale-x-[-1]" />
            </div>

            {/* Center Content */}
            <div className="relative z-20 text-center flex flex-col items-center justify-center h-full py-4">
                <p className="text-white font-black text-sm md:text-lg tracking-[0.3em] uppercase mb-2 italic">TrueKicks</p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none mb-3 md:mb-4">
                    ALL <span className="text-orange-500">SNEAKERS</span>
                </h1>
                {searchKeyword && (
                    <div className="mb-3 flex items-center justify-center gap-2">
                        <span className="text-gray-400 text-xs md:text-sm">Searching:</span>
                        <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs md:text-sm font-medium">{searchKeyword}</span>
                    </div>
                )}
                <button
                    onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
                    className="bg-white text-gray-900 font-black text-xs md:text-sm px-6 py-2 md:px-8 md:py-2.5 hover:bg-orange-500 hover:text-white transition-all duration-300"
                >
                    SHOP NOW
                </button>
            </div>
        </div>
    );
};

export default SneakersBanner;
