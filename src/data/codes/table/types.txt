type ColSpanStarterTypes = {
  [key: string]: {
    title: string;
    colSpan: number;
  };
};
type mergeTheadTrOptions = {
  colSpanStarter: ColSpanStarterTypes;
  colSpanTarget: string[];
};

type TableTypes = {
  className?: string;
  draggableIcon?: React.ReactNode;
  data: TdObjTypes[];
  addedMap: string[][];
  checkable?: { active: boolean; multi: boolean; setter: Function };
  tdOptions?: {
    [key: string]: {
      className?: Function;
      func?: Function;
      el?: Function;
    };
  };
  trOptions?: {
    thead?: {
      className?: Function;
      func?: Function;
      isDraggable?: Function;
    };
    tbody?: {
      className?: Function;
      func?: Function;
      isDraggable?: Function;
      dragEndFunc?: Function;
      dbClickFunc?: Function;
    };
  };
  mergeTheadTrOptions?: mergeTheadTrOptions;
  perPageOptions?: {
    page: number;
    perPage: number;
    pageLength: number;
    setPerPage: Function;
    el?: React.ReactNode;
  };
  perPageList?: number[];
  overflowY?: { active: boolean; maxHeight: string };
};
type TableTdFunctionTypes = {
  array: TdObjTypes[];
  setter: Function;
  perPage: number;
  page: number;
  thMap: Map<string, string>;
};
type TableThFunctionTypes = {
  addedMap: string[][];
  thMap: Map<string, string>;
  setter: Function;
};

type TdObjTypes = {
  [x: string]: string | number | boolean | string[] | number[] | boolean[] | {};
};

export type {
  TableTypes,
  TableTdFunctionTypes,
  TableThFunctionTypes,
  TdObjTypes,
};
