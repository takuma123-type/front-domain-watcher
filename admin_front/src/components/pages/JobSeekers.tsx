import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Header from "../molecules/shared/Header";
import Pagination from "../organisms/shared/Pagination";
import TableHeader from "../molecules/job_seekers/TableHeader";
import TableRow from "../molecules/job_seekers/TableRow";
import { JobSeekersRepository } from "../../infrastructure/repositories/JobSeekersRepository";
import {
  FetchJobSeekersUsecase,
  FetchJobSeekersOutput,
} from "../../usecases/FetchJobSeekersUsecase";
import { JobSeekerItem } from "../../models/presentation/JobSeekerItem";
import { UnauthorizedError } from "../../infrastructure/repositories/errors";

const meta = {
  title: "",
  meta: [],
  link: [],
  style: [],
  script: [],
};

export default function JobSeekers() {
  const navigate = useNavigate();
  const handleCellClick = async (userId: number) => {
    try {
      navigate(`/job_seekers/${userId}`);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const [searchQuery, setSearchQuery] = useState<string>("");

  const [filteredUsers, setFilteredUsers] = useState<JobSeekerItem[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentUsers, setCurrentUsers] = useState<JobSeekerItem[]>([]);

  const [jobSeekers, setJobSeekers] = useState<JobSeekerItem[]>([]);
  useEffect(() => {
    const jobSeekersRepository = new JobSeekersRepository();
    const fetchJobSeekersUsecase = new FetchJobSeekersUsecase(
      jobSeekersRepository
    );
    const fetchJobSeekers = async () => {
      try {
        const output: FetchJobSeekersOutput = await fetchJobSeekersUsecase.fetch();
        const jobSeekersCell = output.jobSeekers;
        setJobSeekers(jobSeekersCell);
      } catch (error) {
        if (error instanceof UnauthorizedError) {
          navigate(`/sign_in`);
        }
      }
    };
    fetchJobSeekers();
  }, []);

  useEffect(() => {
    const filteredCell = jobSeekers.filter((jobSeeker) =>
      `${jobSeeker.name}`.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filteredCell);
    setTotalPages(Math.ceil(filteredCell.length / itemsPerPage));
    setCurrentPage(1);
  }, [jobSeekers, searchQuery, itemsPerPage]);

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
                  求職者一覧
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
