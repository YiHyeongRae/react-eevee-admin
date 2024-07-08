import { UseToastFunctionTypes } from "../data/types/utils";

export function useToast({ list, setter, info }: UseToastFunctionTypes) {
  const copy = [...list];

  copy.push(info);
  setter(copy);
  // if (copy.length >= 3) {
  //   // console.log("list", list);
  //   // console.log("copy.length", copy.length);
  //   // console.log("info", info);
  //   return null;
  // } else {
  //   copy.push(info);
  //   setter(copy);
  // }
}
