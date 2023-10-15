import React, { useState } from "react";
import DeleteModal from "../../organisms/shared/DeleteModal";
import EditModal from "../../organisms/shared/EditModal";

interface Theme {
  name: string;
  registrants: number;
}

interface Props {
  theme: Theme;
}

const ThemeRow = ({ theme }: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editValue, setEditValue] = useState(theme.name);

  const handleDeleteClick = () => {
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleModalConfirm = () => {
    setIsModalVisible(false);
    console.log(`Delete ${theme.name}`);
  };

  const handleEditClick = () => {
    setIsEditModalVisible(true);
  };

  const handleEditModalCancel = () => {
    setIsEditModalVisible(false);
  };

  const handleDeleteModalConfirm = (): void => {
    setIsModalVisible(false);
    console.log(`Delete ${theme.name}`);
  };

  const handleEditModalConfirm = (value: string) => {
    setEditValue(value);
    setIsEditModalVisible(false);
    console.log(`Edit ${theme.name} to ${value}`);
  };

  return (
    <tr>
      <td className="py-3 pr-4 whitespace-nowrap">
        <div className="flex flex-wrap items-center">
          <span className="font-semibold">{editValue}</span>
        </div>
      </td>
      <td className="py-3 pr-4">
        <span className="font-medium">{theme.registrants}人</span>
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
          deleteTarget={`${theme.name}`}
          isVisible={isModalVisible}
        />
      )}
      <EditModal
        isVisible={isEditModalVisible}
        onCancel={handleEditModalCancel}
        onConfirm={handleEditModalConfirm}
        initialValue={editValue}
        editTarget={`${theme.name}`}
      />
    </tr>
  );
};

export default ThemeRow;
