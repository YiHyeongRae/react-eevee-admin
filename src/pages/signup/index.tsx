import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function index() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    const locales = localStorage.getItem("admin-locales");

    i18n.changeLanguage(locales || "ko");
  }, []);
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="min-h-screen hero">
        <div className="flex-col border border-base-200 hero-content lg:flex-row-revers">
          <div className="text-center lg:text-left">
            <h1 className="mb-5 text-3xl font-bold">{`${t("common.admin")} ${t(
              "common.regist"
            )}`}</h1>
          </div>
          <div className="w-full gap-4 card shrink-0">
            <label className="flex items-center gap-2 ">
              <span className="flex min-w-32">{t("common.name")}</span>
              <input
                type="text"
                className="grow bg-base-100 input input-bordered input-sm max-sm:input-xs"
                placeholder={t("common.name")}
              />
            </label>
            <label className="flex items-center gap-2 ">
              <span className="min-w-32">{t("common.email")}</span>
              <input
                type="text"
                className="grow input input-bordered input-sm max-sm:input-xs"
                placeholder="dev@dev.kr"
              />
            </label>
            <label className="flex items-center gap-2">
              <span className="min-w-32">{t("common.password")}</span>
              <input
                type="password"
                className="grow input input-bordered input-sm max-sm:input-xs"
                placeholder={t("placeholder.password")}
              />
            </label>
            <label className="flex items-center gap-2 ">
              <span className="min-w-32">{t("common.passwordCheck")}</span>
              <input
                type="password"
                className="grow input input-bordered input-sm max-sm:input-xs"
                placeholder={t("placeholder.password")}
              />
            </label>
            <label className="flex items-center gap-2  focus:!outline-none !outline-0 overflow-hidden">
              <span className="min-w-32">{t("common.authority")}</span>
              <select className="w-full select select-sm max-sm:select-xs  select-bordered focus:!outline-none !outline-0 !outline-none">
                <option disabled>{t("placeholder.checkAuthority")}</option>
                <option>{t("common.admin")}</option>
                <option>{t("common.superAdmin")}</option>
              </select>
            </label>

            <div className="mt-6 form-control">
              <button disabled className="btn btn-sm max-sm:btn-xs btn-primary">
                {t("common.regist")}
              </button>
            </div>
            <label className="flex items-center gap-2">
              <button
                className="w-full btn btn-sm max-sm:btn-xs btn-primary"
                onClick={() => navigate("/")}
              >
                {t("common.cancle")}
              </button>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
