import React, { memo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Header from "../molecules/shared/Header";
import TableHeader from "../molecules/admin_users/TableHeader";
import TableRow from "../molecules/admin_users/TableRow";
import Pagination from "../organisms/shared/Pagination";
import users from "../../data/users";

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

const AdminUsers = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const usersPerPage: number = 10;
  const indexOfLastUser: number = currentPage * usersPerPage;
  const indexOfFirstUser: number = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages: number = Math.ceil(users.length / usersPerPage);

  const handleCellClick = () => {};

  return (
    <HelmetProvider>
      <Helmet {...meta}></Helmet>
      <Header />
      <section className="py-4 overflow-hidden">
        <div className="container px-4 mx-auto">
          <div className="py-5 bg-neutral-50 border border-neutral-100 rounded-xl">
            <div className="px-6">
              <h3 className="font-heading pb-8 text-lg text-neutral-600 font-semibold">
                管理者ユーザ一覧
              </h3>
              <div className="mb-5 w-full overflow-x-auto">
                <table className="w-full min-w-max">
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
                      <TableRow key={user.id} {...user} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
};

export default memo(AdminUsers);
