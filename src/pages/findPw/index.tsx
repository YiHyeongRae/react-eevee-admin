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

  // const [changePw, setChangePw] = useState(false);
  // const [isReq, setIsReq] = useState(false);
  return (
    // <div className="flex items-center justify-center w-full h-full">
    //   <div className="min-h-screen hero">
    //     <div className="flex-col overflow-hidden border border-base-200 hero-content lg:flex-row-revers">
    //       <div className="text-center lg:text-left">
    //         <h1 className="mb-5 text-3xl font-bold">{`${t(
    //           "common.password"
    //         )} ${t("common.find")}`}</h1>
    //       </div>

    //       <div className="flex flex-col items-center max-w-md">
    //         <div className="w-full gap-4 card shrink-0">
    //           <label className="flex items-center gap-2 ">
    //             <span className="min-w-32">{t("common.email")}</span>

    //             <div className="flex gap-2">
    //               <input
    //                 type="text"
    //                 placeholder="email"
    //                 className="w-[50%] input input-bordered"
    //                 required
    //               />
    //               <input
    //                 disabled
    //                 type="text"
    //                 placeholder="@andreia.kr"
    //                 className="w-[50%] input input-bordered"
    //               />
    //             </div>
    //           </label>

    //           <div className="text-xs text-[#999]">
    //             등록된 이메일로 임시 비밀번호를 전송해드립니다.
    //           </div>
    //         </div>
    //         <div className="flex w-full gap-4 mt-4 card shrink-0">
    //           <label className="flex items-center">
    //             <button
    //               className="w-full btn btn-sm btn-primary"
    //               onClick={() => navigate("/")}
    //             >
    //               {t("common.cancle")}
    //             </button>
    //           </label>
    //           <label className="flex items-center">
    //             <button
    //               disabled
    //               className="w-full btn btn-sm btn-primary"
    //               // onClick={() => navigate("/")}
    //             >
    //               {t("common.submit")}
    //             </button>
    //           </label>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="flex items-center justify-center w-full h-full">
      <div className="min-h-screen hero">
        <div className="flex-col border border-base-200 hero-content lg:flex-row-revers">
          <div className="text-center lg:text-left">
            <h1 className="mb-5 text-3xl font-bold">
              {`${t("common.password")} ${t("common.find")}`}
            </h1>
          </div>
          <div className="w-full gap-4 card shrink-0">
            <label className="flex items-center gap-2 ">
              <span className="min-w-16">{t("common.email")}</span>
              <input
                type="text"
                className="input-sm max-sm:input-xs input input-bordered "
                placeholder="admin"
              />
              <input
                disabled
                type="text"
                placeholder="@andreia.kr"
                className="input-sm max-sm:input-xs input input-bordered"
              />
            </label>

            <div className="text-xs text-[#999]">
              등록된 이메일로 임시 비밀번호를 전송해드립니다.
            </div>
            <div className="mt-6 form-control">
              <button disabled className="btn btn-sm max-sm:btn-xs btn-primary">
                {t("common.submit")}
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
