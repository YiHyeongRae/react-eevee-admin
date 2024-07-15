import { Modal } from "#/components/Modal";
import { closeModal, openModal } from "#/utils/useModalHandler";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
function index() {
  const [isExpand, setIsExpand] = useState(true);
  const { t } = useTranslation();
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
            {`import { Modal, ModalOpener } from "#/components/Modal";
import { closeModal, openModal } from "#/utils/useModalHandler";

function index() {
  
  return (
    <>
      <div>
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => {
            openModal("funtion-modal-exam");
          }}
        >
          i'm funtion modal
        </button>
      </div>
      <Modal
        id="funtion-modal-exam"
        closeFunc={() => {
          alert("모달이 꺼졌습니다");
        }}
      >
        <button
          className="btn btn-neutral"
          type="button"
          onClick={() => {
            closeModal("funtion-modal-exam");
          }}
        >
          i'm closeModal Function
        </button>
      </Modal>
    </>
  );
}

export default index;`}
          </SyntaxHighlighter>
        </div>
      )}

      <div>
        <button
          className="mt-2 btn btn-secondary"
          type="button"
          onClick={() => {
            openModal("funtion-modal-exam");
          }}
        >
          i'm funtion modal
        </button>
      </div>

      <Modal
        id="funtion-modal-exam"
        closeFunc={() => {
          alert("모달이 꺼졌습니다");
        }}
      >
        <button
          className="btn btn-neutral"
          type="button"
          onClick={() => {
            closeModal("funtion-modal-exam");
          }}
        >
          i'm closeModal Function
        </button>
      </Modal>
    </>
  );
}

export default index;
