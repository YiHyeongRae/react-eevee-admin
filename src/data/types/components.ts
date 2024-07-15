import { ReactNode } from "react";

type CarouselTyees = {
  initialIndexValue?: number;
  getCurrentIndex?: Function;
  children: ReactNode;
  infinite?: boolean;
  speed?: number;
};

type TableTypes = {
  data: {
    [x: string]: string | number | boolean | string[] | number[] | boolean[];
  }[];
  addedMap: string[][];
  checakble?: { active: boolean; multi: boolean; setter: Function };
  trOptions?: {
    thead: {
      className: string;
      func: Function;
    };
    tbody: {
      className: string;
      func: Function;
    };
  };
  tdOptions?: {
    [key: string]: {
      className?: string;
      func: Function;
      tooltip?: { active: boolean; text: string };
      el: Function;
    };
  };
  buttons?: {
    className: string;
    text: string;
    func: Function;
    disabled: boolean;
  }[];
};

type TableTdFunctionTypes = {
  array: {
    [x: string]: string | number | boolean | string[] | number[] | boolean[];
  }[];
  setter: Function;
  perPage: number;
  thMap: Map<string, string>;
};
type TableThFunctionTypes = {
  addedMap: string[][];
  thMap: Map<string, string>;
  setter: Function;
};

type TdObjTypes = {
  [x: string]: string | number | boolean | string[] | number[] | boolean[];
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
    title: string;
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
  weeksFormat?: string[];
  select: { selected: { [key: string]: string | number }; setter: Function };
  past?: string;
  future?: string;
};

type EditableCellTypes = {
  item: string;
  index: number;
  edit: {
    editItem: string | number;
    setEditItem: Function;
    confirmFunc: Function;
    cancleFunc: Function;
  };
};

type TimePickerTypes = {
  fixedHeight: string;
  type?: "half" | "full";
  select: {
    // selected: { ampm: string; hour: string; minute: string; second: string };
    selected: { ampm: string; hour: string; minute: string };
    setter: Function;
  };
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
  TdObjTypes,
  CarouselTyees,
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
