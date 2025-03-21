"use client"

import useAllData from "@/hooks/useAllData";
import React from "react";



const Pagination = ({}) => {
    const {currentPage,setCurrentPage} = useAllData()
    const totalPages = 6;

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePageClick = (pageNumber:number) => {
        setCurrentPage(pageNumber);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];

        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageClick(i)}
                    className={`mx-1 px-4 py-2 text-[0.9rem] sm:text-[1rem] rounded-md ${
                        currentPage === i
                            ? "bg-[#3B9DF8] text-white"
                            : "bg-gray-200 text-gray-700 dark:bg-black border dark:text-white"
                    }`}
                >
                    {i}
                </button>
            );
        }

        return pageNumbers;
    };

    return (
        <div className="flex items-center flex-wrap justify-center mt-8">
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="mx-1 px-4 py-2 text-[0.9rem] disabled:cursor-not-allowed sm:text-[1rem] rounded-md shadow bg-gray-200 dark:bg-black text-black dark:text-white border disabled:opacity-50"
            >
                Previous
            </button>
            {renderPageNumbers()}
            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="mx-1 px-4 py-2 text-[0.9rem] disabled:cursor-not-allowed sm:text-[1rem] rounded-md shadow bg-gray-200 dark:bg-black text-black dark:text-white border disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
                    