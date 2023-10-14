import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const Header: React.FC = () => {
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuVisible((prevVisible) => !prevVisible);
  };

  useEffect(() => {
    const burger = document.querySelector(".navbar-burger");
    const close = document.querySelector(".navbar-close");
    const backdrop = document.querySelector(".navbar-backdrop");

    if (burger) burger.addEventListener("click", toggleMenu);
    if (close) close.addEventListener("click", toggleMenu);
    if (backdrop) backdrop.addEventListener("click", toggleMenu);

    return () => {
      if (burger) burger.removeEventListener("click", toggleMenu);
      if (close) close.removeEventListener("click", toggleMenu);
      if (backdrop) backdrop.removeEventListener("click", toggleMenu);
    };
  }, []);

  const isActive = (path: string): string => {
    return location.pathname.startsWith(path)
      ? "text-neutral-600"
      : "text-neutral-400";
  };

  return (
    <section className="overflow-hidden">
      <nav className="flex items-center justify-between py-3.5 px-7 bg-neutral-50">
        <div className="w-full xl:w-auto px-2 xl:mr-10">
          <div className="flex items-center justify-between">
            <Link className="inline-flex items-center h-7" to="/">
              Soeur管理者画面
            </Link>
            <div className="xl:hidden">
              <button className="navbar-burger text-gray-400 hover:text-gray-300 focus:outline-none">
                <svg
                  width={20}
                  height={12}
                  viewBox="0 0 20 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 2H19C19.2652 2 19.5196 1.89464 19.7071 1.70711C19.8946 1.51957 20 1.26522 20 1C20 0.734784 19.8946 0.48043 19.7071 0.292893C19.5196 0.105357 19.2652 0 19 0H1C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1C0 1.26522 0.105357 1.51957 0.292893 1.70711C0.48043 1.89464 0.734784 2 1 2ZM19 10H1C0.734784 10 0.48043 10.1054 0.292893 10.2929C0.105357 10.4804 0 10.7348 0 11C0 11.2652 0.105357 11.5196 0.292893 11.7071C0.48043 11.8946 0.734784 12 1 12H19C19.2652 12 19.5196 11.8946 19.7071 11.7071C19.8946 11.5196 20 11.2652 20 11C20 10.7348 19.8946 10.4804 19.7071 10.2929C19.5196 10.1054 19.2652 10 19 10ZM19 5H1C0.734784 5 0.48043 5.10536 0.292893 5.29289C0.105357 5.48043 0 5.73478 0 6C0 6.26522 0.105357 6.51957 0.292893 6.70711C0.48043 6.89464 0.734784 7 1 7H19C19.2652 7 19.5196 6.89464 19.7071 6.70711C19.8946 6.51957 20 6.26522 20 6C20 5.73478 19.8946 5.48043 19.7071 5.29289C19.5196 5.10536 19.2652 5 19 5Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="hidden xl:block w-full md:w-auto px-2 mr-auto">
          <ul className="flex items-center">
            <li className="mr-10">
              <Link className={`text-sm font-medium ${isActive("/")}`} to="/">
                ユーザ一覧
              </Link>
            </li>
            <li className="mr-10">
              <Link
                className={`text-sm font-medium ${isActive("/industries")}`}
                to="/industries"
              >
                業種一覧
              </Link>
            </li>
            <li className="mr-10">
              <Link
                className={`text-sm font-medium ${isActive("/occupations")}`}
                to="/occupations"
              >
                職種一覧
              </Link>
            </li>
            <li className="mr-10">
              <Link
                className={`text-sm font-medium ${isActive("/themes")}`}
                to="/themes"
              >
                テーマ一覧
              </Link>
            </li>
            <li className="mr-10">
              <Link
                className={`text-sm font-medium ${isActive("/event")}`}
                to="/event"
              >
                イベント通知一覧
              </Link>
            </li>

            <li className="mr-10">
              <Link
                className={`text-sm font-medium ${isActive("/admin_users")}`}
                to="/admin_users"
              >
                管理者ユーザ一覧
              </Link>
            </li>
            <li className="mr-10">
              <Link
                className={`text-sm font-medium ${isActive("/logout")}`}
                to="/logout"
              >
                ログアウト
              </Link>
            </li>
          </ul>
        </div>
        <div className="hidden xl:block w-full md:w-auto px-2">
          <div className="md:flex items-center">
            <div className="w-full md:w-auto mb-6 md:mb-0">
              <div
                className="flex flex-wrap items-center"
                contentEditable="false"
              >
                <a href="#">
                  <svg
                    width={12}
                    height={7}
                    viewBox="0 0 12 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div
        className={`navbar-menu fixed top-0 left-0 bottom-0 z-50 ${
          menuVisible ? "" : "hidden"
        }`}
      >
        <div className="navbar-backdrop fixed top-0 left-0 w-full h-full bg-gray-800 opacity-50" />
        <nav className="fixed w-full h-full max-w-xss bg-white">
          <div className="py-6 h-full overflow-y-auto">
            <div className="flex flex-col flex-wrap px-7 -m-2.5">
              <div className="w-auto p-2.5">
                <Link className="flex flex-wrap items-center" to="/">
                  <img
                    className="mr-3"
                    src="dashy-assets/images/home-2.svg"
                    alt=""
                  />
                  <p className="hover:text-neutral-700 font-medium">
                    ユーザ一覧
                  </p>
                </Link>
              </div>
              <div className="w-auto p-2.5">
                <Link className="flex flex-wrap items-center" to="/industries">
                  <img
                    className="mr-3"
                    src="dashy-assets/images/loader-rec.svg"
                    alt=""
                  />
                  <p className="hover:text-neutral-700 font-medium">業種一覧</p>
                </Link>
              </div>
              <div className="w-auto p-2.5">
                <Link className="flex flex-wrap items-center" to="/occupations">
                  <img
                    className="mr-3"
                    src="dashy-assets/images/lifebuoy.svg"
                    alt=""
                  />
                  <p className="hover:text-neutral-700 font-medium">職種一覧</p>
                </Link>
              </div>
              <div className="w-auto p-2.5">
                <Link className="flex flex-wrap items-center" to="/themes">
                  <img
                    className="mr-3"
                    src="dashy-assets/images/folder-open.svg"
                    alt=""
                  />
                  <p className="hover:text-neutral-700 font-medium">
                    テーマ一覧
                  </p>
                </Link>
              </div>
              <div className="w-auto p-2.5">
                <Link className="flex flex-wrap items-center" to="/event">
                  <img
                    className="mr-3"
                    src="dashy-assets/images/user-circle.svg"
                    alt=""
                  />
                  <p className="hover:text-neutral-700 font-medium">
                    イベント通知一覧
                  </p>
                </Link>
              </div>
              <div className="w-auto p-2.5">
                <Link className="flex flex-wrap items-center" to="/admin_users">
                  <img
                    className="mr-3"
                    src="dashy-assets/images/link-2-rec.svg"
                    alt=""
                  />
                  <p className="hover:text-neutral-700 font-medium">
                    管理者ユーザ一覧
                  </p>
                </Link>
              </div>
              <div className="w-auto p-2.5">
                <Link className="flex flex-wrap items-center" to="/logout">
                  <img
                    className="mr-3"
                    src="dashy-assets/images/list-unordered-3-rec.svg"
                    alt=""
                  />
                  <p className="hover:text-neutral-700 font-medium">
                    ログアウト
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Header;
