import React from "react";

interface TableHeaderProps {
  label: string;
}

const TableHeader: React.FC<TableHeaderProps> = ({ label }) => {
  return (
    <th className="p-0 whitespace-nowrap">
      <div className="pb-3.5">
        <a className="inline-flex items-center" href="#">
          <span className="mr-2.5 text-sm text-gray-400 font-medium">
            {label}
          </span>
          <svg
            width={18}
            height={18}
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.7636 6.5636C5.11508 6.21213 5.68492 6.21213 6.0364 6.5636L9 9.52721L11.9636 6.5636C12.3151 6.21213 12.8849 6.21213 13.2364 6.5636C13.5879 6.91508 13.5879 7.48492 13.2364 7.8364L9.6364 11.4364C9.28492 11.7879 8.71508 11.7879 8.3636 11.4364L4.7636 7.8364C4.41213 7.48492 4.41213 6.91508 4.7636 6.5636Z"
              fill="#7F8995"
            />
          </svg>
        </a>
      </div>
    </th>
  );
};

export default TableHeader;
