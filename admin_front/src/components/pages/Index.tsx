import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Header from "../molecules/shared/Header";
import Pagination from "../organisms/shared/Pagination";
import TableHeader from "../molecules/users/TableHeader";
import TableRow from "../molecules/users/TableRow";
// import useUserRepository from "../../infrastructure/repositories/UsersRepository";
import { Storage } from "../../infrastructure/Storage";

interface User {
  attribute: string;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

const meta = {
  title: "",
  meta: [],
  link: [],
  style: [],
  script: [],
};

export default function Users() {
  const navigate = useNavigate();
  const sessionToken = Storage.restoreSessionToken();
  // const userRepository = useUserRepository(sessionToken);

  const handleCellClick = (userId: number) => {
    navigate(`/users/details/${userId}`);
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const [searchQuery, setSearchQuery] = useState<string>("");

  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentUsers, setCurrentUsers] = useState<User[]>([]);

  const [filteredOGUsers, setFilteredOGUsers] = useState<User[]>([]);
  const [totalOGPages, setTotalOGPages] = useState<number>(0);
  const [currentOGUsers, setCurrentOGUsers] = useState<User[]>([]);

  const [filteredJobSeekerUsers, setFilteredJobSeekerUsers] = useState<User[]>(
    []
  );
  const [totalJobSeekerPages, setTotalJobSeekerPages] = useState<number>(0);
  const [currentJobSeekerUsers, setCurrentJobSeekerUsers] = useState<User[]>(
    []
  );
  const [users, setUsers] = useState<any[]>([]); // ユーザーデータの状態を管理
  const [loading, setLoading] = useState<boolean>(true); // データロード中のフラグ
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   userRepository.fetchUsers();
  // }, []);

  useEffect(() => {
    // データ取得関数
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/admin/users");
        if (!response.ok) {
          const errorData = await response.json(); // Try to parse error response
          throw new Error(errorData.message || "Failed to fetch data.");
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrentUsers(filteredUsers.slice(startIndex, endIndex));
  }, [currentPage, itemsPerPage, filteredUsers]);

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
                  ユーザ一覧
                  <input
                    className="pl-2 py-3 text-sm text-gray-200 border ml-2.5"
                    type="text"
                    placeholder="ユーザ検索"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </h3>
                <div className="mb-5 w-full overflow-x-auto">
                  <table className="w-full min-w-max table-auto">
                    <thead>
                      <tr className="text-left">
                        <TableHeader label="Id" />
                        <TableHeader label="性" />
                        <TableHeader label="名" />
                        <TableHeader label="属性" />
                        <TableHeader label="メールアドレス" />
                        <th className="pb-3.5 border-b border-neutral-100" />
                      </tr>
                    </thead>
                    <tbody>
                      {currentUsers.map((user) => (
                        <TableRow
                          status={""}
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
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="py-4 overflow-hidden">
          <div className="container px-4 mx-auto">
            <div className="py-5 bg-neutral-50 border border-neutral-100 rounded-xl">
              <div className="px-6">
                <h3 className="font-heading pb-8 text-lg text-neutral-600 font-semibold">
                  求職者一覧
                  <input
                    className="pl-2 py-3 text-sm text-gray-200 border ml-2.5"
                    type="text"
                    placeholder="ユーザ検索"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </h3>
                <div className="mb-5 w-full overflow-x-auto">
                  <table className="w-full min-w-max table-auto">
                    <thead>
                      <tr className="text-left">
                        <TableHeader label="Id" />
                        <TableHeader label="性" />
                        <TableHeader label="名" />
                        <TableHeader label="属性" />
                        <TableHeader label="メールアドレス" />
                        <th className="pb-3.5 border-b border-neutral-100" />
                      </tr>
                    </thead>
                    <tbody>
                      {currentJobSeekerUsers.map((user) => (
                        <TableRow
                          key={user.id}
                          id={user.id}
                          firstName={user.firstName}
                          lastName={user.lastName}
                          attribute={user.attribute}
                          email={user.email}
                          onCellClick={() => handleCellClick(user.id)}
                          status={""}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalJobSeekerPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="py-4 overflow-hidden">
          <div className="container px-4 mx-auto">
            <div className="py-5 bg-neutral-50 border border-neutral-100 rounded-xl">
              <div className="px-6">
                <h3 className="font-heading pb-8 text-lg text-neutral-600 font-semibold">
                  OG一覧
                  <input
                    className="pl-2 py-3 text-sm text-gray-200 border ml-2.5"
                    type="text"
                    placeholder="ユーザ検索"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </h3>
                <div className="mb-5 w-full overflow-x-auto">
                  <table className="w-full min-w-max table-auto">
                    <thead>
                      <tr className="text-left">
                        <TableHeader label="Id" />
                        <TableHeader label="性" />
                        <TableHeader label="名" />
                        <TableHeader label="属性" />
                        <TableHeader label="メールアドレス" />
                        <th className="pb-3.5 border-b border-neutral-100" />
                      </tr>
                    </thead>
                    <tbody>
                      {currentOGUsers.map((user) => (
                        <TableRow
                          key={user.id}
                          id={user.id}
                          firstName={user.firstName}
                          lastName={user.lastName}
                          attribute={user.attribute}
                          email={user.email}
                          onCellClick={() => handleCellClick(user.id)}
                          status={""}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalOGPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </section>
      </>
    </React.Fragment>
  );
}
