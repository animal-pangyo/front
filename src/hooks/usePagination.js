/* 서버로 부터 전달받은 페이지 정보를 토대로 페이지네이션 컴포넌트를 구성하기 위한 계산작업을 하는 훅입니다. */
/* page : 현재 페이지 번호 */
/* total : 전체 게시글 수 */
/* perPage : 한 화면에 보여줄 게시글 수 */
const usePagination = ({ page = 1, total = 0, perPage = 10 }) => {
  /* total과 perPage를 이용하여 가장 마지막 페이지 번호를 계산합니다. */
  /* Math.max를 사용하여 최소값은 1로 설정합니다. */
  const last = Math.max(Math.ceil(total / perPage), 1);

  /* 화면에 보여 질 페이지 번호의 시작 번호입니다. */
  const start = parseInt(page / perPage) * perPage + 1;

  /* 화면에 보여 질 페이지 번호의 마지막 번호입니다. */
  const end = Math.max(Math.min(start + 9, last), 1);
  return {
    start,
    end,
    last,
    page
  }
};

export default usePagination;