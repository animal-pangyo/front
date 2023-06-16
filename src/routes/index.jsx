import board from './board';
import shop from './shop';
import user from './user';

/* 각 파일에서 설정한 라우트 설정을 해당 페이지에서 하나의 배열에 담습니다. */
export default [
  ...user, 
  ...board,
  ...shop
]