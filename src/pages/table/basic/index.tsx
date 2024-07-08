import Table from "#/components/Table";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
function index() {
  const buttons = [
    {
      style: "",
      text: "추가버튼",
      func: () => {},
      disabled: false,
    },
    {
      style: "",
      text: "다른버튼",
      func: () => {
        alert("다른버튼 액션");
      },
      disabled: false,
    },
    {
      style: "",
      text: "또다른버튼",
      func: () => {},
      disabled: true,
    },
  ];
  const dummyData = [
    {
      userName: "가",
      job: "직업",
      company: "컴패니",
      location: "집",
      lastLogin: "2024-05-01 00:23:11",
    },
    {
      userName: "나",
      job: "커피알바생",
      company: "메가커피",
      location: "서울",
      lastLogin: "2024-05-07 19:42:23",
    },
  ];

  const addedMap = [
    ["userName", "이름"],
    ["job", "직업"],
    ["company", "회사"],
    ["location", "지역"],
    ["lastLogin", "마지막 로그인"],
  ];
  const [isExpand, setIsExpand] = useState(true);
  const { t } = useTranslation();
  return (
    <>
      <div>
        <div
          className="cursor-pointer badge badge-lg badge-outline"
          onClick={() => setIsExpand((prev) => !prev)}
        >
          {`${t("common.code")} ${
            isExpand ? t("common.collapse") : t("common.expand")
          }`}
        </div>
      </div>
      {isExpand && (
        <div className="grid grid-cols-2 gap-2 h-3/4">
          <SyntaxHighlighter language="tsx" style={vscDarkPlus}>
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
      style?: string;
      func: Function;
      tooltip?: { active: boolean; text: string };
      el: Function;
    };
  };
  buttons?: {
    style: string;
    text: string;
    func: Function;
    disabled: boolean;
  }[];
};
        `}
          </SyntaxHighlighter>
          <SyntaxHighlighter language="tsx" style={vscDarkPlus}>
            {`import { useState } from "react";
import Table from "#/components/Table";
import { TableTypes } from "#/data/types/components";

function index() {
  const buttons = [
    {style: "",text: "추가버튼",func: () => {},disabled: false},
    {style: "",text: "다른버튼",func: () => {},disabled: false},
    {style: "",text: "또다른버튼",func: () => {alert("또다른버튼 액션");},disabled: true},
  ];
  const dummyData = [
    {
      userName: "가",
      job: "직업",
      company: "컴패니",
      location: "집",
      lastLogin: "2024-05-01 00:23:11",
    },
    {
      userName: "나",
      job: "커피알바생",
      company: "메가커피",
      location: "서울",
      lastLogin: "2024-05-07 19:42:23",
    },
  ];
  
  const addedMap = [
    ["userName", "이름"],
    ["job", "직업"],
    ["company", "회사"],
    ["location", "지역"],
    ["lastLogin", "마지막 로그인"],
  ];
  
  return (
      <Table buttons={buttons} data={dummyData} addedMap={addedMap} />
  );
}

export default index;`}
          </SyntaxHighlighter>
        </div>
      )}
      <Table buttons={buttons} data={dummyData} addedMap={addedMap} />
    </>
  );
}

export default index;
