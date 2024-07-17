import _ from "lodash";
import Table from "#/components/Table";
import { useState } from "react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useTranslation } from "react-i18next";

function index() {
  const { t } = useTranslation();
  const [dummyData] = useState([
    {
      title: "custom-table-example",
      custom1: 15,
      custom2: "i'm button maybe",
      custom3: true,
      custom4: ["apple", "banana", "lemon"],
      custom5: { test: "yea i am obj test" },
      custom6: 20,
    },
    {
      title: "custom-table-example-2",
      custom1: 40,
      custom2: "me too button maybe",
      custom3: false,
      custom4: ["samsung", "galaxy", "flip"],
      custom5: { test: "me too test in example-2" },
      custom6: 100,
    },
  ]);
  const addedMap = [
    ["title", "제목"],
    ["custom1", "number"],
    ["custom2", "string"],
    ["custom3", "boolean"],
    ["custom4", "array"],
    ["custom5", "obj"],
    ["custom6", "get other data"],
  ];

  const [isExpand, setIsExpand] = useState(true);
  return (
    <>
      <div>
        <div
          className="badge badge-outline max-sm:text-xs"
          onClick={() => setIsExpand((prev) => !prev)}
        >
          {`${t("common.code")} ${
            isExpand ? t("common.collapse") : t("common.expand")
          }`}
        </div>
      </div>
      {isExpand && (
        <div className="grid grid-cols-1 gap-2 h-3/4">
          <SyntaxHighlighter language="tsx" style={vscDarkPlus}>
            {`  import Table from "#/components/Table";
  import { useEffect, useState } from "react";


  function index() {
    const [dummyData] = useState([
      {
        title: "custom-table-example",
        custom1: 15,
        custom2: "i'm button maybe",
        custom3: true,
        custom4: ["apple", "banana", "lemon"],
        custom5: { test: "yea i am obj test" },
        custom6: 20,
      },
      {
        title: "custom-table-example-2",
        custom1: 40,
        custom2: "me too button maybe",
        custom3: false,
        custom4: ["samsung", "galaxy", "flip"],
        custom5: { test: "me too test in example-2" },
        custom6: 100,
      },
    ]);
    const addedMap = [
      ["title", "제목"],
      ["custom1", "number"],
      ["custom2", "string"],
      ["custom3", "boolean"],
      ["custom4", "array"],
      ["custom5", "obj"],
      ["custom6", "get other data"],
    ];

    return (
      <Table
      checakble={{
        active: false,
        multi: false,
        setter: () => {},
      }}
      data={dummyData}
      addedMap={addedMap}
      tdOptions={{
        custom1: {
          el: (item: number) => {
            console.log("item?", item);
            return \`\${item * 3}%\`;
          },
          func: () => {},
        },
        custom2: {
          el: (item: string) => {
            return (
              <button className="btn btn-primary btn-xs" type="button">
                {item}
              </button>
            );
          },
          func: () => {},
        },
        custom3: {
          el: (item: boolean) => {
            const result = item ? "활성" : "휴면";
            return result;
          },
          func: () => {},
        },
        custom4: {
          el: (item: string[]) => {
            return (
              <select className="select select-ghost select-xs">
                {item.map((lowerItem) => {
                  return (
                    <option value={lowerItem} key={lowerItem}>
                      {lowerItem}
                    </option>
                  );
                })}
              </select>
            );
          },
          func: () => {},
        },
        custom5: {
          el: (item: { test: string }) => {
            return <span>{item.test}</span>;
          },
          func: () => {},
        },
        custom6: {
          el: (item: number, index: number) => {
            const custom1Data = dummyData[index].custom1;

            return (
              <span>
                this rows custom1 data = {custom1Data}
                <br /> and this columns data = {item}
              </span>
            );
          },
          func: () => {},
        },
      }}
    />
    );
  }

  export default index;
        `}
          </SyntaxHighlighter>
        </div>
      )}

      <Table
        checakble={{
          active: false,
          multi: false,
          setter: () => {},
        }}
        data={dummyData}
        addedMap={addedMap}
        tdOptions={{
          custom1: {
            el: (item: number) => {
              return `${item * 3}%`;
            },
          },
          custom2: {
            el: (item: string) => {
              return (
                <button className="btn btn-primary btn-xs" type="button">
                  {item}
                </button>
              );
            },
          },
          custom3: {
            el: (item: boolean) => {
              const result = item ? "활성" : "휴면";
              return result;
            },
          },
          custom4: {
            el: (item: string[]) => {
              return (
                <select className="select select-ghost select-xs">
                  {item.map((lowerItem) => {
                    return (
                      <option value={lowerItem} key={lowerItem}>
                        {lowerItem}
                      </option>
                    );
                  })}
                </select>
              );
            },
          },
          custom5: {
            el: (item: { test: string }) => {
              return <span>{item.test}</span>;
            },
          },
          custom6: {
            el: (item: number, index: number) => {
              const custom1Data = dummyData[index].custom1;

              return (
                <span>
                  this rows custom1 data = {custom1Data}
                  <br /> and this columns data = {item}
                </span>
              );
            },
          },
        }}
      />
    </>
  );
}

export default index;
