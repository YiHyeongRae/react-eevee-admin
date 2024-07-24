import _ from "lodash";
import { useState } from "react";
import { Alert } from "#/components/Alert";
import { CalendarTypes } from "#/data/types/components";
import { useTranslation } from "react-i18next";

function index({ select, past = "", future = "", closeFunc }: CalendarTypes) {
  const weeksFormat = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const today = new Date(); // 현재 날짜를 나타내는 Date 객체를 저장한다.
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const { t } = useTranslation();

  const [date, setDate] = useState({
    today: today,
    year: currentYear,
    month: currentMonth,
  });

  const [outPut, setOutput] = useState({
    year: select?.selected?.year,
    month: select?.selected?.month,
    date: select?.selected?.date,
    day: select?.selected?.day,
    dateStr: select?.selected?.dateStr,
  });
  const currentMonthFirstDay = new Date(date.year, date.month, 1);
  const nextMonthFirstDay = new Date(date.year, date.month + 1, 1);

  const currentMonthLength = new Date(date.year, date.month + 1, 0).getDate();

  const currentMonthFirstWeeksFirstDay = currentMonthFirstDay.getDay();
  const nextMonthFirstWeeksFirstDay = nextMonthFirstDay.getDay();

  const monthHandler = (type: "prev" | "next") => {
    if (type === "prev") {
      if (date.month - 1 < 0) {
        setDate((prev) => {
          return { ...prev, year: prev.year - 1, month: 11 };
        });

        setOutput((prev) => {
          return {
            ...prev,
            year: prev.year && prev.year - 1,
          };
        });
      } else {
        setDate((prev) => {
          return { ...prev, month: prev.month - 1 };
        });
      }
    } else {
      if (date.month + 1 > 11) {
        setDate((prev) => {
          return { ...prev, year: prev.year + 1, month: 0 };
        });

        setOutput((prev) => {
          return {
            ...prev,
            year: prev.year && prev.year + 1,
          };
        });
      } else {
        setDate((prev) => {
          return { ...prev, month: prev.month + 1 };
        });
      }
    }
  };

  const [weeks] = useState(weeksFormat);

  const getDayOfSelected = (year: number, month: number, date: number) => {
    const monthStr = month + 1 < 10 ? `0${month}` : month;
    const dateStr = date < 10 ? `0${date}` : date;
    const fullDateStr = `${year}-${monthStr}-${dateStr}`;

    const day = new Date(fullDateStr).getDay();

    return { day, fullDateStr };
  };

  const [alert, setAlert] = useState(false);
  return (
    <>
      <Alert
        open={alert}
        id="disable"
        text={
          past !== "" && future !== ""
            ? "선택 불가한 날짜 입니다."
            : past === ""
            ? `시작날짜는 종료날짜보다 이전이여야 합니다.`
            : `종료날짜는 시작날짜보다 이후여야 합니다.`
        }
        title="선택불가"
        buttons={[
          {
            style: "",
            text: "확인",
            func: () => {
              setAlert(false);
            },
            disabled: false,
          },
        ]}
      />
      <div className="relative flex-auto max-w-md p-4 border min-w-64">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div>{date.year}</div>
          <>/</>
          <div>{date.month + 1}</div>
        </div>

        <div className="calendar">
          {/* days header */}
          <div className="flex items-center justify-between pb-1 border-b-2">
            {_.map(weeks, (item, index) => {
              return (
                <p className="flex-auto text-center" key={`${item}-${index}`}>
                  {t(`common.${item}`)}
                </p>
              );
            })}
          </div>

          <div
            className="grid items-center grid-cols-7 gap-2 text-center"
            style={{ minHeight: 240 }}
          >
            {/* prev month date */}
            {_.times(currentMonthFirstWeeksFirstDay, (item) => {
              const prevMonthDaysLength = new Date(
                date.year,
                date.month,
                0
              ).getDate();

              const prevDisableCheck = `${
                date.month === 0 ? date.year - 1 : date.year
              }-${date.month < 10 ? "0" : ""}${
                date.month === 0 ? 12 : date.month
              }-${
                prevMonthDaysLength -
                  (currentMonthFirstWeeksFirstDay - item - 1) <
                10
                  ? "0"
                  : ""
              }${
                prevMonthDaysLength -
                (currentMonthFirstWeeksFirstDay - item - 1)
              }`;

              const pastCheckInPrev =
                new Date(past).getTime() > new Date(prevDisableCheck).getTime();
              const futureCheckInPrev =
                new Date(future).getTime() <
                new Date(prevDisableCheck).getTime();
              return (
                <p
                  id={`${date.month}-${
                    prevMonthDaysLength -
                    (currentMonthFirstWeeksFirstDay - item - 1)
                  }`}
                  className={`h-full flex items-center justify-center box-border cursor-pointer text-base-300 ${
                    pastCheckInPrev || futureCheckInPrev
                      ? "line-through italic decoration-4"
                      : ""
                  }`}
                  key={`prev-${item}`}
                  onTouchStart={(e) => e.preventDefault()}
                  onMouseDown={(e) => {
                    e.preventDefault();
                  }}
                  onClick={() => {
                    const { day, fullDateStr } = getDayOfSelected(
                      date.year,
                      date.month,
                      prevMonthDaysLength -
                        (currentMonthFirstWeeksFirstDay - item - 1)
                    );

                    if (
                      (past !== "" &&
                        new Date(fullDateStr).getTime() <
                          new Date(past).getTime()) ||
                      (future !== "" &&
                        new Date(fullDateStr).getTime() >
                          new Date(future).getTime())
                    ) {
                      setAlert(true);
                    } else {
                      monthHandler("prev");

                      setOutput((prev) => {
                        return {
                          ...prev,
                          month: date.month - 1,
                          date:
                            prevMonthDaysLength -
                            (currentMonthFirstWeeksFirstDay - item - 1),
                          day: day,
                          dateStr: fullDateStr,
                        };
                      });
                      select.setter(fullDateStr);
                    }
                  }}
                >
                  {prevMonthDaysLength -
                    (currentMonthFirstWeeksFirstDay - item - 1)}
                </p>
              );
            })}
            {/* current month date */}
            {_.times(currentMonthLength, (item) => {
              const currentDisableCheck = `${
                date.month + 1 === 0 ? date.year - 1 : date.year
              }-${date.month + 1 < 10 ? "0" : ""}${
                date.month + 1 === 0 ? 12 : date.month + 1
              }-${item + 1 < 10 ? "0" : ""}${item + 1}`;

              const pastCheckInCurrent =
                new Date(past).getTime() >
                new Date(currentDisableCheck).getTime();

              const futureCheckInCurrent =
                new Date(future).getTime() <
                new Date(currentDisableCheck).getTime();
              return (
                <p
                  className={`h-full flex items-center justify-center box-border cursor-pointer ${
                    pastCheckInCurrent || futureCheckInCurrent
                      ? "line-through italic decoration-4"
                      : ""
                  }
                  ${
                    today.getMonth() === date.month &&
                    date.today.getDate() === item + 1 &&
                    "text-primary font-bold"
                  } ${
                    outPut.month === date.month &&
                    outPut.date === item + 1 &&
                    "bg-primary text-white"
                  }
                  `}
                  key={`current-${item}`}
                  id={`${date.month + 1}-${item + 1}`}
                  onTouchStart={(e) => e.preventDefault()}
                  onMouseDown={(e) => {
                    e.preventDefault();
                  }}
                  onClick={() => {
                    const { day, fullDateStr } = getDayOfSelected(
                      date.year,
                      date.month + 1,
                      item + 1
                    );
                    if (
                      (past !== "" &&
                        new Date(fullDateStr).getTime() <
                          new Date(past).getTime()) ||
                      (future !== "" &&
                        new Date(fullDateStr).getTime() >
                          new Date(future).getTime())
                    ) {
                      setAlert(true);
                    } else {
                      setOutput((prev) => {
                        return {
                          ...prev,
                          month: date.month,
                          date: item + 1,
                          day: day,
                          dateStr: fullDateStr,
                        };
                      });
                      select.setter(fullDateStr);
                    }
                  }}
                >
                  {item + 1}
                </p>
              );
            })}

            {/* next month date */}
            {7 - nextMonthFirstWeeksFirstDay !== 7 &&
              _.times(7 - nextMonthFirstWeeksFirstDay, (item) => {
                const nextDisableCheck = `${
                  date.month + 2 > 12 ? date.year + 1 : date.year
                }-${date.month + 2 < 10 ? "0" : ""}${
                  date.month + 2 > 12 ? 1 : date.month + 2
                }-${item + 1 < 10 ? "0" : ""}${item + 1}`;

                const pastCheckInNext =
                  new Date(past).getTime() >=
                  new Date(nextDisableCheck).getTime();
                const futureCheckInNext =
                  new Date(future).getTime() <=
                  new Date(nextDisableCheck).getTime();
                return (
                  <p
                    className={`box-border flex items-center justify-center h-full cursor-pointer text-base-300 ${
                      pastCheckInNext || futureCheckInNext
                        ? "line-through italic decoration-4"
                        : ""
                    }`}
                    key={`next-${item}`}
                    onTouchStart={(e) => e.preventDefault()}
                    onMouseDown={(e) => {
                      e.preventDefault();
                    }}
                    onClick={() => {
                      const { day, fullDateStr } = getDayOfSelected(
                        date.year,
                        date.month + 2,
                        item + 1
                      );
                      if (
                        (past !== "" &&
                          new Date(fullDateStr).getTime() <
                            new Date(past).getTime()) ||
                        (future !== "" &&
                          new Date(fullDateStr).getTime() >
                            new Date(future).getTime())
                      ) {
                        setAlert(true);
                      } else {
                        monthHandler("next");

                        setOutput((prev) => {
                          return {
                            ...prev,
                            month: date.month + 1,
                            date: item + 1,
                            day: day,
                            dateStr: fullDateStr,
                          };
                        });
                        select.setter(fullDateStr);
                      }
                    }}
                  >
                    {item + 1}
                  </p>
                );
              })}
          </div>
        </div>

        <div className="absolute top-[1rem] left-0 flex justify-center w-full gap-32">
          <button
            className="btn btn-xs btn-ghost btn-primary"
            onClick={() => monthHandler("prev")}
          >
            &lt;
          </button>

          <button
            className="btn btn-xs btn-ghost btn-primary"
            onClick={() => monthHandler("next")}
          >
            &gt;
          </button>
        </div>
        <button
          className="absolute top-[1rem] right-[1rem] btn btn-xs btn-ghost"
          onClick={() => {
            select.setter("");
            closeFunc?.();
          }}
        >
          x
        </button>
      </div>
    </>
  );
}

export default index;
