import { Button, Divider } from 'semantic-ui-react';
import styled from './comment.module.css';
import useComment from '../../../hooks/useComment';
import usePagination from '../../../hooks/usePagination';
import TablePagination from '../paging/TablePagination';
import { useState } from 'react';
import useAuth from '../../../hooks/useAuth';

/* 게시글에 작성 된 댓글 리스트를 렌더링하는 컴포넌트입니다. */
/* postId : 댓글을 가져오려는 게시글의 아이디입니다. */
const CommentList = ({ postId }) => {
  /* user : 유저에 대한 객체 */
  const { user } = useAuth();

  /* 댓글 리스트의 현재 페이지 정보에 대한 상태입니다. */
  const [page, setPage] = useState(1);

  /* 댓글 작성시 에러가 발생한 경우 에러를 표현하기 위한 상태입니다. */
  const [error, setError] = useState(false);
  
  /* 댓글 수정시 에러가 발생한 경우 에러를 표현하기 위한 상태입니다. */
  const [updateError, setUpdateError] = useState(false);

  /* 댓글을 수정할때 textarea를 렌더링하기 위해 사용되는 상태입니다. 현재 수정중인 댓글 아이디를 저장합니다. */
  const [updateId, setUpdateId] = useState(-1);

  /* 댓글 작성시에 저장할 내용을 저장하기 위한 상태입니다. */
  const [content, setContent] = useState('');

  /* 댓글 작성시에 저장할 내용을 저장하기 위한 상태입니다. */
  const [updateContent, setUpdateContent] = useState('');

  /* 게시글 아이디와 페이지 번호를 전달하여 해당하는 댓글 리스트를 가져옵니다. */
  /* postId : 게시글아이디 */
  /* page : 페이지 번호 */
  /* comment : 댓글 리스트 */
  /* deleteComment : 댓글 삭제용 함수 */
  /* createComment : 댓글 생성용 함수 */
  /* updateComment : 댓글 수정용 함수 */
  const { comments, deleteComment, createComment, updateComment } = useComment({ postId, page });

  /* 페이지네이션 컴포넌트를 생성하기 위한 정보를 얻어오는 데 사용하는 훅입니다. */
  /* start : 시작 페이지 번호 */
  /* end : 현재 보여질 마지막 페이지 번호 */
  /* total : 전체 댓글 수 */
  /* last : 해당 댓글의 마지막 페이지 번호 */
  /* page : 현재 페이지 */
  /* perPage : 한화면에 보여질 댓글의 수 */
  const { start, end, total, last } = usePagination({
    page,
    perPage: 10,
    total: comments?.total,
  });

  /* 댓글을 수정하는 함수입니다. */
  const handleUpdate = () => {
    /* 내용을 입력하지 않은 경우 에러를 표시합니다. */
    if (!updateContent) {
      // 에러를 표시합니다.
      setUpdateError(true);
      return;
    }

    /* 에러를 제거합니다. */
    setError(false);
    /* 텍스트 컨텐츠를 초기화 합니다. */
    setUpdateContent('');
    /* 수정 상태를 초기화합니다. */
    setUpdateId('');
    /* 댓글을 수정합니다. */
    updateComment({ commentId: updateId, content: updateContent, userId: user.id });
  }

  /* 수정 버튼 클릭 시 호출될 함수입니다. */
  /* 내용이 textarea로 변경되도록 하는 기능입니다. */
  /* content : 댓글 내용 */
  /* commentId : 댓글 아이디 */
  const handleUpdateClick = ({ content, commentId }) => {
    /* 현재 수정 중인 댓글아이디를 저장합니다. */
    setUpdateId(commentId);
    /* 현재 수정중인 댓글의 내용을 저장합니다. */
    setUpdateContent(content);
    /* 에러를 초기화합니다. */
    setUpdateError(false);
  };

  /* 댓글을 작성하는 함수입니다. */
  const handleCreate = () => {
    /* 내용을 입력하지 않은 경우 에러를 표시합니다. */
    if (!content) {
      // 에러를 표시합니다.
      setError(true);
      return;
    }

    /* 에러를 제거합니다. */
    setError(false);
    /* 댓글을 작성합니다. */
    createComment({ postId: param.id, content, userId: user.id });
  }

  return (
    <>
      <div className={styled.comments}>
        <h4>댓글</h4>
        <Divider />
        {/* className : className이름 설정 */}
        <div className={styled.commentList}>
          {/* 댓글 리스트가 존재하는 경우 댓글 리스트를 렌더링합니다. */}
          {
            !!comments?.comments?.length ? (
              comments.comments.map((comment) => (
                // className : className이름 설정
                <div className={styled.comment} key={comment.commentId}>
                  {/* className : className이름 설정 */}
                  <div className={styled.profile}>
                    <div className={styled.user}>
                      {/* className : className이름 설정 */}
                      <span className={styled.userid}>{comment.userId}</span>
                      {/* className : className이름 설정 */}
                      <span className={styled.time}>{comment.createdAt}</span>
                    </div>
                    {
                      /* 댓글 작성자와 로그인한 유저가 동일하다면 아래를 렌더링합니다. */
                      user?.id === comment.userId && (
                        // className : className이름 설정
                        <div className={styled.button}>
                          {/* onClick : 수정 버튼 클릭 시 호출될 함수입니다. */}
                          <span onClick={() => handleUpdateClick(comment)}>수정</span>

                          {/* 댓글을 삭제하는 버튼입니다. */}
                          {/* 삭제 버튼 클릭 시 댓글 아이디를 서버로 전달하여 댓글을 삭제합니다. */}
                          <span onClick={() => deleteComment(comment.commentId)}>삭제</span>
                        </div>
                      )
                    }
                  </div>
                  {/* className : className이름 설정 */}
                  <div className={styled.content}>
                    {/* className : className이름 설정 */}
                    {
                      updateId === comment.commentId ? (
                        <>
                          <textarea value={updateContent} onChange={e => setUpdateContent(e.target.value)}></textarea>
                          {
                            // className : className이름 설정
                            // 댓글 작성시 에러가 발생하면 에러 내용을 렌더링합니다.
                            updateError && <div className={styled.error}>댓글을 작성해주세요.</div>
                          }
                          <div className={styled.write_button}>
                            {/* 댓글 작성 버튼입니다. */}
                            {/* color : 버튼의 컬러를 지정합니다. */}
                            {/* onClick : 버튼 클릭 시 호출될 함수입니다. */}
                            <Button color='blue' onClick={handleUpdate}>작성</Button>
                          </div>
                        </>
                      ) : (
                        <div className={styled.real_content}>{comment.content}</div>
                      )
                    }
                  </div>
                </div>
              ))
            ) : (
              // className : className이름 설정
              // 댓글이 존재하지 않는 경우 '댓글이 존재하지 않습니다.'를 렌더링합니다.
              <div className={styled.empty}>댓글이 존재하지 않습니다.</div>
            )
          }
        </div>

        {/* 페이지네이션을 렌더링하는 컴포넌트 입니다. */}
        {/* page : 현제 페이지 정보 */}
        {/* start : 시작 페이지 번호 */}
        {/* end : 현재 보여질 마지막 페이지 번호 */}
        {/* total : 전체 게시판 수 */}
        {/* last : 해당 게시판의 마지막 페이지 번호 */}
        {/* move : 페이지 번호 클릭 시 실행될 함수입니다 */}
        {/* isTable : 페이지를 테이블로 표현할것인지 유무를 나타냅니다. */}
        <TablePagination
          page={page}
          total={total}
          start={start}
          end={end}
          last={last}
          move={setPage}
          isTable={false}
        />

        {
          user && (
            <div className={styled.comment_write}>
              {/* 댓글 작성 시 텍스트박스를 렌더링합니다. */}
              {/* value : 댓글을 저장하기 위한 생태입니다. */}
              {/* onChange : 사용자가 댓글 작성시 호출될 함수입니다. 내용을 상태에 저장합니다. */}
              <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
              {
                // className : className이름 설정
                // 댓글 작성시 에러가 발생하면 에러 내용을 렌더링합니다.
                error && <div className={styled.error}>댓글을 작성해주세요.</div>
              }
              {/* className : className이름 설정 */}
              <div className={styled.write_button}>
                {/* 댓글 작성 버튼입니다. */}
                {/* color : 버튼의 컬러를 지정합니다. */}
                {/* onClick : 버튼 클릭 시 호출될 함수입니다. */}
                <Button color='blue' onClick={handleCreate}>작성</Button>
              </div>
            </div>
          )
        }
      </div>
    </>
  )
};

export default CommentList;