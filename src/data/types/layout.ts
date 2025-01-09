type SidebarTypes = {
  data: {
    path: string;
    key: string;
    sub: {
      key: string;
      path: string;
    }[];
  }[];
  navState: boolean;
  setNavState: Function;
};

type HeaderTypes = {
  func?: Function;
  navState: boolean;
};

export type { SidebarTypes, HeaderTypes };
