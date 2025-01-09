import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import trOptionsCode from "#/data/codes/table/trOptions.txt";
import { useLoadingContext } from "#/utils/useLoadingContext";
import Table from "#/components/Table";
import { TdObjTypes } from "#/data/types/components";
function index() {
  const addedMap = [
    ["id", "id"],
    ["albumId", "앨범 ID"],
    ["title", "제목"],
    ["thumbnailUrl", "썸네일"],
    ["url", "-"],
  ];

  const [data, setData] = useState<{}[]>([]);

  const [perPage, setPerPage] = useState({
    page: 1,
    perPage: 100,
    pageLength: 1,
  });

  const [isExpand, setIsExpand] = useState(false);
  const { t } = useTranslation();
  const { showLoading, hideLoading } = useLoadingContext();

  const getData = async () => {
    showLoading();
    await fetch(
      `https://jsonplaceholder.typicode.com/photos?_page=${perPage.page}&_limit=${perPage.perPage}`
    ).then(async (res) => {
      const result = await res.json();

      setData(result);

      setPerPage((prev) => {
        return { ...prev, pageLength: 5000 / perPage.perPage };
      });
      hideLoading();
    });
  };

  useEffect(() => {
    getData();
  }, [perPage.page, perPage.perPage]);

  const [codes, setÇodes] = useState("");

  useEffect(() => {
    fetch(trOptionsCode)
      .then((response) => response.text())
      .then((text) => setÇodes(text));
  }, []);
  const [imgae, setImage] = useState("");

  const [headDraggable, setHeadDraggable] = useState(false);
  const [bodyDraggable, setBodyDraggable] = useState(false);

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
        <div className="text-lg">TrOptions</div>

        <div role="alert" className="my-4 alert alert-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="w-6 h-6 stroke-current shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span className="flex flex-col items-start w-full gap-1 max-md:text-sm max-sm:items-center">
            {`trOptions : { thead : { className, func, isDraggable },
            { tbody : { className, func, isDraggable , dragEndFunc, dbClickFunc } } }`}
            <span className="inline-block max-md:text-sm">
              {t("guides.requireTbody")}
            </span>
          </span>
        </div>
        <div className="overflow-x-auto">
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
                <td>className</td>
                <td>{t("guides.trOptionsDescription1")}</td>

                <td>Fucntion</td>
                <td>-</td>
              </tr>
              <tr className="border-zinc-500">
                <th>2</th>
                <td>func</td>
                <td>{t("guides.trOptionsDescription2")}</td>
                <td>Function</td>
                <td>-</td>
              </tr>
              <tr className="border-zinc-500">
                <th>3</th>
                <td>isDraggable</td>
                <td>{t("guides.trOptionsDescription3")}</td>
                <td>Function</td>
                <td>-</td>
              </tr>
              <tr className="border-zinc-500">
                <th>4</th>
                <td>dragEndFunc</td>
                <td>{t("guides.trOptionsDescription4")}</td>

                <td>Function</td>
                <td>{t("guides.trOptionsNote1")}</td>
              </tr>
              <tr className="border-zinc-500">
                <th>5</th>
                <td>dbClickFunc</td>
                <td>{t("guides.trOptionsDescription5")}</td>

                <td>Function</td>
                <td>{t("guides.trOptionsNote1")}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="divider"></div>

      <div className="flex flex-wrap gap-2">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => {
            setHeadDraggable((prev) => !prev);
          }}
        >
          {headDraggable
            ? t("guides.trOptionsGuide1")
            : t("guides.trOptionsGuide2")}
        </button>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => {
            setBodyDraggable((prev) => !prev);
          }}
        >
          {bodyDraggable
            ? t("guides.trOptionsGuide3")
            : t("guides.trOptionsGuide4")}
        </button>
      </div>
      <Table
        data={data || []}
        addedMap={addedMap}
        perPageOptions={{
          page: perPage.page,
          perPage: perPage.perPage,
          pageLength: perPage.pageLength,
          setPerPage: setPerPage,
        }}
        perPageList={[100, 250, 500]}
        tdOptions={{
          thumbnailUrl: {
            el: (item: string) => {
              return <img className="flex flex-col gap-2" src={item} />;
            },
          },
          url: {
            el: (url: string) => {
              return (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    (
                      document.getElementById("my_modal_1") as HTMLFormElement
                    ).showModal?.();
                    setImage(url);
                  }}
                >
                  {t("common.modal")}
                </button>
              );
            },
          },
        }}
        trOptions={{
          thead: {
            isDraggable: () => headDraggable,
          },
          tbody: {
            isDraggable: () => bodyDraggable,
            dragEndFunc: (item: TdObjTypes[]) => {
              console.log(item);
            },
            dbClickFunc: (item: TdObjTypes) => {
              alert(JSON.stringify(item));
            },
          },
        }}
      />

      <dialog
        id="my_modal_1"
        className="modal"
        onKeyDown={(e) => {
          e.stopPropagation();
          if (e.code === "Escape") {
            setImage("");
          }
        }}
      >
        <div className="modal-box">
          <h3 className="text-lg font-bold">Image</h3>
          <p className="py-4">
            {imgae !== "" && <img src={imgae} alt="더미 이미지" />}
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn" onClick={() => setImage("")}>
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default index;
