import { atom } from "recoil";

/* 리뷰 글쓰기, 리뷰 상세페이지로 이동 후 다시 리스트 페이지로 돌아올 때 사용할 업체 정보를 저장하는 상태입니다. */
export const reviewWriteState = atom({
  /* key : 상태를 구분하기 위한 키 */
  key: "reviewWriteState",
  /* default : 기본값 */
  /* storeId : 업체 아이디 */
  default: {
    storeId: "",
  },
});
