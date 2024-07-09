const SideBarData = [
  {
    title: "대시보드",
    path: "/dashboard",
    key: "dashboard",
    sub: [],
    access: ["ADMIN", "SUPER_ADMIN"],
  },
  // {
  //   title: "배너 관리",
  //   path: "/banner",
  //   key: "banner",
  //   sub: [],
  //   access: ["SUPER_ADMIN"],
  // },
  // {
  //   title: "회원 관리",
  //   path: "/user",
  //   key: "user",
  //   sub: [],
  //   access: ["ADMIN", "SUPER_ADMIN"],
  // },
  // {
  //   title: "심리검사 데이터",
  //   path: "/mental",
  //   key: "mental",
  //   sub: [],
  //   access: ["ADMIN", "SUPER_ADMIN"],
  // },
  // {
  //   title: "생체수집 데이터",
  //   path: "/bio",
  //   key: "bio",
  //   sub: [],
  //   access: ["ADMIN", "SUPER_ADMIN"],
  // },
  // {
  //   title: "포인트 관리",
  //   path: "/point",
  //   key: "point",
  //   sub: [],
  //   access: ["ADMIN", "SUPER_ADMIN"],
  // },
  // {
  //   title: "게시글 관리",
  //   path: "/post",
  //   key: "post",
  //   sub: [],
  //   access: ["ADMIN", "SUPER_ADMIN"],
  // },

  // {
  //   title: "문의 관리",
  //   path: "/ask",
  //   key: "ask",
  //   sub: [],
  //   access: ["ADMIN", "SUPER_ADMIN"],
  // },
  // {
  //   title: "공지 관리",
  //   path: "/notice",
  //   key: "notice",
  //   sub: [],
  //   access: ["ADMIN", "SUPER_ADMIN"],
  // },

  // {
  //   title: "관리자 관리",
  //   path: "/admin",
  //   key: "admin",
  //   sub: [],
  //   access: ["SUPER_ADMIN"],
  // },
  // {
  //   title: "약관 관리",
  //   path: "/policy/service",
  //   key: "policy",
  //   sub: [
  //     { title: "서비스 이용", key: "service", path: "/policy/service" },
  //     { title: "개인정보 처리방침", key: "privacy", path: "/policy/privacy" },
  //   ],
  //   access: ["ADMIN", "SUPER_ADMIN"],
  // },
  {
    title: "테이블",
    path: "/table/component",
    key: "table",
    sub: [
      { title: "컴포넌트", key: "component", path: "/table/component" },
      { title: "기본", key: "basic", path: "/table/basic" },
      { title: "수정 가능한 셀", key: "editable", path: "/table/editable" },
    ],
    access: ["ADMIN", "SUPER_ADMIN"],
  },
];
export default SideBarData;
