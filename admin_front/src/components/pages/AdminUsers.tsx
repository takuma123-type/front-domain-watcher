import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Header from "../molecules/shared/Header";
import TableHeader from "../molecules/admin_users/TableHeader";
import TableRow from "../molecules/admin_users/TableRow";
import Pagination from "../organisms/shared/Pagination";
import { AdminUsersRepository } from "../../infrastructure/repositories/AdminUsersRepository";
import { FetchAdminUsersUsecase } from "../../usecases/FetchAdminUsersUsecase";
import { AdminUserItem } from "../../models/presentation/AdminUserItem";
import { UnauthorizedError } from "../../infrastructure/repositories/errors";

const meta = {
  title: "",
  meta: [],
  link: [],
  style: [],
  script: [],
};

export default function AdminUsers() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [adminUsers, setAdminUsers] = useState<AdminUserItem[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const adminUsersRepository = new AdminUsersRepository();
    const fetchAdminUsersUsecase = new FetchAdminUsersUsecase(adminUsersRepository);

    const fetchAdminUsers = async () => {
      try {
        const output = await fetchAdminUsersUsecase.fetch();
        setAdminUsers(output.adminUsers);
        setTotalPages(Math.ceil(output.adminUsers.length / itemsPerPage));
      } catch (error) {
        if (error instanceof UnauthorizedError) {
          navigate(`/sign_in`);
        }
        throw error;
      }
    };

    fetchAdminUsers();
  }, [itemsPerPage]);

  const currentUsers = adminUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <React.Fragment>
      <HelmetProvider>
        <Helmet {...meta}></Helmet>
      </HelmetProvider>
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
                      <TableHeader label="名前" />
                      <TableHeader label="メールアドレス" />
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
    </React.Fragment>
  );
}
