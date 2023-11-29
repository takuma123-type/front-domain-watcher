import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Header from "../molecules/shared/Header";
import { useNavigate } from "react-router-dom";
import { OccupationsRepository } from "../../infrastructure/repositories/OccupationsRepository";
import {
  CreateOccupationInput,
  CreateOccupationUsecase,
} from "../../usecases/CreateOccupationUsecase";
import { UnauthorizedError } from "../../infrastructure/repositories/errors";

interface Meta {
  title: string;
  meta: any[];
  link: any[];
  style: any[];
  script: any[];
}

const meta: Meta = {
  title: "",
  meta: [],
  link: [],
  style: [],
  script: [],
};

const OccupationsCreate: React.FC = () => {
  const navigate = useNavigate();
  const [occupationName, setOccupationName] = useState("");

  useEffect(() => {
    const rootElement = document.getElementById("root");
    let classes = rootElement?.classList;
    rootElement?.classList.remove(...classes!);
  }, []);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(occupationName)
    if (occupationName.trim() === "") {
      return;
    }
    try {
      const input = new CreateOccupationInput({
        id: 0,
        name: occupationName
      });
      const occupationRepository = new OccupationsRepository();
      const usecase = new CreateOccupationUsecase(input, occupationRepository);
      await usecase.create();
      navigate("/occupations");
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        navigate(`/sign_in`);
      }
      console.error(error);
    }
  };

  return (
    <React.Fragment>
      <HelmetProvider>
        <Helmet {...meta}></Helmet>
      </HelmetProvider>
      <>
        <Header />
        <form onSubmit={handleFormSubmit}>
          <section className="py-4 overflow-hidden">
            <div className="container px-4 mx-auto">
              <div className="p-6 bg-white border rounded-xl">
                <div className="flex flex-wrap justify-between -m-2">
                  <div className="w-full sm:w-1/2 p-2">
                    <h3 className="font-heading text-sm font-semibold">
                      新しい職種の名前
                    </h3>
                  </div>
                  <div className="w-full sm:w-1/2 p-2">
                    <input
                      type="text"
                      className="block px-3.5 pb-3.5 pt-2.5 text-sm w-full sm:max-w-md ml-auto placeholder-neutral-400 hover:bg-gray-50 outline-none border border-neutral-200 focus:border-neutral-600 rounded-lg"
                      placeholder="Enter the occupation name"
                      value={occupationName}
                      onChange={(e) => setOccupationName(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center space-x-4 mt-3">
              {" "}
              <button
                type="button"
                className="inline-flex flex-wrap items-center px-5 py-3.5 text-sm text-neutral-50 font-medium hover:bg-gradient-purple-left-dark rounded-lg transition duration-300 bg-blue-500"
                onClick={handleBackClick}
              >
                戻る
              </button>
              <button
                type="submit"
                className="inline-flex flex-wrap items-center px-5 py-3.5 text-sm text-neutral-50 font-medium hover:bg-gradient-purple-left-dark rounded-lg transition duration-300 bg-blue-500"
              >
                登録する
              </button>
            </div>{" "}
          </section>
        </form>
      </>
    </React.Fragment>
  );
};

export default OccupationsCreate;