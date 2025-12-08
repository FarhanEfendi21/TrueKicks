import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }
        return pages;
    };

    return (
        <div className="flex justify-center items-center gap-2 mt-8">
            {/* Previous Button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`
          flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
          ${currentPage === 1
                        ? "text-gray-300 cursor-not-allowed bg-gray-50"
                        : "text-gray-700 hover:bg-black hover:text-white bg-white border border-gray-200 shadow-sm hover:shadow-md active:scale-95"
                    }
        `}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                Prev
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
                {getPageNumbers().map((page, index) => (
                    <button
                        key={index}
                        onClick={() => typeof page === 'number' ? onPageChange(page) : null}
                        disabled={page === '...'}
                        className={`
              w-10 h-10 rounded-full text-sm font-bold transition-all duration-200 flex items-center justify-center
              ${page === currentPage
                                ? "bg-black text-white shadow-lg scale-110"
                                : page === '...'
                                    ? "text-gray-400 cursor-default"
                                    : "text-gray-600 hover:bg-gray-100 hover:text-black"
                            }
            `}
                    >
                        {page}
                    </button>
                ))}
            </div>

            {/* Next Button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`
          flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
          ${currentPage === totalPages
                        ? "text-gray-300 cursor-not-allowed bg-gray-50"
                        : "text-gray-700 hover:bg-black hover:text-white bg-white border border-gray-200 shadow-sm hover:shadow-md active:scale-95"
                    }
        `}
            >
                Next
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>
        </div>
    );
};

export default Pagination;
