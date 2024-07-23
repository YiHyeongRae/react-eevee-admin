import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Carousel from "#/components/Carousel";
import _ from "lodash";
function index() {
  const [isExpand, setIsExpand] = useState(true);
  const { t } = useTranslation();

  const exampleCarousel = 7;
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
  const exampleCarousel = 7;

  return (
    <Carousel infinite>
        {_.times(exampleCarousel, (item) => {
          return (
            <div
              className={\`\flex items-center justify-center w-full h-40 text-lg font-bold \${
                item === 0 ? "bg-primary" : "bg-secondary"
              }\`}
              key={item}
            >
              {item}
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

      <Carousel infinite>
        {_.times(exampleCarousel, (item) => {
          return (
            <div
              className={`flex items-center justify-center w-full h-40 text-lg font-bold ${
                item === 0 ? "bg-primary" : "bg-secondary"
              }`}
              key={item}
            >
              {item}
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}

export default index;
