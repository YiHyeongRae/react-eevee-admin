import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import basicCode from "#/data/codes/table/basic.txt";
import { useLoadingContext } from "#/utils/useLoadingContext";
import Table from "#/components/Table";
function index() {
  const addedMap = [
    ["id", "id"],
    ["userId", "유저 ID"],
    ["title", "제목"],
    ["body", "내용"],
  ];

  const [data, setData] = useState([]);

  const [perPage, setPerPage] = useState({
    page: 1,
    perPage: 20,
    pageLength: 1,
  });
  const [isExpand, setIsExpand] = useState(false);
  const { t } = useTranslation();
  const { showLoading, hideLoading } = useLoadingContext();

  const getData = async () => {
    showLoading();
    await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${perPage.page}&_limit=${perPage.perPage}`
    ).then(async (res) => {
      const result = await res.json();
      setData(result);

      setPerPage((prev) => {
        return { ...prev, pageLength: 100 / perPage.perPage };
      });
      hideLoading();
    });
  };

  useEffect(() => {
    getData();
  }, [perPage.page, perPage.perPage]);

  const [codes, setÇodes] = useState("");

  useEffect(() => {
    fetch(basicCode)
      .then((response) => response.text())
      .then((text) => setÇodes(text));
  }, []);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <button
          className="btn btn-sm btn-primary max-sm:text-xs"
          onClick={() => setIsExpand((prev) => !prev)}
          style={{
            animation: "dropDownBadge 0.8s ease 0s 1 normal both",
          }}
        >
          {`Code ${isExpand ? t("common.collapse") : t("common.expand")}`}
        </button>
      </div>

      {isExpand && (
        <div className="grid grid-cols-1 gap-2 h-3/4">
          <SyntaxHighlighter
            language="tsx"
            style={vscDarkPlus}
            className="border border-zinc-500"
          >
            {`${codes}`}
          </SyntaxHighlighter>
        </div>
      )}
      <Table
        data={data || []}
        addedMap={addedMap}
        perPageOptions={{
          page: perPage.page,
          perPage: perPage.perPage,
          pageLength: perPage.pageLength,
          setPerPage: setPerPage,
        }}
      />
    </div>
  );
}

export default index;
