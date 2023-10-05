import React from "react";

const CreateButton = ({ link }) => {
  return (
    <div className="w-auto p-2">
      <a
        className="inline-flex items-center px-4 py-2.5 text-sm text-neutral-50 font-medium bg-neutral-600 hover:bg-neutral-800 focus:ring-4 focus:ring-neutral-400 rounded-lg"
        href={link}
      >
        <svg
          className="mr-2.5"
          width={11}
          height={10}
          viewBox="0 0 11 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.25 0.999805C6.25 0.585592 5.91421 0.249805 5.5 0.249805C5.08579 0.249805 4.75 0.585592 4.75 0.999805H6.25ZM4.75 8.99981C4.75 9.41402 5.08579 9.74981 5.5 9.74981C5.91421 9.74981 6.25 9.41402 6.25 8.99981H4.75ZM9.5 5.74981C9.91421 5.74981 10.25 5.41402 10.25 4.99981C10.25 4.58559 9.91421 4.24981 9.5 4.24981V5.74981ZM1.5 4.24981C1.08579 4.24981 0.75 4.58559 0.75 4.99981C0.75 5.41402 1.08579 5.74981 1.5 5.74981L1.5 4.24981ZM4.75 0.999805V4.99981H6.25V0.999805H4.75ZM4.75 4.99981V8.99981H6.25V4.99981H4.75ZM9.5 4.24981H5.5V5.74981H9.5V4.24981ZM5.5 4.24981L1.5 4.24981L1.5 5.74981H5.5L5.5 4.24981Z"
            fill="#F9FAFB"
          />
        </svg>
        <span>新規作成</span>
      </a>
    </div>
  );
};

export default CreateButton;
