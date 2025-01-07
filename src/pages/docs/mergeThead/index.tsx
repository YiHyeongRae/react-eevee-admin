import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import mergeTheadCode from "#/data/codes/table/mergeThead.txt";
import { useLoadingContext } from "#/utils/useLoadingContext";
import Table from "#/components/Table";
import { map } from "lodash";
function index() {
  const addedMap = [
    ["id", "id"],
    ["name", "이름"],
    ["username", "유저 이름"],
    ["email", "이메일"],
    ["phone", "전화번호"],
    ["website", "홈페이지"],
    ["street", "거리"],
    ["suite", "호"],
    ["city", "도시"],
    ["zipcode", "우편번호"],
    ["lat", "위도"],
    ["lng", "경도"],
    ["catchPhrase", "슬로건"],
    ["bs", "비즈니스 전략"],
  ];

  const myMergeOptions = {
    colSpanStarter: {
      name: {
        title: "사용자 정보",
        colSpan: 4,
      },

      street: {
        title: "회사주소",
        colSpan: 6,
      },
      catchPhrase: {
        title: "회사이념",
        colSpan: 2,
      },
    },
    colSpanTarget: [
      "name",
      "username",
      "email",
      "phone",
      "street",
      "suite",
      "city",
      "zipcode",
      "lat",
      "lng",
      "catchPhrase",
      "bs",
    ],
  };

  const [data, setData] = useState<{}[]>([]);

  const [perPage, setPerPage] = useState({
    page: 1,
    perPage: 5,
    pageLength: 1,
  });

  const [isExpand, setIsExpand] = useState(false);
  const { t } = useTranslation();
  const { showLoading, hideLoading } = useLoadingContext();

  const getData = async () => {
    showLoading();
    await fetch(
      `https://jsonplaceholder.typicode.com/users?_page=${perPage.page}&_limit=${perPage.perPage}`
    ).then(async (res) => {
      const result = await res.json();
      const emptyArray: {}[] = [];

      map(result, (item) => {
        const flatObject = {
          ...item,
          ...item.address,
          ...item.address.geo,
        };
        flatObject.catchPhrase = item.company.catchPhrase;
        flatObject.bs = item.company.bs;

        delete flatObject.address;
        delete flatObject.geo;
        delete flatObject.company;
        emptyArray.push(flatObject);
      });

      setData(emptyArray);

      setPerPage((prev) => {
        return { ...prev, pageLength: 10 / perPage.perPage };
      });
      hideLoading();
    });
  };

  useEffect(() => {
    getData();
  }, [perPage.page, perPage.perPage]);

  const [codes, setÇodes] = useState("");

  useEffect(() => {
    fetch(mergeTheadCode)
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
        <div className="text-lg">MergeTheadTrOptions</div>
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
          <span className="flex flex-col items-start w-full max-md:text-sm">
            {`mergeTheadTrOptions : { colSpanStarter : { key : { title, colSpan } } , colSpanTarget }`}
            <span className="inline-block w-max max-md:text-sm">
              {t("guides.requireAddedMapMatchKeys")}
            </span>
          </span>
        </div>
        <div role="alert" className="my-4 alert alert-error">
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
          <span className="flex flex-col items-start w-full max-md:text-sm">
            <span className="inline-block w-max max-md:text-sm">
              {t("guides.disableTheadDraggable")}
            </span>
          </span>
        </div>
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
              <td>colSpanStarter</td>
              <td>{t("guides.mergeTheadTrOptionsDescription1")}</td>
              <td>object</td>
              <td className="whitespace-pre-wrap">
                {t("guides.mergeTheadTrOptionsNote1")}
              </td>
            </tr>
            <tr className="border-zinc-500">
              <th>2</th>
              <td>colSpanTarget</td>
              <td>{t("guides.mergeTheadTrOptionsDescription2")}</td>

              <td>{`Array<string>`}</td>
              <td>-</td>
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
          }}
          perPageList={[2, 5, 10]}
          mergeTheadTrOptions={myMergeOptions}
        />
      </div>
    </div>
  );
}

export default index;
