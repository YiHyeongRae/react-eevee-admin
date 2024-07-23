import { Modal, ModalOpener } from "#/components/Modal";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
function index() {
  const [isExpand, setIsExpand] = useState(true);
  const { t } = useTranslation();
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
            {`import { Modal, ModalOpener } from "#/components/Modal";

function index() {
  
  return (
    <>
      <ModalOpener id="basic-modal-exam">
          <button className="btn btn-primary" type="button">
              i'm basic modal
          </button>
      </ModalOpener>
      <Modal id="basic-modal-exam">i'm basic modal</Modal>
    </>
  );
}

export default index;`}
          </SyntaxHighlighter>
        </div>
      )}
      <ModalOpener id="basic-modal-exam">
        <button className="btn btn-primary" type="button">
          i'm basic modal
        </button>
      </ModalOpener>
      <Modal id="basic-modal-exam">i'm basic modal</Modal>
    </div>
  );
}

export default index;
