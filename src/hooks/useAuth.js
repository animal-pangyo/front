import { useMutation } from "react-query";
import authApi from '../services/api/auth.api';
import { setAuthorization } from "../services/api";

const useAuth = () => {
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
    onSuccess({ user, token }) { 
      setAuthorization(token);
      queryClient.setQueryData('user', user);
    }
  });

  const joinMutation = useMutation({
    mutationFn(form) {
      return authApi.join(form);
    }
  });

  const logoutMutation = useMutation({
    mutationFn() {
      return authApi.logout();
    },
    onSuccess() { 
      setAuthorization('');
      queryClient.setQueryData('user', null);
    }
  });

  return {
    user: data,
    login: loginMutation.mutateAsync(),
    join: joinMutation.mutateAsync(),
    logout: logoutMutation.mutateAsync()
  }
};

export default useAuth;