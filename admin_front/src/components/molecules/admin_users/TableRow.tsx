import React from "react";

interface Props {
  id: number;
  name: string;
  email: string;
}

const TableRow = ({ id, name, email }: Props) => (
  <tr>
    <td className="py-2.5 pr-4 pl-4 border-b border-neutral-100 whitespace-nowrap">
      <span className="font-medium cursor-pointer">{id}</span>
    </td>
    <td className="py-2.5 pr-4 pl-4 border-b border-neutral-100 whitespace-nowrap">
      <span className="font-semibold cursor-pointer">{name}</span>
    </td>
    <td className="py-2.5 pr-4 pl-4 border-b border-neutral-100 whitespace-nowrap">
      <span className="text-neutral-500 cursor-pointer font-medium">
        {email}
      </span>
    </td>
  </tr>
);

export default TableRow;
