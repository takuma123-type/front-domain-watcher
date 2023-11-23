import React, { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Header from "../molecules/shared/Header";
import { useNavigate } from "react-router-dom";
import DetailsView from "../organisms/oldgirldetails/DetailsView";
import VerificationView from "../organisms/oldgirldetails/VerificationView";
import { useParams } from "react-router-dom";
import { GetOldGirlDetailUsecase } from "../../usecases/GetOldGirlDetailUsecase";
import { GetOldGirlDetailOutput } from "../../usecases/GetOldGirlDetailUsecase";
import { VerifyOldGirlInput } from "../../usecases/VerifyOldGirlUsecase";
import { VerifyOldGirlUsecase } from "../../usecases/VerifyOldGirlUsecase";
import { VerifyOldGirlOutput } from "../../usecases/VerifyOldGirlUsecase";
import { OldGirlsRepository } from "../../infrastructure/repositories/OldGirlsRepository";
import { OldGirlDetailItem } from "../../models/presentation/OldGirlDetailItem";
import { UnauthorizedError } from "../../infrastructure/repositories/errors";

const meta = {
  title: "OG詳細情報",
  meta: [],
  link: [],
  style: [],
  script: [],
};

export default function OldGirlDetails() {
  const navigate = useNavigate();
  const [isVerificationView, setIsVerificationView] = useState<boolean>(false);
  const [oldGirlOutput, setOldGirlsDetailOutput] =
    useState<OldGirlDetailItem | null>(null);
  const { id = "" } = useParams<{ id?: string }>();
  const oldGirlIdNumber = Number(id);

  const handleVerificationStatusChange = async (isVerified: boolean) => {
    const input = new VerifyOldGirlInput({
      userId: oldGirlIdNumber,
      is_verified: isVerified,
    });
    const oldGirlsRepository = new OldGirlsRepository();
    const usecase = new VerifyOldGirlUsecase(
      input,
      oldGirlsRepository
    );
    try {
      await usecase.verify();
      window.location.reload();
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        console.log('UnauthorizedError')
        navigate(`/sign_in`);
      }
      console.error(error);
    }
  };

  useEffect(() => {
    const oldGirlsRepository = new OldGirlsRepository();
    const getOldGirlDetailUsecase = new GetOldGirlDetailUsecase(oldGirlsRepository);
    const getOldGirl = async () => {
      try {
        const output: GetOldGirlDetailOutput = await getOldGirlDetailUsecase.get(id);
        setOldGirlsDetailOutput(output.user);
      } catch (error) {
        if (error instanceof UnauthorizedError) {
          navigate(`/sign_in`);
        }
      }
    };
    getOldGirl()
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
                    {oldGirlOutput
                      ? `${oldGirlOutput.name} 詳細情報`
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
                <VerificationView onVerificationStatusChange={handleVerificationStatusChange} />
              ) : (
                <DetailsView user={oldGirlOutput} />
              )}
            </div>
          </div>
        </section>
      </>
    </React.Fragment>
  );
}
