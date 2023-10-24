import React from "react";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  attribute: string;
  email: string;
  status?: string;
  verified?: boolean;
}

interface Props extends User {
  onCellClick: (
    id: number,
    firstName: string,
    lastName: string,
    email: string
  ) => void;
}

const TableRow: React.FC<Props> = ({
  id,
  firstName,
  lastName,
  attribute,
  email,
  onCellClick,
}) => (
  <tr
    className="cursor-pointer hover:bg-gray-100"
    onClick={() => onCellClick(id, firstName, lastName, email)}
  >
    <td className="px-4 py-3 text-sm font-medium text-gray-900">{id}</td>
    <td className="px-4 py-3 text-sm font-medium text-gray-900">{firstName}</td>
    <td className="px-4 py-3 text-sm font-medium text-gray-900">{lastName}</td>
    <td className="px-4 py-3 text-sm font-medium text-gray-900">{attribute}</td>
    <td className="px-4 py-3 text-sm font-medium text-gray-900">{email}</td>
  </tr>
);

export default TableRow;
