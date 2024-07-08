import _ from "lodash";
import Table from "../../components/Table";
import { useEffect, useRef, useState } from "react";
import EditableCell from "../../components/EditableCell";
import { Modal } from "../../components/Modal";
import Calendar from "../../components/Calendar";
import TimePicker from "../../components/TimePicker";
import { closeModal, openModal } from "../../utils/useModalHandler";
import { useTranslation } from "react-i18next";

function index() {
  const dummyData = [
    {
      userName: "가",
      registerNo: "00001-00001",
      phone: "010-1234-1234",
      createdAt: "2024-06-06 12:46:09",
      school: "안드레이아대학교",
      major: "헬스케어",
      studentId: "24-00001",
      status: "Approved",
      email: "gggg@andreia.kr",
    },
    {
      userName: "나",
      registerNo: "00001-00002",
      phone: "010-2345-5678",
      createdAt: "2024-05-06 12:46:09",
      school: "안드레이아대학교",
      major: "헬스케어",
      studentId: "24-00002",
      status: "Banned",
      email: "gggg@andreia.kr",
    },
    {
      userName: "다",
      registerNo: "00001-00002",
      phone: "010-2345-5678",
      createdAt: "2024-05-06 12:46:09",
      school: "안드레이아대학교",
      major: "헬스케어",
      studentId: "24-00002",
      status: "Banned",
      email: "gggg@andreia.kr",
    },
    {
      userName: "라",
      registerNo: "00001-00002",
      phone: "010-2345-5678",
      createdAt: "2024-05-06 12:46:09",
      school: "안드레이아대학교",
      major: "헬스케어",
      studentId: "24-00002",
      status: "Banned",
      email: "gggg@andreia.kr",
    },
    {
      userName: "마",
      registerNo: "00001-00002",
      phone: "010-2345-5678",
      createdAt: "2024-05-06 12:46:09",
      school: "안드레이아대학교",
      major: "헬스케어",
      email: "gggg@andreia.kr",
      studentId: "24-00002",
      status: "Banned",
    },
    {
      userName: "바",
      registerNo: "00001-00002",
      phone: "010-2345-5678",
      createdAt: "2024-05-06 12:46:09",
      school: "안드레이아대학교",
      major: "헬스케어",
      studentId: "24-00002",
      status: "Banned",
      email: "gggg@andreia.kr",
    },
    {
      userName: "사",
      registerNo: "00001-00002",
      phone: "010-2345-5678",
      createdAt: "2024-05-06 12:46:09",
      school: "안드레이아대학교",
      major: "헬스케어",
      studentId: "24-00002",
      status: "Banned",
      email: "gggg@andreia.kr",
    },
  ];
  const addedMap = [
    ["registerNo", "등록번호"],
    ["userName", "이름"],
    ["phone", "전화번호"],
    ["email", "이메일"],
    ["createdAt", "가입 일시"],
    ["school", "학교"],
    ["major", "학과"],
    ["studentId", "학번"],
    ["status", "회원상태"],
  ];

  const [editItem, setEditItem] = useState("");

  const [push, setPush] = useState({
    type: "Immediately",
    ids: [],
    title: "",
    content: "",
    scheduledTime: "",
  });

  const [dateTime, setDateTime] = useState({
    date: "",
    time: "",
  });

  const [isCheckable, setIsCheckable] = useState(false);
  useEffect(() => {
    const input = document.getElementById(editItem);
    if (input) {
      input.focus();
    }
  }, [editItem]);

  useEffect(() => {
    setPush((prev) => {
      return { ...prev, scheduledTime: `${dateTime.date} ${dateTime.time}` };
    });
  }, [dateTime]);

  const textarea = useRef<HTMLTextAreaElement>(null);
  // const handleResizeHeight = () => {
  //   if (textarea.current) {
  //     textarea.current.style.height = "auto"; // 높이 초기화
  //     textarea.current.style.height = textarea.current.scrollHeight + "px";
  //   }
  // };

  const { t, i18n } = useTranslation();
  useEffect(() => {
    const locales = localStorage.getItem("admin-locales");

    i18n.changeLanguage(locales || "ko");
  }, [localStorage]);

  const buttons = [
    {
      style: "",
      text: "체크모드",
      func: () => {
        setPush((prev) => {
          return { ...prev, ids: [] };
        });
        setIsCheckable((prev) => !prev);
      },
      disabled: false,
    },
    {
      style: "",
      text: "푸쉬발송",
      func: () => {
        openModal("push");
      },
      disabled: push.ids.length === 0,
    },
    {
      style: "",
      text: "또다른버튼",
      func: () => {
        alert("또다른버튼 액션");
      },
      disabled: true,
    },
  ];
  return (
    <>
      <Table
        checakble={{
          active: isCheckable,
          multi: false,
          setter: (item: []) =>
            setPush((prev) => {
              return { ...prev, ids: item };
            }),
        }}
        buttons={buttons}
        data={dummyData}
        addedMap={addedMap}
        tdOptions={
          !isCheckable
            ? {
                phone: {
                  el: (item: string, index: number) => {
                    return (
                      <EditableCell
                        item={item}
                        index={index}
                        edit={{
                          editItem: editItem,
                          setEditItem: setEditItem,
                          confirmFunc: () => {},
                          cancleFunc: () => {},
                        }}
                      />
                    );
                  },
                  func: () => {},
                },
                school: {
                  el: (item: string, index: number) => {
                    return (
                      <EditableCell
                        item={item}
                        index={index}
                        edit={{
                          editItem: editItem,
                          setEditItem: setEditItem,
                          confirmFunc: () => {},
                          cancleFunc: () => {},
                        }}
                      />
                    );
                  },
                  func: () => {},
                },
                major: {
                  el: (item: string, index: number) => {
                    return (
                      <EditableCell
                        item={item}
                        index={index}
                        edit={{
                          editItem: editItem,
                          setEditItem: setEditItem,
                          confirmFunc: () => {},
                          cancleFunc: () => {},
                        }}
                      />
                    );
                  },
                  func: () => {},
                },
                studentId: {
                  el: (item: string, index: number) => {
                    return (
                      <EditableCell
                        item={item}
                        index={index}
                        edit={{
                          editItem: editItem,
                          setEditItem: setEditItem,
                          confirmFunc: () => {},
                          cancleFunc: () => {},
                        }}
                      />
                    );
                  },
                  func: () => {},
                },
                status: {
                  el: (item: string) => {
                    return <span>{item}</span>;
                  },
                  func: () => {},
                },
              }
            : {}
        }
      />
      <Modal
        id="push"
        closeFunc={() => {
          const ids = [...push.ids];
          setPush({
            type: "Immediately",
            ids: ids,
            title: "",
            content: "",
            scheduledTime: "",
          });
        }}
      >
        <div className="mb-6 text-xl font-bold max-sm:text-base">
          {t("title.sendPush")}
        </div>
        {/* <div className="w-full gap-4 card shrink-0"> */}
        <div className="grid grid-cols-2 gap-4">
          {/* <label className="flex items-center gap-2"> */}
          <label className="grid items-center grid-cols-3 col-span-2 gap-2">
            <span className="col-span-1 col-start-1">{t("common.name")}</span>
            <input
              type="text"
              className="col-span-2 grow bg-base-100 input input-bordered input-sm max-sm:input-xs"
              disabled
              value={push.ids.sort()}
            />
          </label>
          {/* <label className="flex items-center gap-2 "> */}
          <label className="grid items-center grid-cols-3 col-span-2 gap-2">
            <span className="col-span-1">{t("common.title")}</span>
            <input
              type="text"
              className="col-span-2 grow bg-base-100 input input-bordered input-sm max-sm:input-xs"
              placeholder="제목"
              value={push.title}
              onChange={(e) => {
                setPush((prev) => {
                  return { ...prev, title: e.target.value };
                });
              }}
            />
          </label>
          <label className="grid items-center grid-cols-3 col-span-2 gap-2">
            <span className="col-span-1">{t("common.desc")}</span>

            <textarea
              ref={textarea}
              className="w-full col-span-2 resize-none min-h-32 textarea textarea-bordered max-sm:textarea-xs"
              placeholder="푸쉬내용"
              value={push.content}
              onChange={(e) => {
                // handleResizeHeight();
                setPush((prev) => {
                  return { ...prev, content: e.target.value };
                });
              }}
              rows={1}
            ></textarea>
          </label>
          <div className="grid col-span-2">
            <label className="cursor-pointer label">
              <span className="label-text max-sm:text-xs">{`${t(
                "common.immediately"
              )} ${t("common.send")}`}</span>
              <input
                type="radio"
                name="radio-10"
                className="radio max-sm:radio-sm checked:bg-primary"
                checked={push.type === "Immediately"}
                onChange={() => {
                  setPush((prev) => {
                    return { ...prev, type: "Immediately" };
                  });
                }}
              />
            </label>
            <label className="cursor-pointer label">
              <span className="label-text max-sm:text-xs">{`${t(
                "common.scheduled"
              )} ${t("common.send")}`}</span>
              <input
                type="radio"
                name="radio-10"
                className="radio max-sm:radio-sm checked:bg-primary"
                checked={push.type !== "Immediately"}
                onChange={() => {
                  setPush((prev) => {
                    return { ...prev, type: "Scheduled" };
                  });
                }}
              />
            </label>
            {push.type !== "Immediately" && (
              <div className="flex items-center w-full gap-2 p-4 mt-4 mb-4 border">
                <Calendar
                  weeksFormat={
                    localStorage.getItem("admin-locales") === "en"
                      ? ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]
                      : ["일", "월", "화", "수", "목", "금", "토"]
                  }
                  select={{
                    selected: { year: 2024, month: 0, date: 0, day: 0 },
                    setter: (date: { [key: string]: number | string }) => {
                      const dateStr = date.dateStr as string;
                      setDateTime((prev) => {
                        return { ...prev, date: dateStr };
                      });
                    },
                  }}
                />
                <TimePicker
                  fixedHeight="h-[120px]"
                  type="full"
                  select={{
                    selected: { ampm: "", hour: "", minute: "" },
                    setter: (time: { [key: string]: string }) => {
                      setDateTime((prev) => {
                        return { ...prev, time: `${time.hour}:${time.minute}` };
                      });
                    },
                  }}
                />
              </div>
            )}
            <div className="flex gap-2 mt-4">
              <label className="flex-auto">
                <button
                  className="btn-block btn btn-sm max-sm:btn-xs btn-primary"
                  onClick={() => {
                    closeModal("push");

                    const ids = [...push.ids];
                    setPush({
                      type: "Immediately",
                      ids: ids,
                      title: "",
                      content: "",
                      scheduledTime: "",
                    });
                  }}
                >
                  {t("common.cancle")}
                </button>
              </label>
              <label className="flex-auto">
                <button
                  className="btn-block btn max-sm:btn-xs btn-sm btn-primary"
                  onClick={() => {}}
                  disabled={
                    push.content.length === 0 ||
                    push.title.length === 0 ||
                    push.ids.length === 0 ||
                    (push.type === "Scheduled" &&
                      push.scheduledTime.length === 0)
                  }
                >
                  {t("common.send")}
                </button>
              </label>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default index;
