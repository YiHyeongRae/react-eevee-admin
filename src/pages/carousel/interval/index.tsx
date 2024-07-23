import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Carousel from "#/components/Carousel";
import _ from "lodash";
function index() {
  const [isExpand, setIsExpand] = useState(true);
  const { t } = useTranslation();

  const exampleCarousel = [
    "rgb(43,132,115)",
    "rgb(12,114,247)",
    "rgb(211,179,134)",
    "rgb(107,134,45)",
    "rgb(107,30,33)",
  ];

  return (
    <div className="flex flex-col gap-2">
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
        <div className="grid grid-cols-1 gap-2">
          <SyntaxHighlighter language="tsx" style={vscDarkPlus}>
            {`import Carousel from "#/components/Carousel";
import _ from "lodash";

function index() {
  const exampleCarousel = [
    "rgb(43,132,115)",
    "rgb(12,114,247)",
    "rgb(211,179,134)",
    "rgb(107,134,45)",
    "rgb(107,30,33)",
  ];

  return (
    <Carousel interval={2000}>
        {_.map(exampleCarousel, (item, index) => {
          return (
            <div
              className={\`\flex items-center justify-center w-full h-40 text-lg font-bold\`}
              style={{ backgroundColor: item }}
            >
              {index}
            </div>
          );
        })}
      </Carousel>
  );
}

export default index;`}
          </SyntaxHighlighter>
        </div>
      )}

      <Carousel interval={2000}>
        {_.map(exampleCarousel, (item, index) => {
          return (
            <div
              className={`flex items-center justify-center w-full h-40 text-lg font-bold`}
              style={{ backgroundColor: item }}
            >
              {`[index - ${index}] => ${item}`}
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}

export default index;
