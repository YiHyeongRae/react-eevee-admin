type SidebarTypes = {
  open: boolean;
  data: {
    path: string;
    key: string;
    sub: {
      title: string;
      key: string;
      path: string;
    }[];
    access: string[];
  }[];
  role: string;
};

type HeaderTypes = {
  func?: Function;
  navState: boolean;
};

export type { SidebarTypes, HeaderTypes };
