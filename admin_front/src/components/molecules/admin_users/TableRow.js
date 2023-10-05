import React from "react";

const TableRow = ({ id, firstName, lastName, role, email }) => (
  <tr>
    <td className="py-2.5 pr-4 pl-4 border-b border-neutral-100 whitespace-nowrap">
      <span className="font-medium cursor-pointer">{id}</span>
    </td>
    <td className="py-2.5 pr-4 pl-4 border-b border-neutral-100 whitespace-nowrap">
      <span className="font-semibold cursor-pointer">{firstName}</span>
    </td>
    <td className="py-2.5 pr-4 pl-4 border-b border-neutral-100 whitespace-nowrap">
      <span className="font-semibold cursor-pointer">{lastName}</span>
    </td>
    <td className="py-2.5 pr-4 pl-4 border-b border-neutral-100 whitespace-nowrap">
      <span className="font-medium cursor-pointer">{role}</span>
    </td>
    <td className="py-2.5 pr-4 pl-4 border-b border-neutral-100 whitespace-nowrap">
      <span className="text-neutral-500 cursor-pointer font-medium">
        {email}
      </span>
    </td>
  </tr>
);

export default TableRow;
