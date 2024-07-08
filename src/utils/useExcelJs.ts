import Excel from "exceljs";
import { saveAs } from "file-saver";
import _ from "lodash";
import { MakeExcelFunctionTypes } from "../data/types/utils";

const splitArray = (arr: any[], chunkSize = 50000) => {
  let result = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }
  return result;
};
export const makeExcel = async ({
  data,
  headerWidths,
  fileId,
}: MakeExcelFunctionTypes) => {
  const wb = new Excel.Workbook();
  const sheetObj: { [key: string]: Excel.Worksheet } = {};
  const headerWidth = headerWidths ? headerWidths : [15, 20, 30, 30, 30];

  // make excel sheets
  try {
    _.map(data, (_, sheetName) => {
      sheetObj[sheetName] = wb.addWorksheet(sheetName);
    });

    _.map(data, (item, sheetName) => {
      const headCells = sheetObj[sheetName].addRow(item.headCell);
      headCells.eachCell((_, colNum: number) => {
        sheetObj[sheetName].getColumn(colNum).width = headerWidth[colNum - 1];
        sheetObj[sheetName].getColumn(colNum).alignment = {
          vertical: "middle",
          horizontal: "center",
        };
      });
    });

    _.map(data, (sheetItem, sheetName) => {
      const bodyData: string[][] = [];

      const splitData = splitArray(sheetItem.data, 50000);
      for (let i = 0; i < splitData.length; i++) {
        _.map(splitData[i], (item) => {
          const itemArr: string[] = [];
          _.map(item, (value, _) => {
            itemArr.push(String(value));
          });
          bodyData.push(itemArr);
        });
      }

      _.map(bodyData, (item) => {
        sheetObj[sheetName].addRow(item);
      });
    });

    const stamp = Date.now();

    const fileData = await wb.xlsx.writeBuffer(); //writeBuffer는 프로미스를 반환하므로 async-await을 사용해야 한다.
    const blob = new Blob([fileData], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, `${fileId ? fileId + "_" : ""}excel_${stamp}`);
  } catch (error) {
    console.log(error);
    throw new Error("Excel Make Errored");
  }
};
