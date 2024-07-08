import { atom } from "recoil";

const initialState = {
  isLoading: false,
};

export const loadingState = atom({
  key: "loading",
  default: initialState,
});
