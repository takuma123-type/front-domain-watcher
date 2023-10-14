import React from "react";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  attribute: string;
  email: string;
  status: string;
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

const getStatusStyle = (status: string): string => {
  switch (status) {
    case "未登録":
      return "text-gray-500 bg-gray-500 bg-opacity-10";
    case "確認中":
      return "text-blue-500 bg-blue-500 bg-opacity-10";
    case "承認":
      return "text-green-500 bg-green-500 bg-opacity-10";
    case "拒否":
      return "text-red-500 bg-red-500 bg-opacity-10";
    default:
      return "";
  }
};

const TableRow: React.FC<Props> = ({
  id,
  firstName,
  lastName,
  attribute,
  email,
  status,
  verified,
  onCellClick,
}) => (
  <tr onClick={() => onCellClick(id, firstName, lastName, email)}>
    <td className="py-3.5 pr-4 pl-4 text-left text-neutral-500 font-medium bg-white">
      {id}
    </td>
    <td className="py-3.5 pr-4 pl-4 text-left text-neutral-500 font-medium bg-white">
      {firstName}
    </td>
    <td className="py-3.5 pr-4 pl-4 text-left text-neutral-500 font-medium bg-white">
      {lastName}
    </td>
    <td className="py-3.5 pr-4 pl-4 text-left text-neutral-500 font-medium bg-white">
      {attribute}
    </td>
    <td className="py-3.5 pr-4 pl-4 text-left text-neutral-500 font-medium bg-white">
      {email}
    </td>
    <td className="py-3.5 pr-4 pl-4 text-left font-medium bg-white">
      <span
        className={`px-2.5 py-1 text-sm font-medium ${getStatusStyle(
          status
        )} rounded-full`}
      >
        {status}
      </span>
    </td>
  </tr>
);

export default TableRow;
