import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Header from "../molecules/shared/Header";
import Pagination from "../organisms/shared/Pagination";
import TableHeader from "../molecules/companie/TableHeader";
import TableRow from "../molecules/companie/TableRow";
import companies from "../../data/test_companies";
import ChartSection from "../organisms/companie/ChartSection";
import LegendSection from "../organisms/companie/LegendSection";

const meta = {
  title: "企業一覧",
  meta: [],
  link: [],
  style: [],
  script: [],
};

export default function Companies() {
  const navigate = useNavigate();
  const handleCellClick = (id) => {
    navigate(`/companies/details/${id}`);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredCompanies = useMemo(() => {
    return companies.filter(
      (company) =>
        company.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [companies, searchQuery]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredCompanies.length / itemsPerPage);
  }, [filteredCompanies, itemsPerPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentUsers = useMemo(() => {
    return filteredCompanies.slice(startIndex, endIndex);
  }, [filteredCompanies, startIndex, endIndex]);

  return (
    <React.Fragment>
      <HelmetProvider>
        <Helmet>
          <title>企業一覧</title>
          <meta name="description" content="My description" />
        </Helmet>
      </HelmetProvider>
      <>
        <Header />
        <section className="py-4 overflow-hidden">
          <div className="container px-4 mx-auto">
            <div className="py-5 bg-neutral-50 border border-neutral-100 rounded-xl">
              <div className="px-6">
                <h3 className="font-heading pb-8 text-lg text-neutral-600 font-semibold">
                  企業一覧
                  <input
                    className="pl-2 py-3 text-sm text-gray-200 border ml-2.5"
                    type="text"
                    placeholder="企業検索"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  ></input>
                </h3>
                <div className="mb-5 w-full overflow-x-auto">
                  <table className="w-full min-w-max">
                    <thead>
                      <tr className="text-left">
                        <TableHeader label="Id" />
                        <TableHeader label="企業名" />
                        <TableHeader label="性" />
                        <TableHeader label="名" />
                        <TableHeader label="属性" />
                        <TableHeader label="メールアドレス" />
                        <TableHeader label="本人確認" />
                        <th className="pb-3.5 border-b border-neutral-100" />
                      </tr>
                    </thead>
                    <tbody>
                      {currentUsers.map((companies) => (
                        <TableRow
                          key={companies.id}
                          {...companies}
                          onCellClick={() => handleCellClick(companies.id)}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="py-8">
          <div className="container text-center px-4 mx-auto">
            <div className="mx-auto pt-5 pb-16 px-6 bg-white rounded d-flex justify-content-center">
              <h3 className="text-xl font-bold mb-12">企業一覧の属性別割合</h3>
              <ChartSection />
              <LegendSection />
            </div>
          </div>
        </section>
      </>
    </React.Fragment>
  );
}
