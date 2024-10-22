import Table from "#/components/Table";
import TableExtensionHeader from "#/components/TableExtensionHeader";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
function index() {
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

  const [searchText, setSearchText] = useState("");
  const [queryText, setQueryText] = useState("");
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
  
  const [searchText, setSearchText] = useState("");
  const [queryText, setQueryText] = useState("");
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
        search={{ active: true, setter: setSearchText }}
        query={{
          active: true,
          setter: setQueryText,
          submit: () => {
            \`axios.get(/As/You/Want?text=\${queryText}&startData=\${startDate}&endData=\${endDate})\`
          },
          disabled: queryText === "",
        }}
      />
      <Table
        checakble={{ active: false, multi: false, setter: () => {} }}
        data={dummyData}
        addedMap={addedMap}
        searchText={searchText}
      />
    </>
  );
}

export default index;`}
          </SyntaxHighlighter>
        </div>
      )}
      <TableExtensionHeader
        search={{ active: true, setter: setSearchText }}
        query={{
          active: true,
          setter: setQueryText,
          submit: (startDate: string, endDate: string) => {
            alert(
              `axios.get(/As/You/Want?text=${queryText}&startData=${startDate}&endData=${endDate})`
            );
          },
          disabled: queryText === "",
        }}
      />
      <Table
        checakble={{ active: false, multi: false, setter: () => {} }}
        data={dummyData}
        addedMap={addedMap}
        searchText={searchText}
      />
    </>
  );
}

export default index;
