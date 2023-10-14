import React from "react";

interface Props {
  label: string;
}

const TableHeader = ({ label }: Props) => (
  <th className="pb-3.5 border-b border-neutral-100 whitespace-nowrap">
    <a
      className="inline-flex items-center text-sm text-gray-500 font-medium uppercase"
      href="#"
    >
      <span className="mr-1.5">{label}</span>
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
          d="M4.7636 6.56365C5.11508 6.21218 5.68492 6.21218 6.0364 6.56365L9 9.52726L11.9636 6.56365C12.3151 6.21218 12.8849 6.21218 13.2364 6.56365C13.5879 6.91512 13.5879 7.48497 13.2364 7.83645L9.6364 11.4364C9.28492 11.7879 8.71508 11.7879 8.3636 11.4364L4.7636 7.83645C4.41213 7.48497 4.41213 6.91512 4.7636 6.56365Z"
          fill="#7F8995"
        />
      </svg>
    </a>
  </th>
);

export default TableHeader;
