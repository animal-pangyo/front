/* 과도한 호출을 방지하기 위해서 일정 시간 동안에 발생하는 함수 호출 중 처음 발생한 호출만 실행하도록 하기 위한 함수입니다. */
/* func : 일정시간 동안 호출하는 함수 */
/* delay : 일정시간에서 시간을 저장 */
export const debounce = (func, delay) => {
  /* setTimoue을 종료시키기 위해 선언하는 변수 */
  let timerId;
  
  /* args : debounce 함수를 호출 후 반환되는 함수를 호출하는 경우에 넘겨주는 파라미터 값 */
  return function(...args) {
    /* timerId값이 존재하지 않는 경우에만 함수를 호출합니다. */
    if (!timerId) {
      /* delay 시간 후에 func 함수를 호출합니다. */
      timerId = setTimeout(() => {
        /* 전달받은 인자들을 함수에 전달합니다. */
        func.apply(this, args);
        /* null로 초기화하여 다음 호출시 함수가 정상적으로 호출됩니다. */
        timerId = null;
      }, delay);
    }
  };
}