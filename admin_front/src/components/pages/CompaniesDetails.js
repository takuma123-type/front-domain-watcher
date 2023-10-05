import React, { useState, useEffect, useMemo } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Header from "../molecules/shared/Header";
import CompanyDetailsView from "../organisms/companiesdetails/DetailsView";
import companies from "../../data/test_companies";
import { useParams } from "react-router-dom";

const meta = {
  title: "企業詳細情報",
  meta: [],
  link: [],
  style: [],
  script: [],
};

export default function CompaniesDetails() {
  const [isVerificationView, setIsVerificationView] = useState(false);
  const { id } = useParams();

  const company = useMemo(() => {
    const companyId = parseInt(id, 10);
    return companies.find((c) => c.id === companyId);
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
                    {company ? `${company.companyName} 詳細情報` : "Loading..."}
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
              </div>
              {isVerificationView ? (
                <isVerificationView />
              ) : (
                <CompanyDetailsView company={company} companies={companies} />
              )}
            </div>
          </div>
        </section>
      </>
    </React.Fragment>
  );
}
