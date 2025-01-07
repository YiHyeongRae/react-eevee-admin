import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import tdOptionsCode from "#/data/codes/table/tdOptions.txt";
import { useLoadingContext } from "#/utils/useLoadingContext";
import Table from "#/components/Table";
import { map } from "lodash";
function index() {
  const addedMap = [
    ["id", "id"],
    ["name", "이름"],
    ["username", "유저 이름"],
    ["email", "이메일"],
    ["address", "주소"],
    ["phone", "전화번호"],
    ["website", "홈페이지"],
    ["company", "회사 정보"],
  ];

  const addedMap2 = [
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

  const [data, setData] = useState<{}[]>([]);
  const [data2, setData2] = useState<{}[]>([]);

  const [perPage, setPerPage] = useState({
    page: 1,
    perPage: 10,
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

      // make option2 case data
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

      setData(result);
      setData2(emptyArray);

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
    fetch(tdOptionsCode)
      .then((response) => response.text())
      .then((text) => setÇodes(text));
  }, []);
  const [option, setOption] = useState(1);
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
        <div className="text-lg">TdOptions</div>
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
            {`tdOptions : { key : {
              className, func, el
            } }`}
            <span className="inline-block w-max max-md:text-sm">
              {t("guides.requireAddedMapMatchKeys")}
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
              <td>className</td>
              <td>{t("guides.tdOptionsDescription1")}</td>

              <td>Fucntion</td>
              <td>-</td>
            </tr>
            <tr className="border-zinc-500">
              <th>2</th>
              <td>func</td>
              <td>{t("guides.tdOptionsDescription2")}</td>

              <td>Function</td>
              <td>-</td>
            </tr>
            <tr className="border-zinc-500">
              <th>3</th>
              <td>el</td>
              <td>{t("guides.tdOptionsDescription3")}</td>
              <td>Function</td>
              <td>{t("guides.tdOptionsNote1")}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="divider"></div>
      <div>
        <div id="1">
          <div className="join">
            <button
              className={`${
                option === 1 && "btn-primary"
              } btn btn-sm join-item`}
              onClick={() => {
                setOption(1);
                (document.getElementById("1") as HTMLElement).scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
            >
              {t("common.option")}-1
            </button>
            <button
              className={`${
                option === 2 && "btn-primary"
              } btn btn-sm join-item`}
              onClick={() => {
                setOption(2);
                (document.getElementById("2") as HTMLElement).scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
            >
              {t("common.option")}-2
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
            perPageList={[2, 5, 10]}
            tdOptions={{
              address: {
                el: (item: {
                  [key: string]: string | { [key: string]: string };
                }) => {
                  const { street, suite, city, zipcode } = item;

                  return (
                    <div className="flex flex-col gap-2">
                      <div>{`${suite} ${street} ${city} ${zipcode}`}</div>
                    </div>
                  );
                },
              },
              company: {
                el: (item: { [key: string]: string }) => {
                  return (
                    <div className="flex flex-col w-full gap-2">
                      {map(item, (value, key) => {
                        return (
                          <div key={key}>
                            {key} : {value}
                          </div>
                        );
                      })}
                    </div>
                  );
                },
              },
            }}
          />
        </div>
        <div id="2">
          <div className="join">
            <button
              className={`${
                option === 1 && "btn-primary"
              } btn btn-sm join-item`}
              onClick={() => {
                setOption(1);
                (document.getElementById("1") as HTMLElement).scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
            >
              {t("common.option")}-1
            </button>
            <button
              className={`${
                option === 2 && "btn-primary"
              } btn btn-sm join-item`}
              onClick={() => {
                setOption(2);
                (document.getElementById("2") as HTMLElement).scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
            >
              {t("common.option")}-2
            </button>
          </div>
          <Table
            data={data2 || []}
            addedMap={addedMap2}
            perPageOptions={{
              page: perPage.page,
              perPage: perPage.perPage,
              pageLength: perPage.pageLength,
              setPerPage: setPerPage,
            }}
            perPageList={[2, 5, 10]}
            tdOptions={{
              city: {
                className: (item: string) => {
                  if (item.includes("South")) {
                    return "Check-City-td-Element-Class";
                  }
                },
              },
              email: {
                func: (item: string) => {
                  alert(`will send mail to ${item}`);
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default index;
