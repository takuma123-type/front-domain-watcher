import React, { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Header from "../molecules/shared/Header";
import DetailsView from "../organisms/oldgirldetails/DetailsView";
import { useParams } from "react-router-dom";
import { GetOldGirlDetailUsecase } from "../../usecases/GetOldGirlDetailUsecase";
import { OldGirlsRepository } from "../../infrastructure/repositories/OldGirlsRepository";
import { OldGirlDetailItem } from "../../models/presentation/OldGirlDetailItem";

const meta = {
  title: "OG詳細情報",
  meta: [],
  link: [],
  style: [],
  script: [],
};

export default function OldGirlDetails() {
  const [oldGirlOutput, setOldGirlsDetailOutput] =
    useState<OldGirlDetailItem | null>(null);
  const { id = "" } = useParams<{ id?: string }>();

  useEffect(() => {
    const oldGirlsRepository = new OldGirlsRepository();
    const getOldGirlDetailUsecase = new GetOldGirlDetailUsecase(
      oldGirlsRepository
    );

    getOldGirlDetailUsecase
      .get(id)
      .then((output) => {
        setOldGirlsDetailOutput(output.user);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

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
              <DetailsView user={oldGirlOutput} />
            </div>
          </div>
        </section>
      </>
    </React.Fragment>
  );
}