import { useTranslation } from "react-i18next";
import { Modal } from "../../components/Modal";
import { useEffect, useRef, useState } from "react";
import Table from "../../components/Table";
import { Alert } from "../../components/Alert";

function index() {
  const { t } = useTranslation();

  const textarea = useRef<HTMLTextAreaElement>(null);
  const handleResizeHeight = () => {
    if (textarea.current) {
      textarea.current.style.height = "auto"; // 높이 초기화
      textarea.current.style.height = textarea.current.scrollHeight + "px";
    }
  };
  const buttons = [
    {
      className: "",
      text: "등록하기",
      func: () => {
        (document.getElementById("new") as HTMLFormElement).showModal();
      },
      disabled: false,
    },
  ];
  // const dummyData = [
  //   {
  //     userName: "dev@dev.kr",
  //     category: "서비스",
  //     title: "슈퍼관리자입니다",
  //     createdAt: "2024-06-14",
  //     content:
  //       "공지가어쩌구저쩌구공지가어쩌구저쩌구공지가어쩌구저쩌구공지가어쩌구저쩌구공지가어쩌구저쩌구공지가어쩌구저쩌구공지가어쩌구저쩌구공지가어쩌구저쩌구공지가어쩌구저쩌구공지가어쩌구저쩌구공지가어쩌구저쩌구공지가어쩌구저쩌구공지가어쩌구저쩌구공지가어쩌구저쩌구공지가어쩌구저쩌구공지가어쩌구저쩌구",
  //     status: false,
  //   },
  //   {
  //     userName: "dev@dev.kr",
  //     category: "이벤트",
  //     title: "비공개공지글",
  //     createdAt: "2024-06-14",
  //     content: "ㅋㅋㅋㅋㅋㅋㅋ",
  //     status: false,
  //   },
  //   {
  //     userName: "dev@dev.kr",
  //     category: "서비스",
  //     title: "공개 고잊글",
  //     createdAt: "2024-06-14",
  //     content: "이건 공개되는",
  //     status: true,
  //   },
  // ];

  const [dummyData] = useState([
    {
      userName: "dev@dev.kr",
      category: "서비스",
      title: "슈퍼관리자입니다",
      createdAt: "2024-06-14",
      content:
        "공지가어쩌구저쩌구공지가어쩌구저쩌구공지가어쩌구저쩌구공지가어쩌구저쩌구공지가어쩌구저쩌구공지가어쩌구저쩌구공지가어쩌구저쩌구공지가어쩌구저쩌구공지가어쩌구저쩌구공지가어쩌구저쩌구공지가어쩌구저쩌구공지가어쩌구저쩌구공지가어쩌구저쩌구공지가어쩌구저쩌구공지가어쩌구저쩌구공지가어쩌구저쩌구",
      status: false,
    },
    {
      userName: "dev@dev.kr",
      category: "이벤트",
      title: "비공개공지글",
      createdAt: "2024-06-14",
      content: "ㅋㅋㅋㅋㅋㅋㅋ",
      status: false,
    },
    {
      userName: "dev@dev.kr",
      category: "서비스",
      title: "공개 고잊글",
      createdAt: "2024-06-14",
      content: "이건 공개되는",
      status: true,
    },
  ]);
  const addedMap = [
    ["userName", "이름"],

    ["title", "제목"],
    ["category", "카테고리"],
    ["createdAt", "작성일"],
    ["content", "내용"],
    ["status", "상태"],
  ];

  const [modalId, setModalId] = useState("");

  useEffect(() => {
    (document.getElementById(modalId) as HTMLFormElement)?.showModal();
  }, [modalId]);
  return (
    <>
      <div>
        <Alert
          id="delete"
          title="공지 삭제"
          text="삭제하시겠습니까?"
          buttons={[
            {
              style: "",
              text: "취소",
              func: () => {
                setModalId("");
                const closeButton = (
                  document.getElementById(modalId) as HTMLFormElement
                ).children[0].children[2].children[0] as HTMLButtonElement;

                closeButton.click();
              },
              disabled: false,
            },
            {
              style: "",
              text: "삭제",
              func: () => {
                setModalId("");

                const closeButton = (
                  document.getElementById(modalId) as HTMLFormElement
                ).children[0].children[2].children[0] as HTMLButtonElement;

                closeButton.click();
              },
              disabled: false,
            },
          ]}
        />
        {/* modal */}

        <Modal id="new">
          <div className="mb-6 text-xl font-bold max-sm:text-base">
            {t("title.registNotice")}
          </div>
          <div
            className="flex"
            style={{
              transition: "margin .1s linear",
            }}
          >
            <div className="flex w-full">
              <div className="w-full mt-4 bg-base-100">
                <div className="flex-col lg:flex-row-revers">
                  <div className="grid grid-cols-2 gap-4">
                    <label className="grid items-center grid-cols-3 col-span-2 gap-2">
                      <span className="col-span-1">{t("common.title")}</span>
                      <input
                        type="text"
                        className="col-span-2 bg-base-100 input input-bordered input-sm max-sm:input-xs"
                        placeholder="dev"
                        onChange={() => {}}
                      />
                    </label>
                    <label className="grid items-center grid-cols-3 col-span-2 gap-2">
                      <span className="col-span-1">{t("common.category")}</span>
                      <select className="w-full select select-sm max-sm:select-xs  select-bordered focus:!outline-none !outline-0 !outline-none col-span-2">
                        <option>{t("common.service")}</option>
                        <option>{t("common.event")}</option>
                      </select>
                    </label>
                    <label className="grid items-center grid-cols-3 col-span-2 gap-2">
                      <span className="col-span-1"> {t("common.writer")}</span>
                      <input
                        type="text"
                        className="col-span-2 input input-bordered input-sm max-sm:input-xs"
                        placeholder="김쏙닥"
                        disabled
                        onChange={() => {}}
                      />
                    </label>
                    <label className="grid items-center grid-cols-3 col-span-2 gap-2">
                      <span className="col-span-1">
                        {t("placeholder.isOpen")}
                      </span>

                      <select
                        className="col-span-2 w-full select select-sm max-sm:select-xs  select-bordered focus:!outline-none !outline-0 !outline-none"
                        onChange={() => {}}
                      >
                        <option value="open">{t("common.open")}</option>
                        <option value="close">{t("common.close")}</option>
                      </select>
                    </label>
                    <label className="grid items-center grid-cols-3 col-span-2 gap-2">
                      <span className="col-span-1">{t("common.desc")}</span>

                      <textarea
                        ref={textarea}
                        className="w-full col-span-2 resize-none min-h-32 textarea textarea-bordered max-sm:textarea-xs"
                        placeholder="notice content"
                        onChange={handleResizeHeight}
                        rows={1}
                      ></textarea>
                    </label>
                    <div className="col-span-2 mt-6 form-control">
                      <button
                        disabled
                        className="btn btn-sm max-sm:btn-xs btn-primary"
                      >
                        {t("common.regist")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>

        <Modal id={modalId} closeFunc={() => setModalId("")}>
          <div className="mb-6 text-xl font-bold max-sm:text-base">
            {t("title.editNotice")}
          </div>
          <div className="flex">
            <div className="flex w-full">
              <div className="w-full mt-4 bg-base-100">
                <div className="flex-col lg:flex-row-revers">
                  <div className="grid grid-cols-2 gap-4">
                    <label className="grid items-center grid-cols-3 col-span-2 gap-2">
                      <span className="col-span-1">{t("common.title")}</span>
                      <input
                        type="text"
                        className="col-span-2 bg-base-100 input input-bordered input-sm max-sm:input-xs"
                        placeholder="dev"
                        value={dummyData[Number(modalId)].title}
                        onChange={() => {}}
                      />
                    </label>
                    <label className="grid items-center grid-cols-3 col-span-2 gap-2">
                      <span className="col-span-1">{t("common.category")}</span>
                      <select
                        className="col-span-2 w-full select select-sm max-sm:select-xs  select-bordered focus:!outline-none !outline-0 !outline-none"
                        value={dummyData[Number(modalId)].category}
                        onChange={() => {}}
                      >
                        <option>{t("common.service")}</option>
                        <option>{t("common.event")}</option>
                      </select>
                    </label>
                    <label className="grid items-center grid-cols-3 col-span-2 gap-2">
                      <span className="col-span-1"> {t("common.writer")}</span>
                      <input
                        type="text"
                        className="col-span-2 input input-bordered input-sm max-sm:input-xs"
                        placeholder={dummyData[Number(modalId)].userName}
                        disabled
                        onChange={() => {}}
                      />
                    </label>

                    <label className="grid items-center grid-cols-3 col-span-2 gap-2">
                      <span className="col-span-1">
                        {t("placeholder.isOpen")}
                      </span>
                      <select
                        className="col-span-2 w-full select select-sm max-sm:select-xs  select-bordered focus:!outline-none !outline-0 !outline-none"
                        value={
                          dummyData[Number(modalId)].status
                            ? t("common.open")
                            : t("common.close")
                        }
                        onChange={() => {}}
                      >
                        <option>{t("common.open")}</option>
                        <option>{t("common.close")}</option>
                      </select>
                    </label>
                    <label className="grid items-center grid-cols-3 col-span-2 gap-2">
                      <span className="col-span-1">{t("common.desc")}</span>

                      <textarea
                        ref={textarea}
                        className="w-full col-span-2 resize-none min-h-32 textarea textarea-bordered max-sm:textarea-xs"
                        onChange={handleResizeHeight}
                        rows={1}
                        value={dummyData[Number(modalId)].content}
                      ></textarea>
                    </label>
                    <div className="grid grid-cols-2 col-span-2 gap-4 mt-6">
                      <div className="col-span-1">
                        <button
                          disabled
                          className="w-full btn btn-sm max-sm:btn-xs btn-primary"
                        >
                          {t("common.edit")}
                        </button>
                      </div>
                      <div className="col-span-1">
                        <button
                          className="w-full btn btn-sm max-sm:btn-xs btn-error"
                          onClick={() =>
                            (
                              document.getElementById(
                                "delete"
                              ) as HTMLFormElement
                            ).showModal()
                          }
                        >
                          {t("common.delete")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>

      <Table
        data={dummyData}
        addedMap={addedMap}
        checakble={{ active: false, multi: false, setter: () => {} }}
        buttons={buttons}
        trOptions={{
          thead: { className: "", func: () => {} },
          tbody: {
            className: "cursor-pointer",
            func: (item: {}, index: string) => {
              console.log(item);
              setModalId(index);
              (document.getElementById(index) as HTMLFormElement)?.showModal();
            },
          },
        }}
        tdOptions={{
          status: {
            el: (item: boolean) => {
              return (
                <span className="w-full max-w-xs">
                  {item ? "공개" : "비공개"}
                </span>
              );
            },
            func: () => {},
          },
          content: {
            className: "max-w-xs",
            func: () => {},
            el: (item: string) => {
              return <span className="block max-w-xs truncate">{item}</span>;
            },
          },
        }}
      />
    </>
  );
}

export default index;
