import React, { useState } from "react";
import DeleteModal from "../../organisms/shared/DeleteModal";
import EditModal from "../../organisms/shared/EditModal";
import { IndustriesRepository } from "../../../infrastructure/repositories/IndustriesRepository";
import { IndustryItem } from "../../../models/presentation/IndustryItem";
import {
  UpdateIndustryUsecase,
  UpdateIndustryInput,
} from "../../../usecases/UpdateIndustryUsecase";
import {
  DeleteIndustryUsecase,
  DeleteIndustryInput,
} from "../../../usecases/DeleteIndustryUsecase";

interface Industry {
  id: number;
  name: string;
  registeredUsers: number;
  note: string;
}

const IndustryRow: React.FC<{
  industry: Industry
  onDeleteConfirm: (id: number) => void;
  onEditConfirm: (id: number, newName: string) => void;
}> = ({ industry, onDeleteConfirm, onEditConfirm }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editValue, setEditValue] = useState(industry.name);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

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

  const handleDeleteConfirm = async () => {
    onDeleteConfirm(industry.id)
    // const deletedIndustry = new DeleteIndustryInput({
    //   id: industry.id,
    // });
    // try {
    //   const usecase = new DeleteIndustryUsecase(
    //     deletedIndustry,
    //     new IndustriesRepository()
    //   );
    //   await usecase.delete();
    //   setIsModalVisible(false);
    //   window.location.reload();
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const handleEditModalConfirm = async (value: string) => {
    onEditConfirm(industry.id, value)
    // setEditValue(value);
    // setIsEditModalVisible(false);
    // console.log(`Edit ${industry.name} to ${value}`);

    // const updatedIndustry = new UpdateIndustryInput({
    //   id: industry.id,
    //   name: value,
    //   note: industry.note,
    // });
    // try {
    //   const usecase = new UpdateIndustryUsecase(
    //     updatedIndustry,
    //     new IndustriesRepository()
    //   );
    //   await usecase.update();
    //   window.location.reload();
    // } catch (error) {
    //   console.error(error);
    // }
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
          onConfirm={handleDeleteConfirm}
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
