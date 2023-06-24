import styled from "./board.module.css";
import { useState } from "react";
import { Divider, Segment, TextArea } from "semantic-ui-react";
import { NavLink, useLocation, useParams, useNavigate } from "react-router-dom";
import useBoard from "../../../hooks/useBoard";
import useAuth from "../../../hooks/useAuth";
import { useRecoilState } from "recoil";
import { messageState } from "../../../store/message";
import CommentList from "../Comment/Comment";

/* 게시판의 상세 정보를 렌더링 하기 위한 컴포넌트 입니다. */
const BoardDetailComponent = ({ name }) => {
  /* URL에 포함된 파리미터의 정보를 추출하기 위한 훅입니다. */
  const param = useParams();

  /* 유저와 관련 된 처리를 하기 위한 훅입니다. */
  const auth = useAuth();


  /* navigate 사용 */
  const navigate = useNavigate();

  /* URL에서 쿼리스트링으로 전달된 데이터를 추출하기 위한 훅입니다. */
  const { search } = useLocation();
  const searchPrams = new URLSearchParams(search);

  /* 게시판과 관련 된 함수를 제공하는 훅이며, id에 해당하는 게시판 데이터를 가지고 있습니다. */
  /* type : "detail" 게시판의 상세 정보를 호출하기 위해 사용되는 값입니다. */
  /* value : 게시판 아이디 정보를 전달합니다. */
  /* name : 게시판의 이름을 할당합니다(자유게시판, QNA 등) */
  /* storeId : 게시판이 방문후기 게시판인 경우 업체의 아이디를 전달합니다. */
  const board = useBoard({ type: "detail", value: param.id, name, storeId: searchPrams.get("storeId") });

  /* 화면 상단 메시지를 출력하기 위한 setMessage 함수 */
  const [setMessage] = useRecoilState(messageState);

  /* QNA에서 사용되는 값으로 질문에 대한 답을 저장하기 위한 상태입니다. */
  const [text, setText] = useState("");

  /* 사용자가 답변을 입력하는 경우 상태를 저장하기 위한 함수입니다. */
  const onChange = (e) => {
    setText(e.target.value);
  };

  /* 답변 전송 버튼을 입력한 경우 서버로 답변을 전송하는 함수입니다. */
  const addAnswer = async () => {
    /* 서버로 답변을 저장합니다. */
    /* answer : 답변 정보 */
    /* postId : 게시판의 아이디 */
    const response = await board.createAnswer({
      answer: text,
      postId: param.id,
    });

    /* 서버로 부터 전달 받은 값이 존재하지 않는 경우 리스트 페이지로 이동합니다. */
    if (!response?.data?.id) {
      navigate(`/${name}`);
      return;
    }

    /* 정상적으로 아이디값을 전달받은 경우 상세페이지로 이동합니다. */
    navigate(`/${name}/detail/${response.data.id}`);
  };

  /* 해당 게시판을 삭제하는 함수입니다. */
  const deleteBoard = async (id) => {
    /* id를 전달받아 해당 게시판을 삭제합니다. */
    await board.deleteBoard(id);

    /* 정상적으로 삭제 된 경우 "삭제되었습니다" 메시지를 출력합니다. */
    setMessage({
      visible: true,
      message: "삭제되었습니다.",
    });
  };

  return (
    <>
      {/* className : className이름 설정 */}
      <Segment className={styled.segment}>
        {/* className : className이름 설정 */}
        {/* 게시판의 subject 속성 또는 title 값을 렌더링합니다. */}
        <h2 className={styled.detail_subject}>{board.board.subject || board?.board?.title}</h2>
        <Divider />
        {/* className : className이름 설정 */}
        {/* 게시판의 subject content 값을 렌더링합니다. */}
        <div className={styled.detail_content}>{board.board.content}</div>
        {/* 문의 게시판인 경우 아래의 요소를 렌더링합니다. */}
        { name === "inquiry" && (
          <>
            {/* className : className이름 설정 */}
            <h3 className={styled.detail_subject}>답변</h3>
            <Divider />
            {/* comments 값이 존재하지 않는 경우 "답변 진행중입니다" 메시지를 렌더링합니다. */}
            {/* comments 값이 존재하는 경우 해당 답변을 렌더링합니다. */}
            { !board?.board?.comments?.length ? (
              <p>답변 진행중입니다.</p>
            ) : (
              <p>{board.board.comments[0].content}</p>
            )}
          </>
        )}
        {/* 문의 게시판이면서 로그인한 유저가 관리자이며, 답변이 달리지 않은 경우  아래를 렌더링합니다. */}
        {name === 'inquiry' && auth?.user?.roles === "admin" && !board?.board?.comments?.length && (
          <div>
            {/* placeholder : 입력 전 표시될 문자 */}
            {/* onChange : 사용자가 답변을 입력하는 경우 호출될 함수입니다. */}
            {/* value : 컴포넌트에 바인딩할 상태를 설정합니다.  */}
            <TextArea
              placeholder="답변을 입력해주세요."
              onChange={onChange}
              value={text}
            />
            {/* className : className이름 설정 */}
            {/* onClick : 제출버튼 클릭 시 호출될 함수입니다. */}
            <button className="ui button" onClick={addAnswer}>
              제출
            </button>
          </div>
        )}
      </Segment>

      {
        /* 자유게시판인 경우 댓글 컴포넌트를 렌더링합니다. */
        /* postId : 게시글의 아이디를 전달하여 해당하는 댓글을 불러옵니다. */
        name === 'free' && (
          <CommentList postId={param.id} />
        )
      }

      <div>
        {/* to : 이동할 페이지 */}
        {/* 게시판의 리스트 페이지로 이동합니다. */}
        <NavLink to={name === 'review' ? `/shop/${param.category}/detail/${searchPrams.get("storeId")}?name=${searchPrams.get("name")}` : `/${name}`}>
          {/* className : className이름 설정 */}
          <button className="ui button">목록</button>
        </NavLink>
        {/* className : className이름 설정 */}
        {/* 게시판 작성자와 로그인한 유저가 존재하는 경우 삭제 버튼을 렌더링합니다. */}
        {auth?.user?.id && auth?.user?.id === board.board.userId && (
          /* className : className이름 설정 */
          /* onClick : 삭제버튼 클릭시 호출될 함수입니다. */
          <button className="ui primary button" onClick={deleteBoard}>
            삭제
          </button>
        )}
      </div>
    </>
  );
};

export default BoardDetailComponent;
