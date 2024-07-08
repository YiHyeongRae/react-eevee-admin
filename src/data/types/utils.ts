type MakeExcelFunctionTypes = {
  data: {
    [key: string]: {
      headCell: string[];
      data: { [key: string]: string | number }[];
    };
  };
  headerWidths?: number[];
  fileId?: string;
};

type UseToastFunctionTypes = {
  list: { [key: string]: string | boolean }[];
  setter: Function;
  info: {
    message: string;
    type: "alert-warning" | "alert-info" | "alert-error" | "alert-success";
    life: boolean;
  };
};
export type { MakeExcelFunctionTypes, UseToastFunctionTypes };
