import { map } from "lodash";
import { useTranslation } from "react-i18next";

function index() {
  const { t } = useTranslation();

  const styleGuides = [
    {
      className: ".gridsify-root",
      tagName: "div",
    },
    {
      className: ".gridsify-select",
      tagName: "select",
    },
    {
      className: ".gridsify-wrap",
      tagName: "div",
    },
    {
      className: ".gridsify-table",
      tagName: "table",
    },
    {
      className: ".gridsify-checkbox",
      tagName: "input",
    },
    {
      className: ".gridsify-thead",
      tagName: "thead",
    },
    {
      className: ".gridsify-tbody",
      tagName: "tbody",
    },
    {
      className: ".gridsify-pagination",
      tagName: "div",
    },
    {
      className: ".text-primary",
      tagName: "div",
    },
    {
      className: ".bg-primary",
      tagName: "tr, button",
    },
    {
      className: ".border-secondary",
      tagName: "thead th",
    },
  ];
  return (
    <div>
      <div role="alert" className="alert alert-warning">
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
        <span className="flex flex-col text-left max-md:text-sm">
          {t(`guides.recommandDaisyUI`)}
          <a
            className="inline-block w-max link link-error max-md:text-sm"
            href="https://daisyui.com/docs/install/"
            target="_blank"
          >
            {t(`guides.linkDaisyUI`)}
          </a>
        </span>
      </div>
      <div className="divider"></div>
      <div className="mockup-code">
        <pre data-prefix="0">
          <code>{`// html structure`}</code>
        </pre>
        <pre data-prefix="1">
          <code>{`<div className="gridsify-root">`}</code>
        </pre>
        <pre data-prefix="2">
          <code>{`    <select className="gridsify-select">`}</code>
        </pre>
        <pre data-prefix="3">
          <code>{`    <div className="gridsify-wrap">`}</code>
        </pre>
        <pre data-prefix="4">
          <code>{`        <table className="gridsify-table>`}</code>
        </pre>
        <pre data-prefix="5">
          <code>{`            <thead className="gridsify-thead">`}</code>
        </pre>
        <pre data-prefix="6">
          <code>{`            <tbody className="gridsify-tbody">`}</code>
        </pre>
        <pre data-prefix="7">
          <code>{`    <div className="gridsify-pagination">`}</code>
        </pre>
        <pre data-prefix="8">
          <code>{`</...>`}</code>
        </pre>
      </div>
      <div className="divider"></div>

      <div className="flex flex-col gap-4">
        <div className="text-base max-md:text-sm">
          {t(`guides.styleOption1`)}
        </div>
        <div className="overflow-x-auto">
          <table className="table table-fixed" id="api-table">
            <colgroup>
              <col width="5%" />
              <col />
              <col />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr className="border-secondary">
                <th></th>
                <td> {t(`common.className`)}</td>
                <td> {t(`common.description`)}</td>
                <td> {t(`common.tagName`)}</td>
                <td> {t(`common.note`)}</td>
              </tr>
            </thead>
            <tbody>
              {map(styleGuides, (item, index) => {
                return (
                  <tr className="border-zinc-500" key={item.className + index}>
                    <th>{index}</th>
                    <td>{item.className}</td>
                    <td> {t(`guides.styleDescription${index + 1}`)}</td>
                    <td>{item.tagName}</td>
                    <td>{t(`guides.styleNote${index + 1}`)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default index;
