import { ReactNode } from "react";

type CarouselInfinite = {
  initialIndexValue?: number;
  getCurrentIndex?: Function;
  children: ReactNode;
  infinite?: boolean;
  interval?: never;
};
type CarouselInterval = {
  initialIndexValue?: number;
  getCurrentIndex?: Function;
  children: ReactNode;
  infinite?: never;
  interval?: number;
};
type CarouselTypes = CarouselInterval | CarouselInfinite;

type TableTypes = {
  data: TdObjTypes[];
  addedMap: string[][];
  checakble?: { active: boolean; multi: boolean; setter: Function };
  draggable?: boolean;
  trOptions?: {
    thead?: {
      className?: string;
      func?: Function;
    };
    tbody?: {
      className?: string;
      func?: Function;
    };
  };
  tdOptions?: {
    [key: string]: {
      className?: string;
      func?: Function;
      tooltip?: { active: boolean; text: string };
      el?: Function;
    };
  };
  searchText?: string;
};

type TableTdFunctionTypes = {
  array: TdObjTypes[];
  setter: Function;
  perPage: number;
  thMap: Map<string, string>;
};
type TableThFunctionTypes = {
  addedMap: string[][];
  thMap: Map<string, string>;
  setter: Function;
};

type TableExtensionHeaderTypes = {
  search?: { active?: boolean; setter?: Function };
  query?: {
    active?: boolean;
    setter?: Function;
    submit?: Function;
    disabled?: boolean;
  };
  etc?: {
    className: string;
    text: string;
    func: Function;
    disabled: boolean;
  }[];
};

type TdObjTypes = {
  [x: string]: string | number | boolean | string[] | number[] | boolean[] | {};
};

type ModalTypes = {
  id: string;
  className?: string;
  children: ReactNode;
  closeFunc?: Function;
  open?: boolean;
};

type ModalOpenerTypes = {
  className?: string;
  id: string;
  children: ReactNode;
  func?: Function;
};

type AlertTypes = {
  id: string;
  title: string;
  text: string;
  buttons: {
    style: string;
    text: string;
    func: Function;
    disabled: boolean;
  }[];
  open?: boolean;
  className?: string;
};

type AlertOpenerTypes = {
  style?: string;
  id: string;
  text?: string;
  func?: Function;
  children?: ReactNode;
};

type AccessGuardTypes = {
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
  children: ReactNode;
};
type AuthGuardTypes = {
  isAuthenticated: boolean;
  redirectTo: string;
  children: ReactNode;
};

type CalendarTypes = {
  select: {
    selected?: {
      year: number;
      month: number;
      date: number;
      day: number;
      dateStr: string;
    };
    setter: Function;
  };
  closeFunc?: Function;
  past?: string;
  future?: string;
};

type EditableCellTypes = {
  item: string;
  index: number;
  edit: {
    editItem: string | number;
    setEditItem: Function;
    confirmFunc?: Function;
    cancleFunc?: Function;
  };
};

type TimePickerTypes = {
  fixedHeight?: string;
  type?: "half" | "full";
  select: {
    selected?: {
      ampm: string;
      hour: string;
      minute: string;
      second: string;
      timeStr: string;
    };
    setter: Function;
  };
  second?: boolean;
  perSecond?: 1 | 2 | 3 | 4 | 5 | 6 | 10 | 12;
  perItems?: number;
};

type ToastTypes = {
  list: { [key: string]: string | boolean }[];
  setter: Function;
  duration?: number;
  position?:
    | "toast-start"
    | "toast-end"
    | "toast-top"
    | "toast-middle"
    | "toast-bottom";
};

export type {
  TableTypes,
  TableTdFunctionTypes,
  TableThFunctionTypes,
  TableExtensionHeaderTypes,
  TdObjTypes,
  CarouselTypes,
  ModalTypes,
  ModalOpenerTypes,
  AlertTypes,
  AlertOpenerTypes,
  AccessGuardTypes,
  AuthGuardTypes,
  CalendarTypes,
  EditableCellTypes,
  TimePickerTypes,
  ToastTypes,
};
