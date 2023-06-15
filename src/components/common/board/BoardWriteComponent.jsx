import { Segment } from "semantic-ui-react";
import styled from "./board.module.css";
import { useForm } from "react-hook-form";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import useBoard from "../../../hooks/useBoard";

/* 게시글을 작성 폼을 렌더링하는 컴포넌트 입니다.  */
/* name : 게시판의 이름을 나타냅니다. */
const BoardWriteComponent = ({ name }) => {
  // register : form에 속성 등록
  // handleSubmit : form의 onSubmit이 발생했을 때 호출될 함수
  // formState : 에러상태를 확인할 수 있는 값입니다.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /* URL에 포함된 파리미터의 정보를 추출하기 위한 훅입니다. */
  const param = useParams();

  /* URL에서 쿼리스트링으로 전달된 데이터를 추출하기 위한 훅입니다. */
  const { search } = useLocation();
  const searchPrams = new URLSearchParams(search);

  /* 게시판과 관련 된 함수를 제공하는 훅이며, id에 해당하는 게시판 데이터를 가지고 있습니다. */
  /* type : "detail" 게시판의 상세 정보를 호출하기 위해 사용되는 값입니다. */
  /* value : 게시판 아이디 정보를 전달합니다. */
  /* name : 게시판의 이름을 할당합니다(자유게시판, QNA 등) */
  /* storeId : 게시판이 방문후기 게시판인 경우 업체의 아이디를 전달합니다. */
  /* PATH에 전달된 아이디 값이 존재하는 경우 아이디값에 해당하는 게시글 정보를 가져와 게시글을 수정하게 됩니다. */
  const board = useBoard({
    name, 
    storeId: searchPrams.get("storeId"),
    ...(param.id ? { type: "detail", value: param.id } : {}),
  });

  /* 페이지 이동을 위한 훅입니다. */
  const navigate = useNavigate();

  /* 게시글 작성 버튼을 클릭 시 실행될 함수입니다. */
  const onSubmit = async (data) => {
    /* PATH에 전달된 아이디 값이 존재하는 경우 게시글 수정 함수를 호출합니다. */
    if (param.id) {
      update(data);
    } else {
      /* PATH에 전달된 아이디 값이 존재하지 않는 경우 게시글을 생성합니다. */
      create(data);
    }
  };

  /* 게시글을 생성하는 함수입니다. */
  const create = async (data) => {
    /* 사용자가 입력한 폼 데이터를 서버로 전송해 게시글을 작성합니다. */
    /* data : form 데이터 */
    /* storeId : 게시판이 리뷰 게시판인 경우 업체 아이디를 전달합니다. */
    const response = await board.createBoard({
      ...data,
      storeId: searchPrams.get('storeid'),
    });

    /* 서버로 부터 응답받은 아이디를 저장합니다. */
    const id = response?.data?.id || response?.data?.review_id;

    /* 서버로부터 응답받은 결과에 id가 존재하지 않는 경우 게시판 리스트 페이지로 이동합니다. */
    if (!id) {
      navigate(`/${name}`);
      return;
    }

    /* 리뷰게시판이 아닌 경우 일반 게시판 리스트 페이지로 이동합니다. */
    if(!response?.data?.review_id){
      navigate(`/${name}/detail/${response.data.id}`);
    }else{

      /* 리뷰게시판인 경우 리뷰 게시판 리스트 페이지로 이동합니다. */
      navigate(`/review/${param.category}/detail/${id}?storeId=${searchPrams.get('storeid')}`);
    }
    
  };

  /* 게시글을 수정하는 함수입니다. */
  const update = async (data) => {
    /* 사용자가 입력한 폼 데이터를 서버로 전송해 게시글을 수정합니다. */
    /* data : form 데이터 */
    /* id : 수정하려는 게시글 아이디 */
    const response = await board.updateBoard({
      ...data,
      id: param.id,
    });

    /* 서버로부터 응답받은 결과에 id가 존재하지 않는 경우 게시판 리스트 페이지로 이동합니다. */
    if (!response?.data?.id) {
      navigate(`/${name}`);
      return;
    }

    /* 서버로부터 응답받은 결과에 id가 존재하는 경우 해당 게시글 상세페이지로 이동합니다. */
    navigate(`/${name}/detail/${response.data.id}`);
  };

  return (
    <>
      {/* className : className이름 설정 */}
      <form className={styled.form} onSubmit={handleSubmit(onSubmit)}>
        <Segment>
          <div>
            {/* className : className이름 설정 */}
            <div className={`ui input ${styled.subject}`}>
              {/* 제목 입력 용 태그 렌더링 */}
              {/* type: 텍스트 */}
              {/* placeholder : 입력 전 표시될 문자 */}
              {/* defaultValue : 기본값 설정 */}
              <input
                type="text"
                defaultValue={board.board.subject}
                placeholder="제목을 입력해주세요."
                {...register("subject", { required: true })}
              />

              {/* 에러가 존재하는 경우 에러메시지 출력 */}
              {errors.subject && <span>제목을 입력해주세요.</span>}
            </div>
          </div>

          {/* className : className이름 설정 */}
          <div className={styled.content}>
            {/* 게시글 내용 입력 용 태그 렌더링 */}
            {/* type: 텍스트 */}
            {/* placeholder : 입력 전 표시될 문자 */}
            {/* defaultValue : 기본값 설정 */}
            <textarea
              type="text"
              placeholder="내용을 입력해주세요."
              defaultValue={board.board.content}
              {...register("content", { required: true })}
            />

            {/* 에러가 존재하는 경우 에러메시지 출력 */}
            {errors.content && <span>내용을 입력해주세요.</span>}
          </div>
        </Segment>
        <div>
          {/* 게시판이 리뷰 게시판인 경우와 아닌 경우를 분기합니다. */}
          {
            name === 'review' ? (
              /* 리뷰 게시판인 경우 업체 상세페이지로 이동합니다. */
              <NavLink to={`/shop/${searchPrams.get('type')}/detail/${searchPrams.get('storeid')}`}>
                {/* className : className이름 설정 */}
                <button className="ui button">목록</button>
              </NavLink>
            ) : (
              /* 리뷰게시판이 아닌 경우 일반 게시판 리스트 페이지로 이동합니다. */
              <NavLink to={`/${name}`}>
                {/* className : className이름 설정 */}
                <button className="ui button">목록</button>
              </NavLink>
            )
          }
          
          {/* className : className이름 설정 */}
          <button className="ui primary button">
            {/* PATH에 아이디값이 존재하는 경우 "수정하기", 존재하지 않는 경우 "글쓰기"를 렌더링합니다. */}
            {param.id ? "수정하기" : "글쓰기"}
          </button>
        </div>
      </form>
    </>
  );
};

export default BoardWriteComponent;
