import { useForm } from "react-hook-form";
import styled from "./join.module.css";
import { Link } from "react-router-dom";
import Google from "../../../../assets/google-icon.svg";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { useEffect, useRef } from "react";

 
// 회원가입의 폼을 렌더링합니다.
// onSubmit : 저장 버튼 클릭 시 실행될 함수
// modal : 해당 컴포넌트가 모달에서 사용되는지 여부판단
// user : 유저 정보가 존재하는 경우 수정시 사용될 객체
const JoinForm = ({ onSubmit, modal, user }) => {
  // register : form에 속성 등록
  // handleSubmit : form의 onSubmit이 발생했을 때 호출될 함수
  // setValue : form의 속성에 값 할당하기 위한 함수
  // watch : form의 값이 변경되는지 추적하기 위한 함수
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    trigger,
    formState: { errors },
  } = useForm();
  const open = useDaumPostcodePopup(); // 주소 검색을 하기 위한 팝업을 호출합니다.
  const form = watch(); // form의 값이 변경되었을 때 추적하기 위해 사용합니다.

  /* 두개의 비밀번호 확인 후 에러 표현을 위한 함수 */
  const handleNextInput = async () => {
    const isMatch = await trigger('passwordChk');        
  };

  /* 주소검색 버튼 클릭 후 주소검색이 완료 된 후 form의 address1 속성에 값 할당합니다.  */
  const handleComplete = ({ address }) => {
    setValue("address1", address);
  };

  useEffect(() => {
    if (!user?.address) return;
    
    // 유저가 존재시 user의 주소를 form에 할당
    setValue("address1", user.address);
  }, [user]);

  return (
    // className : className이름 설정
    // onSubmit : form이 제출되었을 때 실행 될 함수 할당
    <form className={styled.form} onSubmit={handleSubmit(onSubmit)}>
      {/* 모달에서 사용될 경우 해당 부분 렌더링 하지 않도록 설정합니다. */}
      {!modal && (
        <>
          {/* 타이틀 렌더 */}
          <h2>회원가입</h2>
          {/* className : className이름 설정 */}
          <div className={styled.sns}>
            {/* type : 버튼 타입 설정 */}
            {/* className : className이름 설정 */}
            <button type="button" className="ui basic large button">
              {/* href : 구글 로그인 시 링크 주소 */}
              <a href="/google">
                {/* 이미지를 구글 이미지로 렌더링 */}
                <img src={Google} />
                구글 로그인
              </a>
            </button>
          </div>
          {/* className : className이름 설정 */}
          <div className={styled.divider}>
            {/* className : className이름 설정 */}
            <div className="ui horizontal divider">Or with id</div>
          </div>
        </>
      )}

      {/* className : className이름 설정 */}
      <div className={styled.input}>
        {/* className : className이름 설정 */}
        <div className="ui input">
          {/* 아이디 입력 용 태그 렌더링 */}
          {/* type: 텍스트 */}
          {/* placeholder : 입력 전 표시될 문자 */}
          {/* defaultValue : 기본값 설정 */}
          <input
            type="text"
            placeholder="아이디"
            defaultValue={user?.id}
            {...register("id", { required: user ? false : true })}
            disabled={user}
          />
          {/* 에러가 존재하는 경우 에러메시지 출력 */}
          {(errors.id && !user) && <span>아이디를 입력해주세요.</span>}
        </div>
      </div>
      {
        user ? null : (
          <>
            {/* className : className이름 설정 */}
            <div className={styled.input}>
              {/* className : className이름 설정 */}
              <div className="ui input">
                {/* 비밀번호 입력 용 태그 렌더링 */}
                {/* type: 비밀번호 */}
                {/* placeholder : 입력 전 표시될 문자 */}
                <input
                  type="password"
                  placeholder="비밀번호"
                  {...register("password", { required: true })}
                />
                {/* 에러가 존재하는 경우 에러메시지 출력 */}
                {errors.password && <span>비밀번호를 입력해주세요.</span>}
              </div>
            </div>
            {/* className : className이름 설정 */}
            <div className={styled.input}>
              {/* className : className이름 설정 */}
              <div className="ui input">
                {/* 비밀번호 확인 입력 용 태그 렌더링 */}
                {/* type: 비밀번호 */}
                {/* placeholder : 입력 전 표시될 문자 */}
                {/* validate : 비밀번호 확인 */}
                <input
                  type="password"
                  placeholder="비밀번호 확인"
                  {...register("passwordChk", { required: true,
                    validate: {
                      matchesPreviousPassword: (value) => {
                        const { password } = getValues();
                        return password === value || '비밀번호가 일치하지 않습니다.';
                      },
                    },})}
                    onBlur={handleNextInput}
                />
                {/* 에러가 존재하는 경우 에러메시지 출력 */}
                {errors.passwordChk && <span>비밀번호가 일치하지 않습니다.</span>}
              </div>
            </div>
          </>
        )
      }
      
      {/* className : className이름 설정 */}
      <div className={styled.input}>
        {/* className : className이름 설정 */}
        <div className="ui input">
          {/* 이름 입력 용 태그 렌더링 */}
          {/* type: 텍스트 */}
          {/* placeholder : 입력 전 표시될 문자 */}
          {/* defaultValue : 기본값 설정 */}
          <input
            type="text"
            placeholder="이름"
            defaultValue={user?.name}
            {...register("name", { required: true })}
          />
          {/* 에러가 존재하는 경우 에러메시지 출력 */}
          {errors.name && <span>이름을 입력해주세요.</span>}
        </div>
      </div>
      {/* className : className이름 설정 */}
      <div className={styled.input}>
        {/* className : className이름 설정 */}
        <div className="ui input">
          {/* 이메일 입력 용 태그 렌더링 */}
          {/* type: 텍스트 */}
          {/* placeholder : 입력 전 표시될 문자 */}
          {/* defaultValue : 기본값 설정 */}
          <input
            type="text"
            placeholder="이메일"
            defaultValue={user?.email}
            {...register("email", { required: true })}
          />
          {/* 에러가 존재하는 경우 에러메시지 출력 */}
          {errors.email && <span>이메일을 입력해주세요.</span>}
        </div>
      </div>
      {/* className : className이름 설정 */}
      <div className={styled.input}>
        {/* className : className이름 설정 */}
        <div className="ui input">
          {/* 휴대폰 입력 용 태그 렌더링 */}
          {/* type: 텍스트 */}
          {/* placeholder : 입력 전 표시될 문자 */}
          {/* defaultValue : 기본값 설정 */}
          <input
            type="text"
            placeholder="휴대폰"
            defaultValue={user?.phone}
            {...register("phone", { required: true })}
          />
          {errors.phone && <span>휴대폰을 입력해주세요.</span>}
        </div>
      </div>
      {/* className : className이름 설정 */}
      <div className={styled.birth_input}>
        {/* className : className이름 설정 */}
        <div className={`${styled.input} ${styled.birth}`}>
          {/* 년도 입력 용 태그 렌더링 */}
          {/* type: 텍스트 */}
          {/* placeholder : 입력 전 표시될 문자 */}
          {/* defaultValue : 기본값 설정 */}
          <input
            type="text"
            placeholder="YYYY"
            defaultValue={user?.year}
            {...register("year", { required: true, maxLength: 4 })}
          />
          /
          {/* 월 입력 용 태그 렌더링 */}
          {/* type: 텍스트 */}
          {/* placeholder : 입력 전 표시될 문자 */}
          {/* defaultValue : 기본값 설정 */}
          <input
            type="text"
            placeholder="MM"
            defaultValue={user?.month}
            {...register("month", { required: true, maxLength: 2 })}
          />
          /
          {/* 일 입력 용 태그 렌더링 */}
          {/* type: 텍스트 */}
          {/* placeholder : 입력 전 표시될 문자 */}
          {/* defaultValue : 기본값 설정 */}
          <input
            type="text"
            placeholder="DD"
            defaultValue={user?.day}
            {...register("day", { required: true, maxLength: 2 })}
          />
        </div>
        {/* 에러가 존재하는 경우 에러메시지 출력 */}
        {(errors.year || errors.month || errors.day) && (
          <span className={styled.error}>생년월일을 입력해주세요.</span>
        )}
      </div>
      {/* className : className이름 설정 */}
      <div className={`${styled.input} ${styled.address}`}>
        {/* 주소검색 버튼 클릭시 팝업 오픈 */}
        {/* className : className이름 설정 */}
        <button
          className="ui button"
          onClick={() => open({ onComplete: handleComplete })}
        >
          <i className="search icon"></i>주소 검색
        </button>

        {/* 주소가 입력되지 않은 경우 화면에 보이지 않도록 설정 */}
        {/* className : className이름 설정 */}
        <div
          className={`ui input ${styled.detail_address1}`}
          style={(!form.address1 && !user) ? { display: "none" } : {}}
        >
          {/* 주소 입력 용 태그 렌더링 */}
          {/* type: 텍스트 */}
          {/* defaultValue : 기본값 설정 */}
          {/* disabled : 수정 불가설정 */}
          <input
            type="text"
            defaultValue={user?.address}
            {...register("address1", { required: true })}
            disabled
          />
        </div>

        {/* 주소가 입력되지 않은 경우 화면에 보이지 않도록 설정 */}
        {/* className : className이름 설정 */}
        <div
          className={`ui input ${styled.detail_address2}`}
          style={(!form.address1 && !user) ? { display: "none" } : {}}
        >
          {/* 상세 주소 입력 용 태그 렌더링 */}
          {/* type: 텍스트 */}
          {/* placeholder : 입력 전 표시될 문자 */}
          {/* defaultValue : 기본값 설정 */}
          <input
            type="text"
            placeholder="상세주소입력"
            defaultValue={user?.detail_address}
            {...register("address2", { required: true })}
          />
        </div>
        {/* className : className이름 설정 */}
        {(errors.address1 || errors.address2) && (
          <span className={styled.error}>주소를 입력해주세요.</span>
        )}
      </div>

      {/* className : className이름 설정 */}
      <div className={styled.button}>
        {/* user가 존재하는 경우 수정하기, 존재하지 않는 경우 회원가입 텍스트 출력 */}
        {/* className : className이름 설정 */}
        <button className="ui huge primary button">{user ? '수정하기' : '회원가입'}</button>
      </div>
    </form>
  );
};

export default JoinForm;
