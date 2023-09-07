import { atom } from "recoil";

/* 현재 채팅 중인지 여부를 저장하는 상태입니다. 채팅중인경우 채팅 모달을 출력합니다. */
export const chatingIdState = atom({
  /* key : 상태를 구분하기 위한 키 */
  key: "chatingIdState",
  /* default : 기본값으로 null 입니다. */
  default: null,
});

export const msgCntState = atom({
  key: 'msgCntState',
  default: 0
});

export const latestMessageState = atom({
  key: 'latestMessageState',
  default: null
})