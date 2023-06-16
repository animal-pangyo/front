import { atom } from "recoil";

/* 화면 상단에 유저에게 보여줄 메시지를 저장하는 리코일 상태입니다. */
export const messageState = atom({
  /* key : 상태를 구분하기 위한 키 */
  key: "messageState",
  /* default : 기본값 */
  /* visible : 메시지 노출 유무 결정 */
  /* message : 상단에 누출할 메시지 */
  default: {
    visible: false,
    message: ""
  }
});