import React, { useState } from "react";
import DeleteModal from "../../organisms/shared/DeleteModal";
import EditModal from "../../organisms/shared/EditModal";
import { IndustriesRepository } from "../../../infrastructure/repositories/IndustriesRepository";
import { IndustryItem } from "../../../models/presentation/IndustryItem";

interface IndustryRowProps {
  key: number;
  industry: IndustryItem;
}

interface Industry {
  id: number;
  name: string;
  registeredUsers: number;
  note: string;
}

const IndustryRow: React.FC<{ industry: Industry }> = ({ industry }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editValue, setEditValue] = useState(industry.name);

  const handleDeleteClick = () => {
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleModalConfirm = () => {
    setIsModalVisible(false);
    console.log(`Delete ${industry.name}`);
  };

  const handleEditClick = () => {
    setIsEditModalVisible(true);
  };

  const handleEditModalCancel = () => {
    setIsEditModalVisible(false);
  };

  const handleEditModalConfirm = async (value: string) => {
    setEditValue(value);
    setIsEditModalVisible(false);
    console.log(`Edit ${industry.name} to ${value}`);

    // 業種を更新
    const updatedIndustry = {
      id: industry.id, // industryオブジェクトにidプロパティがあると仮定
      name: value,
      note: industry.note, // noteプロパティを追加
    };
    try {
      await IndustriesRepository.updateIndustry(updatedIndustry);
      // 更新が成功したら、何か処理を行う
    } catch (error) {
      console.error(error);
      // エラーハンドリングを行う
    }
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
        <span className="font-medium">{industry.registeredUsers}人</span>
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
          onConfirm={handleModalConfirm}
          initialValue={editValue}
          deleteTarget={`${industry.name}`}
          isVisible={isModalVisible}
        />
      )}
      <EditModal
        isVisible={isEditModalVisible}
        onCancel={handleEditModalCancel}
        onConfirm={handleEditModalConfirm}
        initialValue={editValue}
        editTarget={`${industry.name}`}
      />
    </tr>
  );
};

export default IndustryRow;
