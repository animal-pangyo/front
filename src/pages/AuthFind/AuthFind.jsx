import { useForm } from "react-hook-form";
import styled from '../Login/login.module.css';
import useAuth from "../../hooks/useAuth";
import { NavLink } from "react-router-dom";
import useMessage from '../../hooks/useMessage';


const AuthFind = ({ type }) => {
  const { register, handleSubmit, getValues, formState: { errors } } = useForm();
  const auth = useAuth();
  const [, setMessage] = useMessage();

  const onSubmit = async (data) => {
    try {
      if (type === 'password' && data.password !== data.passwordChk) {
        setError('passwordChk');
        return;
      }

      if (type === 'password') {
        await auth.resetPassword(getValues());
      } else {
        await auth.findAccount(getValues());
      }
    } catch {
      setMessage({
        visible: true,
        message: '계정이 존재하지 않습니다.'
      });
    }
  }

  return (
    <form className={styled.form} onSubmit={handleSubmit(onSubmit)}>
      <h2>{type === 'id' ? '아이디 찾기' : '비밀번호 초기화'}</h2>
      {
        type === 'password' && (
          <>
            <div className={styled.input}>
              <div className="ui input">
                <input type="text" placeholder="아이디" {...register("id", { required: true })} />
                {errors.id && <span>아이디를 입력해주세요.</span>}
              </div>
            </div>
            <div className={styled.input}>
              <div className="ui input">
                <input type="password" placeholder="비밀번호" {...register("password", { required: true })} />
                {errors.password && <span>비밀번호를 입력해주세요.</span>}
              </div>
            </div>
            <div className={styled.input}>
              <div className="ui input">
                <input type="password" placeholder="비밀번호 확인" {...register("passwordChk", { required: true })} />
                {errors.passwordChk && <span>비밀번호가 일치하지 않습니다.</span>}
              </div>
            </div>
          </> 
        )
      }
      <div className={styled.input}>
        <div className="ui input">
          <input type="text" placeholder="이메일" {...register("email", { required: true })} />
          {errors.email && <span>이메일을 입력해주세요.</span>}
        </div>
      </div>
      <div className={styled.button}>
        <button className="ui large primary button">
          확인
        </button>
      </div>
      <div className={styled.search}>
        <NavLink to="/login">로그인</NavLink>
        <NavLink to="/join">회원가입</NavLink>
      </div>
    </form>
  )
};

export default AuthFind;