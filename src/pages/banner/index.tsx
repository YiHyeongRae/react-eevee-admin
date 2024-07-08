import _ from "lodash";
import Carousel from "../../components/Carousel";
import Table from "../../components/Table";
import { useState } from "react";
import { Modal } from "../../components/Modal";
import { useTranslation } from "react-i18next";
import { openModal } from "../../utils/useModalHandler";
import TimePicker from "../../components/TimePicker";
import Calendar from "../../components/Calendar";

function index() {
  const [checakble, setCheckable] = useState(false);

  const [calenderState, setCalendarState] = useState<"start" | "end" | "">("");

  const [banner, setBanner] = useState({
    title: "",
    link: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
  });
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  const [deleteIds, setDeleteIds] = useState<number[]>([]);

  const dummyData = [
    {
      title: "1월 이벤트 배너",
      startDate: "2024-06-25",
      endDate: "2024-07-25",
      status: true,
      register: "dev@dev.kr",
      image: "1월 이벤트 배너 이미지 URL",
      link: "https://www.naver.com",
    },
    {
      title: "카카오톡 친구추가 이벤트 베너",
      startDate: "2024-06-25",
      endDate: "2024-07-27",
      status: true,
      register: "dev@dev.kr",
      image: "카카오톡 친구추가",
      link: "https://www.google.com",
    },
  ];

  const addedMap = [
    ["register", "등록자"],
    ["title", "제목"],
    ["startDate", "시작 날짜"],
    ["endDate", "종료 날짜"],
    ["status", "게시 여부"],
    ["image", "이미지 url"],
    ["link", "외부 url"],
  ];

  const buttons = [
    {
      style: "",
      text: "체크모드",
      func: () => {
        setCheckable((prev) => !prev);
        setDeleteIds([]);
      },
      disabled: false,
    },
    {
      style: "",
      text: "등록하기",
      func: () => {
        openModal("new-banner");
        setCheckable(false);
        setDeleteIds([]);
      },
      disabled: false,
    },
    {
      style: "",
      text: "삭제하기",
      func: () => {
        alert(`삭제 예정 배너 아이디\n${deleteIds.toString()}`);
        setCheckable(false);
        setDeleteIds([]);
      },
      disabled: deleteIds.length === 0,
    },
  ];

  const { t } = useTranslation();
  console.log(bannerFile);
  return (
    <>
      <div className="grid items-center h-full grid-cols-3 gap-60 max-lg:grid-cols-1">
        <div className="m-0 col-span-1 mockup-phone min-w-fit max-w-fit h-fit max-lg:hidden z-[3]">
          <div className="camera"></div>
          <div className="display">
            <div className="bg-[#efefef] artboard artboard-demo phone-1">
              <Carousel initialIndexValue={0}>
                {_.map(dummyData, (item, index) => {
                  return (
                    <div
                      key={`${item} + ${index}`}
                      className="block w-full text-center"
                    >
                      <img
                        src="./abcdef.png"
                        className="w-full pointer-events-none select-none"
                      />
                    </div>
                  );
                })}
              </Carousel>
            </div>
          </div>
        </div>

        <Table
          checakble={{ active: checakble, multi: false, setter: setDeleteIds }}
          data={dummyData}
          addedMap={addedMap}
          tdOptions={{
            status: {
              el: (item: string) => {
                return (
                  <select
                    className={`select select-ghost select-sm ${
                      checakble ? "pointer-events-none" : ""
                    }`}
                  >
                    {item ? "게시" : "게시 안함"}

                    <option>게시</option>
                    <option>게시 안함</option>
                  </select>
                );
              },
              func: () => {},
            },
            link: {
              el: (item: string) => {
                return (
                  <a
                    className={`block link ${
                      checakble ? "cursor-text" : "cursor-pointer"
                    }`}
                    onClick={() => {
                      if (!checakble) {
                        (window.open("about:blank") as Window).location.href =
                          item;
                      }
                    }}
                  >
                    {item}
                  </a>
                );
              },
              func: () => {},
            },
          }}
          buttons={buttons}
        />
      </div>

      <Modal id="new-banner">
        <div className="mb-6 text-xl font-bold max-sm:text-base">
          {t("title.newBanner")}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {/* <label className="flex items-center gap-2"> */}

          {/* <label className="flex items-center gap-2 "> */}
          <label className="grid items-center grid-cols-3 col-span-2 gap-2">
            <span className="col-span-1">{t("common.title")}</span>
            <input
              type="text"
              className="col-span-2 grow bg-base-100 input input-bordered input-sm max-sm:input-xs"
              placeholder="제목"
              value={banner.title}
              onFocus={() => setCalendarState("")}
              onChange={(e) => {
                setBanner((prev) => {
                  return { ...prev, title: e.target.value };
                });
              }}
              autoFocus={false}
            />
          </label>
          <label className="grid items-center grid-cols-3 col-span-2 gap-2">
            <span className="col-span-1">{`${t("common.external")} ${t(
              "common.url"
            )}`}</span>
            <input
              type="text"
              className="col-span-2 grow bg-base-100 input input-bordered input-sm max-sm:input-xs"
              placeholder="링크"
              value={banner.link}
              onFocus={() => setCalendarState("")}
              onChange={(e) => {
                setBanner((prev) => {
                  return { ...prev, link: e.target.value };
                });
              }}
            />
          </label>
          <label className="grid items-center grid-cols-3 col-span-2 gap-2">
            <span className="col-span-1">{`${t("common.image")} ${t(
              "common.file"
            )}`}</span>
            <input
              type="file"
              className="col-span-2 file-input-ghost bg-base-100 file-input input-bordered file-input-sm max-sm:input-xs"
              placeholder="파일"
              onFocus={() => setCalendarState("")}
              onChange={(e) => {
                if (e.currentTarget.files) {
                  setBannerFile(e.currentTarget.files[0]);
                }
              }}
            />
          </label>
          <label className="grid items-center grid-cols-3 col-span-2 gap-2">
            <span className="col-span-1">
              {`${t("common.start")} ${t("common.date")}`}
            </span>
            <input
              type="text"
              className="col-span-2 grow bg-base-100 input input-bordered input-sm max-sm:input-xs"
              placeholder="시작날짜"
              onFocus={() => setCalendarState("start")}
              value={`${banner.startDate} ${banner.startTime}`}
              onChange={() => {
                // setPush((prev) => {
                //   return { ...prev, title: e.target.value };
                // });
              }}
            />
          </label>

          <label className="grid items-center grid-cols-3 col-span-2 gap-2">
            <span className="col-span-1">
              {`${t("common.end")} ${t("common.date")}`}
            </span>
            <input
              type="text"
              className="col-span-2 grow bg-base-100 input input-bordered input-sm max-sm:input-xs"
              placeholder="종료날짜"
              onFocus={() => setCalendarState("end")}
              value={`${banner.endDate} ${banner.endTime}`}
              onChange={() => {
                // setPush((prev) => {
                //   return { ...prev, title: e.target.value };
                // });
              }}
            />
          </label>

          <div
            className={`items-center grid-cols-3 col-span-2 gap-6 ${
              calenderState !== "" && calenderState === "start"
                ? "grid"
                : "hidden"
            }`}
          >
            <div className="col-span-2">
              <Calendar
                weeksFormat={
                  localStorage.getItem("admin-locales") === "en"
                    ? ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]
                    : ["일", "월", "화", "수", "목", "금", "토"]
                }
                future={banner.endDate}
                select={{
                  selected: {
                    // year: new Date(banner.startDate).getFullYear(),
                    // month: new Date(banner.startDate).getMonth() + 1,
                    // date: new Date(banner.startDate).getDate(),
                    // day: new Date(banner.startDate).getDay(),
                  },
                  setter: (date: { [key: string]: number | string }) => {
                    const dateStr = date.dateStr as string;

                    setBanner((prev) => {
                      return { ...prev, startDate: dateStr };
                    });
                  },
                }}
              />
            </div>
            <TimePicker
              fixedHeight="h-[120px]"
              type="full"
              select={{
                selected: { ampm: "", hour: "", minute: "" },
                setter: (time: { [key: string]: string }) => {
                  setBanner((prev) => {
                    return {
                      ...prev,
                      startTime: `${time.hour}:${time.minute}`,
                    };
                  });
                },
              }}
            />
          </div>
          <div
            className={`items-center grid-cols-3 col-span-2 gap-6 ${
              calenderState !== "" && calenderState === "end"
                ? "grid"
                : "hidden"
            }`}
          >
            <div className="col-span-2">
              <Calendar
                weeksFormat={
                  localStorage.getItem("admin-locales") === "en"
                    ? ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]
                    : ["일", "월", "화", "수", "목", "금", "토"]
                }
                past={banner.startDate}
                select={{
                  selected: {
                    // year: new Date(banner.endDate).getFullYear(),
                    // month: new Date(banner.endDate).getMonth() + 1,
                    // date: new Date(banner.endDate).getDate(),
                    // day: new Date(banner.endDate).getDay(),
                  },
                  setter: (date: { [key: string]: number | string }) => {
                    const dateStr = date.dateStr as string;

                    setBanner((prev) => {
                      return { ...prev, endDate: dateStr };
                    });
                  },
                }}
              />
            </div>
            <TimePicker
              fixedHeight="h-[120px]"
              type="full"
              select={{
                selected: { ampm: "", hour: "", minute: "" },
                setter: (time: { [key: string]: string }) => {
                  setBanner((prev) => {
                    return {
                      ...prev,
                      endTime: `${time.hour}:${time.minute}`,
                    };
                  });
                },
              }}
            />
          </div>
          <div className="grid col-span-2">
            <div className="flex gap-2 mt-4">
              <label className="flex-auto">
                <button
                  className="btn-block btn btn-sm max-sm:btn-xs btn-primary"
                  onClick={() => {}}
                >
                  {t("common.cancle")}
                </button>
              </label>
              <label className="flex-auto">
                <button
                  className="btn-block btn btn-sm max-sm:btn-xs btn-primary"
                  onClick={() => {}}
                  disabled
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
