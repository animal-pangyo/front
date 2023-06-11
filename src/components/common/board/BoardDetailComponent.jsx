import styled from "./board.module.css";
import { useState } from "react";
import { Divider, Segment, TextArea } from "semantic-ui-react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import useBoard from "../../../hooks/useBoard";
import useAuth from "../../../hooks/useAuth";
import { useRecoilState } from "recoil";
import { messageState } from "../../../store/message";

const BoardDetailComponent = ({ name }) => {
  const param = useParams();
  const auth = useAuth();
  const { search } = useLocation();
  const searchPrams = new URLSearchParams(search);
  const board = useBoard({ type: "detail", value: param.id, name, storeId: searchPrams.get("storeId") });
  const [message, setMessage] = useRecoilState(messageState);
  const [text, setText] = useState("");

  const onChange = (e) => {
    setText(e.target.value);
  };

  const addAnswer = async () => {
    console.log("addAnswer");
    const response = await board.createAnswer({
      answer: text,
      postId: param.id,
    });

    if (!response?.data?.id) {
      navigate(`/${name}`);
      return;
    }

    navigate(`/${name}/detail/${response.data.id}`);
  };
  const deleteBoard = async (id) => {
    await board.deleteBoard(id);
    setMessage({
      visible: true,
      message: "삭제되었습니다.",
    });
  };

  return (
    <>
      <Segment className={styled.segment}>
        <h2 className={styled.detail_subject}>{board.board.subject}</h2>
        <Divider />
        <div className={styled.detail_content}>{board.board.content}</div>
        { name === "inquiry" && (
          <>
            <h3 className={styled.detail_subject}>답변</h3>
            <Divider />
            { !board?.board?.comments?.length ? (
              <p>답변 진행중입니다.</p>
            ) : (
              <p>{board.board.comments[0].content}</p>
            )}
          </>
        )}
        {auth?.user?.roles === "admin" && !board?.board?.comments?.length && (
          <div>
            <TextArea
              placeholder="답변을 입력해주세요."
              onChange={onChange}
              value={text}
            />
            <button className="ui button" onClick={addAnswer}>
              제출
            </button>
          </div>
        )}
      </Segment>
      <div>
        <NavLink to={`/${name}`}>
          <button className="ui button">목록</button>
        </NavLink>
        {auth?.user?.id && auth?.user?.id === board.board.userId && (
          <button className="ui primary button" onClick={deleteBoard}>
            삭제
          </button>
        )}
      </div>
    </>
  );
};

export default BoardDetailComponent;
