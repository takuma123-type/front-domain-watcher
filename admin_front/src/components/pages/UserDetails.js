import React, { useState, useEffect, useMemo } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Header from "../molecules/shared/Header";
import DetailsView from "../organisms/userdetails/DetailsView";
import VerificationView from "../organisms/userdetails/VerificationView";
import users from "../../data/test_users";
import { useParams } from "react-router-dom";

const meta = {
  title: "ユーザ詳細情報",
  meta: [],
  link: [],
  style: [],
  script: [],
};

export default function UserDetails() {
  const [isVerificationView, setIsVerificationView] = useState(false);
  const { id } = useParams();

  const user = useMemo(() => {
    const userId = parseInt(id, 10);
    return users.find((u) => u.id === userId);
  }, [id]);

  useEffect(() => {
    const rootElement = document.getElementById("root");
    let classes = rootElement.classList;
    rootElement.classList.remove(...classes);
  }, []);

  const handleDetailsClick = () => {
    setIsVerificationView(false);
  };

  const handleVerificationClick = () => {
    setIsVerificationView(true);
  };

  return (
    <React.Fragment>
      <HelmetProvider>
        <Helmet {...meta}></Helmet>
      </HelmetProvider>
      <>
        <Header />
        <section className="py-4 overflow-hidden">
          <div className="container px-4 mx-auto">
            <div className="px-6 pt-5 bg-white border rounded-xl">
              <div className="flex flex-wrap items-center justify-between mb-5 -m-2">
                <div className="w-auto p-2">
                  <h3 className="font-heading text-lg font-semibold">
                    {user
                      ? `${user.firstName} ${user.lastName} 詳細情報`
                      : "Loading..."}
                  </h3>
                </div>
              </div>
              <div className="flex flex-wrap border-b -m-1">
                <div
                  onClick={handleDetailsClick}
                  className={`flex-1 p-1 text-center border ${
                    isVerificationView
                      ? "bg-gray-100 text-neutral-400"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  <button className="inline-block pb-3 text-sm font-medium">
                    詳細情報
                  </button>
                </div>
                <div
                  onClick={handleVerificationClick}
                  className={`flex-1 p-1 text-center border ${
                    isVerificationView
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-neutral-400"
                  }`}
                >
                  <button className="inline-block pb-3 text-sm font-medium">
                    本人確認
                  </button>
                </div>
              </div>
              {isVerificationView ? (
                <VerificationView />
              ) : (
                <DetailsView user={user} />
              )}
            </div>
          </div>
        </section>
      </>
    </React.Fragment>
  );
}
