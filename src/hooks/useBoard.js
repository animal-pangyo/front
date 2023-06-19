import { useMutation, useQuery, useQueryClient } from "react-query";
import * as boardApi from "../services/api/board.api";
import * as storeApi from "../services/api/store.api";
import * as reviewApi from "../services/api/review.api";

/* 게시판 리스트 또는 상세 정보를 가져오는데 사용하는 훅입니다. */
/* type : 리스트를 가져올지 상세 정보를 가져올지 결정합니다.(detail or list) */
/* value : type에 따라 다른 값을 전달 받습니다. list인경우 페이지 정보, detail 인 경우 아이디값을 전달받습니다. */
/* name : 게시판 이름을 전달받습니다. */
/* searchKeyword : 게시판검색을 위한 검색어를 전달받습니다. */
/* address : 주소검색을 위해 주소를 전달받습니다. */
/* storeId : 리뷰 게시판인 경우 업체 아이디를 전달받습니다. */
/* level : 지도 검색 시 현재 줌 상태를 전달답습니다. */
const useBoard = ({ type, value, name, searchKeyword, address, storeId, level }) => {
  /* 리액트 쿼리 스토어에 접근하기 위한 훅입니다. */
  const queryClient = useQueryClient();
  let board;

  /* 게시판의 종류에 따라 사용되는 api를 달리 처리하기 위해서 변수를 사용합니다. */
  let api;

  /* 이름을 통해 아래 분기에 해당하는 api를 사용하게 됩니다.  */
  switch (name) {
    case "free":
    case "notice":
    case "faq":
    case "inquiry":
      /* 자유게시판, 공지사항, faq, 문의게시판의 경우 boardApi를 사용합니다. */
      api = boardApi;
      break;
    case "review":
      /* 리뷰게시판의 경우 boardApi를 사용합니다. */
      api = reviewApi;
      break;
    default:
      /* 위의 조건에 부합하지 않는 경우 storeApi를 사용합니다. */
      api = storeApi;
  }

  /* type이 list인 경우 실행됩니다. */
  if (type === "list") {
    board = useQuery({
      /* 게시글 리스트를 저장하기 위한 키로 name과 value를 설정합니다. */
      queryKey: [name, value, searchKeyword, address, storeId, name],

      /* 데이터를 전달받기 위한 기능을 수행하는 함수입니다. */
      queryFn: async () => {
        /* 게시글 정보를 서버로부터 전달받습니다. */
        /* page : 현재 페이지 */
        /* name :게시글 이름 */
        /* searchKeyword : 검색어 */
        /* address : 검색할 주소 */
        /* level : 현재 줌레벨 */
        /* storeId : 업체 아이디(리뷰게시판에서 사용) */
        const response = await api.fetchBoardList({
          page: value,
          name,
          searchKeyword,
          address,
          level,
          storeId
        });

        /* 서버로 부터 전달받은 데이터가 배열인 경우 그대로 반환합니다. */
        if (Array.isArray(response.data)) {
          return response.data;
        } else {
          /* 서버로부터 전달받은 데이터가 배열이 아닌 경우 실행됩니다. */
          /* posts : 게시글 리스트 */
          /* rest : 추가 정보(total) */
          const { posts, ...rest } = response.data;

          /* 게시글 리스트에서 게시글의 속성명을 변경하는 함수를 호출합니다. */
          const data = (posts || []).map((board) => api.transformBoard(board));
  
          return {
            posts: data,
            ...rest,
          };
        }
      },
    });
  /* type이 detail인경우 게시글 상세 정보를 호출합니다. */
  } else if (type === "detail") {
    board = useQuery({
      /* 게시글 리스트를 저장하기 위한 키로 name과 "detail", value를 설정합니다. */
      queryKey: [name, "detail", value, storeId],
      queryFn: async () => {
        /* 서버로부터 게시글 상세정보를 전달답습니다. */
        /* id :게시글 아이디 */
        /* name : 게시판 이름 */
        /* storeId : 업체정보 (리뷰게시판에서 사용) */
        const response = await api.fetchBoard({ id: value, name, storeId });

        /* api에서 transformBoard 함수를 제공하는 경우 데이터의 속성명을 변경하는 로직을 수행합니다. */
        if(api.transformBoard){
          return api.transformBoard(response.data);
        }
        return response.data;
      },
    });
  }

  /* 게시글을 삭제하는 버튼 클릭 시 호출됩니다. */
  const deleteMutation = useMutation({
    /* 전달받은 아이디를 서버로 전달하여 해당하는 게시글을 삭제합니다. */
    mutationFn(id) {
      /* id : 게시글 아이디 */
      /* name : 게시판 이름 */
      return api.deleteBoard({ id, name });
    },

    /* 삭제가 정상적으로 처리된 경우 게시글 리스트를 다시 호출합니다. */
    onSuccess() {
      // 유효하지 않은 상태로 만들어 정보 리로드
      queryClient.invalidateQueries(name);
    },
  });

  /* 게시글을 생성하는 버튼 클릭 시 호출됩니다. */
  const createMutation = useMutation({
    /* 사용자가 작성한 게시글 폼을 서버로 전송하여 게시글을 생성합니다. */
    mutationFn(form) {
      /* name : 게시판 이름 */
      /* form : 게시글 폼 */
      return api.createBoard({ name, form });
    },
  });

  /* 문의 게시판에 답변을 생성하는 버튼 클릭 시 호출되는 함숭비니다. */
  const createAnswerMutation = useMutation({
    /* 답변 작성 버튼 클릭 후 서버로 전달하여 답변을 생성합니다. */
    /* answer : 답변 정보 및 게시글 정보 */
    mutationFn(answer) {
      /* name : 게시판 이름 */
      /* answer : 답변 정보 및 게시글 정보 */
      return api.createAnswer({ name, ...answer });
    },
  });

  /*  */
  const updateMutation = useMutation({
    mutationFn(form) {
      return api.updateBoard({ form, name, storeId, reviewId: value });
    },
  });

  return {
    board: type === "list" ? board?.data || [] : board?.data || {},
    deleteBoard: deleteMutation.mutateAsync,
    createBoard: createMutation.mutateAsync,
    updateBoard: updateMutation.mutateAsync,
    createAnswer: createAnswerMutation.mutateAsync,
  };
};

export default useBoard;
