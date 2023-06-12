import { useLocation, useNavigate } from "react-router-dom";
import { setAuthorization } from "../../services/api";
import { useQueryClient } from "react-query";
import { useEffect } from "react";

const LoginCallback = () => {
  const { search } = useLocation();
  const searchPrams = new URLSearchParams(search);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    setAuthorization(searchPrams.get('token'), searchPrams.get('userId'));
    queryClient.invalidateQueries('user');
    navigate('/');
  }, []);
  
};

export default LoginCallback;