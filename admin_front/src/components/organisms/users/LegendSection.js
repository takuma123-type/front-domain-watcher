// src/components/organisms/LegendSection.js
import React from "react";
import LegendItem from "../../molecules/users/LegendItem";
import users from "../../../data/test_users";

const getStatusStyle = (status) => {
  switch (status) {
    case "未登録":
      return "text-gray-500";
    case "確認中":
      return "text-blue-500";
    case "承認":
      return "text-green-500";
    case "拒否":
      return "text-red-500";
    case "学生認証":
      return "text-purple-500";
    default:
      return "";
  }
};

const LegendSection = () => {
  const userCounts = users.reduce((counts, user) => {
    counts[user.status] = (counts[user.status] || 0) + 1;
    return counts;
  }, {});

  return (
    <div>
      {Object.entries(userCounts).map(([status, count], index) => (
        <LegendItem
          key={index}
          color={getStatusStyle(status)}
          label={status}
          value={`${count}人`}
        />
      ))}
    </div>
  );
};

export default LegendSection;
