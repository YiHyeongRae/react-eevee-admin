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
            {`import { useState } from "react";
            
import Calendar from "../Calendar";
import { TableExtensionHeaderTypes } from "#/data/types/components";

function index({
  search = { active: true, setter: () => {} },
  query,
  etc,
}: TableExtensionHeaderTypes) {
  const [openCalendar, setOpenCalendar] = useState<"start" | "end" | "">("");
  const [searchDate, setSearchDate] = useState({
    startDate: "",
    endDate: "",
  });

  return (
    <div className="relative flex gap-2 mb-4 max-md:grid max-md:grid-cols-1">
      {search && (
        <div>
          <label className="w-full form-control">
            <div className="label">
              <span className="text-lg font-bold label-text max-md:text-base">
                데이터 검색
              </span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="w-full input input-sm input-bordered max-md:input-xs"
              onChange={(e) => search.setter && search.setter(e.target.value)}
            />
          </label>
        </div>
      )}

      {query && query.active && (
        <div className="">
          <label className="w-full form-control">
            <div className="label">
              <span className="text-lg font-bold label-text max-md:text-base">
                데이터 조회
              </span>
            </div>
            <div className="flex gap-2 max-md:grid">
              <div className="grid-cols-1 max-md:grid">
                <input
                  type="text"
                  placeholder="Type here"
                  className="w-full input input-sm input-bordered max-md:col-span-1 max-md:input-xs"
                  onChange={(e) => {
                    query.setter && query.setter(e.target.value);
                  }}
                />
                <div className="flex justify-start grid-cols-1 gap-2 mt-2 max-md:grid">
                  <div className="relative max-md:col-span-1">
                    <input
                      className="w-full input-bordered input input-sm max-md:input-xs"
                      placeholder="start"
                      type="text"
                      value={searchDate.startDate}
                      onClick={() => {
                        setOpenCalendar("start");
                      }}
                    />
                    {openCalendar === "start" && (
                      <div className="absolute left-0 z-[3] w-full max-w-xs rounded-md shadow-xl min-w-80 max-md:min-w-0 top-8 bg-base-100">
                        <Calendar
                          future={searchDate.endDate}
                          select={{
                            selected: separteDate(searchDate.startDate),
                            setter: (item: string) => {
                              setSearchDate((prev) => {
                                return { ...prev, startDate: item };
                              });
                              setOpenCalendar("");
                            },
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="relative max-md:col-span-1">
                    <input
                      className="w-full input-bordered input input-sm max-md:input-xs"
                      placeholder="end"
                      type="text"
                      value={searchDate.endDate}
                      onClick={() => {
                        setOpenCalendar("end");
                      }}
                    />
                    {openCalendar === "end" && (
                      <div className="absolute left-0 z-[3] w-full max-w-xs rounded-md shadow-xl min-w-80 max-md:min-w-0 top-8 bg-base-100">
                        <Calendar
                          past={searchDate.startDate}
                          select={{
                            selected: separteDate(searchDate.endDate),
                            setter: (item: string) => {
                              setSearchDate((prev) => {
                                return { ...prev, endDate: item };
                              });
                              setOpenCalendar("");
                            },
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <button
                className="!h-auto btn btn-primary max-md:btn-sm"
                disabled={
                  query.disabled ||
                  searchDate.endDate === "" ||
                  searchDate.startDate === ""
                }
                onClick={() => {
                  query.submit && query.submit(searchDate.startDate,searchDate.endDate);
                }}
              >
                검색
              </button>
            </div>
          </label>
        </div>
      )}

      {etc && (
        <div>
          <label className="w-full max-w-xs form-control">
            <div className="label">
              <span className="text-lg font-bold label-text max-md:text-base min-w-20">
                부가 기능
              </span>
            </div>
          </label>
          <div className="flex flex-wrap gap-2">
            {etc[0]?.text !== "" &&
              etc.map((item, index) => {
                return (
                  <button
                    disabled={item.disabled}
                    className={\`\flex-wrap bg-primary btn btn-sm max-sm:btn-xs text-white \${item.className}\`}
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
        </div>
      )}
    </div>
  );
}

export default index;
            
`}
          </SyntaxHighlighter>
        </div>

        <div className="grid grid-cols-1 col-span-1 gap-2 overflow-hidden max-md:grid-cols-1">
          <div className="flex flex-col overflow-auto">
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
              className="flex-auto Types"
            >
              {`type TableExtensionHeaderTypes = {
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

`}
            </SyntaxHighlighter>
          </div>
          {/* <div className="flex flex-col overflow-auto">
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
              language="tsx"
              style={vscDarkPlus}
              className="flex-auto Function"
            >
              {`export function openModal(id: string) {
  (document.getElementById(id) as HTMLFormElement).showModal();
}

export function closeModal(id: string) {
  const closeButton = document.getElementById(
    \`\${id}-close-btn\`
  ) as HTMLFormElement;
  closeButton.click();
}
`}
            </SyntaxHighlighter>
          </div> */}
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
              search의 setter는 table 사용처에서 searchText의 setState를 전달
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
              table의 column에 상관없이 포함된 row를 표시
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
              query는 calendar,queryText와 함께 table의 데이터를 추가 조건과
              함께 새로 조회( API GET )할때 사용
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
              etc는 부가기능으로 추가할 button의 object[]를 전달
            </p>
          </li>
        </ul>
      </div>
    </>
  );
}

export default index;
