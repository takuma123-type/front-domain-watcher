import React, { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Header from "../molecules/shared/Header";
import DetailsView from "../organisms/userdetails/DetailsView";
import VerificationView from "../organisms/userdetails/VerificationView";
import { useParams } from "react-router-dom";
import { GetUserDetailUsecase } from "../../usecases/GetUserDetailUsecase";
import { UsersRepository } from "../../infrastructure/repositories";
import { UserDetailItem } from "../../models/presentation/UserDetailItem";

const meta = {
  title: "ユーザ詳細情報",
  meta: [],
  link: [],
  style: [],
  script: [],
};

export default function UserDetails() {
  const [isVerificationView, setIsVerificationView] = useState<boolean>(false);
  const [userDetailOutput, setUserDetailOutput] =
    useState<UserDetailItem | null>(null);
  const { id = "" } = useParams<{ id?: string }>();

  useEffect(() => {
    const usersRepository = new UsersRepository();
    const getUserDetailUsecase = new GetUserDetailUsecase(usersRepository);

    getUserDetailUsecase
      .fetch(id)
      .then((output) => {
        setUserDetailOutput(output.user);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

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
                    {userDetailOutput
                      ? `${userDetailOutput.name} 詳細情報`
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
                <DetailsView user={userDetailOutput} />
              )}
            </div>
          </div>
        </section>
      </>
    </React.Fragment>
  );
}
