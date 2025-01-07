import {
  TableTdFunctionTypes,
  TableThFunctionTypes,
  TdObjTypes,
} from "#/data/types/components";
import { forEach } from "lodash";

export const useTable = {
  makeTableTdData: ({
    array,
    setter,
    page,
    perPage,
    thMap,
  }: TableTdFunctionTypes) => {
    const tdArray: TdObjTypes[] = [];

    const keys2 = Array.from(thMap.keys());
    array.map((item, index) => {
      let tdObj: TdObjTypes = {};

      for (let i = 0; i < keys2.length; i++) {
        tdObj[keys2[i]] =
          keys2[i] === "no"
            ? (page - 1) * perPage + index + 1
            : item[keys2[i]] !== undefined
            ? item[keys2[i]]
            : "";
      }
      tdArray.push(tdObj);
    });

    const result = [];
    for (let i = 0; i < tdArray.length; i += perPage) {
      const mnfArray = tdArray.slice(i, i + perPage);
      result.push(mnfArray);
    }

    setter(tdArray);
  },

  makeTableThData: ({ addedMap, thMap, setter }: TableThFunctionTypes) => {
    forEach(addedMap, (key) => {
      thMap.set(key[0], key[1]);
    });

    setter(thMap);
  },
};
