import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SidebarTypes } from "../../data/types/layout";
import { useState } from "react";
function index({ data, navState }: SidebarTypes) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const location = useLocation();
  const [hoverd, setHoverd] = useState(false);
  return (
    <ul
      className="fixed top-0 left-0 z-[9999] w-56 h-full p-0 overflow-x-hidden overflow-y-scroll menu bg-neutral flex-nowrap border-r border-zinc-500"
      style={{ display: navState ? "none" : "flex" }}
    >
      <li
        onClick={() => {
          navigate("/docs/install");
        }}
        className="pb-4"
      >
        <span
          className={`!rounded-none flex w-full`}
          onMouseEnter={() => setHoverd(true)}
          onMouseLeave={() => setHoverd(false)}
        >
          <a className="relative flex justify-center w-full text-base font-bold max-md:text-sm">
            <span
              className={`${hoverd ? "translate-x-[-24px]" : ""}`}
              style={{ transition: "all .1s linear" }}
            >
              Grids
            </span>
            <span
              className={`${
                hoverd
                  ? "opacity-100 rotate-0  absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
                  : "opacity-0 rotate-90  absolute left-0 top-[50%] translate-x-[-50%] translate-y-[-50%]"
              }`}
              style={{ transition: "opacity, transform .3s linear" }}
            >
              +
            </span>
            <span
              className={`${hoverd ? "translate-x-1" : ""}`}
              style={{ transition: "all .1s linear" }}
            >
              ify
            </span>
          </a>
        </span>
        {/* <span className={`!rounded-none flex`}>
            <a className="w-full text-base font-bold text-center max-md:text-sm">
              Gridsify
            </a>
          </span> */}
      </li>
      {data.map((item, index) => {
        const targetStrIndex = location.pathname.replace("/", "").indexOf("/");

        const targetPath = location.pathname.substring(1, targetStrIndex + 1);
        return item.sub.length === 0 ? (
          <li
            key={`no-sub-menu-${index}`}
            onClick={() => {
              navigate(item.path);
            }}
            className={`${targetPath === item.key && "bg-primary"}`}
          >
            <span className={`!rounded-none`}>
              <a className="text-sm font-bold max-md:text-xs">
                {t(`sidebar.${item.key}`)}
              </a>
            </span>
          </li>
        ) : (
          <li
            key={`menu-${index}`}
            onClick={() => {
              navigate(item.path);
            }}
          >
            <span
              className={`menu-dropdown-toggle ${
                targetPath === item.key && "menu-dropdown-show"
              } !rounded-none`}
            >
              <a className="text-sm font-bold max-md:text-xs">
                {t(`sidebar.${item.key}`)}
              </a>
            </span>
            <ul
              className={`menu-dropdown ps-0 ml-0 ${
                targetPath === item.key && "menu-dropdown-show"
              }`}
              style={{
                visibility: location.pathname.includes(item.key)
                  ? "visible"
                  : "hidden",
                opacity: 1,
              }}
            >
              {item.sub.map((subItem, subIndex) => {
                return (
                  <li
                    key={`submenu-${subIndex}`}
                    onClick={(e) => {
                      navigate(subItem.path);
                      e.stopPropagation();
                    }}
                  >
                    <span
                      className={`${
                        location.pathname.includes(subItem.path) && "bg-primary"
                      } pt-[10px] pb-[10px] max-md:pt-[8px] max-md:pb-[8px] justify-end !rounded-none`}
                    >
                      <a className="text-sm max-md:text-xs ">
                        {t(`sidebar.${subItem.key}`)}
                      </a>
                    </span>
                  </li>
                );
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  );
}

export default index;
