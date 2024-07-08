import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function index() {
  const { t, i18n } = useTranslation();
  // const isLogin = localStorage.getItem("login") === "true";
  // if (isLogin) {
  //   return <Navigate to="/dashboard" />;
  // }

  const [login, setLogin] = useState({ id: "", pw: "" });
  const navigate = useNavigate();
  useEffect(() => {
    const locales = localStorage.getItem("admin-locales");

    i18n.changeLanguage(locales || "ko");
  }, []);
  return (
    <div className="min-h-screen hero bg-base-100 login">
      <div className="flex-col gap-10 hero-content lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          {/* <img src="/vite.svg" className="mx-auto mb-2" /> */}

          <h1 className="mb-10 text-5xl font-bold">React-Eevee-Admin</h1>
        </div>
        <div className="w-full max-w-sm shadow-2xl card shrink-0 bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">{t("common.email")}</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="email"
                  className="w-[50%] input input-bordered"
                  required
                  value={login.id}
                  onChange={(e) =>
                    setLogin((prev) => {
                      return { ...prev, id: e.target.value };
                    })
                  }
                />
                <input
                  disabled
                  type="text"
                  placeholder="@andreia.kr"
                  className="w-[50%] input input-bordered"
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">{t("common.password")}</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
                value={login.pw}
                onChange={(e) =>
                  setLogin((prev) => {
                    return { ...prev, pw: e.target.value };
                  })
                }
              />
            </div>
            <div className="mt-6 form-control">
              <button
                disabled={login.id === "" || login.pw === ""}
                className="btn btn-block btn-primary"
                onClick={() => {
                  localStorage.setItem("login", "true");
                  navigate("/dashboard");
                }}
              >
                {t("header.login")}
              </button>
            </div>
            <div className="justify-center w-full join">
              <label className="label join-item">
                <a href="/signup" className="label-text-alt link link-hover">
                  {t("header.register")}
                </a>
              </label>
              <div className="divider lg:divider-horizontal">|</div>
              <label className="label join-item">
                <a href="/findPw" className="label-text-alt link link-hover">
                  {t("header.find")}
                </a>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
