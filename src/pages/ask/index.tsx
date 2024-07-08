import { useTranslation } from "react-i18next";
import { Modal } from "../../components/Modal";
import { useEffect, useRef, useState } from "react";
import Table from "../../components/Table";

function index() {
  const { t } = useTranslation();

  const textarea = useRef<HTMLTextAreaElement>(null);
  const handleResizeHeight = () => {
    if (textarea.current) {
      textarea.current.style.height = "auto"; // 높이 초기화
      textarea.current.style.height = textarea.current.scrollHeight + "px";
    }
  };

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

  const [dummyData, setDummyData] = useState([
    {
      userName: "문의하는사람",
      category: "서비스",
      title: "이게 맞나요?",
      createdAt: "2024-06-14",
      content: "문의좀 해보려는데 이게 맞나 싶어서요",
      status: false,
    },
    {
      userName: "답변받은사람",
      category: "서비스",
      title: "참참참",
      createdAt: "2024-06-22",
      content: "촘촘촘",
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
        <Modal id={modalId} closeFunc={() => setModalId("")}>
          <div className="mb-6 text-xl font-bold max-sm:text-base">
            {t("title.askAnswer")}
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
                        className="col-span-2 input input-bordered input-sm max-sm:input-xs inherit"
                        value={dummyData[Number(modalId)].title}
                        disabled
                        onChange={() => {}}
                      />
                    </label>
                    <label className="grid items-center grid-cols-3 col-span-2 gap-2 focus:!outline-none !outline-0 overflow-hidden">
                      <span className="col-span-1">{t("common.category")}</span>

                      <input
                        type="text"
                        className="col-span-2 input input-bordered input-sm max-sm:input-xs inherit"
                        value={dummyData[Number(modalId)].category}
                        disabled
                        onChange={() => {}}
                      />
                    </label>
                    <label className="grid items-center grid-cols-3 col-span-2 gap-2">
                      <span className="col-span-1"> {t("common.writer")}</span>
                      <input
                        type="text"
                        className="col-span-2 input input-bordered input-sm max-sm:input-xs inherit"
                        value={dummyData[Number(modalId)].userName}
                        disabled
                        onChange={() => {}}
                      />
                    </label>

                    <label className="grid items-center grid-cols-3 col-span-2 gap-2">
                      <span className="col-span-1">{t("common.desc")}</span>

                      <textarea
                        ref={textarea}
                        className="w-full col-span-2 resize-none min-h-32 textarea textarea-bordered max-sm:textarea-xs inherit"
                        onChange={handleResizeHeight}
                        rows={1}
                        disabled
                        value={dummyData[Number(modalId)].content}
                      ></textarea>
                    </label>
                    <div className="col-span-2 divider divider-primary"></div>
                    <label className="grid items-center grid-cols-3 col-span-2 gap-2">
                      <span className="col-span-1">
                        {`${t("common.admin")} ${t("common.writer")}`}
                      </span>
                      <input
                        type="text"
                        className="col-span-2 input input-bordered input-sm max-sm:input-xs inherit"
                        value={"dev@dev.kr"}
                        disabled
                        onChange={() => {}}
                      />
                    </label>

                    <label className="grid items-center grid-cols-3 col-span-2 gap-2">
                      <span className="col-span-1">{t("common.answer")}</span>

                      <textarea
                        ref={textarea}
                        className="w-full col-span-2 resize-none min-h-32 textarea textarea-bordered max-sm:textarea-xs inherit"
                        // onChange={}
                        rows={1}
                        placeholder="답변작성"
                        // disabled
                        // value={dummyData[Number(modalId)].content}
                      ></textarea>
                    </label>
                    <div className="col-span-2 mt-6 form-control">
                      <button
                        disabled
                        className="btn btn-sm max-sm:btn-xs btn-primary"
                      >
                        {t("common.answer")}
                      </button>
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
        trOptions={{
          thead: { className: "", func: () => {} },
          tbody: {
            className: "cursor-pointer",
            func: (item: {}, index: string) => {
              console.log("ask items", item);
              if (!dummyData[Number(index)].status) {
                setModalId(index);
                (
                  document.getElementById(index) as HTMLFormElement
                )?.showModal();
              }
            },
          },
        }}
        tdOptions={{
          status: {
            el: (item: boolean) => {
              return (
                <span className="w-full max-w-xs">
                  {item ? "답변 완료" : "답변 미완료"}
                </span>
              );
            },
            func: () => {},
          },
          content: {
            style: "max-w-xs",
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
