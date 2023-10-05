import React from "react";

const getStatusStyle = (status) => {
  switch (status) {
    case "未登録":
      return "text-gray-500 bg-gray-500 bg-opacity-10";
    case "確認中":
      return "text-blue-500 bg-blue-500 bg-opacity-10";
    case "承認":
      return "text-green-500 bg-green-500 bg-opacity-10";
    case "拒否":
      return "text-red-500 bg-red-500 bg-opacity-10";
    case "企業認証":
      return "text-purple-500 bg-purple-500 bg-opacity-10";
    default:
      return "";
  }
};

const TableRow = ({
  id,
  companyName,
  firstName,
  lastName,
  attribute,
  email,
  status,
  onCellClick,
}) => (
  <tr>
    <td
      className="py-2.5 pr-4 pl-4 border-b border-neutral-100 whitespace-nowrap"
      onClick={onCellClick}
    >
      <span className="font-medium cursor-pointer">{id}</span>
    </td>
    <td
      className="py-2.5 pr-4 pl-4 border-b border-neutral-100 whitespace-nowrap"
      onClick={onCellClick}
    >
      <span className="font-semibold cursor-pointer">{companyName}</span>
    </td>
    <td
      className="py-2.5 pr-4 pl-4 border-b border-neutral-100 whitespace-nowrap"
      onClick={onCellClick}
    >
      <span className="font-semibold cursor-pointer">{firstName}</span>
    </td>
    <td
      className="py-2.5 pr-4 pl-4 border-b border-neutral-100 whitespace-nowrap"
      onClick={onCellClick}
    >
      <span className="font-semibold cursor-pointer">{lastName}</span>
    </td>
    <td
      className="py-2.5 pr-4 pl-4 border-b border-neutral-100 whitespace-nowrap"
      onClick={onCellClick}
    >
      <span className="font-medium cursor-pointer">{attribute}</span>
    </td>
    <td
      className="py-2.5 pr-4 pl-4 border-b border-neutral-100 whitespace-nowrap"
      onClick={onCellClick}
    >
      <span className="text-neutral-500 cursor-pointer font-medium">
        {email}
      </span>
    </td>
    <td
      className="py-2.5 pr-4 pl-4 border-b border-neutral-100 whitespace-nowrap"
      onClick={onCellClick}
    >
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
