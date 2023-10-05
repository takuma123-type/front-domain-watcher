// src/components/organisms/ChartSection.js
import React from "react";
import ApexChart from "react-apexcharts";
import companies from "../../../data/test_companies";

const getStatusColor = (status) => {
  switch (status) {
    case "未登録":
      return "#6B7280";
    case "確認中":
      return "#3B82F6";
    case "承認":
      return "#34D399";
    case "拒否":
      return "#EF4444";
    case "学生認証":
      return "#8B5CF6";
    default:
      return "#000000";
  }
};

const ChartSection = () => {
  const userCounts = companies.reduce((counts, company) => {
    counts[company.status] = (counts[company.status] || 0) + 1;
    return counts;
  }, {});

  const chartData = Object.entries(userCounts).map(([status, count]) => ({
    label: status,
    value: count,
    color: getStatusColor(status),
  }));

  const options = {
    labels: chartData.map((item) => item.label),
    colors: chartData.map((item) => item.color),
    legend: {
      show: false,
    },
  };

  const series = chartData.map((item) => item.value);

  return (
    <div className="chart mb-10">
      <ApexChart type="donut" options={options} series={series} width="350" />
    </div>
  );
};

export default ChartSection;
