import { atom } from "recoil";

const initialState = {
  id: 0,
  registerNo: "",
  refreshToken: "",
  accessToken: "",
  email: "dev@dev.kr",
  role: "SUPER_ADMIN",
};

export const userState = atom({
  key: "user",
  default: initialState,
});
