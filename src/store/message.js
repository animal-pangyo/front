import { atom } from "recoil";

export const messageState = atom({
  key: "messageState",
  default: {
    visible: false,
    message: ""
  }
});