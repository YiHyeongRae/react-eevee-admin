import { useTranslation } from "react-i18next";

import { useState } from "react";

function index() {
  const { t, i18n } = useTranslation();

  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem("currentTheme")
  );

  return (
    <div
      className={`justify-end flex items-center p-6 max-sm:p-2 w-full border-b-2 gap-2`}
    >
      <div className="flex items-center">
        <div className="flex items-center grid-cols-2 gap-2 max-sm:grid">
          <div className="flex items-center dropdown dropdown-left">
            <div tabIndex={0} role="button" className="bg-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
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
              className="dropdown-content z-[2] p-2 shadow rounded-box w-fit border border-base-300 bg-neutral"
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
        </div>
      </div>
    </div>
  );
}

export default index;
