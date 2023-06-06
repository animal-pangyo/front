import { useNavigate } from "react-router-dom";
import JoinForm from "../../components/common/admin/joinForm/JoinForm";
import useAuth from '../../hooks/useAuth';

const Join = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const onSubmit = async data => {
    if (data.password !== data.passwordChk) {
      setError('passwordChk');
      return;
    }

    await auth.join(data);
    navigate('/login');
  };


  return (
    <JoinForm onSubmit={onSubmit} />
  )
};

export default Join;