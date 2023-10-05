import React from "react";

const DeleteModal = ({ onCancel, onConfirm, deleteTarget }) => {
  return (
    <div className="modal fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="modal-content bg-white p-4 rounded-lg">
        <p className="mb-2 text-center text-red-500">危険な操作です。</p>
        <p className="mb-4 text-center">
          <span className="text-blue-500">{deleteTarget}</span>
          を削除してもよろしいですか？
        </p>
        <div className="flex justify-center">
          <button
            className="px-4 py-2 mr-2 bg-gray-200 rounded"
            onClick={onCancel}
          >
            キャンセル
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={onConfirm}
          >
            削除
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
