import { useState } from "react";
import Calendar from "../Calendar";
import { TableExtensionHeaderTypes } from "#/data/types/components";

import useDateTimes from "#/utils/useDateTimes";

function index({
  search = { active: true, setter: () => {} },
  query,
  etc,
}: TableExtensionHeaderTypes) {
  const [openCalendar, setOpenCalendar] = useState<"start" | "end" | "">("");

  const [searchDate, setSearchDate] = useState({
    startDate: "",
    endDate: "",
  });

  return (
    <div className="relative flex gap-2 mb-4 max-md:grid max-md:grid-cols-1">
      {search && (
        <div>
          <label className="w-full form-control">
            <div className="label">
              <span className="text-lg font-bold label-text max-md:text-base">
                데이터 검색
              </span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="w-full input input-sm input-bordered max-md:input-xs"
              onChange={(e) => search.setter && search.setter(e.target.value)}
            />
          </label>
        </div>
      )}

      {query && query.active && (
        <div className="">
          <label className="w-full form-control">
            <div className="label">
              <span className="text-lg font-bold label-text max-md:text-base">
                데이터 조회
              </span>
              {/* <span className="label-text-alt">Top Right label</span> */}
            </div>
            <div className="flex gap-2 max-md:grid">
              <div className="grid-cols-1 max-md:grid">
                <input
                  type="text"
                  placeholder="Type here"
                  className="w-full input input-sm input-bordered max-md:col-span-1 max-md:input-xs"
                  onChange={(e) => {
                    query.setter && query.setter(e.target.value);
                  }}
                />
                <div className="flex justify-start grid-cols-1 gap-2 mt-2 max-md:grid">
                  <div className="relative max-md:col-span-1">
                    <input
                      className="w-full input-bordered input input-sm max-md:input-xs"
                      placeholder="start"
                      type="text"
                      value={searchDate.startDate}
                      onClick={() => {
                        setOpenCalendar("start");
                      }}
                    />
                    {openCalendar === "start" && (
                      <div className="absolute left-0 z-[3] w-full max-w-xs rounded-md shadow-xl min-w-80 max-md:min-w-0 top-8 bg-base-100">
                        <Calendar
                          future={searchDate.endDate}
                          select={{
                            selected: useDateTimes.separteDate(
                              searchDate.startDate
                            ),
                            setter: (item: string) => {
                              setSearchDate((prev) => {
                                return { ...prev, startDate: item };
                              });
                              setOpenCalendar("");
                            },
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="relative max-md:col-span-1">
                    <input
                      className="w-full input-bordered input input-sm max-md:input-xs"
                      placeholder="end"
                      type="text"
                      value={searchDate.endDate}
                      onClick={() => {
                        setOpenCalendar("end");
                      }}
                    />
                    {openCalendar === "end" && (
                      <div className="absolute left-0 z-[3] w-full max-w-xs rounded-md shadow-xl min-w-80 max-md:min-w-0 top-8 bg-base-100">
                        <Calendar
                          past={searchDate.startDate}
                          select={{
                            selected: useDateTimes.separteDate(
                              searchDate.endDate
                            ),
                            setter: (item: string) => {
                              setSearchDate((prev) => {
                                return { ...prev, endDate: item };
                              });
                              setOpenCalendar("");
                            },
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <button
                className="!h-auto btn btn-primary max-md:btn-sm"
                disabled={
                  query.disabled ||
                  searchDate.endDate === "" ||
                  searchDate.startDate === ""
                }
                onClick={() => {
                  query.submit &&
                    query.submit(searchDate.startDate, searchDate.endDate);
                }}
              >
                검색
              </button>
            </div>
          </label>
        </div>
      )}

      {etc && (
        <div>
          <label className="w-full max-w-xs form-control">
            <div className="label">
              <span className="text-lg font-bold label-text max-md:text-base min-w-20">
                부가 기능
              </span>
            </div>
          </label>
          <div className="flex flex-wrap gap-2">
            {etc[0]?.text !== "" &&
              etc.map((item, index) => {
                return (
                  <button
                    disabled={item.disabled}
                    className={`flex-wrap bg-primary btn btn-sm max-sm:btn-xs text-white ${item.className}`}
                    key={index}
                    onClick={() => {
                      item.func();
                    }}
                  >
                    {item.text}
                  </button>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export default index;
