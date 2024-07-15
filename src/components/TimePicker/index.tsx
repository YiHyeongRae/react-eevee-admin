import _ from "lodash";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TimePickerTypes } from "../../data/types/components";

function index({
  fixedHeight,
  type = "full",
  select = {
    // selected: { ampm: "", hour: "", minute: "", second: "" },
    selected: { ampm: "", hour: "", minute: "" },
    setter: () => {},
  },
}: TimePickerTypes) {
  const [times, setTimes] = useState({
    ampm: "",
    hour: "",
    minute: "",
  });

  useEffect(() => {
    select.setter(times);
  }, [times]);

  const { t } = useTranslation();

  const heightRegex = /\[([^\]]+)\]/g;
  const regexResult = heightRegex.exec(fixedHeight);
  const pickerHeight = regexResult !== null && regexResult[1].replace("px", "");
  return (
    <div className={`flex flex-col ${fixedHeight}`}>
      <div className="flex-none mb-2 text-center">
        {`${t("common.hour")} : ${t("common.minute")}`}
      </div>

      <div className={`flex gap-2 ${fixedHeight}`}>
        <div
          className="flex flex-col max-w-xs overflow-auto time-picker"
          style={{ scrollSnapType: "y mandatory" }}
        >
          {_.times(type === "half" ? 14 : 26, (item) => {
            return (
              <span
                className={`p-2 text-center cursor-pointer ${
                  Number(item) === (times.hour !== "" && Number(times.hour)) &&
                  "bg-primary text-white"
                }`}
                key={`hour-${item + 1}`}
                style={{
                  visibility:
                    item > (type === "half" ? 11 : 23) ? "hidden" : "visible",
                }}
                onClick={(e) => {
                  const parentEl = e.currentTarget.parentElement;

                  if (
                    parentEl &&
                    parentEl?.scrollTop !== item * (Number(pickerHeight) / 3)
                  ) {
                    parentEl.scrollTo({
                      top: item * (Number(pickerHeight) / 3),
                      behavior: "smooth",
                    });
                  }

                  const hourItem = String(item < 10 ? `0${item}` : item);

                  setTimes((prev) => {
                    return { ...prev, hour: hourItem };
                  });
                }}
              >
                {item < 10 ? `0${item}` : item}
              </span>
            );
          })}
        </div>
        <div
          className="flex flex-col max-w-xs overflow-auto time-picker"
          style={{ scrollSnapType: "y mandatory" }}
        >
          {_.times(61, (item) => {
            return (
              <span
                className={`p-2 text-center cursor-pointer ${
                  Number(item + 1) === Number(times.minute) &&
                  "bg-primary text-white"
                }`}
                key={`minute-${item + 1}`}
                style={{
                  visibility: item > 58 ? "hidden" : "visible",
                }}
                onClick={(e) => {
                  const parentEl = e.currentTarget.parentElement;

                  if (
                    parentEl &&
                    parentEl?.scrollTop !== item * (Number(pickerHeight) / 3)
                  ) {
                    parentEl.scrollTo({
                      top: item * (Number(pickerHeight) / 3),
                      behavior: "smooth",
                    });
                  }
                  const minuteItem = String(
                    item + 1 < 10 ? `0${item + 1}` : item + 1
                  );

                  setTimes((prev) => {
                    return { ...prev, minute: minuteItem };
                  });
                }}
              >
                {item + 1 < 10 ? `0${item + 1}` : item + 1}
              </span>
            );
          })}
        </div>
        {/* seconds */}
        {/* <div
        className="flex flex-col max-w-xs overflow-auto border time-picker"
        style={{ scrollSnapType: "y mandatory" }}
      >
        {_.times(8, (item) => {
          return (
            <span
              className={`p-2 text-center cursor-pointer ${
                times.second !== "" &&
                Number(item * 10) === Number(times.second) &&
                "bg-primary text-white"
              }`}
              style={{
                visibility: item > 5 ? "hidden" : "visible",
              }}
              key={`hour-${item + 1}`}
              onClick={(e) => {
                const parentEl = e.currentTarget.parentElement;

                if (parentEl && parentEl?.scrollTop !== item * 40) {
                  parentEl.scrollTo({
                    top: item * 40,
                    behavior: "smooth",
                  });
                }
                const second = String(
                  item * 10 < 10 ? `0${item * 10}` : item * 10
                );

                setTimes((prev) => {
                  return { ...prev, second: second };
                });
              }}
            >
              {item * 10 < 10 ? `0${item * 10}` : item * 10}
            </span>
          );
        })}
      </div> */}
        {type === "half" && (
          <div
            className="flex flex-col max-w-xs overflow-auto time-picker"
            style={{ scrollSnapType: "y mandatory" }}
          >
            <span
              className={`p-2 text-center cursor-pointer ${
                times.ampm === "AM" && "bg-primary text-white"
              }`}
              onClick={(e) => {
                const parentEl = e.currentTarget.parentElement;

                if (parentEl && parentEl?.scrollTop !== 0) {
                  parentEl.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }
                setTimes((prev) => {
                  return { ...prev, ampm: "AM" };
                });
              }}
            >
              AM
            </span>
            <span
              className={`p-2 text-center cursor-pointer ${
                times.ampm === "PM" && "bg-primary text-white"
              }`}
              onClick={(e) => {
                const parentEl = e.currentTarget.parentElement;

                if (parentEl && parentEl?.scrollTop !== 40) {
                  parentEl.scrollTo({
                    top: 40,
                    behavior: "smooth",
                  });
                }
                setTimes((prev) => {
                  return { ...prev, ampm: "PM" };
                });
              }}
            >
              PM
            </span>
            <span
              className={`p-2 text-center cursor-pointer`}
              style={{ visibility: "hidden" }}
            >
              PM
            </span>
            <span
              className={`p-2 text-center cursor-pointer`}
              style={{ visibility: "hidden" }}
            >
              PM
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default index;
