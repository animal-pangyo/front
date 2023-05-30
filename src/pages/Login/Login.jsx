import { useForm } from "react-hook-form";
import styled from './login.module.css';
import { Link } from "react-router-dom";
import Google from '../../assets/google-icon.svg'
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const auth = useAuth();

  const onSubmit = () => {
    auth.login();
  }

  return (
    <form className={styled.form} onSubmit={handleSubmit(onSubmit)}>
      <h2>로그인</h2>
      <div className={styled.sns}>
        <button className="ui basic large button">
          <Link><img src={Google} />구글 로그인</Link>
        </button>
      </div>
      <div className={styled.divider}>
        <div className="ui horizontal divider">
          Or with id
        </div>
      </div>
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
      <div className={styled.search}>
        <Link>아이디 찾기</Link>
        <Link>비밀번호 찾기</Link>
      </div>
      <div className={styled.button}>
        <button className="ui large primary button">
          로그인
        </button>
      </div>
    </form>
  )
};

export default Login;