import { useForm } from "react-hook-form";
import styled from "./join.module.css";
import { Link } from "react-router-dom";
import Google from "../../../../assets/google-icon.svg";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { useEffect } from "react";

const JoinForm = ({ onSubmit, modal, user }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    setError,
  } = useForm();
  const open = useDaumPostcodePopup();
  const form = watch();

  const handleComplete = ({ address }) => {
    setValue("address1", address);
  };

  useEffect(() => {
    if (!user?.address) return;
    
    setValue("address1", user.address);
  }, [user]);

  return (
    <form className={styled.form} onSubmit={handleSubmit(onSubmit)}>
      {!modal && (
        <>
          <h2>회원가입</h2>
          <div className={styled.sns}>
            <button type="button" className="ui basic large button">
              <Link>
                <img src={Google} />
                구글 로그인
              </Link>
            </button>
          </div>
          <div className={styled.divider}>
            <div className="ui horizontal divider">Or with id</div>
          </div>
        </>
      )}

      <div className={styled.input}>
        <div className="ui input">
          <input
            type="text"
            placeholder="아이디"
            defaultValue={user?.id}
            {...register("id", { required: user ? false : true })}
            disabled={user}
          />
          {(errors.id && !user) && <span>아이디를 입력해주세요.</span>}
        </div>
      </div>
      {
        user ? null : (
          <>
            <div className={styled.input}>
              <div className="ui input">
                <input
                  type="password"
                  placeholder="비밀번호"
                  {...register("password", { required: true })}
                />
                {errors.password && <span>비밀번호를 입력해주세요.</span>}
              </div>
            </div>
            <div className={styled.input}>
              <div className="ui input">
                <input
                  type="password"
                  placeholder="비밀번호 확인"
                  {...register("passwordChk", { required: true })}
                />
                {errors.passwordChk && <span>비밀번호가 일치하지 않습니다.</span>}
              </div>
            </div>
          </>
        )
      }
      
      <div className={styled.input}>
        <div className="ui input">
          <input
            type="text"
            placeholder="이름"
            defaultValue={user?.name}
            {...register("name", { required: true })}
          />
          {errors.name && <span>이름을 입력해주세요.</span>}
        </div>
      </div>
      <div className={styled.input}>
        <div className="ui input">
          <input
            type="text"
            placeholder="이메일"
            defaultValue={user?.email}
            {...register("email", { required: true })}
          />
          {errors.email && <span>이메일을 입력해주세요.</span>}
        </div>
      </div>
      <div className={styled.input}>
        <div className="ui input">
          <input
            type="text"
            placeholder="휴대폰"
            defaultValue={user?.phone}
            {...register("phone", { required: true })}
          />
          {errors.phone && <span>휴대폰을 입력해주세요.</span>}
        </div>
      </div>
      <div className={styled.birth_input}>
        <div className={`${styled.input} ${styled.birth}`}>
          <input
            type="text"
            placeholder="YYYY"
            defaultValue={user?.year}
            {...register("year", { required: true, maxLength: 4 })}
          />
          /
          <input
            type="text"
            placeholder="MM"
            defaultValue={user?.month}
            {...register("month", { required: true, maxLength: 2 })}
          />
          /
          <input
            type="text"
            placeholder="DD"
            defaultValue={user?.day}
            {...register("day", { required: true, maxLength: 2 })}
          />
        </div>
        {(errors.year || errors.month || errors.day) && (
          <span className={styled.error}>생년월일을 입력해주세요.</span>
        )}
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
          style={(!form.address1 && !user) ? { display: "none" } : {}}
        >
          <input
            type="text"
            defaultValue={user?.address}
            {...register("address1", { required: true })}
            disabled
          />
        </div>

        <div
          className={`ui input ${styled.detail_address2}`}
          style={(!form.address1 && !user) ? { display: "none" } : {}}
        >
          <input
            type="text"
            placeholder="상세주소입력"
            defaultValue={user?.detail_address}
            {...register("address2", { required: true })}
          />
        </div>
        {(errors.address1 || errors.address2) && (
          <span className={styled.error}>주소를 입력해주세요.</span>
        )}
      </div>

      <div className={styled.button}>
        <button className="ui huge primary button">{user ? '수정하기' : '회원가입'}</button>
      </div>
    </form>
  );
};

export default JoinForm;
