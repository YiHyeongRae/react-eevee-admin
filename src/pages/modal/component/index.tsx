import { useTranslation } from "react-i18next";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

function index() {
  const copyAndPaste = async (target: "Component" | "Types" | "Function") => {
    const text = document.getElementsByClassName(target);

    await navigator.clipboard.writeText(text[0].textContent || "");
    alert(`${target} copy complete !`);
  };

  const { t } = useTranslation();

  return (
    <>
      <div className="grid grid-cols-2 gap-2 overflow-hidden h-3/4 max-md:grid-cols-1 max-md:h-dvh">
        <div className="grid col-span-1 overflow-auto">
          <div className="flex flex-wrap col-span-1 gap-2 mr-1">
            <div className="badge badge-outline max-sm:text-xs">
              {t("common.component")}
            </div>
            <div
              className="cursor-pointer badge badge-primary max-sm:text-xs"
              onClick={() => copyAndPaste("Component")}
            >
              {t("common.copy")}
            </div>
          </div>
          <SyntaxHighlighter
            language="tsx"
            style={vscDarkPlus}
            className="Component"
          >
            {`import { ModalOpenerTypes, ModalTypes } from "../../data/types/components";

function Modal({ id, className, children, closeFunc, open }: ModalTypes) {
    return (
        <dialog
          id={id}
          className="modal"
          onKeyDown={(e) => {
          if (e.code === "Escape") {
              closeFunc && closeFunc();
          }
          }}
          open={open}
        >
          <div className={\`modal-box \${className} text-sm max-sm:text-xs\`}>
            {children}
            <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button
                  id={\`\${id}-close-btn\`}
                  className="absolute btn btn-sm max-sm:btn-xs btn-circle btn-ghost right-4 top-5"
                  onClick={() => {
                      closeFunc && closeFunc();
                  }}
                  >
                    ✕
                </button>
            </form>
          </div>
        </dialog>
    );
}

function ModalOpener({
    id,
    children,
    disabled,
    className,
    func,
}: ModalOpenerTypes) {
    return (
        <div
          className={\`\${className}\`}
          disabled={disabled}
          onClick={() => {
          (document.getElementById(id) as HTMLFormElement).showModal();
          func && func();
          }}
        >
          {children}
        </div>
    );
}

export { Modal, ModalOpener };
`}
          </SyntaxHighlighter>
        </div>

        <div className="grid grid-cols-2 col-span-1 gap-2 overflow-hidden max-md:grid-cols-1">
          <div className="grid col-span-1 overflow-auto">
            <div className="flex flex-wrap col-span-1 gap-2 mr-1">
              <div className="badge badge-outline max-sm:text-xs">
                {t("common.types")}
              </div>
              <div
                className="cursor-pointer badge badge-primary max-sm:text-xs"
                onClick={() => copyAndPaste("Component")}
              >
                {t("common.copy")}
              </div>
            </div>
            <SyntaxHighlighter
              language="tsx"
              style={vscDarkPlus}
              className="Types"
            >
              {`type ModalTypes = {
  id: string;
  className?: string;
  children: ReactNode;
  closeFunc?: Function;
  open?: boolean;
};

type ModalOpenerTypes = {
  className?: string;
  id: string;
  children: ReactNode;
  func?: Function;
};











`}
            </SyntaxHighlighter>
          </div>
          <div className="grid col-span-1 overflow-auto">
            <div className="flex flex-wrap col-span-1 gap-2 mr-1">
              <div className="badge badge-outline max-sm:text-xs">
                {t("common.function")}
              </div>
              <div
                className="cursor-pointer badge badge-primary max-sm:text-xs"
                onClick={() => copyAndPaste("Component")}
              >
                {t("common.copy")}
              </div>
            </div>
            <SyntaxHighlighter
              language="tsx"
              style={vscDarkPlus}
              className="Types"
            >
              {`export function openModal(id: string) {
  (document.getElementById(id) as HTMLFormElement).showModal();
}

export function closeModal(id: string) {
  const closeButton = document.getElementById(
    \`\${id}-close-btn\`
  ) as HTMLFormElement;
  closeButton.click();
}















`}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
      <div className="grid gap-4 mt-4">
        <div className="badge badge-outline">Basic Usage</div>

        <ul className="grid gap-1">
          <li className="grid justify-start grid-flow-col-dense gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
            <p className="col-span-12 text-md">
              id는 modal을 구별하는 조건이므로 절대 겹치면 안됨
            </p>
          </li>
          <li className="grid justify-start grid-flow-col-dense gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
            <p className="col-span-12 text-md">
              closeFunc는 모달이 닫히면서 실행되야할 함수가 있다면 전달
            </p>
          </li>
          <li className="grid items-start justify-start grid-flow-col-dense gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
            <p className="flex col-span-12 text-md">
              modal을 강제로 띄우고싶다면 open을 true로 전달
            </p>
          </li>
          <li className="grid items-start justify-start grid-flow-col-dense gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
            <p className="flex col-span-12 text-md">
              사용처에서 Modal, ModalOpener에 children으로 자유롭게 커스텀해서
              사용
            </p>
          </li>
          <li className="grid items-start justify-start grid-flow-col-dense gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
            <p className="flex col-span-12 text-md">
              useModalHandler로 opener 없이도 함수에 전달해서 사용가능
            </p>
          </li>
        </ul>
      </div>
    </>
  );
}

export default index;
