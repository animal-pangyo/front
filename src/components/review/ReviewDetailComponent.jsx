import styled from "./board.module.css";
import { useState } from "react";
import { Divider, Segment, TextArea } from "semantic-ui-react";
import { NavLink, useParams } from "react-router-dom";
import useBoard from "../../../hooks/useBoard";
import useAuth from "../../../hooks/useAuth";
import { useRecoilState } from "recoil";
import { messageState } from "../../../store/message";

const ReviewDetailComponent = ({ name }) => {
  const param = useParams();
  const auth = useAuth();
  const board = useBoard({ type: "detail", value: param.id, name });
  const [message, setMessage] = useRecoilState(messageState);
  const [text, setText] = useState("");

  console.log(board, "detail", auth?.user?.roles);

  const onChange = (e) => {
    setText(e.target.value);
  };

  const addAnswer = async (text) => {
    console.log("addAnswer", text);
    const response = await board.createBoard(data);

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
        {auth?.user?.roles === "admin" && (
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

export default ReviewDetailComponent;
