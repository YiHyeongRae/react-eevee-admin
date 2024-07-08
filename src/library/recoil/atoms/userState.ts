import { atom } from "recoil";

const initialState = {
  id: 0,
  registerNo: "",
  refreshToken: "",
  accessToken: "",
  email: "dev@andreia.kr",
  role: "SUPER_ADMIN",
};

export const userState = atom({
  key: "user",
  default: initialState,
});
