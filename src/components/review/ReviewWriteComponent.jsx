import { Segment } from "semantic-ui-react";
import styled from "./board.module.css";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import useBoard from "../../../hooks/useBoard";

const ReviewWriteComponent = ({ name }) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const param = useParams();
  const board = useBoard({
    name,
    ...(param.id ? { type: "detail", value: param.id } : {}),
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (param.id) {
      update(data);
    } else {
      create(data);
    }
  };

  const create = async (data) => {
    const response = await board.createBoard(data);

    if (!response?.data?.id) {
      navigate(`/${name}`);
      return;
    }

    navigate(`/${name}/detail/${response.data.id}`);
  };

  const update = async (data) => {
    const response = await board.updateBoard({
      ...data,
      id: param.id,
    });

    if (!response?.data?.id) {
      navigate(`/${name}`);
      return;
    }

    navigate(`/${name}/detail/${response.data.id}`);
  };

  return (
    <>
      <form className={styled.form} onSubmit={handleSubmit(onSubmit)}>
        <Segment>
          <div>
            <div className={`ui input ${styled.subject}`}>
              <input
                type="text"
                defaultValue={board.board.subject}
                placeholder="제목을 입력해주세요."
                {...register("subject", { required: true })}
              />
              {errors.subject && <span>제목을 입력해주세요.</span>}
            </div>
          </div>

          <div className={styled.content}>
            <textarea
              type="text"
              placeholder="내용을 입력해주세요."
              defaultValue={board.board.content}
              {...register("content", { required: true })}
            />
            {errors.content && <span>내용을 입력해주세요.</span>}
          </div>
        </Segment>
        <div>
          <NavLink to={`/${name}`}>
            <button className="ui button">목록</button>
          </NavLink>
          <button className="ui primary button">
            {param.id ? "수정하기" : "글쓰기"}
          </button>
        </div>
      </form>
    </>
  );
};

export default ReviewWriteComponent;
