import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import perPageCode from "#/data/codes/table/perPage.txt";
import { useLoadingContext } from "#/utils/useLoadingContext";
import Table from "#/components/Table";
import { map } from "lodash";

function index() {
  const addedMap = [
    ["id", "ID"],
    ["postId", "게시글 ID"],
    ["name", "이름"],
    ["body", "댓글 내용"],
  ];

  const [data, setData] = useState<{}[]>([]);

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
      `https://jsonplaceholder.typicode.com/comments?_page=${perPage.page}&_limit=${perPage.perPage}`
    ).then(async (res) => {
      const result = await res.json();

      setData(result);

      setPerPage((prev) => {
        return { ...prev, pageLength: 500 / perPage.perPage };
      });
      hideLoading();
    });
  };

  useEffect(() => {
    getData();
  }, [perPage.page, perPage.perPage]);

  const [codes, setÇodes] = useState("");

  useEffect(() => {
    fetch(perPageCode)
      .then((response) => response.text())
      .then((text) => setÇodes(text));
  }, []);

  const customPerPage = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
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
        <div className="text-lg">PerPageOptions</div>

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
              <td>page</td>
              <td>{t("guides.perPageOptionsDescription1")}</td>
              <td>number</td>
              <td className="whitespace-pre-wrap">-</td>
            </tr>
            <tr className="border-zinc-500">
              <th>2</th>
              <td>perPage</td>
              <td>{t("guides.perPageOptionsDescription2")}</td>
              <td>number</td>
              <td>-</td>
            </tr>
            <tr className="border-zinc-500">
              <th>3</th>
              <td>pageLength</td>
              <td>{t("guides.perPageOptionsDescription3")}</td>
              <td>number</td>
              <td>{t("guides.perPageOptionsNote1")}</td>
            </tr>
            <tr className="border-zinc-500">
              <th>4</th>
              <td>setPerPage</td>
              <td>{t("guides.perPageOptionsDescription4")}</td>
              <td>Function</td>
              <td>-</td>
            </tr>
            <tr className="border-zinc-500">
              <th>5</th>
              <td>el</td>
              <td>{t("guides.perPageOptionsDescription5")}</td>
              <td>React.ReactNode</td>
              <td>{t("guides.perPageOptionsNote2")}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="divider"></div>
      <div>
        <Table
          data={data || []}
          addedMap={addedMap}
          perPageOptions={{
            page: perPage.page,
            perPage: perPage.perPage,
            pageLength: perPage.pageLength,
            setPerPage: setPerPage,
            el: (
              <div className="flex gap-2">
                <div>perPage : </div>
                {map(customPerPage, (item) => (
                  <div
                    className="px-2 py-1 text-black rounded-sm cursor-pointer bg-stone-200"
                    key={item}
                    onClick={() =>
                      setPerPage((prev) => {
                        return { ...prev, perPage: item };
                      })
                    }
                  >
                    {item}
                  </div>
                ))}
              </div>
            ),
          }}
        />
      </div>
    </div>
  );
}

export default index;
