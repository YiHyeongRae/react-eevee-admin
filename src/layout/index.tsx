import { ReactNode, useEffect, useState } from "react";
import Header from "./header/header";
import Sidebar from "./sidebar/sidebar";
import SidebarData from "../data/datas/sidebar";
import LoadingFullScreen from "../components/LoadingFullScreen";
import { useTranslation } from "react-i18next";
import AccessGuard from "../components/AccessGuard";
import useMatchMediaQuery from "../utils/useMatchMediaQuery";
import { useRecoilState } from "recoil";
import { loadingState } from "../library/recoil/atoms/loadingState";
import { userState } from "../library/recoil/atoms/userState";

function index({ children }: { children: ReactNode }) {
  const [navStatae, setNavState] = useState(true);

  const { i18n } = useTranslation();
  useEffect(() => {
    const locales = localStorage.getItem("admin-locales");

    i18n.changeLanguage(locales || "ko");
  }, []);

  const isMaxSm = useMatchMediaQuery("not all and (min-width: 640px)");
  const [loading] = useRecoilState(loadingState);

  const [user] = useRecoilState(userState);

  useEffect(() => {
    const isMobile = navigator.userAgent.match(
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
    );

    if (isMobile) {
      setNavState(false);
    }
  }, []);

  return (
    <>
      {loading.isLoading && <LoadingFullScreen />}

      <div className={`layout h-full ${navStatae ? "pl-56" : "pl-14"}`}>
        <Header func={setNavState} navState={navStatae} />
        <Sidebar open={navStatae} data={SidebarData} role={user.role} />
        <div
          style={{
            maxHeight: isMaxSm ? "calc(100% - 106px)" : "calc(100% - 94px)",
          }}
          className="h-full p-6 overflow-y-auto max-sm:p-2"
        >
          <AccessGuard data={SidebarData} role={user.role}>
            {children}
          </AccessGuard>
        </div>
      </div>
    </>
  );
}

export default index;
