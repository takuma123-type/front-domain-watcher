import React from "react";

export interface OldGirl {
  id: number;
  code: string;
  name: string;
  prospective_employee: boolean;
}

interface Props extends OldGirl {
  onCellClick: (id: number, code: string, name: string, prospective_employee: boolean) => void;
}

const TableRow: React.FC<Props> = ({
  id,
  code,
  name,
  prospective_employee,
  onCellClick,
}) => (
  <tr
    className="cursor-pointer hover:bg-gray-100"
    onClick={() => onCellClick(id, code, name, prospective_employee)}
  >
    <td className="px-4 py-3 text-sm font-medium text-gray-900">{id}</td>
    <td className="px-4 py-3 text-sm font-medium text-gray-900">{code}</td>
    <td className="px-4 py-3 text-sm font-medium text-gray-900">{name}</td>
    <td className="px-4 py-3 text-sm font-medium text-gray-900">{prospective_employee}</td>
  </tr>
);

export default TableRow;
