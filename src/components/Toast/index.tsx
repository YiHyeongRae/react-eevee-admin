import { useEffect } from "react";
import { ToastTypes } from "../../data/types/components";

function index({
  list,
  setter,
  duration = 3,
  position = "toast-end",
}: ToastTypes) {
  useEffect(() => {
    if (list.length !== 0 && list.every((item) => !item.life)) {
      setter([]);
    }
  }, [list]);
  return (
    <>
      {list.length !== 0 && (
        <div className={`toast ${position} z-[2]`}>
          {list.map((item, index: number) => {
            return item.life ? (
              <div
                className={`flex flex-col alert max-sm:p-4 ${item.type}`}
                key={index}
              >
                <span className="max-w-xs text-wrap max-sm:text-xs">
                  {item.message}
                </span>
                <span className="w-full h-1 bg-base-300">
                  <i
                    className="block w-full h-1 bg-[#fff]"
                    style={{
                      animation: `progress linear ${duration}s forwards`,
                    }}
                    onAnimationEnd={() => {
                      const copy = [...list];
                      item.life = false;

                      if (copy.every((copyItem) => !copyItem.life)) {
                        copy.splice(0);
                      }
                      copy.splice(index, 1, item);

                      setter(copy);
                    }}
                    // onAnimationEnd={() => {
                    //   const copy = [...list];
                    //   item.life = false;

                    //   console.log("onAnimationEnd List", list);
                    //   console.log("onAnimationEnd item", item);

                    //   // if (copy.every((copyItem) => !copyItem.life)) {
                    //   //   copy.splice(0);
                    //   // }
                    //   copy.splice(index, 1, item);

                    //   setter(copy);
                    // }}
                  ></i>
                </span>
              </div>
            ) : null;
          })}
        </div>
      )}
    </>
  );
}

export default index;
