const SideBarData = [
  {
    path: "/table/component",
    key: "table",
    sub: [
      { title: "컴포넌트", key: "component", path: "/table/component" },
      { title: "기본", key: "basic", path: "/table/basic" },
      { title: "수정 가능", key: "editable", path: "/table/editable" },
      { title: "체크", key: "checkable", path: "/table/checkable" },
      { title: "모달 테이블", key: "withModal", path: "/table/withModal" },
      { title: "커스텀 셀 테이블", key: "custom", path: "/table/custom" },
      { title: "확장 헤더", key: "withHeader", path: "/table/withHeader" },
    ],
    access: ["ADMIN", "SUPER_ADMIN"],
  },
  {
    path: "/tableExtensionHeader/component",
    key: "tableExtensionHeader",
    sub: [
      {
        title: "컴포넌트",
        key: "component",
        path: "/tableExtensionHeader/component",
      },
      { title: "기본", key: "basic", path: "/tableExtensionHeader/basic" },
    ],
    access: ["ADMIN", "SUPER_ADMIN"],
  },

  {
    path: "/modal/component",
    key: "modal",
    sub: [
      { title: "컴포넌트", key: "component", path: "/modal/component" },
      { title: "기본", key: "basic", path: "/modal/basic" },
      { title: "함수", key: "function", path: "/modal/function" },
    ],
    access: ["ADMIN", "SUPER_ADMIN"],
  },
  // {
  //   path: "/carousel/component",
  //   key: "carousel",
  //   sub: [
  //     { title: "컴포넌트", key: "component", path: "/carousel/component" },
  //     { title: "기본", key: "basic", path: "/carousel/basic" },
  //   ],
  //   access: ["ADMIN", "SUPER_ADMIN"],
  // },
];
export default SideBarData;
