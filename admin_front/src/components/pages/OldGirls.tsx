// index.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Header from "../molecules/shared/Header";
import Pagination from "../organisms/shared/Pagination";
import TableHeader from "../molecules/old_girls/TableHeader";
import TableRow from "../molecules/old_girls/TableRow";
import { Storage } from "../../infrastructure/Storage";
import { OldGirlsRepository } from "../../infrastructure/repositories/OldGirlsRepository";
import {
  FetchOldGirlsUsecase,
  FetchOldGirlsOutput,
} from "../../usecases/FetchOldGirlsUsecase";
import { OldGirlItem } from "../../models/presentation/OldGirlItem";
import { GetOldGirlDetailUsecase } from "../../usecases/GetOldGirlDetailUsecase";
import { GetOldGirlDetailOutput } from "../../usecases/GetOldGirlDetailUsecase";

const meta = {
  title: "",
  meta: [],
  link: [],
  style: [],
  script: [],
};

export default function OldGirls() {
  const navigate = useNavigate();
  const handleCellClick = async (userId: number) => {
    const oldGirlsRepository = new OldGirlsRepository();
    const getOldGirlDetailUsecase = new GetOldGirlDetailUsecase(
      oldGirlsRepository
    );

    try {
      const oldGirlDetailOutput = await getOldGirlDetailUsecase.get(
        String(userId)
      );
      console.log("User detail item:", oldGirlDetailOutput.user);
      navigate(`/old_girls/${userId}`);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const [searchQuery, setSearchQuery] = useState<string>("");

  const [filteredUsers, setFilteredUsers] = useState<OldGirlItem[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentUsers, setCurrentUsers] = useState<OldGirlItem[]>([]);

  const [oldGirls, setOldGirls] = useState<OldGirlItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const oldGirlsRepository = new OldGirlsRepository();
    const fetchOldGirlsUsecase = new FetchOldGirlsUsecase(oldGirlsRepository);
    const fetchOldGirls = async () => {
      try {
        const output: FetchOldGirlsOutput = await fetchOldGirlsUsecase.fetch();
        const oldGirlsCell = output.oldGirls;
        setOldGirls(oldGirlsCell);
        console.log("oldGirlsCell:", oldGirlsCell);
        // console.log("usersCell:", usersCell);
      } catch (err) {
        console.error(err);
        setError("データの取得に失敗しました。");
      }
    };
    fetchOldGirls();
  }, []);

  useEffect(() => {
    const filteredCell = oldGirls.filter((oldGirl) =>
      `${oldGirl.name}`.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filteredCell);
    setTotalPages(Math.ceil(filteredCell.length / itemsPerPage));
    setCurrentPage(1);
  }, [oldGirls, searchQuery, itemsPerPage]);

  useEffect(() => {
    const offset = (currentPage - 1) * itemsPerPage;
    const currentCell = filteredUsers.slice(offset, offset + itemsPerPage);
    setCurrentUsers(currentCell);
  }, [filteredUsers, currentPage, itemsPerPage]);

  return (
    <React.Fragment>
      <HelmetProvider>
        <Helmet {...meta}></Helmet>
      </HelmetProvider>
      <>
        <Header />
        <section className="py-4 overflow-hidden">
          <div className="container px-4 mx-auto">
            <div className="py-5 bg-neutral-50 border border-neutral-100 rounded-xl">
              <div className="px-6">
                <h3 className="font-heading pb-8 text-lg text-neutral-600 font-semibold">
                  OG一覧
                  <input
                    className="pl-2 py-3 text-sm text-gray-200 border ml-2.5"
                    type="text"
                    placeholder="OG検索"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </h3>
                <div className="mb-5 w-full overflow-x-auto">
                  <table className="w-full min-w-max table-auto">
                    <thead>
                      <tr className="text-left">
                        <TableHeader label="Id" />
                        <TableHeader label="OGコード" />
                        <TableHeader label="性 / 名" />
                        <TableHeader label="内定者フラグ" />
                        <th className="pb-3.5 border-b border-neutral-100" />
                      </tr>
                    </thead>
                    <tbody>
                      {currentUsers.map((user) => (
                        <TableRow
                          key={user.id}
                          {...user}
                          onCellClick={() => handleCellClick(user.id)}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>
          </div>
        </section>
      </>
    </React.Fragment>
  );
}
