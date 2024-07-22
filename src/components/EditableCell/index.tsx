import { EditableCellTypes } from "../../data/types/components";

function index({ item, index, edit }: EditableCellTypes) {
  return (
    <>
      <div
        className={`${
          edit.editItem === `${item}-${index}` ? "hidden" : "flex"
        } gap-2 items-center`}
      >
        <label htmlFor={`${item}-${index}`}>{item}</label>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="cursor-pointer size-5 hover:text-primary"
          onClick={() => {
            edit.setEditItem(`${item}-${index}`);
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
      </div>

      <div
        className={`${
          edit.editItem === `${item}-${index}` ? "flex" : "hidden"
        } gap-2 items-center max-w-xs`}
      >
        <input
          id={`${item}-${index}`}
          className={`input input-xs max-w-xs`}
          type="text"
          placeholder={item}
          onBlur={(e) => {
            edit.setEditItem("");
            e.target.value = "";
          }}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="cursor-pointer size-4 hover:text-primary"
          onMouseDown={(e) => {
            e.preventDefault();
          }}
          onTouchStart={(e) => {
            e.preventDefault();
          }}
          onClick={() => {
            edit.confirmFunc?.();
            edit.setEditItem("");
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="cursor-pointer size-4 hover:text-primary"
          onMouseDown={(e) => {
            e.preventDefault();
          }}
          onTouchStart={(e) => {
            e.preventDefault();
          }}
          onClick={(e) => {
            e.preventDefault();
            edit.cancleFunc?.();
            edit.setEditItem("");
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </div>
    </>
  );
}

export default index;
