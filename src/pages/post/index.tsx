import { useEffect, useState } from "react";
import Table from "../../components/Table";
import { Modal } from "../../components/Modal";
import { useTranslation } from "react-i18next";

function index() {
  const [dummyData, setDummyData] = useState([
    {
      category: "궁금해요",
      userName: "변우석",
      email: "eclipse@dev.kr",
      title: "탕탕후루후루",
      content:
        "이빨이 후루루루루루 이빨이 후루루루루루 이빨이 후루루루루루 이빨이 후루루루루루 이빨이 후루루루루루 이빨이 후루루루루루 이빨이 후루루루루루 이빨이 후루루루루루",
      images: [
        "변우석의 1범이미지의 URL",
        "변우석의 2범이미지의 URL",
        "변우석의 3범이미지의 URL",
        "변우석의 4범이미지의 URL",
      ],
      view: 100,
      likes: 44,
      comments: 13,
      report: [1, 2],
      createdAt: "2024-06-17 13:14:22",
    },
    {
      category: "인증해요",
      userName: "김혜원",
      email: "runaway@dev.kr",
      title: "업튀업튀",
      content: "뛰엇",
      images: ["김혜원의 1범이미지의 URL", "김혜원의 2범이미지의 URL"],
      view: 236,

      likes: 66,
      comments: 5,
      report: [3, 4, 5, 6],
      createdAt: "2024-06-17 13:14:22",
    },
  ]);

  const buttons = [
    {
      className: "",
      text: "궁금해요",
      func: () => {
        const copyDummyData = [...dummyData];

        const filterd = copyDummyData.filter(
          (item) => item.category === "궁금해요"
        );
        console.log("?", filterd);
        setDummyData(filterd);
      },
      disabled: false,
    },
  ];
  const addedMap = [
    ["userName", "이름"],

    ["category", "카테고리"],
    ["email", "이메일"],
    ["title", "제목"],
    ["content", "내용"],
    ["images", "이미지"],
    ["view", "조회수"],
    ["likes", "좋아요"],
    ["comments", "댓글"],
    ["report", "신고"],
    ["createdAt", "작성일"],
  ];

  const [modalId, setModalId] = useState("");
  const [reportId, setReportId] = useState("");

  useEffect(() => {
    (document.getElementById(modalId) as HTMLFormElement)?.showModal();
  }, [modalId]);
  useEffect(() => {
    (document.getElementById(reportId) as HTMLFormElement)?.showModal();
  }, [reportId]);
  const { t } = useTranslation();
  return (
    <>
      <Modal
        id={modalId}
        closeFunc={() => {
          setModalId("");
        }}
      >
        <div className="mb-6 text-xl font-bold max-sm:text-base">
          {t("title.imageModal")}
        </div>
        <div>{modalId}</div>
      </Modal>
      <Table
        data={dummyData}
        addedMap={addedMap}
        buttons={buttons}
        checakble={{ active: false, multi: false, setter: () => {} }}
        tdOptions={{
          content: {
            el: (item: string) => {
              return <div className="max-w-xs truncate">{item}</div>;
            },
            func: () => {},
            tooltip: { active: true, text: "" },
          },
          images: {
            el: (item: string[]) => {
              return (
                <div className="">
                  {item.map((url, index) => {
                    return (
                      <span
                        className="cursor-pointer grow-0 shrink-0 hover:text-primary"
                        key={`${url}-${index}`}
                        onClick={() => setModalId(url)}
                      >
                        {`[${index + 1}]`}
                      </span>
                    );
                  })}
                </div>
              );
            },
            func: () => {},
          },
          report: {
            el: (item: number[], index: number) => {
              return (
                <span
                  className="cursor-pointer"
                  onClick={() => setReportId(String(index))}
                >
                  {item.length}
                </span>
              );
            },
            func: () => {},
          },
        }}
      />

      <Modal id={reportId} closeFunc={() => setReportId("")}>
        <div className="mb-6 text-xl font-bold max-sm:text-base">
          {t("title.reportList")}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {dummyData[Number(reportId)].report.map((item) => {
            return (
              <div
                className="border cursor-pointer border-base-300"
                key={`reported-user-id-${item}`}
              >
                <div className="items-center gap-2 p-2 avatar">
                  <div className="w-12 rounded">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                  &lt;- 신고한넘
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
    </>
  );
}

export default index;
