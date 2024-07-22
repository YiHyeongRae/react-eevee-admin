import Table from "#/components/Table";
import TableExtensionHeader from "#/components/TableExtensionHeader";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
function index() {
  const [isMulti, setMulti] = useState(false);
  const [targetIndex, setTargetIndex] = useState([]);
  const buttons = [
    {
      className: "",
      text: "멀티 체크",
      func: () => {
        setMulti(true);
        setTargetIndex([]);
      },
      disabled: isMulti,
    },
    {
      className: "",
      text: "단일 체크",
      func: () => {
        setMulti(false);
        setTargetIndex([]);
      },
      disabled: !isMulti,
    },
    {
      className: "",
      text: "체크 인덱스",
      func: () => {
        alert(`${targetIndex}`);
      },
      disabled: false,
    },
  ];
  const [dummyData] = useState([
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
  ]);

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
import TableExtensionHeader from "#/components/TableExtensionHeader";

function index() {
  const [isMulti, setMulti] = useState(false);
  const [targetIndex, setTargetIndex] = useState([]);
  const buttons = [
      {
        className: "",
        text: "멀티 체크",
        func: () => {
            setMulti(true);
            setTargetIndex([])
          },
        disabled: isMulti,
      },
      {
        className: "",
        text: "단일 체크",
        func: () => {
              setMulti(false);
              setTargetIndex([])
          },
        disabled: !isMulti,
      },
      {
        className: "",
        text: "체크 인덱스",
        func: () => {
              alert(\`\${targetIndex}\`);
          },
        disabled: false,
      },
    ];
  const [dummyData] = useState([
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
  ]);
  
  const addedMap = [
    ["userName", "이름"],
    ["job", "직업"],
    ["company", "회사"],
    ["location", "지역"],
    ["lastLogin", "마지막 로그인"],
  ];
  
  return (
    <>
      <TableExtensionHeader
        search={false}
        query={{ active: false }}
        setter={() => {}}
        etc={buttons}
      />
      <Table
        checakble={{ active: true, multi: isMulti, setter: setTargetIndex }}
        data={dummyData}
        addedMap={addedMap}
      />
    </>
  );
}

export default index;`}
          </SyntaxHighlighter>
        </div>
      )}
      <TableExtensionHeader
        search={{ active: false }}
        query={{ active: false }}
        etc={buttons}
      />
      <Table
        checakble={{ active: true, multi: isMulti, setter: setTargetIndex }}
        data={dummyData}
        addedMap={addedMap}
      />
    </>
  );
}

export default index;
