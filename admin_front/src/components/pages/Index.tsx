import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Header from "../molecules/shared/Header";
import Pagination from "../organisms/shared/Pagination";
import TableHeader from "../molecules/users/TableHeader";
import TableRow from "../molecules/users/TableRow";
import { UsersRepository } from "../../infrastructure/repositories/UsersRepository";
import {
  FetchUsersUsecase,
  FetchUsersOutput,
} from "../../usecases/FetchUsersUsecase";
import { UserItem } from "../../models/presentation/UserItem";
import { UnauthorizedError } from "../../infrastructure/repositories/errors";

const meta = {
  title: "",
  meta: [],
  link: [],
  style: [],
  script: [],
};

export default function Users() {
  const navigate = useNavigate();
  const handleCellClick = async (userId: number) => {
    navigate(`/users/${userId}`);
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const [searchQuery, setSearchQuery] = useState<string>("");

  const [filteredUsers, setFilteredUsers] = useState<UserItem[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentUsers, setCurrentUsers] = useState<UserItem[]>([]);

  const [users, setUsers] = useState<UserItem[]>([]);

  useEffect(() => {
    const usersRepository = new UsersRepository();
    const fetchUsersUsecase = new FetchUsersUsecase(usersRepository);
    const fetchUsers = async () => {
      try {
        const output: FetchUsersOutput = await fetchUsersUsecase.fetch();
        const usersCell = output.users;
        setUsers(usersCell);
      } catch (error) {
        if (error instanceof UnauthorizedError) {
          console.log('UnauthorizedError')
          navigate(`/sign_in`);
        }
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const filteredCell = users.filter((user) =>
      `${user.name}`.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filteredCell);
    setTotalPages(Math.ceil(filteredCell.length / itemsPerPage));
    setCurrentPage(1);
  }, [users, searchQuery, itemsPerPage]);

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
                        <TableHeader label="ユーザコード" />
                        <TableHeader label="性 / 名" />
                        <TableHeader label="属性" />
                        <TableHeader label="メールアドレス" />
                        <th className="pb-3.5 border-b border-neutral-100" />
                      </tr>
                    </thead>
                    <tbody>
                      {currentUsers.map((user) => (
                        <TableRow
                          key={user.id}
                          {...user}
                          onCellClick={(id, code, name, email) =>
                            handleCellClick(id)
                          }
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
