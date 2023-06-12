import { useLocation } from "react-router-dom";
import { setAuthorization } from "../../services/api";
import { useQueryClient } from "react-query";
import { useEffect } from "react";

const LoginCallback = () => {
  const { search } = useLocation();
  const searchPrams = new URLSearchParams(search);
  const queryClient = useQueryClient();
  setAuthorization(searchPrams.get('token'), searchPrams.get('email'));
  queryClient.refetchQueries(['user']);

  useEffect(() => {
    window.location.reload()
  }, []);
  
};

export default LoginCallback;