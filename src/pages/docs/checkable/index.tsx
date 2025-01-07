import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import checkableCode from "#/data/codes/table/checkable.txt";
import { Gridsify } from "gridsify";
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

  const [isMulti, setIsMulti] = useState(false);
  const [selected, setSelected] = useState([]);
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
    fetch(checkableCode)
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

      <div className="divider"></div>

      <div>
        <div className="text-lg">Checkable</div>
        <table className="table" id="api-table">
          <thead>
            <tr className="border-secondary">
              <th></th>
              <td> {t(`common.props`)}</td>
              <td> {t(`common.description`)}</td>
              <td> {t(`common.type`)}</td>
              <td> {t(`common.note`)}</td>
            </tr>
          </thead>
          <tbody>
            <tr className="border-zinc-500">
              <th>1</th>
              <td>active</td>
              <td>{t("guides.checkableDescription1")}</td>
              <td>boolean</td>
              <td>-</td>
            </tr>
            <tr className="border-zinc-500">
              <th>2</th>
              <td>multi</td>
              <td>{t("guides.checkableDescription2")}</td>

              <td>boolean</td>
              <td>-</td>
            </tr>
            <tr className="border-zinc-500">
              <th>3</th>
              <td>setter</td>
              <td>{t("guides.checkableDescription3")}</td>

              <td>Function</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="divider"></div>

      <div className="flex gap-2">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => {
            setSelected([]);
            setIsMulti((prev) => !prev);
          }}
        >
          {isMulti ? t("guides.checkableGuide1") : t("guides.checkableGuide2")}
        </button>
        <div className="flex items-center w-full gap-2">
          <input
            type="text"
            placeholder={t("common.value")}
            value={selected}
            className="w-full max-w-xs input-sm input input-bordered border-primary"
          />
        </div>
      </div>
      <Table
        checkable={{ active: true, multi: isMulti, setter: setSelected }}
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
