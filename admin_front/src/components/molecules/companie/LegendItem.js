// src/components/molecules/LegendItem.js
import React from "react";
import PropTypes from "prop-types";

const LegendItem = ({ color, label, value }) => (
  <div className="flex items-center mb-3">
    <div className="flex items-center">
      <span className="mr-2">
        <svg
          className={color}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.4"
            d="M8 16C12.4183 16 16 12.4183 16 8H8V16Z"
            fill="currentColor"
          ></path>
          <path
            d="M0 8C0 12.4183 3.58172 16 8 16V0C3.58172 0 0 3.58172 0 8Z"
            fill="currentColor"
          ></path>
        </svg>
      </span>
      <span className="text-xs text-gray-500">{label}</span>
    </div>
    <div className="ml-auto">
      <span className="text-xs">{value}</span>
    </div>
  </div>
);

LegendItem.propTypes = {
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default LegendItem;
