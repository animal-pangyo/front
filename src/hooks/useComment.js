import { useMutation, useQuery, useQueryClient } from "react-query";
import * as commentApi from '../services/api/comment.api';

/* 댓글과 관련 된 함수들을 모아놓은 훅입니다. */
/* postId : 댓글이 작성된 게시글 아이디 */
/* page : 댓글 리스트 페이지 번호 */
const useComment = ({ postId, page }) => {
  /* 리액트 쿼리 스토어에 접근하기 위한 훅입니다. */
  const queryClient = useQueryClient();

  /* 댓글리스트을 가져오는 쿼리입니다. */
  const comments = useQuery({
    queryKey: ['comment', page, postId],
    async queryFn() {
      /* 서버로부터 게시글 아이디에 해당하는 댓글 리스트를 가져옵니다. */
      const response = await commentApi.fetchComments({ postId, page });
      return response.data;
    },
    /* page 값이 넘어오는 경우에만 댓글 리스트 조회 */
    enabled: typeof page === 'number'
  });

  /* 댓글을 삭제하는 버튼 클릭 시 호출됩니다. */
  const deleteComment = useMutation({
    /* 전달받은 아이디를 서버로 전달하여 해당하는 댓글을 삭제합니다. */
    mutationFn(postId) {
      // postId : 게시글 아이디
      return commentApi.deleteComment(postId);
    },

    /* 추가가 정상적으로 처리된 경우 댓글 리스트를 다시 호출합니다. */
    onSuccess() {
    // 유효하지 않은 상태로 만들어 정보 리로드
      queryClient.invalidateQueries('comment');
    },
  });

  /* 댓글을 생성하는 버튼 클릭 시 호출됩니다. */
  const createComment = useMutation({
    /* 사용자가 작성한 댓글 폼을 서버로 전송하여 게시글을 생성합니다. */
    mutationFn(form) {
      /* form : 게시글 폼 */
      return commentApi.createComment(form);
    },

    /* 삭제가 정상적으로 처리된 경우 댓글 리스트를 다시 호출합니다. */
    onSuccess() {
    // 유효하지 않은 상태로 만들어 정보 리로드
      queryClient.invalidateQueries('comment');
    },
  });
  
  /* 댓글을 수정하는 버튼 클릭 시 호출됩니다. */
  const updateComment = useMutation({
    /* 사용자가 작성한 댓글 폼을 서버로 전송하여 게시글을 생성합니다. */
    mutationFn(form) {
      /* form : 게시글 폼 */
      return commentApi.updateComment(form);
    },

    /* 수정이 정상적으로 처리된 경우 댓글 리스트를 다시 호출합니다. */
    onSuccess() {
      // 유효하지 않은 상태로 만들어 정보 리로드
        queryClient.invalidateQueries('comment');
      },
  });

  return {
    comments: comments?.data || [],
    deleteComment: deleteComment.mutateAsync,
    createComment: createComment.mutate,
    updateComment: updateComment.mutateAsync
  }
};

export default useComment;