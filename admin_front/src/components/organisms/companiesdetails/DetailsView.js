import React, { useState } from "react";
import { useParams } from "react-router-dom";
import companies from "../../../data/test_companies";
import PropTypes from "prop-types";
import DeleteModal from "../../organisms/shared/DeleteModal";

function CompanyDetailsView() {
  const { id } = useParams();
  const company = companies.find((c) => c.id === parseInt(id, 10));
  const [showModal, setShowModal] = useState(false);

  if (!company) {
    return null;
  }

  const handleDelete = () => {
    // 削除処理を実行する
    setShowModal(false);
  };

  return (
    <div className="max-w-xs py-16 mx-auto text-center">
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <img
            className="w-20 h-20 p-1 mr-4 rounded-full border border-indigo-50"
            src={
              company.logo ||
              "https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            }
            alt={`${company.companyName}`}
          />
          <div>
            <div className="flex mb-2">
              <span className="inline-block py-1 px-2 mr-2 text-xs bg-blue-50 text-blue-500 rounded">
                ID:{company.id}
              </span>
              <h3 className="font-medium">{`${company.companyName}`}</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="flex mb-4 justify-between items-center">
        <div className="flex items-center">
          <h4 className="text-sm text-gray-500">会社名</h4>
        </div>
        <span className="text-sm">{company.companyName}</span>
      </div>
      <div className="flex mb-4 justify-between items-center">
        <div className="flex items-center">
          <h4 className="text-sm text-gray-500">会社担当者</h4>
        </div>
        <span className="text-sm">{`${company.firstName} ${company.lastName}`}</span>
      </div>
      <div className="flex mb-4 justify-between items-center">
        <div className="flex items-center">
          <h4 className="text-sm text-gray-500">メールアドレス</h4>
        </div>
        <span className="text-sm">{company.email}</span>
      </div>
      <div className="flex mb-4 justify-between items-center">
        <div className="flex items-center">
          <h4 className="text-sm text-gray-500">電話番号</h4>
        </div>
        <span className="text-sm">{company.phoneNumber}</span>
      </div>
      <div className="flex mb-4 justify-between items-center">
        <div className="flex items-center">
          <h4 className="text-sm text-gray-500">本社所在地</h4>
        </div>
        <span className="text-sm">{company.headquarters}</span>
      </div>
      <div className="flex mb-4 justify-between items-center">
        <div className="flex items-center">
          <h4 className="text-sm text-gray-500">設立年月日</h4>
        </div>
        <span className="text-sm">{company.establishmentDate}</span>
      </div>
      <div className="flex mb-4 justify-between items-center">
        <div className="flex items-center">
          <h4 className="text-sm text-gray-500">従業員数</h4>
        </div>
        <span className="text-sm">{company.numberOfEmployees}</span>
      </div>
      <div className="flex mb-6 justify-between items-center">
        <div className="flex items-center">
          <h4 className="text-sm justify-center text-gray-500">事業内容</h4>
        </div>
        <span className="text-sm">{company.businessDescription}</span>
      </div>
      <div className="flex mb-6 justify-between items-center">
        <div className="flex items-center">
          <h4 className="text-sm justify-center text-gray-500">沿革</h4>
        </div>
        <span className="text-sm">{company.history}</span>
      </div>
      <div className="flex justify-center flex-wrap -mx-2">
        <div className="w-full md:w-1/2 px-2">
          <button
            className="flex justify-center py-2 text-sm text-indigo-500 bg-indigo-100 hover:bg-indigo-200 rounded transition duration-200"
            onClick={() => setShowModal(true)}
          >
            <svg
              className="mr-2"
              width={18}
              height={18}
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.0919 9.59169C12.9089 8.94891 13.5052 8.06746 13.7979 7.06998C14.0906 6.07249 14.0652 5.00858 13.7251 4.02625C13.385 3.04391 12.7471 2.19202 11.9003 1.58907C11.0535 0.986122 10.0398 0.662109 9.00024 0.662109C7.9607 0.662109 6.947 0.986122 6.10018 1.58907C5.25336 2.19202 4.61553 3.04391 4.27542 4.02625C3.93531 5.00858 3.90984 6.07249 4.20254 7.06998C4.49525 8.06746 5.09158 8.94891 5.90857 9.59169C4.50864 10.1526 3.28715 11.0828 2.37432 12.2833C1.46149 13.4838 0.891544 14.9094 0.725241 16.4084C0.713204 16.5178 0.722838 16.6285 0.753596 16.7342C0.784353 16.8399 0.835631 16.9386 0.904501 17.0245C1.04359 17.1979 1.24589 17.309 1.46691 17.3334C1.68792 17.3577 1.90954 17.2932 2.08301 17.1541C2.25648 17.015 2.3676 16.8127 2.39191 16.5917C2.5749 14.9627 3.35165 13.4582 4.57376 12.3657C5.79587 11.2732 7.37766 10.6692 9.01691 10.6692C10.6562 10.6692 12.2379 11.2732 13.4601 12.3657C14.6822 13.4582 15.4589 14.9627 15.6419 16.5917C15.6646 16.7965 15.7623 16.9856 15.9162 17.1225C16.0701 17.2595 16.2692 17.3346 16.4752 17.3334H16.5669C16.7854 17.3082 16.985 17.1978 17.1224 17.0261C17.2597 16.8544 17.3237 16.6353 17.3002 16.4167C17.1332 14.9135 16.5601 13.4842 15.6426 12.2819C14.7251 11.0795 13.4977 10.1496 12.0919 9.59169V9.59169ZM9.00024 9.00002C8.34097 9.00002 7.69651 8.80453 7.14834 8.43826C6.60018 8.07198 6.17293 7.55139 5.92064 6.9423C5.66835 6.33321 5.60234 5.66299 5.73096 5.01639C5.85957 4.36979 6.17704 3.77584 6.64322 3.30967C7.10939 2.84349 7.70334 2.52602 8.34994 2.39741C8.99654 2.26879 9.66677 2.3348 10.2759 2.58709C10.8849 2.83938 11.4055 3.26662 11.7718 3.81479C12.1381 4.36295 12.3336 5.00742 12.3336 5.66669C12.3336 6.55075 11.9824 7.39859 11.3573 8.02371C10.7321 8.64883 9.8843 9.00002 9.00024 9.00002Z"
                fill="#8880EB"
              />
            </svg>
            <span>削除</span>
          </button>
          {showModal && (
            <DeleteModal
              onCancel={() => setShowModal(false)}
              onConfirm={handleDelete}
              deleteTarget={company.companyName}
            />
          )}
        </div>
      </div>
    </div>
  );
}

CompanyDetailsView.propTypes = {
  companyId: PropTypes.number.isRequired,
};

export default CompanyDetailsView;
