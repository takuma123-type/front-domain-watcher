import React, { useState } from "react";
import DeleteModal from "../../organisms/shared/DeleteModal";
import EditModal from "../../organisms/shared/EditModal";

interface Occupation {
  id: number;
  name: string;
  registrants: number;
}

interface OccupationRowProps {
  occupation: Occupation;
}

const OccupationRow: React.FC<OccupationRowProps> = ({ occupation }) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<string>(occupation.name);

  const handleDeleteClick = (): void => {
    setIsModalVisible(true);
  };

  const handleModalCancel = (): void => {
    setIsModalVisible(false);
  };

  const handleModalConfirm = (): void => {
    setIsModalVisible(false);
  };

  const handleEditClick = (): void => {
    setIsEditModalVisible(true);
  };

  const handleEditModalCancel = (): void => {
    setIsEditModalVisible(false);
  };

  const handleEditModalConfirm = (value: string): void => {
    setEditValue(value);
    setIsEditModalVisible(false);
  };

  const handleDeleteModalConfirm = (): void => {
    setIsModalVisible(false);
    console.log(`Delete ${occupation.name}`);
  };

  return (
    <tr>
      <td className="py-3 pr-4 whitespace-nowrap">
        <div className="flex flex-wrap items-center">
          <span
            className="font-semibold cursor-pointer"
            onClick={handleEditClick}
          >
            {editValue}
          </span>
        </div>
      </td>
      <td className="py-3 pr-4">
        <span className="font-medium">{occupation.registrants}人</span>
      </td>
      <td className="py-3 pr-4">
        <span
          className="px-2.5 py-1 text-sm font-medium bg-opacity-10 rounded-full text-blue-900 bg-blue-900 cursor-pointer"
          onClick={handleEditClick}
        >
          編集
        </span>
      </td>
      <td className="flex justify-end py-3 pr-4">
        <span
          className="px-2.5 py-1 text-sm font-medium bg-opacity-10 rounded-full text-red-900 bg-red-900 cursor-pointer"
          onClick={handleDeleteClick}
        >
          削除
        </span>
      </td>
      {isModalVisible && (
        <DeleteModal
          onCancel={handleModalCancel}
          onConfirm={handleDeleteModalConfirm}
          initialValue={editValue}
          deleteTarget={`${occupation.name}`}
          isVisible={isModalVisible}
        />
      )}
      <EditModal
        isVisible={isEditModalVisible}
        onCancel={handleEditModalCancel}
        onConfirm={handleEditModalConfirm}
        initialValue={editValue}
        editTarget={`${occupation.name}`}
      />
    </tr>
  );
};

export default OccupationRow;
