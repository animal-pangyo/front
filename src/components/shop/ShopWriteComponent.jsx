import { Segment } from "semantic-ui-react";
import styled from "./board.module.css";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import useBoard from "../../hooks/useBoard";
import { useDaumPostcodePopup } from "react-daum-postcode";

const ShopWriteComponent = ({ name }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
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

    if (!response?.data?.store_id) {
      navigate(`/shop/${name}`);
      return;
    }

    navigate(`/shop/${name}/detail/${response.data.store_id}`);
  };

  const update = async () => {
    const response = await board.updateBoard(data);

    if (!response?.data?.store_id) {
      navigate(`/shop/${name}`);
      return;
    }

    navigate(`/shop/${name}/detail/${response.data.store_id}`);
  };

  const open = useDaumPostcodePopup();
  const form = watch();

  const handleComplete = ({ address }) => {
    setValue("address1", address);
  };

  return (
    <>
      <form className={styled.form} onSubmit={handleSubmit(onSubmit)}>
        <Segment>
          <div className={`ui input ${styled.subject}`}>
            <input
              type="text"
              defaultValue={board.board.name}
              placeholder="업체명을 입력해주세요."
              {...register("name", { required: true })}
            />
            {errors.name && <span>제목을 입력해주세요.</span>}
          </div>

          <div className={`ui input ${styled.subject}`}>
            <input
              type="text"
              placeholder="연락처를 입력해주세요."
              defaultValue={board.board.phone}
              {...register("phone", { required: true })}
            />
            {errors.phone && <span>연락처를 입력해주세요.</span>}
          </div>

          <div className={`ui input ${styled.subject}`}>
            <input
              type="text"
              placeholder="영업시간을 입력해주세요."
              defaultValue={board.board.time}
              {...register("time", { required: true })}
            />
            {errors.time && <span>영업시간을 입력해주세요.</span>}
          </div>

          <div className={`${styled.input} ${styled.address}`}>
            <button
              className="ui button"
              onClick={() => open({ onComplete: handleComplete })}
            >
              <i className="search icon"></i>주소 검색
            </button>

            <div
              className={`ui input ${styled.detail_address1}`}
              style={!form.address1 ? { display: "none" } : {}}
            >
              <input
                type="text"
                {...register("address1", { required: true })}
                disabled
              />
            </div>

            <div
              className={`ui input ${styled.detail_address1}`}
              style={!form.address1 ? { display: "none" } : {}}
            >
              <input
                type="text"
                placeholder="상세주소입력"
                {...register("address2", { required: true })}
              />
            </div>
            {(errors.address1 || errors.address2) && (
              <span className={styled.error}>주소를 입력해주세요.</span>
            )}
          </div>

          <div className={styled.content}>
            <textarea
              type="text"
              placeholder="상세정보를 입력해주세요."
              defaultValue={board.board.detail}
              {...register("detail", { required: true })}
            />
            {errors.detail && <span>상세정보를 입력해주세요.</span>}
          </div>
        </Segment>
        <div>
          <NavLink to={`/shop/${name}`}>
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

export default ShopWriteComponent;
