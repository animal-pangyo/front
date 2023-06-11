import { useMutation, useQuery, useQueryClient } from "react-query";
import * as authApi from "../services/api/auth.api";
import { setAuthorization } from "../services/api";
import { useNavigate } from "react-router-dom";
import { transformUser } from "../services/api/user.api";

const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: "user",
    queryFn: async () => {
      const response = await authApi.getUser();
      const { accessToken, ...user } = response.data;
      setAuthorization(accessToken, user.user_id);
      return transformUser(user);
    },
    staleTime: 15 * 60 * 1000,
    initialData: null,

    onError: (err) => {
      console.log(err);
    },
  });

  const loginMutation = useMutation({
    mutationFn(form) {
      return authApi.login(form);
    },
    onSuccess(response) {
      const { accessToken, ...user } = response.data;
      setAuthorization(accessToken, user.user_id);
      queryClient.setQueryData("user", transformUser(user));
      navigate("/");
    },
    onError(error) {
      alert(error.message);
    },
  });

  const joinMutation = useMutation({
    mutationFn(form) {
      return authApi.join(form);
    },
  });

  const logoutMutation = useMutation({
    mutationFn() {
      return authApi.logout();
    },
    onSuccess() {
      setAuthorization("");
      queryClient.setQueryData("user", null);
      navigate("/");
    },
  });

  const findMutation = useMutation({
    mutationFn(form) {
      return authApi.findAccount(form);
    },
    onSuccess({ data }) {
      navigate(`/find/result/${data.id}`);
    },
  });

  const resetMutation = useMutation({
    mutationFn(form) {
      return authApi.resetPassword(form);
    },
    onSuccess() {
      navigate(`/find/reset/password`);
    },
  });

  const updateMutation = useMutation({
    mutationFn(form) {
      return authApi.updateProfile(form);
    },
    onSuccess() {
      queryClient.invalidateQueries("user");
    }
  });

  const deleteUserMutation = useMutation({
    mutationFn(id) {
      return authApi.deleteUser(id);
    },
    onSuccess() {
      queryClient.invalidateQueries("user");
    },
  });

  return {
    user: data,
    login: loginMutation.mutateAsync,
    join: joinMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    findAccount: findMutation.mutateAsync,
    resetPassword: resetMutation.mutateAsync,
    deleteUser: deleteUserMutation.mutateAsync,
    updateProfile: updateMutation.mutateAsync
  };
};

export default useAuth;
