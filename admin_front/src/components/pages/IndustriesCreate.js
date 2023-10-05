import React, { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Header from "../molecules/shared/Header";
import { useNavigate } from "react-router-dom";

const meta = {
  title: "",
  meta: [],
  link: [],
  style: [],
  script: [],
};

export default function IndustriesCreate() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    const rootElement = document.getElementById("root");
    let classes = rootElement.classList;
    rootElement.classList.remove(...classes);
  });

  return (
    <React.Fragment>
      <HelmetProvider>
        <Helmet {...meta}></Helmet>
      </HelmetProvider>
      <>
        <Header />
        <section className="py-4 overflow-hidden">
          <div className="container px-4 mx-auto">
            <div className="p-6 bg-white border rounded-xl">
              <div className="flex flex-wrap justify-between -m-2">
                <div className="w-full sm:w-1/2 p-2">
                  <h3 className="font-heading text-sm font-semibold">
                    新しい業種の名前
                  </h3>
                </div>
                <div className="w-full sm:w-1/2 p-2">
                  <textarea
                    className="block px-3.5 pb-3.5 pt-2.5 text-sm w-full sm:max-w-md ml-auto placeholder-neutral-400 hover:bg-gray-50 outline-none border border-neutral-200 focus:border-neutral-600 rounded-lg"
                    id="inputsTextarea5-1"
                    rows={4}
                    placeholder="Write a short note"
                    defaultValue={""}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center space-x-4 mt-3">
            {" "}
            <button
              className="inline-flex flex-wrap items-center px-5 py-3.5 text-sm text-neutral-50 font-medium hover:bg-gradient-purple-left-dark rounded-lg transition duration-300 bg-blue-500"
              onClick={handleBackClick}
            >
              戻る
            </button>
            <button
              className="inline-flex flex-wrap items-center px-5 py-3.5 text-sm text-neutral-50 font-medium hover:bg-gradient-purple-left-dark rounded-lg transition duration-300 bg-blue-500"
              onClick={() => navigate("/industries")}
            >
              登録する
            </button>
          </div>{" "}
        </section>
      </>
    </React.Fragment>
  );
}
