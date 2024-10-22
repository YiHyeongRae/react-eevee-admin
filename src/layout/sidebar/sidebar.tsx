import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SidebarTypes } from "../../data/types/layout";
function index({ open, data, role }: SidebarTypes) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const location = useLocation();

  return (
    <>
      {/* Sidebar Nav */}
      {open ? (
        <ul className="menu bg-[#333] text-[#efefef] w-56 h-full fixed left-0 top-0 p-0 overflow-x-hidden overflow-y-scroll flex-nowrap z-[3]">
          {/* Logo 로고 */}
          <li
            onClick={() => {
              navigate("/table/component");
            }}
            className="pt-2 pb-2"
          >
            <span className={`text-[#fff] !rounded-none`}>
              <span className="w-10 max-sm:w-8">
                <img style={{ filter: "brightness(100%)" }} src={`/vite.svg`} />
              </span>

              <a className="active:!bg-none text-lg max-sm:text-base font-bold">
                {/* {t(`sidebar.logoTitle`)} */}
                Admin
              </a>
            </span>
          </li>
          {data.map((item, index) => {
            const targetStrIndex = location.pathname
              .replace("/", "")
              .indexOf("/");

            const targetPath = location.pathname.substring(
              1,
              targetStrIndex + 1
            );
            return (
              item.access?.includes(role) &&
              (item.sub.length === 0 ? (
                <li
                  key={`no-sub-menu-${index}`}
                  onClick={() => {
                    navigate(item.path);
                  }}
                  className={`${
                    targetPath === item.key && "bg-primary text-[#333]"
                  }`}
                >
                  <span className={`!rounded-none`}>
                    <span className="w-6 max-sm:w-4">
                      <img
                        style={{
                          filter:
                            targetPath === item.key
                              ? "brightness(0%)"
                              : "brightness(100%)",
                        }}
                        src={`/icons/${item.key}.svg`}
                      />
                    </span>
                    <a className="active:!bg-none text-sm max-sm:text-xs font-bold">
                      {/* {item.title} */}
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
                    <span className="w-6 max-sm:w-4">
                      <img
                        style={{ filter: "brightness(100%)" }}
                        src={`/icons/${item.key}.svg`}
                      />
                    </span>
                    <a className="active:!bg-none text-sm max-sm:text-xs font-bold">
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
                              location.pathname.includes(subItem.path) &&
                              "bg-primary text-[#333]"
                            } pt-[10px] pb-[10px] max-sm:pt-[8px] max-sm:pb-[8px] justify-end !rounded-none`}
                          >
                            <a className="text-sm max-sm:text-xs ">
                              {t(`sidebar.${subItem.key}`)}
                            </a>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))
            );
          })}
        </ul>
      ) : (
        <ul className="menu bg-[#333] text-[#efefef] w-14 h-full fixed left-0 top-0 p-0 overflow-x-hidden overflow-y-scroll flex-nowrap z-[3]">
          {/* Logo 로고 */}
          <li
            onClick={() => {
              navigate("/table/component");
            }}
            className="pt-2 pb-2"
          >
            <span className={`text-[#fff] !rounded-none`}>
              <img
                style={{ width: 36, filter: "brightness(100%)" }}
                src={`/vite.svg`}
              />
            </span>
          </li>
          {data.map((item, index) => {
            const targetStrIndex = location.pathname
              .replace("/", "")
              .indexOf("/");

            const targetPath = location.pathname.substring(
              1,
              targetStrIndex + 1
            );
            return (
              item.access?.includes(role) &&
              (item.sub.length === 0 ? (
                <li
                  key={`no-sub-menu-${index}`}
                  onClick={() => {
                    navigate(item.path);
                  }}
                  className={`${
                    targetPath === item.key && "bg-primary text-[#333]"
                  }`}
                >
                  <span className={`!rounded-none`}>
                    <img
                      style={{ filter: "brightness(100%)" }}
                      src={`/icons/${item.key}.svg`}
                    />
                  </span>
                </li>
              ) : (
                <li
                  className={targetPath === item.key ? "bg-primary" : ""}
                  key={`menu-${index}`}
                  onClick={() => {
                    navigate(item.path);
                  }}
                >
                  <span
                    // className={`${
                    //   location.pathname.includes(item.key) &&
                    //   "menu-dropdown-show"
                    // } !rounded-none`}

                    className={`menu-dropdown-show !rounded-none`}
                  >
                    <img
                      style={{ filter: "brightness(100%)" }}
                      src={`/icons/${item.key}.svg`}
                    />
                  </span>
                  <ul
                    className={`menu-dropdown-sub menu-dropdown ps-0 ml-0 bg-[#333] overflow-hidden  menu-dropdown-show
                    `}
                    // className={`menu-dropdown ps-0 ml-0 ${
                    //   location.pathname.includes(item.key) && "menu-dropdown-show"
                    // }`}
                    style={{
                      position: "fixed",
                      left: 56,
                      top: `calc(${40 * index} + 56px )`,
                      // visibility: location.pathname.includes(item.key)
                      //   ? "visible"
                      //   : "hidden",
                      opacity: 1,
                      // transition: "all .3s linear",
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
                              location.pathname.includes(subItem.path) &&
                              "bg-primary text-[#333]"
                            } pt-[12px] pb-[12px] justify-end !rounded-none`}
                          >
                            <a className="text-xs">
                              {t(`sidebar.${subItem.key}`)}
                            </a>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))
            );
          })}
        </ul>
      )}
    </>
  );
}

export default index;
