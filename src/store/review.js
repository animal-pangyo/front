import { atom } from "recoil";

export const reviewWriteState = atom({
  key: "reviewWriteState",
  default: {
    storeId: "",
  },
});
