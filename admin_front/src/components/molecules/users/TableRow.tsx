import React from "react";

export interface User {
  id: number;
  code: string;
  name: string;
  status: string;
  email: string;
}

interface Props extends User {
  onCellClick: (id: number, code: string, name: string, email: string) => void;
}

const TableRow: React.FC<Props> = ({
  id,
  code,
  name,
  status,
  email,
  onCellClick,
}) => (
  <tr
    className="cursor-pointer hover:bg-gray-100"
    onClick={() => onCellClick(id, code, name, email)}
  >
    <td className="px-4 py-3 text-sm font-medium text-gray-900">{id}</td>
    <td className="px-4 py-3 text-sm font-medium text-gray-900">{code}</td>
    <td className="px-4 py-3 text-sm font-medium text-gray-900">{name}</td>
    <td className="px-4 py-3 text-sm font-medium text-gray-900">{status}</td>
    <td className="px-4 py-3 text-sm font-medium text-gray-900">{email}</td>
  </tr>
);

export default TableRow;
