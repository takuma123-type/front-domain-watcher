import React, { useState, useEffect, useMemo } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Header from "../molecules/shared/Header";
import ThemeRow from "../molecules/themes/ThemeRow";
import CreateButton from "../atoms/Buttons/CreateButton";
import Pagination from "../organisms/shared/Pagination";
import { ThemesRepository } from "../../infrastructure/repositories/ThemesRepository";
import { FetchThemeUsecase } from "../../usecases/FetchThemesUsecase";
import { ThemeItem } from "../../models/presentation/ThemeItem";
import { UnauthorizedError } from "../../infrastructure/repositories/errors";
import {
  UpdateThemeUsecase,
  UpdateThemeInput,
} from "../../usecases/UpdateThemeUsecase";
import {
  DeleteThemeUsecase,
  DeleteThemeInput,
} from "../../usecases/DeleteThemeUsecase";

const meta = {
  title: "",
  meta: [],
  link: [],
  style: [],
  script: [],
};

export default function Themes() {
  const navigate = useNavigate();
  const [themes, setThemes] = useState<ThemeItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const themesPerPage: number = 10;

  const memoizedThemes: ThemeItem[] = useMemo(() => {
    return themes.filter((theme) => theme.name.includes(searchQuery));
  }, [themes, searchQuery]);

  const indexOfLastTheme: number = currentPage * themesPerPage;
  const indexOfFirstTheme: number = indexOfLastTheme - themesPerPage;
  const currentThemes: ThemeItem[] = memoizedThemes.slice(
    indexOfFirstTheme,
    indexOfLastTheme
  );
  const totalPages: number = Math.ceil(
    memoizedThemes.length / themesPerPage
  );

  const handleEditConfirm = async (
    themeId: number,
    updatedName: string
  ) => {
    const updatedTheme = new UpdateThemeInput({
      id: themeId,
      name: updatedName,
    });
    try {
      const usecase = new UpdateThemeUsecase(
        updatedTheme,
        new ThemesRepository()
      );
      await usecase.update();
      window.location.reload();
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        navigate(`/sign_in`);
      }
      console.error(error);
    }
  };

  const handleDeleteConfirm = async (themeId: number) => {
    const deletedTheme = new DeleteThemeInput({
      id: themeId,
    });
    try {
      const usecase = new DeleteThemeUsecase(
        deletedTheme,
        new ThemesRepository()
      );
      await usecase.delete();
      window.location.reload();
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        navigate(`/sign_in`);
      }
      console.error(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const themesRepository = new ThemesRepository();
        const fetchThemesUsecase = new FetchThemeUsecase(
          themesRepository
        );
        const themes = await fetchThemesUsecase.fetch();
        setThemes(themes.themes);
      } catch (error) {
        if (error instanceof UnauthorizedError) {
          navigate(`/sign_in`);
        }
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <HelmetProvider>
        <Helmet {...meta}></Helmet>
      </HelmetProvider>
      <>
        <Header />
        <section className="py-4 overflow-hidden">
          <div className="container px-4 mx-auto">
            <div className="pt-5 pb-7 bg-neutral-50 border border-neutral-100 rounded-xl">
              <div className="px-6">
                <div className="flex flex-wrap items-center justify-between -m-2 mb-5">
                  <div className="w-auto p-2">
                    <h3 className="font-heading text-lg text-neutral-600 font-semibold">
                      テーマ一覧
                      <input
                        className="pl-2 py-3 text-sm text-gray-200 border ml-2.5"
                        type="text"
                        placeholder="テーマ検索"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </h3>
                  </div>
                  <div>
                    <CreateButton link="/themes/new" />
                  </div>
                </div>
                <div className="mb-12 w-full overflow-x-auto">
                  <table className="w-full min-w-max">
                    <thead>
                      <tr className="text-left">
                        <th className="p-0 whitespace-nowrap">
                          <div className="pb-3.5">
                            <a className="inline-flex items-center" href="#">
                              <span className="mr-2.5 text-sm text-gray-400 font-medium">
                                テーマ名
                              </span>
                              <svg
                                width={18}
                                height={18}
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M4.7636 6.5636C5.11508 6.21213 5.68492 6.21213 6.0364 6.5636L9 9.52721L11.9636 6.5636C12.3151 6.21213 12.8849 6.21213 13.2364 6.5636C13.5879 6.91508 13.5879 7.48492 13.2364 7.8364L9.6364 11.4364C9.28492 11.7879 8.71508 11.7879 8.3636 11.4364L4.7636 7.8364C4.41213 7.48492 4.41213 6.91508 4.7636 6.5636Z"
                                  fill="#7F8995"
                                />
                              </svg>
                            </a>
                          </div>
                        </th>
                        <th className="p-0 whitespace-nowrap">
                          <div className="pb-3.5">
                            <a className="inline-flex items-center" href="#">
                              <span className="mr-2.5 text-sm text-gray-400 font-medium">
                                テーマの登録者
                              </span>
                              <svg
                                width={18}
                                height={18}
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M4.7636 6.5636C5.11508 6.21213 5.68492 6.21213 6.0364 6.5636L9 9.52721L11.9636 6.5636C12.3151 6.21213 12.8849 6.21213 13.2364 6.5636C13.5879 6.91508 13.5879 7.48492 13.2364 7.8364L9.6364 11.4364C9.28492 11.7879 8.71508 11.7879 8.3636 11.4364L4.7636 7.8364C4.41213 7.48492 4.41213 6.91508 4.7636 6.5636Z"
                                  fill="#7F8995"
                                />
                              </svg>
                            </a>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentThemes.map((theme: ThemeItem) => (
                        <ThemeRow
                          key={theme.id}
                          theme={{
                            id: theme.id,
                            name: theme.name,
                            registeredUsers: theme.registeredUsers,
                            note: theme.note,
                          }}
                          onEditConfirm={handleEditConfirm}
                          onDeleteConfirm={handleDeleteConfirm}
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
