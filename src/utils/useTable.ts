import _ from "lodash";
import {
  TableTdFunctionTypes,
  TableThFunctionTypes,
  TdObjTypes,
} from "../data/types/components";

export const useTable = {
  makeTableTdData: ({
    array,
    setter,
    perPage,
    thMap,
  }: TableTdFunctionTypes) => {
    const tdArray: TdObjTypes[] = [];

    const keys2 = Array.from(thMap.keys());

    array.map((item, index) => {
      let tdObj: TdObjTypes = {};

      for (let i = 0; i < keys2.length; i++) {
        tdObj[keys2[i]] =
          keys2[i] === "index"
            ? index + 1
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
    setter(result);
  },

  makeTableThData: ({ addedMap, thMap, setter }: TableThFunctionTypes) => {
    _.forEach(addedMap, (key) => {
      thMap.set(key[0], key[1]);
    });

    setter(thMap);
  },
};
