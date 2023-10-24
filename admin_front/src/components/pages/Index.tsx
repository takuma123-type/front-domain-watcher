import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Header from "../molecules/shared/Header";
import Pagination from "../organisms/shared/Pagination";
import TableHeader from "../molecules/users/TableHeader";
import TableRow from "../molecules/users/TableRow";
import { Storage } from "../../infrastructure/Storage";
import axios from "axios";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  attribute: string;
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
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/admin/users", {
          headers: {
            Accept: "application/json",
          },
        });
        setUsers(
          response.data.results.map((user: any) => ({
            id: user.id,
            firstName: user.name.split(" ")[0],
            lastName: user.name.split(" ")[1] || "",
            attribute: user.status,
            email: user.email,
          }))
        );
        setFilteredUsers(
          response.data.results.map((user: any) => ({
            id: user.id,
            firstName: user.name.split(" ")[0],
            lastName: user.name.split(" ")[1] || "",
            attribute: user.status,
            email: user.email,
          }))
        );
        console.log(response.data.results);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const offset = (currentPage - 1) * itemsPerPage;
    const currentData = filteredUsers.slice(offset, offset + itemsPerPage);
    setCurrentUsers(currentData);
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
      </>
    </React.Fragment>
  );
}
