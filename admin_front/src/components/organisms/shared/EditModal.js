import React, { useState } from "react";

const EditModal = ({
  isVisible,
  onCancel,
  onConfirm,
  initialValue,
  editTarget,
}) => {
  const [value, setValue] = useState(initialValue);

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div
      className={`modal ${
        isVisible ? "block" : "hidden"
      } fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50`}
    >
      <div className="modal-content bg-white p-4 rounded-lg">
        <p className="mb-2 text-center text-red-500">危険な操作です。</p>
        <p className="mb-4 text-center">
          <span className="text-blue-500">{editTarget}</span>
          を編集しております。
        </p>
        <textarea
          className="w-full h-40 p-2 mb-4 border rounded"
          value={value}
          onChange={handleValueChange}
        />
        <p className="mb-2 text-blue-500"></p>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 mr-2 bg-gray-200 rounded"
            onClick={onCancel}
          >
            キャンセル
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => onConfirm(value)}
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
