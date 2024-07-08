import { ModalOpenerTypes, ModalTypes } from "../../data/types/components";

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
      <div className={`modal-box ${className} text-sm max-sm:text-xs `}>
        {children}
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button
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
  // disabled,
  style,
  func,
}: ModalOpenerTypes) {
  return (
    <div
      className={`${style}`}
      // disabled={disabled}
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
