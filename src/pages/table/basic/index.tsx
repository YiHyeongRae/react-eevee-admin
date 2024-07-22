import Table from "#/components/Table";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
function index() {
  const dummyData = [
    {
      userName: "가가가",
      job: "코더",
      company: "컴패니",
      location: "집",
      lastLogin: "2024-05-01 00:23:11",
    },
    {
      userName: "나나나",
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
            {`import Table from "#/components/Table";

function index() {
  
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
      <Table data={dummyData} addedMap={addedMap} />
  );
}

export default index;`}
          </SyntaxHighlighter>
        </div>
      )}
      <Table data={dummyData} addedMap={addedMap} />
    </>
  );
}

export default index;
