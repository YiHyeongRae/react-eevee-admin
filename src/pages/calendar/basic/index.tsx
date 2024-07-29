import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import _ from "lodash";
import Calendar from "#/components/Calendar";

function index() {
  const [isExpand, setIsExpand] = useState(true);
  const { t } = useTranslation();

  const [selected, setSelected] = useState();
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
            {`import Calendar from "#/components/Calendar";

function index() {
  const [selected, setSelected] = useState();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap justify-start gap-2">
        <div className="flex-[1_1_18%]">
          <div className="my-4 text-xl font-bold">
            Basic seleted {selected}
          </div>
          <Calendar select={{ setter: setSelected }} />
        </div>
      </div>
      <div className="flex flex-wrap justify-start gap-2">
        <div className="flex-[1_1_18%]">
          <div className="my-4 text-xl font-bold">
            Prevent past 2024-07-24
          </div>
          <Calendar past="2024-07-24" select={{ setter: () => {} }} />
        </div>
        <div className="flex-[1_1_18%]">
          <div className="my-4 text-xl font-bold">
            Prevent future 2024-07-24
          </div>
          <Calendar future="2024-07-24" select={{ setter: () => {} }} />
        </div>
        <div className="flex-[1_1_18%]">
          <div className="my-4 text-xl font-bold">Prevent both</div>
          <Calendar
            past="2024-07-12"
            future="2024-07-28"
            select={{ setter: () => {} }}
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-start gap-2">
        <div className="flex-[1_1_18%]">
          <div className="my-4 text-xl font-bold">closeFunc</div>
          <Calendar
            closeFunc={() => {
              alert("will fired close button clicked");
            }}
            select={{ setter: () => {} }}
          />
        </div>
      </div>
    </div>
  );
}

export default index;`}
          </SyntaxHighlighter>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap justify-start gap-2">
          <div className="flex-[1_1_18%]">
            <div className="my-4 text-xl font-bold">
              Basic seleted {selected}
            </div>
            <Calendar select={{ setter: setSelected }} />
          </div>
        </div>
        <div className="flex flex-wrap justify-start gap-2">
          <div className="flex-[1_1_18%]">
            <div className="my-4 text-xl font-bold">
              Prevent past 2024-07-24
            </div>
            <Calendar past="2024-07-24" select={{ setter: () => {} }} />
          </div>
          <div className="flex-[1_1_18%]">
            <div className="my-4 text-xl font-bold">
              Prevent future 2024-07-24
            </div>
            <Calendar future="2024-07-24" select={{ setter: () => {} }} />
          </div>
          <div className="flex-[1_1_18%]">
            <div className="my-4 text-xl font-bold">Prevent both</div>
            <Calendar
              past="2024-07-12"
              future="2024-07-28"
              select={{ setter: () => {} }}
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-start gap-2">
          <div className="flex-[1_1_18%]">
            <div className="my-4 text-xl font-bold">closeFunc</div>
            <Calendar
              closeFunc={() => {
                alert("will fired close button clicked");
              }}
              select={{ setter: () => {} }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
