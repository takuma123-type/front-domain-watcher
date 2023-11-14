import React, { useState } from "react";
import DeleteModal from "../shared/DeleteModal";

interface User {
  id: number;
  code: string;
  name: string;
}

interface Props {
  user: User | null;
}

const DetailsView: React.FC<Props> = ({ user }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (!user) {
    return null;
  }

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = () => {
    // 削除処理を実行する
    setShowDeleteModal(false);
  };

  return (
    <div>
      <div className="max-w-xs py-16 mx-auto text-center">
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <img
              className="w-20 h-20 p-1 mr-4 rounded-full border border-indigo-50"
              src={
                user.name ||
                "https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              }
              alt={user.name}
            />
            <div>
              <div className="flex mb-2">
                <span className="inline-block py-1 px-2 mr-2 text-xs bg-blue-50 text-blue-500 rounded">
                  ID:{user.id}
                </span>
                <h3 className="font-medium">{user.name}</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="flex mb-4 justify-between items-center">
          <div className="flex items-center">
            <h4 className="text-sm text-gray-500">ユーザコード</h4>
          </div>
          <span className="text-sm">{user.code}</span>
        </div>
      </div>
    </div>
  );
};

export default DetailsView;
