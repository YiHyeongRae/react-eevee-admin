import { useTranslation } from "react-i18next";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import tableCode from "#/data/codes/table/table.txt";
import typesCode from "#/data/codes/table/types.txt";
import funcCode from "#/data/codes/table/func.txt";
import { useEffect, useState } from "react";
import { map } from "lodash";

function index() {
  const copyAndPaste = async (target: "Component" | "Types" | "Function") => {
    const text = document.getElementsByClassName(target);

    await navigator.clipboard.writeText(text[0].textContent || "");
    alert(`${target} copy complete !`);
  };
  const { t } = useTranslation();
  const fetchCodes = async () => {
    const [tableResponse, typesResponse, funcResponse] = await Promise.all([
      fetch(tableCode).then((res) => res.text()),
      fetch(typesCode).then((res) => res.text()),
      fetch(funcCode).then((res) => res.text()),
    ]);

    setÇodes((prev) => ({
      ...prev,
      comp: tableResponse,
      type: typesResponse,
      func: funcResponse,
    }));
  };
  const [codes, setÇodes] = useState({ comp: "", type: "", func: "" });
  useEffect(() => {
    fetchCodes();
  }, []);

  const componentsGuides = [
    {
      props: "className",
    },
    {
      props: "draggableIcon",
    },
    {
      props: "data",
    },
    {
      props: "addedMap",
    },
    {
      props: "checkable",
    },
    {
      props: "tdOptions",
    },
    {
      props: "trOptions",
    },
    {
      props: "mergeTheadTrOptions",
    },
    {
      props: "perPageOptions",
    },
    {
      props: "perPageList",
    },
    {
      props: "overflowY",
    },
  ];
  return (
    <>
      <div className="grid grid-cols-2 gap-2 overflow-hidden h-3/4 max-md:grid-cols-1 max-md:h-dvh">
        <div className="grid col-span-1 overflow-auto">
          <div className="flex flex-wrap col-span-1 gap-2 mr-1">
            <div className="py-3 badge badge-primary max-sm:text-xs">
              {t("common.component")}
            </div>
            <div
              className="py-3 cursor-pointer badge badge-secondary max-sm:text-xs"
              onClick={() => copyAndPaste("Component")}
            >
              {t("common.copy")}
            </div>
          </div>

          <SyntaxHighlighter
            language="tsx"
            style={vscDarkPlus}
            className="border border-zinc-500 Component min-h-[389px] max-h-[389px]"
          >
            {codes.comp}
          </SyntaxHighlighter>
        </div>

        <div className="grid grid-cols-2 col-span-1 gap-2 overflow-hidden max-md:grid-cols-1">
          <div className="grid col-span-1 overflow-auto">
            <div className="flex flex-wrap col-span-1 gap-2 mr-1">
              <div className="py-3 badge badge-primary max-sm:text-xs">
                {t("common.type")}
              </div>
              <div
                className="py-3 cursor-pointer badge badge-secondary max-sm:text-xs"
                onClick={() => copyAndPaste("Types")}
              >
                {t("common.copy")}
              </div>
            </div>
            <SyntaxHighlighter
              language="tsx"
              style={vscDarkPlus}
              className="border Types border-zinc-500 min-h-[389px] max-h-[389px]"
            >
              {codes.type}
            </SyntaxHighlighter>
          </div>
          <div className="grid col-span-1 overflow-auto">
            <div className="flex flex-wrap col-span-1 gap-2 mr-1">
              <div className="py-3 badge badge-primary max-sm:text-xs">
                {t("common.function")}
              </div>
              <div
                className="py-3 cursor-pointer badge badge-secondary max-sm:text-xs"
                onClick={() => copyAndPaste("Function")}
              >
                {t("common.copy")}
              </div>
            </div>

            <SyntaxHighlighter
              language="tsx"
              style={vscDarkPlus}
              className="border Function border-zinc-500 min-h-[389px] max-h-[389px]"
            >
              {codes.func}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
      <div className="grid gap-4 mt-4">
        <div className="overflow-x-auto">
          <table className="table" id="api-table">
            <thead>
              <tr className="border-secondary">
                <th></th>
                <td> {t(`common.props`)}</td>

                <td> {t(`common.description`)}</td>

                <td> {t(`common.detail`)}</td>
              </tr>
            </thead>
            <tbody>
              {map(componentsGuides, (item, index) => {
                return (
                  <tr className="border-zinc-500" key={item.props + index}>
                    <th>{index + 1}</th>
                    <td>{item.props}</td>
                    <td>{t(`guides.componentDescription${index + 1}`)}</td>

                    <td>{t(`guides.componentDetail${index + 1}`)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default index;
