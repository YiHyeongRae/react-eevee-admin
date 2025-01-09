import { ReactNode, useEffect, useState } from "react";
import Sidebar from "./sidebar/sidebar";
import Paths from "../data/datas/paths";
import { useTranslation } from "react-i18next";
import useMatchMediaQuery from "#/utils/useMatchMediaQuery";
import { useLocation, useNavigate } from "react-router-dom";

function index({ children }: { children: ReactNode }) {
  const isMaxSm = useMatchMediaQuery("not all and (min-width: 768px)");
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  useEffect(() => {
    const locales = localStorage.getItem("admin-locales");

    i18n.changeLanguage(locales || "ko");
  }, []);
  const [navState, setNavState] = useState(false);
  useEffect(() => {
    if (isMaxSm) {
      setNavState(true);
    } else {
      setNavState(false);
    }
  }, [isMaxSm]);

  const location = useLocation();
  function useSpliceText(url: string) {
    const index = url.lastIndexOf("/"); // 마지막 '/' 위치 찾기
    if (index === -1) return url; // '/'가 없으면 원본 리턴
    return url.substring(index + 1); // 마지막 '/' 이후 부분 리턴
  }
  const route = useNavigate();

  return (
    <>
      <div
        className={`layout h-full`}
        style={{ paddingLeft: isMaxSm ? "0" : "14rem" }}
      >
        <div className="fixed z-[9999] p-1 rounded-full bg-primary top-[15px] right-4 dropdown dropdown-left max-md:top-[16px]">
          <div tabIndex={0} role="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 max-md:size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[2] p-2 shadow rounded-box w-fit border mr-2 border-base-300 bg-neutral"
          >
            <li className="mb-2">
              <input
                type="radio"
                name="theme-dropdown"
                className="justify-start rounded-none theme-controller btn btn-sm btn-block btn-ghost"
                aria-label="한국어"
                checked={i18n.language === "ko"}
                onChange={(e) => {
                  localStorage.setItem("admin-locales", "ko");

                  i18n.changeLanguage("ko");
                  e.currentTarget.blur();
                }}
                value="한국어"
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="justify-start rounded-none theme-controller btn btn-sm btn-block btn-ghost"
                aria-label="English"
                value="English"
                checked={i18n.language === "en"}
                onChange={(e) => {
                  localStorage.setItem("admin-locales", "en");

                  i18n.changeLanguage("en");
                  e.currentTarget.blur();
                }}
              />
            </li>
          </ul>
        </div>

        {isMaxSm && (
          <div className="fixed z-[999] p-1 rounded-full bg-primary top-[15px] right-14 dropdown dropdown-left max-md:top-[16px]">
            <div
              tabIndex={0}
              role="button"
              onClick={() => setNavState((prev) => !prev)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 max-md:size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </div>
          </div>
        )}
        <Sidebar data={Paths} navState={navState} setNavState={setNavState} />
        <div className="border mockup-browser border-base-300">
          <div className="mockup-browser-toolbar">
            <div className="ml-auto mr-auto text-sm breadcrumbs max-md:text-xs">
              <ul>
                <li>
                  <a
                    className="no-underline text-zinc-300 link"
                    onClick={() => route("/docs/component")}
                  >
                    {t(`sidebar.docs`)}
                  </a>
                </li>
                <li>
                  <p className="underline text-info">
                    {t(`sidebar.${useSpliceText(location.pathname)}`)}
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <div className="h-full px-4 py-6 overflow-y-auto max-sm:p-2">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

export default index;
