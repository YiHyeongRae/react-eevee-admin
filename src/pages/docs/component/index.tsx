import { useTranslation } from "react-i18next";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import tableCode from "#/data/codes/table/table.txt";
import typesCode from "#/data/codes/table/types.txt";
import funcCode from "#/data/codes/table/func.txt";
import { useEffect, useState } from "react";
import { map } from "lodash";

function index() {
  const copyAndPaste = async (target: "Component" | "Types" | "Function") => {
    const text = document.getElementsByClassName(target);

    await navigator.clipboard.writeText(text[0].textContent || "");
    alert(`${target} copy complete !`);
  };
  const { t } = useTranslation();
  const fetchCodes = async () => {
    const [tableResponse, typesResponse, funcResponse] = await Promise.all([
      fetch(tableCode).then((res) => res.text()),
      fetch(typesCode).then((res) => res.text()),
      fetch(funcCode).then((res) => res.text()),
    ]);

    setÇodes((prev) => ({
      ...prev,
      comp: tableResponse,
      type: typesResponse,
      func: funcResponse,
    }));
  };
  const [codes, setÇodes] = useState({ comp: "", type: "", func: "" });
  useEffect(() => {
    fetchCodes();
  }, []);

  const componentsGuides = [
    {
      props: "className",
    },
    {
      props: "draggableIcon",
    },
    {
      props: "data",
    },
    {
      props: "addedMap",
    },
    {
      props: "checkable",
    },
    {
      props: "tdOptions",
    },
    {
      props: "trOptions",
    },
    {
      props: "mergeTheadTrOptions",
    },
    {
      props: "perPageOptions",
    },
    {
      props: "perPageList",
    },
    {
      props: "overflowY",
    },
  ];
  return (
    <>
      <div className="grid grid-cols-2 gap-2 overflow-hidden h-3/4 max-md:grid-cols-1 max-md:h-dvh">
        <div className="grid col-span-1 overflow-auto">
          <div className="flex flex-wrap col-span-1 gap-2 mr-1">
            <div className="py-3 badge badge-primary max-sm:text-xs">
              {t("common.component")}
            </div>
            <div
              className="py-3 cursor-pointer badge badge-secondary max-sm:text-xs"
              onClick={() => copyAndPaste("Component")}
            >
              {t("common.copy")}
            </div>
          </div>

          <SyntaxHighlighter
            language="tsx"
            style={vscDarkPlus}
            className="border border-zinc-500 Component min-h-[389px] max-h-[389px]"
          >
            {codes.comp}
          </SyntaxHighlighter>
        </div>

        <div className="grid grid-cols-2 col-span-1 gap-2 overflow-hidden max-md:grid-cols-1">
          <div className="grid col-span-1 overflow-auto">
            <div className="flex flex-wrap col-span-1 gap-2 mr-1">
              <div className="py-3 badge badge-primary max-sm:text-xs">
                {t("common.type")}
              </div>
              <div
                className="py-3 cursor-pointer badge badge-secondary max-sm:text-xs"
                onClick={() => copyAndPaste("Types")}
              >
                {t("common.copy")}
              </div>
            </div>
            <SyntaxHighlighter
              language="tsx"
              style={vscDarkPlus}
              className="border Types border-zinc-500 min-h-[389px] max-h-[389px]"
            >
              {codes.type}
            </SyntaxHighlighter>
          </div>
          <div className="grid col-span-1 overflow-auto">
            <div className="flex flex-wrap col-span-1 gap-2 mr-1">
              <div className="py-3 badge badge-primary max-sm:text-xs">
                {t("common.function")}
              </div>
              <div
                className="py-3 cursor-pointer badge badge-secondary max-sm:text-xs"
                onClick={() => copyAndPaste("Function")}
              >
                {t("common.copy")}
              </div>
            </div>

            <SyntaxHighlighter
              language="tsx"
              style={vscDarkPlus}
              className="border Function border-zinc-500 min-h-[389px] max-h-[389px]"
            >
              {codes.func}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
      <div className="grid gap-4 mt-4">
        <div className="overflow-x-auto">
          <table className="table" id="api-table">
            <thead>
              <tr className="border-secondary">
                <th></th>
                <td> {t(`common.props`)}</td>

                <td> {t(`common.description`)}</td>

                <td> {t(`common.detail`)}</td>
              </tr>
            </thead>
            <tbody>
              {map(componentsGuides, (item, index) => {
                return (
                  <tr className="border-zinc-500" key={item.props + index}>
                    <th>{index + 1}</th>
                    <td>{item.props}</td>
                    <td>{t(`guides.componentDescription${index + 1}`)}</td>
                    {/* <td className="whitespace-pre ">
                      {t(`guides.componentNote${index + 1}`)}
                    </td> */}
                    <td>{t(`guides.componentDetail${index + 1}`)}</td>
                  </tr>
                );
              })}
              {/* <tr className="border-zinc-500">
                <th>1</th>
                <td>className</td>
                <td>Table root div className</td>
                <td>-</td>
              </tr>
              <tr className="border-zinc-500">
                <th>2</th>
                <td>draggableIcon</td>
                <td>Change icon when drag is available</td>
                <td>-</td>
              </tr>
              <tr className="border-zinc-500">
                <th>3</th>
                <td>data</td>
                <td>Data to be handled in the table</td>
                <td>-</td>
              </tr>

              <tr className="border-zinc-500">
                <th>4</th>
                <td>addedMap</td>
                <td>Key-Value 2D Array for Mapping to Table Th</td>
                <td>-</td>
              </tr>
              <tr className="border-zinc-500">
                <th>5</th>
                <td>checkable</td>
                <td>Props in table row td</td>
                <td>setter returns selected array</td>
              </tr>
              <tr className="border-zinc-500">
                <th>6</th>
                <td>tdOptions</td>
                <td>Props in table row td</td>
                <td>
                  className recive params data object, index
                  <br />
                  <br />
                  func is td onClick event function
                </td>
              </tr>

              <tr className="border-zinc-500">
                <th>7</th>
                <td>trOptions</td>
                <td>Props in table tbody, thead tr</td>
                <td>
                  className recive params data object, index (except thead)
                  <br />
                  <br />
                  func is td onClick event function
                  <br />
                  <br />
                  isDraggable is handle of tables draggables
                </td>
              </tr>

              <tr className="border-zinc-500">
                <td>8</td>
                <td>mergeTheadTrOptions</td>
                <td>Props in table thead th tags for merge</td>
                <td>
                  colSpanStarter is an object with a merge start target and a
                  title to assign to it
                  <br />
                  <br />
                  colSpanTarget is all of the merge targets for tracking
                </td>
              </tr>

              <tr className="border-zinc-500">
                <td>9</td>
                <td>perPageOptions</td>
                <td>Props in table pagination</td>
                <td>handle with Parent Component</td>
              </tr>
              <tr className="border-zinc-500">
                <td>10</td>
                <td>perPageList</td>
                <td>Array in perPage values</td>
                <td>
                  table use this array values to perPageOptions.setPerpage
                </td>
              </tr>
              <tr className="border-zinc-500">
                <td>11</td>
                <td>overflowY</td>
                <td>Props for scrolling to the Y axis</td>
                <td>Make table scrollable with max-height</td>
              </tr> */}
            </tbody>
          </table>
        </div>
        {/* <ul className="grid gap-1">
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
              data[]에 object[key]와 addedMap의 key가 일치해야 Table에
              정상적으로 반영.
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
              [[key,value]]로 data의 object의 key와 맞추기. )
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
              {`draggable, thead의 draggable로 변경 가능 여부`}
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
        </ul> */}
      </div>
    </>
  );
}

export default index;
