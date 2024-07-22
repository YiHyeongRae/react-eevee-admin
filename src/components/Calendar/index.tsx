import _ from "lodash";
import { useRef, useState } from "react";
import { Alert } from "../Alert";
import { CalendarTypes } from "../../data/types/components";

function index({
  weeksFormat = ["일", "월", "화", "수", "목", "금", "토"],
  select = {
    // selected: { year: 2024, month: 0, date: 0, day: 0 },
    selected: {},
    setter: () => {},
  },
  past = "",
  future = "",
}: CalendarTypes) {
  const today = new Date(); // 현재 날짜를 나타내는 Date 객체를 저장한다.
  const currentMonth = today.getMonth();
  const cureentYear = today.getFullYear();

  const [date, setDate] = useState({
    today: today,
    year: cureentYear,
    month: currentMonth,
  });

  const [outPut, setOutput] = useState({
    year: select.selected.year,
    month: select.selected.month,
    date: select.selected.date,
    day: select.selected.day,
    dateStr: "",
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
            year: Number(prev.year) - 1,
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
            year: Number(prev.year) + 1,
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

  const dateRef = useRef<HTMLDivElement | null>(null);

  // console.log(outPut);

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
          past === ""
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
      <div className="relative flex-auto max-w-md p-4">
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
                  {item}
                </p>
              );
            })}
          </div>

          <div
            className="grid items-center grid-cols-7 gap-2 text-center"
            style={{ minHeight: 240 }}
            ref={dateRef}
          >
            {/* prev month date */}
            {_.times(currentMonthFirstWeeksFirstDay, (item) => {
              const prevMonthDaysLength = new Date(
                date.year,
                date.month,
                0
              ).getDate();
              return (
                <p
                  id={`${date.month}-${
                    prevMonthDaysLength -
                    (currentMonthFirstWeeksFirstDay - item - 1)
                  }`}
                  className={`h-full flex items-center justify-center box-border cursor-pointer text-base-300`}
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
              return (
                <p
                  className={`h-full flex items-center justify-center box-border cursor-pointer ${
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
                return (
                  <p
                    className="box-border flex items-center justify-center h-full cursor-pointer text-base-300"
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
          onClick={() => select.setter("")}
        >
          x
        </button>
      </div>
    </>
  );
}

export default index;
