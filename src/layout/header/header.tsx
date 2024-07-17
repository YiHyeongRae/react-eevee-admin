import { useTranslation } from "react-i18next";
import { Modal, ModalOpener } from "../../components/Modal";
import { useState } from "react";
import { Alert } from "../../components/Alert";
import { HeaderTypes } from "../../data/types/layout";
import { useNavigate } from "react-router-dom";

function index({ func, navState }: HeaderTypes) {
  const { t, i18n } = useTranslation();

  const [changePw, setChangePw] = useState(false);

  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem("currentTheme")
  );
  const navigate = useNavigate();

  return (
    <div
      // className={`flex items-center ${
      //   func ? "justify-between" : "justify-end"
      // } ${navState ? "p-6" : "p-[0.6rem]"} w-full border-b-2 shadow-sm h-100`}

      className={`${
        func ? "justify-between" : "justify-end"
      } flex items-center p-6 max-sm:p-2 w-full border-b-2 gap-2`}
    >
      {func && (
        <button
          onClick={() => {
            func((prev: boolean) => !prev);
          }}
        >
          {navState ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 max-sm:size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 max-sm:size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25"
              />
            </svg>
          )}
        </button>
      )}
      <div className="flex items-center">
        <div className="flex items-center grid-cols-2 gap-2 max-sm:grid">
          <div className="col-span-1 avatar placeholder">
            <div className="w-6 rounded-full bg-primary">
              <span className="text-xs text-white">EV</span>
            </div>
          </div>
          <div className="p-0 card-body max-sm:hidden">
            <h2 className="text-sm card-title">dev@dev.kr</h2>
            <p className="text-xs">EEVEE | SUPER_ADMIN</p>
          </div>

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
                  d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className={`dropdown-content bg-base-100 z-[2] p-2 shadow rounded-box w-fit  border border-base-300 `}
            >
              <li>
                <ModalOpener id="profile">
                  <input
                    className="justify-start theme-controller btn btn-sm btn-block btn-ghost"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    value={t(`header.profile`)}
                  />
                </ModalOpener>
              </li>
              <li>
                <input
                  className="justify-start theme-controller btn btn-sm btn-block btn-ghost"
                  type="button"
                  onClick={() => {
                    localStorage.setItem("login", "false");
                    navigate("/login");
                  }}
                  value={t(`header.logout`)}
                />
              </li>
            </ul>
          </div>

          <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input
              type="checkbox"
              className="theme-controller"
              value="synthwave"
              checked={currentTheme === "dim"}
              onChange={() => {
                const htmlEl = document.getElementsByTagName("html");

                if (htmlEl[0].getAttribute("data-theme") === "bumblebee") {
                  localStorage.setItem("currentTheme", "dim");
                  htmlEl[0].setAttribute("data-theme", "dim");
                  setCurrentTheme("dim");
                } else {
                  localStorage.setItem("currentTheme", "bumblebee");
                  htmlEl[0].setAttribute("data-theme", "bumblebee");
                  setCurrentTheme("bumblebee");
                }
              }}
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="fill-current size-6 swap-off"
            >
              <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="fill-current size-6 swap-on"
            >
              <path
                fillRule="evenodd"
                d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          <div className="flex items-center dropdown dropdown-left">
            <div tabIndex={0} role="button" className="bg-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2.25a.75.75 0 0 1 .75.75v1.506a49.384 49.384 0 0 1 5.343.371.75.75 0 1 1-.186 1.489c-.66-.083-1.323-.151-1.99-.206a18.67 18.67 0 0 1-2.97 6.323c.318.384.65.753 1 1.107a.75.75 0 0 1-1.07 1.052A18.902 18.902 0 0 1 9 13.687a18.823 18.823 0 0 1-5.656 4.482.75.75 0 0 1-.688-1.333 17.323 17.323 0 0 0 5.396-4.353A18.72 18.72 0 0 1 5.89 8.598a.75.75 0 0 1 1.388-.568A17.21 17.21 0 0 0 9 11.224a17.168 17.168 0 0 0 2.391-5.165 48.04 48.04 0 0 0-8.298.307.75.75 0 0 1-.186-1.489 49.159 49.159 0 0 1 5.343-.371V3A.75.75 0 0 1 9 2.25ZM15.75 9a.75.75 0 0 1 .68.433l5.25 11.25a.75.75 0 1 1-1.36.634l-1.198-2.567h-6.744l-1.198 2.567a.75.75 0 0 1-1.36-.634l5.25-11.25A.75.75 0 0 1 15.75 9Zm-2.672 8.25h5.344l-2.672-5.726-2.672 5.726Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content bg-base-100 z-[2] p-2 shadow rounded-box w-fit border border-base-300"
            >
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="justify-start theme-controller btn btn-sm btn-block btn-ghost"
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
                  className="justify-start theme-controller btn btn-sm btn-block btn-ghost"
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
      <Modal
        id="profile"
        className="overflow-hidden"
        closeFunc={() => setChangePw(false)}
      >
        <div className="mb-6 text-xl font-bold max-sm:text-base">
          {t("title.editProfile")}
        </div>
        <div
          className="flex overflow-hidden"
          style={{
            width: "calc(200% + 48px)",
            gap: "48px",
            marginLeft: changePw ? "calc(-100% - 48px)" : "0%",
            transition: "margin .1s linear",
          }}
        >
          <div className="flex w-full">
            <div className="w-full mt-4 bg-base-100">
              <div className="flex-col lg:flex-row-revers">
                <div className="grid grid-cols-2 gap-4">
                  <label className="grid items-center grid-cols-3 col-span-2 gap-2">
                    <span className="col-span-1 col-start-1">
                      {t("common.name")}
                    </span>

                    <input
                      type="text"
                      className="col-span-2 bg-base-100 input input-bordered input-sm max-sm:input-xs"
                      placeholder={t("common.name")}
                    />
                  </label>
                  <label className="grid items-center grid-cols-3 col-span-2 gap-2">
                    <span className="col-span-1 col-start-1">
                      {t("common.email")}
                    </span>

                    <input
                      type="text"
                      className="col-span-2 bg-base-100 input input-bordered input-sm max-sm:input-xs"
                      placeholder="dev@dev.kr"
                    />
                  </label>

                  <label className="grid items-center grid-cols-3 col-span-2 gap-2 focus:!outline-none !outline-0 overflow-hidden">
                    <span className="col-span-1 col-start-1">
                      {t("common.authority")}
                    </span>
                    <select className="w-full select select-sm max-sm:select-xs  select-bordered focus:!outline-none !outline-0 !outline-none col-span-2">
                      <option disabled>
                        {t("placeholder.checkAuthority")}
                      </option>
                      <option>{t("common.admin")}</option>
                      <option>{t("common.superAdmin")}</option>
                    </select>
                  </label>
                  <label className="grid items-center grid-cols-3 col-span-2 gap-2 focus:!outline-none !outline-0 overflow-hidden">
                    <span className="col-span-1 col-start-1">
                      {t("common.role")}
                    </span>
                    <input
                      type="text"
                      className="col-span-2 grow input input-bordered input-sm max-sm:input-xs"
                      placeholder={t("placeholder.option")}
                    />
                  </label>
                  <div className="grid grid-cols-2 col-span-2 gap-2 mt-6 items-between">
                    <div className="form-control">
                      <button
                        disabled
                        className="btn btn-sm max-sm:btn-xs btn-primary"
                      >
                        {t("common.edit")}
                      </button>
                    </div>
                    <label className="flex items-center gap-2">
                      <button
                        className="w-full btn btn-sm max-sm:btn-xs btn-primary"
                        onClick={() => setChangePw(true)}
                      >
                        {`${t("common.password")} ${t("common.change")}`}
                      </button>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full">
            <div className="w-full mt-4 bg-base-100">
              <div className="flex flex-col justify-between h-full lg:flex-row-revers">
                <div className="grid grid-cols-2 gap-4">
                  <label className="grid items-center grid-cols-3 col-span-2 gap-2">
                    <span className="col-span-1 col-start-1">
                      {t("common.password")}
                    </span>
                    <input
                      type="password"
                      className="col-span-2 grow input input-bordered input-sm max-sm:input-xs"
                      placeholder={t("placeholder.password")}
                    />
                  </label>
                  <label className="grid items-center grid-cols-3 col-span-2 gap-2">
                    <span className="col-span-1 col-start-1">
                      {t("common.passwordCheck")}
                    </span>
                    <input
                      type="password"
                      className="col-span-2 grow input input-bordered input-sm max-sm:input-xs"
                      placeholder={t("placeholder.password")}
                    />
                  </label>
                </div>
                <div className="grid grid-cols-2 col-span-2 gap-2 mt-6 items-between">
                  <div className="form-control">
                    <button
                      disabled
                      className="btn btn-sm max-sm:btn-xs btn-primary"
                    >
                      {`${t("common.password")} ${t("common.change")}`}
                    </button>
                  </div>
                  <label className="flex items-center gap-2">
                    <button
                      className="w-full btn btn-sm max-sm:btn-xs btn-primary"
                      onClick={() => setChangePw(false)}
                    >
                      {t("common.cancle")}
                    </button>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Alert
        id="logout"
        title="로그아웃"
        text="로그아웃 하시겠습니까?"
        buttons={[
          { style: "", text: "취소", func: () => {}, disabled: false },
          {
            style: "",
            text: "확인",
            func: () => {
              localStorage.setItem("login", "false");
            },
            disabled: false,
          },
        ]}
      />
    </div>
  );
}

export default index;
