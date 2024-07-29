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
            {`import _ from "lodash";
import { useState } from "react";
import { TimePickerTypes } from "../../data/types/components";

function index({
  fixedHeight = "h-[120px]",
  type = "full",
  select,
  second,
  perSecond = 10,
  perItems = 4,
}: TimePickerTypes) {
  const [times, setTimes] = useState({
    ampm: select.selected?.ampm || "",
    hour: select.selected?.hour || "",
    minute: select.selected?.minute || "",
    second: select.selected?.second || "",
    timeStr: select.selected?.timeStr || "",
  });

  const heightRegex = /\[([^\]]+)\]/g;
  const regexResult = heightRegex.exec(fixedHeight);
  const pickerHeight = regexResult !== null && regexResult[1].replace("px", "");
  return (
    <div className={\`flex flex-col flex-auto \${fixedHeight} border\`}>
      <div className=\`flex gap-2 flex-auto \${fixedHeight}\`}>
        <div
          className="flex flex-col flex-auto overflow-auto time-picker"
          style={{ scrollSnapType: "y mandatory" }}
        >
          {/* hours */}
          {_.times(
            type === "half" ? 12 + (perItems - 1) : 24 + (perItems - 1),
            (item) => {
              return (
                <span
                  className={\`block text-center cursor-pointer \${
                    Number(item) ===
                      (times.hour !== "" && Number(times.hour)) &&
                    "bg-primary text-white"
                  }\`}
                  key={\`hour-\${item + 1}\`}
                  style={{
                    minHeight: Number(pickerHeight) / perItems,
                    lineHeight: \`\${Number(pickerHeight) / perItems}px\`,
                    visibility:
                      item > (type === "half" ? 11 : 23) ? "hidden" : "visible",
                  }}
                  onClick={(e) => {
                    const parentEl = e.currentTarget.parentElement;

                    if (
                      parentEl &&
                      parentEl?.scrollTop !==
                        item * (Number(pickerHeight) / perItems)
                    ) {
                      parentEl.scrollTo({
                        top: item * (Number(pickerHeight) / perItems),
                        behavior: "smooth",
                      });
                    }

                    const hourItem = String(item < 10 ? \`0\${item}\` : item);

                    setTimes((prev) => {
                      return {
                        ...prev,
                        hour: hourItem,
                        timeStr: \`\${hourItem}:\${prev.minute}\`,
                      };
                    });
                    select.setter(
                      \`\${times.ampm} \${hourItem}:\${times.minute}$\{
                        times.second ? ":" : ""
                      }\${times.second}\`
                    );
                  }}
                >
                  {item < 10 ? \`0\${item}\` : item}
                </span>
              );
            }
          )}
        </div>
        <div
          className="flex flex-col flex-auto overflow-auto time-picker"
          style={{ scrollSnapType: "y mandatory" }}
        >
          {/* minutes */}
          {_.times(59 + (perItems - 1), (item) => {
            return (
              <span
                className={\`text-center cursor-pointer \${
                  Number(item + 1) === Number(times.minute) &&
                  "bg-primary text-white"
                }\`}
                key={\`minute-\${item + 1}\`}
                style={{
                  visibility: item > 58 ? "hidden" : "visible",
                  minHeight: Number(pickerHeight) / perItems,
                  lineHeight: \`\${Number(pickerHeight) / perItems}px\`,
                }}
                onClick={(e) => {
                  const parentEl = e.currentTarget.parentElement;

                  if (
                    parentEl &&
                    parentEl?.scrollTop !==
                      item * (Number(pickerHeight) / perItems)
                  ) {
                    parentEl.scrollTo({
                      top: item * (Number(pickerHeight) / perItems),
                      behavior: "smooth",
                    });
                  }
                  const minuteItem = String(
                    item + 1 < 10 ? \`0\${item + 1}\` : item + 1
                  );

                  setTimes((prev) => {
                    return {
                      ...prev,
                      minute: minuteItem,
                      timeStr: \`\${prev.hour}:\${minuteItem}\`,
                    };
                  });
                  select.setter(
                    \`\${times.ampm} \${times.hour}:\${minuteItem}\${
                      times.second ? ":" : ""
                    }\${times.second}\`
                  );
                }}
              >
                {item + 1 < 10 ? \`0\${item + 1}\` : item + 1}
              </span>
            );
          })}
        </div>
        {/* seconds */}
        {second && (
          <div
            className="flex flex-col flex-auto overflow-auto time-picker"
            style={{ scrollSnapType: "y mandatory" }}
          >
            {_.times(59 / perSecond + perItems, (item) => {
              return (
                <span
                  className={\`text-center cursor-pointer \${
                    times.second !== "" &&
                    Number(item * perSecond) === Number(times.second) &&
                    "bg-primary text-white"
                  }\`}
                  style={{
                    visibility: item > 59 / perSecond ? "hidden" : "visible",
                    minHeight: Number(pickerHeight) / perItems,
                    lineHeight: \`\${Number(pickerHeight) / perItems}px\`,
                  }}
                  key={\`hour-\${item + 1}\`}
                  onClick={(e) => {
                    const parentEl = e.currentTarget.parentElement;

                    if (
                      parentEl &&
                      parentEl?.scrollTop !==
                        item * (Number(pickerHeight) / perItems)
                    ) {
                      parentEl.scrollTo({
                        top: item * (Number(pickerHeight) / perItems),
                        behavior: "smooth",
                      });
                    }
                    const secondItem = String(
                      item * perSecond < 10
                        ? \`0\${item * perSecond}\`
                        : item * perSecond
                    );

                    setTimes((prev) => {
                      return {
                        ...prev,
                        second: secondItem,
                        timeStr: \`\${prev.hour}:\${prev.minute}:\${secondItem}\`,
                      };
                    });
                    select.setter(
                      \`\${times.ampm} \${times.hour}:\${times.minute}:\${secondItem}\`
                    );
                  }}
                >
                  {item * perSecond < 10
                    ? \`0\${item * perSecond}\`
                    : item * perSecond}
                </span>
              );
            })}
          </div>
        )}

        {type === "half" && (
          <div
            className="flex flex-col flex-auto overflow-auto time-picker"
            style={{ scrollSnapType: "y mandatory" }}
          >
            <span
              className={\`text-center cursor-pointer \${
                times.ampm === "AM" && "bg-primary text-white"
              }\`}
              style={{
                minHeight: Number(pickerHeight) / perItems,
                lineHeight: \`\${Number(pickerHeight) / perItems}px\`,
              }}
              onClick={(e) => {
                const parentEl = e.currentTarget.parentElement;

                if (parentEl && parentEl?.scrollTop !== 0) {
                  parentEl.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }
                setTimes((prev) => {
                  return { ...prev, ampm: "AM" };
                });
                select.setter(
                  \`AM \${times.hour}:\${times.minute}\${times.second ? ":" : ""}\${
                    times.second
                  }\`
                );
              }}
            >
              AM
            </span>
            <span
              className={\`text-center cursor-pointer \${
                times.ampm === "PM" && "bg-primary text-white"
              }\`}
              style={{
                minHeight: Number(pickerHeight) / perItems,
                lineHeight: \`\${Number(pickerHeight) / perItems}px\`,
              }}
              onClick={(e) => {
                const parentEl = e.currentTarget.parentElement;

                if (
                  parentEl &&
                  parentEl?.scrollTop !== Number(pickerHeight) / perItems
                ) {
                  parentEl.scrollTo({
                    top: Number(pickerHeight) / perItems,
                    behavior: "smooth",
                  });
                }
                setTimes((prev) => {
                  return { ...prev, ampm: "PM", timeStr: \`PM \${prev.timeStr}\` };
                });
                select.setter(
                  \`PM \${times.hour}:\${times.minute}\${times.second ? ":" : ""}\${
                    times.second
                  }\`
                );
              }}
            >
              PM
            </span>
            {_.times(perItems - 1, () => {
              return (
                <span
                  className={\`text-center cursor-pointer\`}
                  style={{
                    visibility: "hidden",
                    minHeight: Number(pickerHeight) / perItems,
                    lineHeight: \`\${Number(pickerHeight) / perItems}px\`,
                  }}
                >
                  PM
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default index;


`}
          </SyntaxHighlighter>
        </div>
        <div className="grid grid-cols-2 col-span-1 gap-2 overflow-hidden max-md:grid-cols-1">
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
              {`type TimePickerTypes = {
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
`}
            </SyntaxHighlighter>
          </div>
          <div className="flex flex-col overflow-auto">
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
              {`const useDateTimes = {
  separateTimes: (fullTimeStr: string, isAmpm?: string) => {
    const hour = fullTimeStr.substring(0, 2) || null;
    const minute = fullTimeStr.substring(3, 5) || null;
    const second = fullTimeStr.substring(6, 8) || null;
    const ampm = isAmpm || null;

    return { ampm, hour, minute, second };
  },
};

export default useDateTimes;

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
              select는 calendar에 선택되있는 날짜를 보여주기 위해 설정,
              calendar가 리렌더 되지않는다면 불필요
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
              past, future로 해당 날짜보다 이전/이후 선택 불가능
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
              calender 종료 시 실행될 함수는 closeFunc로 전달, default는
              setter("")
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
              setter를 통해서 기본적으로 fullDateStr을 리턴 받지만 객체로
              받고싶다면 useCalendar 사용
            </p>
          </li>
        </ul>
      </div>
    </>
  );
}

export default index;
