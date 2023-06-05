import { useMutation, useQuery, useQueryClient } from "react-query";
import * as authApi from '../services/api/auth.api';
import { setAuthorization } from "../services/api";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: 'user',
    queryFn: async () => {
      const { user, token } = await authApi.getUser();
      setAuthorization(token);
      return user;
    },
    staleTime: 15 * 60 * 1000,
    initialData: null,
    
    onError: (err) => {
      console.log(err);
    }
  });

  const loginMutation = useMutation({
    mutationFn(form) {
      return authApi.login(form);
    },
    onSuccess(response) { 
      const { user, token } = response.data;
      setAuthorization(token);
      queryClient.setQueryData('user', user);
      navigate('/');
    }
  });

  const joinMutation = useMutation({
    mutationFn(form) {
      return authApi.join(form);
    },
    onSuccess() {
      navigate('/login');
    }
  });

  const logoutMutation = useMutation({
    mutationFn() {
      return authApi.logout();
    },
    onSuccess() { 
      setAuthorization('');
      queryClient.setQueryData('user', null);
      navigate('/');
    }
  });

  const findMutation = useMutation({
    mutationFn(form) {
      return authApi.findAccount(form);
    },
    onSuccess({ data }) { 
      navigate(`/find/result/${data}`)
    }
  });

  const resetMutation = useMutation({
    mutationFn(form) {
      return authApi.resetPassword(form);
    },
    onSuccess({ data }) { 
      navigate(`/find/reset/password`)
    }
  });

  return {
    user: data,
    login: loginMutation.mutateAsync,
    join: joinMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    findAccount: findMutation.mutateAsync,
    resetPassword: resetMutation.mutateAsync
  }
};

export default useAuth;