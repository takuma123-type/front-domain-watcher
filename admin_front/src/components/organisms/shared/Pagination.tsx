import React, { useCallback } from "react";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageClick = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        onPageChange(page);
      }
    },
    [onPageChange, totalPages]
  );

  const pageNumbers = [...Array(totalPages).keys()];

  return (
    <div className="flex flex-wrap items-center justify-between -m-2">
      <div className="w-auto p-2"></div>
      <div className="w-auto p-2">
        <div className="flex flex-wrap -m-0.5">
          <div className="w-auto p-0.5">
            <button
              className="flex items-center justify-center w-9 h-9 border hover:border-neutral-300 rounded-sm"
              onClick={() => handlePageClick(currentPage - 1)}
            >
              <svg
                width={7}
                height={12}
                viewBox="0 0 7 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 10.6666L1.33333 5.99998L6 1.33331"
                  stroke="#71717A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          {pageNumbers.map((pageNumber) => (
            <div className="w-auto p-0.5" key={pageNumber}>
              <button
                className={`flex items-center justify-center w-9 h-9 border ${
                  currentPage === pageNumber + 1
                    ? "border-neutral-600"
                    : "hover:border-neutral-300"
                } rounded-sm`}
                onClick={() => handlePageClick(pageNumber + 1)}
              >
                <span className="text-sm text-neutral-400 font-semibold">
                  {pageNumber + 1}
                </span>
              </button>
            </div>
          ))}
          <div className="w-auto p-0.5">
            <button
              className="flex items-center justify-center w-9 h-9 border hover:border-neutral-300 rounded-sm"
              onClick={() => handlePageClick(currentPage + 1)}
            >
              <svg
                width={7}
                height={12}
                viewBox="0 0 7 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1.33335L5.66667 6.00002L1 10.6667"
                  stroke="#71717A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
