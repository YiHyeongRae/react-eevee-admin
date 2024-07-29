import TimePicker from "#/components/TimePicker";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
function index() {
  const [isExpand, setIsExpand] = useState(true);
  const { t } = useTranslation();

  const [times1, setTImes1] = useState();
  const [times2, setTImes2] = useState();
  const [times3, setTImes3] = useState();
  const [times4, setTImes4] = useState();

  return (
    <>
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
        <div className="grid grid-cols-1 gap-2 h-3/4">
          <SyntaxHighlighter language="tsx" style={vscDarkPlus}>
            {`import TimePicker from "#/components/TimePicker";
import { useState } from "react";

function index() {
  
  const [times1, setTImes1] = useState();
  const [times2, setTImes2] = useState();
  const [times3, setTImes3] = useState();
  const [times4, setTImes4] = useState();
  
  return (
    <div className="flex flex-wrap gap-2">
      <div className="flex flex-col ">
        <div className="text-xl font-bold">type half</div>
        <div className="my-2 text-base">current times:{times1}</div>
        <TimePicker type="half" select={{ setter: setTImes1 }} />
      </div>
      <div className="flex flex-col ">
        <div className="text-xl font-bold">type full</div>
        <div className="my-2 text-base">current times:{times2}</div>
        <TimePicker type="full" select={{ setter: setTImes2 }} />
      </div>
      <div className="flex flex-col ">
        <div className="text-xl font-bold">second</div>
        <div className="my-2 text-base">current times:{times3}</div>
        <TimePicker second select={{ setter: setTImes3 }} />
      </div>
      <div className="flex flex-col ">
        <div className="text-xl font-bold">type half second</div>
        <div className="my-2 text-base">current times:{times4}</div>
        <TimePicker type="half" second select={{ setter: setTImes4 }} />
      </div>
    </div>
  );
}

export default index;`}
          </SyntaxHighlighter>
        </div>
      )}
      <div className="divider divider-primary"></div>

      <div className="flex flex-col gap-2">
        <div className="text-xl font-bold">type half</div>
        <div className="text-base">current times:{times1}</div>
        <div className="text-base">perItems: 4</div>
        <TimePicker
          type="half"
          select={{ setter: setTImes1 }}
          fixedHeight="h-[300px]"
          perItems={4}
        />
      </div>
      <div className="divider divider-primary"></div>
      <div className="flex flex-col gap-2">
        <div className="text-xl font-bold">type full</div>
        <div className="text-base">current times:{times2}</div>
        <div className="text-base">perItems: 6</div>
        <TimePicker type="full" select={{ setter: setTImes2 }} perItems={6} />
      </div>
      <div className="divider divider-primary"></div>

      <div className="flex flex-col gap-2">
        <div className="text-xl font-bold">second</div>
        <div className="text-base">current times:{times3}</div>
        <div className="text-base">perItems: 3</div>
        <div className="text-base">perSecond: 10</div>

        <TimePicker
          perItems={3}
          perSecond={10}
          second
          select={{ setter: setTImes3 }}
        />
      </div>
      <div className="divider divider-primary"></div>

      <div className="flex flex-col gap-2">
        <div className="text-xl font-bold">type half second</div>
        <div className="text-base">current times:{times4}</div>
        <div className="text-base">perItems: 5</div>
        <div className="text-base">perSecond: 4</div>
        <TimePicker
          perItems={5}
          perSecond={4}
          fixedHeight="h-[240px]"
          type="half"
          second
          select={{ setter: setTImes4 }}
        />
      </div>
    </>
  );
}

export default index;
