import { useTranslation } from "react-i18next";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

function index() {
  const copyAndPaste = async (target: "Component" | "Types" | "Function") => {
    const text = document.getElementsByClassName(target);

    await navigator.clipboard.writeText(text[0].textContent || "");
    alert(`${target} copy complete !`);
  };

  const { t } = useTranslation();

  return (
    <>
      {/* <div className="grid grid-cols-2">
        <div className="flex flex-wrap col-span-1 gap-2 mr-1">
          <div className="badge badge-outline max-sm:text-xs">
            {t("common.component")}
          </div>
          <div
            className="cursor-pointer badge badge-primary max-sm:text-xs"
            onClick={() => copyAndPaste("Component")}
          >
            {t("common.copy")}
          </div>
        </div>
        <div className="grid grid-cols-2 col-span-1 gap-2 overflow-hidden">
          <div className="flex flex-wrap col-span-1 gap-2 mr-1">
            <div className="cursor-pointer badge badge-outline max-sm:text-xs">
              {t("common.types")}
            </div>
            <div
              className="cursor-pointer badge badge-primary max-sm:text-xs"
              onClick={() => copyAndPaste("Types")}
            >
              {t("common.copy")}
            </div>
          </div>
          <div className="flex flex-wrap col-span-1 gap-2 mr-1">
            <div className="cursor-pointer badge badge-outline max-sm:text-xs">
              {t("common.function")}
            </div>
            <div
              className="cursor-pointer badge badge-primary max-sm:text-xs"
              onClick={() => copyAndPaste("Function")}
            >
              {t("common.copy")}
            </div>
          </div>
        </div>
      </div> */}
      <div className="grid grid-cols-2 gap-2 overflow-hidden h-3/4 max-md:grid-cols-1 max-md:h-dvh">
        <div className="grid col-span-1 overflow-auto">
          <div className="flex flex-wrap col-span-1 gap-2 mr-1">
            <div className="badge badge-outline max-sm:text-xs">
              {t("common.component")}
            </div>
            <div
              className="cursor-pointer badge badge-primary max-sm:text-xs"
              onClick={() => copyAndPaste("Component")}
            >
              {t("common.copy")}
            </div>
          </div>
          <SyntaxHighlighter
            language="tsx"
            style={vscDarkPlus}
            className="Component"
          >
            {`import { useEffect, useRef, useState } from "react";
import _ from "lodash";
import { useTable } from "#/utils/useTable";
import { TableTypes } from "#/data/types/components";
function index({
  data = [],
  addedMap = [["", ""]],
  checakble = { active: true, multi: false, setter: () => {} },
  tdOptions = {},
  trOptions = {
    thead: { className: "", func: () => {} },
    tbody: { className: "", func: () => {} },
  },
  buttons = [{ className: "", text: "", func: () => {}, disabled: false }],
}: TableTypes) {
  const thMap = new Map([["index", "no"]]);

  const [tableThData, setTableThData] = useState(thMap);
  const [tableTdData, setTableTdData] = useState<
    { [x: string]: string | number }[][]
  >([]);
  const [addedMapData] = useState(addedMap);
  const [tabelCkecked, setTableChecked] = useState<number[]>([]);

  const perPageList = [10, 20, 30];
  const [perPage, setPerPage] = useState(perPageList[2]);

  const [currentPage, setCurrentPage] = useState(0);
  const [orderBy, setOrderBy] = useState<"ASC" | "DESC">("DESC");
  const [currentOrderBy, setCurrentOrderBy] = useState("index");

  useEffect(() => {
    useTable.makeTableThData({
      addedMap: addedMapData,
      thMap,
      setter: setTableThData,
    });
    useTable.makeTableTdData({
      array: data,
      setter: setTableTdData,
      perPage,
      thMap,
    });
  }, [perPage, addedMapData, data]);
  const checkboxRef = useRef<null[] | HTMLDivElement[]>([]);

  useEffect(() => {
    setTableChecked([]);
  }, [checakble.active]);

  return (
    <div className="h-full col-span-2">
      <div className="flex justify-end gap-2 mb-2">
        {buttons[0].text !== "" &&
          buttons.map((item, index) => {
            return (
              <button
                disabled={item.disabled}
                className={\`flex-wrap bg-primary btn btn-sm max-sm:btn-xs text-white \${item.className}\`}
                key={index}
                onClick={() => {
                  item.func();
                }}
              >
                {item.text}
              </button>
            );
          })}
      </div>

      <div
        className="overflow-x-auto"
      >
        <table className="table table-s max-sm:table-xs table-pin-rows table-pin-cols">
          <thead>
            <tr
              className={\`\${trOptions.thead.className}  border-zinc-400\`}
              onClick={() =>
                trOptions?.thead.func !== undefined && trOptions.thead.func()
              }
            >
              {checakble.active && (
                <td>
                  <label className="flex">
                    <input
                      type="checkbox"
                      className="checkbox max-sm:checkbox-sm"
                      checked={
                        tabelCkecked.length > 0 &&
                        tabelCkecked.length === tableTdData.flat().length
                      }
                      onChange={(e) => {
                        const tableChekced: number[] = [];

                        if (e.currentTarget.checked) {
                          _.times(tableTdData.length, (index) => {
                            _.map(tableTdData[index], (item) => {
                              tableChekced.push(item.index as number);
                            });
                          });
                        }
                        setTableChecked(tableChekced);
                        checakble.setter(tableChekced);
                      }}
                    />
                  </label>
                </td>
              )}

              {Array.from(tableThData.keys())?.map((item, index) => {
                return (
                  <td key={\`\${item}-\${index}\`}>
                    <div
                      className={\`flex items-center gap-2 \${
                        currentOrderBy === item ? "text-primary" : ""
                      }\`}
                      onClick={() => {
                        setOrderBy((prev) => (prev === "ASC" ? "DESC" : "ASC"));
                        setCurrentOrderBy(item);
                        const sorted = tableTdData[currentPage].sort((a, b) => {
                          if (orderBy === "ASC") {
                            if (a[item] > b[item]) {
                              return 1;
                            }
                            if (a[item] < b[item]) {
                              return -1;
                            }
                            return 0;
                          } else if (orderBy === "DESC") {
                            if (a[item] > b[item]) {
                              return -1;
                            }
                            if (a[item] < b[item]) {
                              return 1;
                            }
                            return 0;
                          }
                          return 0;
                        });

                        const copy = [...tableTdData];

                        copy[currentPage] = sorted;
                        setTableTdData(copy);
                      }}
                    >
                      <div
                        className={\`cursor-pointer text-base \${
                          currentOrderBy === item ? "text-primary" : ""
                        }\`}
                      >
                        {tableThData.get(item)}
                      </div>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2.5"
                        stroke="currentColor"
                        className={\`
                        \${
                          orderBy === "DESC" ? "rotate-180" : "rotate-0"
                        } size-3 \${
                          currentOrderBy === item ? "opacity-1" : "opacity-0"
                        }\`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                        />
                      </svg>
                    </div>
                  </td>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {tableTdData[currentPage]?.map((item, index) => {
              return (
                <tr
                  key={index}
                  className={\`\${trOptions.tbody.className} \${
                    tabelCkecked.includes(item.index as number)
                      ? "bg-primary text-primary-content"
                      : ""
                  } border-zinc-400\`}
                  onClick={() => {
                    trOptions.tbody.func(item, index);
                  }}
                >
                  {checakble.active && (
                    <td className="bg-inherit">
                      <label className="flex">
                        <input
                          type="checkbox"
                          className="checkbox max-sm:checkbox-sm"
                          checked={tabelCkecked.includes(item.index as number)}
                          ref={(el) =>
                            (checkboxRef.current[item.index as number] = el)
                          }
                          onChange={(e) => {
                            const isChecekd = [...tabelCkecked];
                            if (e.currentTarget.checked) {
                              isChecekd.push(item.index as number);
                            } else {
                              const targetIndex = isChecekd.indexOf(
                                item.index as number
                              );
                              isChecekd.splice(targetIndex, 1);
                            }
                            setTableChecked(isChecekd);
                            checakble.setter(isChecekd);
                          }}
                        />
                      </label>
                    </td>
                  )}
                  {_.map(item, (value, key) => {
                    return (
                      <td
                        id={key}
                        key={key}
                        className={\`\${tdOptions[key]?.className} \${
                          key === "index" || key === "userName"
                            ? ""
                            : "min-w-[11rem]"
                        }\`}
                        onClick={(e) => {
                          e.preventDefault();
                          tdOptions[key]?.func && tdOptions[key]?.func();
                          checakble.active &&
                            checkboxRef.current[item.index as number]?.click();
                        }}
                      >
                        <div
                          className={\`\${
                            tdOptions[key]?.tooltip?.active
                              ? "tooltip tooltip-bottom tooltip-primary"
                              : ""
                          }\`}
                          data-tip={
                            tdOptions[key]?.tooltip?.text === ""
                              ? value
                              : tdOptions[key]?.tooltip?.text
                          }
                        >
                          {tdOptions[key]?.el
                            ? tdOptions[key]?.el(value, index)
                            : value}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            {currentPage !== 0 &&
              tableTdData[currentPage]?.length !== perPage && (
                <tr
                  style={{
                    height:
                      tableTdData[currentPage] &&
                      (perPage - tableTdData[currentPage].length) * 49,
                  }}
                >
                  <td
                    colSpan={perPage - tableTdData[currentPage]?.length || 0}
                  ></td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap justify-center">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <div>
            <div className="join">
              <button
                className="join-item btn btn-sm max-sm:btn-xs bg-base-100"
                onClick={() =>
                  setCurrentPage((prev) => (prev - 1 < 0 ? prev : prev - 1))
                }
              >
                «
              </button>
              <button className="join-item btn btn-sm max-sm:btn-xs !bg-transparent hover:!bg-transparent hover:!border-[#d6d3d4] cursor-default pointer-events-none max-sm:hidden">
                Page {currentPage + 1}
              </button>
              <button className="join-item btn btn-sm max-sm:btn-xs min-w-[54.24px] !bg-transparent hover:!bg-transparent hover:!border-[#d6d3d4] cursor-default pointer-events-none">
                {\`\${
                  tableTdData[currentPage] &&
                  tableTdData[currentPage].reduce((a, b) => {
                    return b.index < a.index ? b : a;
                  }, tableTdData[currentPage][0]).index
                }~\${
                  tableTdData[currentPage] &&
                  tableTdData[currentPage].reduce((a, b) => {
                    return b.index > a.index ? b : a;
                  }, tableTdData[currentPage][0]).index
                }\`}
              </button>
              <button
                className="join-item btn btn-sm max-sm:btn-xs bg-base-100"
                onClick={() =>
                  setCurrentPage((prev) =>
                    prev + 1 >= tableTdData.length ? prev : prev + 1
                  )
                }
              >
                »
              </button>
            </div>
          </div>
          <div>
            <div className="gap-2 join">
              <select
                value={perPage}
                className="join-item bg-none p-0 select select-ghost focus:!outline-none border-0 !outline-0 !outline-none "
                onChange={(e) => {
                  setPerPage(Number(e.target.value));
                  setCurrentPage(0);
                }}
              >
                {_.map(perPageList, (item, index) => {
                  return (
                    <option value={item} key={\`perPage-\${index}\`}>
                      {\`\${item} / page\`}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;


`}
          </SyntaxHighlighter>
        </div>

        <div className="grid grid-cols-2 col-span-1 gap-2 overflow-hidden max-md:grid-cols-1">
          <div className="grid col-span-1 overflow-auto">
            <div className="flex flex-wrap col-span-1 gap-2 mr-1">
              <div className="badge badge-outline max-sm:text-xs">
                {t("common.types")}
              </div>
              <div
                className="cursor-pointer badge badge-primary max-sm:text-xs"
                onClick={() => copyAndPaste("Component")}
              >
                {t("common.copy")}
              </div>
            </div>
            <SyntaxHighlighter
              language="tsx"
              style={vscDarkPlus}
              className="Types"
            >
              {`type TableTypes = {
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
        `}
            </SyntaxHighlighter>
          </div>
          <div className="grid col-span-1 overflow-auto">
            <div className="flex flex-wrap col-span-1 gap-2 mr-1">
              <div className="badge badge-outline max-sm:text-xs">
                {t("common.function")}
              </div>
              <div
                className="cursor-pointer badge badge-primary max-sm:text-xs"
                onClick={() => copyAndPaste("Component")}
              >
                {t("common.copy")}
              </div>
            </div>
            <SyntaxHighlighter
              language="typescript"
              style={vscDarkPlus}
              className="Function"
            >
              {`import _ from "lodash";
import {
    TableTdFunctionTypes,
    TableThFunctionTypes,
    TdObjTypes,
} from "#/data/types/components";

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
        `}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
      <div className="grid gap-4 mt-4">
        <div className="badge badge-outline">Basic Usage</div>

        <ul className="grid gap-1">
          <li className="grid justify-start grid-flow-col-dense gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
            <p className="col-span-12 text-md">
              data의 object의 key와 addedMap의 key가 일치해야 Table에 정상적으로
              반영됩니다.
            </p>
          </li>
          <li className="grid justify-start grid-flow-col-dense gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
            <p className="col-span-12 text-md">
              Table에서 고정적으로 사용되는 Headcell의 값을 Table Component
              thMap에 추가하면 됩니다.( headcell의 추가 값은 Table 사용처에서
              [[key,value]]로 data의 object의 key와 맞춰주면 됩니다. )
            </p>
          </li>
          <li className="grid items-start justify-start grid-flow-col-dense gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
            <p className="flex col-span-12 text-md">
              {`checkable : {
          active: 테이블 체크박스 활성화 여부,
          multi: 다중선택 여부, 
          setter: 선택된 값 받을 함수
          }`}
            </p>
          </li>
          <li className="grid items-start justify-start grid-flow-col-dense gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
            <p className="flex col-span-12 text-md">
              {`trOptions : {
          thead,tbody의 tr에 대한 옵션용, 주로 선택시 tr을 lock하거나 bg 변경등에 사용
          }`}
            </p>
          </li>
          <li className="grid items-start justify-start grid-flow-col-dense gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
            <p className="flex col-span-12 text-md">
              {`tdOptions : {
         적용할 td의 key:{func: td 클릭 함수, tooltip: 해당 td의 툴팁 여부 및 text 지정, el:해당 td의 element 변경시 사용(select,input,image 등) } 로 전달
          }`}
            </p>
          </li>
        </ul>
      </div>
    </>
  );
}

export default index;
