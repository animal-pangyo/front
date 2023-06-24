import { useMutation, useQuery, useQueryClient } from "react-query";
import * as authApi from "../services/api/auth.api";
import { setAuthorization } from "../services/api";
import { useNavigate } from "react-router-dom";
import { transformUser } from "../services/api/user.api";

/* 유저와 관련 된 기능을 담당하는 훅입니다. */
const useAuth = () => {
  /* 페이지 이동을 위한 훅입니다. */
  const navigate = useNavigate();

  /* 리액트 쿼리 스토어에 접근하기 위한 훅입니다. */
  const queryClient = useQueryClient();

  /* 유저 정보를 서버로 부터 요청 후 결과를 리액트 쿼리에 저장합니다. */
  const { data } = useQuery({
    /* 유저 정보를 저장할때 사용하는 키 정보입니다. */
    queryKey: ["user"],

    /* 유저 정보를 가져오기 위한 API를 호출하는 함수입니다. */
    queryFn: async () => {
      /* 서버로부터 유저정보를 가져옵니다. */
      const response = await authApi.getUser();

      /* 서버로부터 전달 받은 데이터에서 액세스토큰과 유저 정보를 저장합니다. */
      const { accessToken, ...user } = response.data;

      /* 전달받은 액세스 토큰과, 유저 아이디를 로컬 스토리지에 저장합니다. */
      setAuthorization(accessToken, user.user_id);

      /* transformUser : 서버로부터 전달 받은 데이터의 속성을 변경 후 반환합니다. */
      return transformUser(user);
    },

    onError() {
      // 정상적인 토큰이 아닌 경우 초기화
      setAuthorization('', '');
    },

    /* 유저 정보 호출 후 새롭게 API 전송까지 걸리는 시간을 설정합니다. 15분입니다. */
    staleTime: 15 * 60 * 1000,

    /* 초기 데이터는 null로 초기화합니다. */
    initialData: null,
  });

  /* 로그인 버튼을 클릭 시 호출되는 함수입니다. */
  const loginMutation = useMutation({
    /* 로그인 버튼 클릭 시 전달받은 폼 데이터를 서버로 전달합니다. */
    mutationFn(form) {
      return authApi.login(form);
    },

    /* 로그인이 정상적으로 실행되었을 시에 처리되는 함수입니다. */
    /* response : 서버로부터 전달받은 응답데이터입니다. */
    onSuccess(response) {
      /* 응답 데이터로부터 액세스 토큰과 유저 정보를 저장합니다. */
      const { accessToken, ...user } = response.data;

      /* 전달받은 액세스 토큰과, 유저 아이디를 로컬 스토리지에 저장합니다. */
      setAuthorization(accessToken, user.user_id);

      /* 리액트 쿼리 스토어에 "user" 키를 가진 변수에 user 정보를 저장합니다. */
      /* transformUser : 서버로부터 전달 받은 데이터의 속성을 변경 후 반환합니다. */
      queryClient.setQueryData("user", transformUser(user));

      /* 로그인 처리가 완료 된 후 메인 페이지로 이동합니다. */
      navigate("/");
    },
  });

  /* 회원가입 버튼을 클릭 시 호출되는 함수입니다. */
  const joinMutation = useMutation({
    /* 회원가입 버튼 클릭 시 전달받은 폼 데이터를 서버로 전달합니다. */
    mutationFn(form) {
      return authApi.join(form);
    },
  });

  /* 로그아웃 버튼을 클릭 시 호출되는 함수입니다. */
  const logoutMutation = useMutation({
    /* 로그아웃 버튼 클릭 시 서버 API를 호출합니다. */
    mutationFn() {
      return authApi.logout();
    },

    /* 로그아웃이 정상적으로 실행되었을 시에 처리되는 함수입니다. */
    onSuccess() {
      /* 로컬 스토리지에 액세스 토큰과 유저 정보를 삭제합니다. */
      setAuthorization("");

      /* 리액트 쿼리의 "user" 키를 가진 변수에 null로 초기화합니다. */
      queryClient.setQueryData("user", null);

      /* 로그아웃 처리가 완료 된 후 메인 페이지로 이동합니다. */
      navigate("/");
    },
  });

  /* 유저 아이디 찾기 버튼 클릭 시 호출되는 함수입니다. */
  const findMutation = useMutation({
    /* 유저아이디 찾기 버튼 클릭 시 전달받은 폼 데이터를 서버로 전달합니다. */
    mutationFn(form) {
      return authApi.findAccount(form);
    },

    /* 유저 아이디 찾기가 정상적으로 실행되었을 시에 처리되는 함수입니다. */
    /* data : 유저 아이디 정보가 담긴 객체입니다. */
    onSuccess({ data }) {
      /* 유저 아이디 찾기 완료 페이지로 이동합니다. 이때 아이디 정보를 함께 전달합니다. */
      navigate(`/find/result/${data.id}`);
    },
  });

  /* 유저 비밀번호 초기화 버튼 클릭 시 호출되는 함수입니다. */
  const resetMutation = useMutation({
    /* 유저 비밀번호 초기화 버튼 클릭 시 전달받은 폼 데이터를 서버로 전달합니다. */
    mutationFn(form) {
      return authApi.resetPassword(form);
    },

    /* 유저 비밀번호 초기화가 정상적으로 실행되었을 시에 처리되는 함수입니다. */
    onSuccess() {
      /* 비밀번호 초기화 완료 후 결과 페이지로 이동합니다. */
      navigate(`/find/reset/password`);
    },
  });

  /* 유저의 정보를 수정하는 버튼 클릭 시 호출되는 함수입니다. */
  const updateMutation = useMutation({
    /* 유저의 정보를 수정하는 버튼 클릭 시 전달받은 폼 데이터를 서버로 전달합니다. */
    mutationFn(form) {
      return authApi.updateProfile(form);
    },

     /* 유저의 정보를 수정이 정상적으로 실행되었을 시에 처리되는 함수입니다. */
    onSuccess() {
      /* "user" 변수의 유효하지 않음 처리를 하여 새롭게 유저 정보를 가져올 수 있도록 함수를 호출합니다. */
      /* 유저 정보를 최신화하기 위해 호출합니다. */
      queryClient.invalidateQueries("user");
    }
  });

  /* 유저 삭제 버튼 클릭 시 호출되는 함수입니다. */
  const deleteUserMutation = useMutation({
    /* 유저 삭제 버튼 클릭 시 전달받은 아이값을 서버로 전달합니다. */
    mutationFn(id) {
      return authApi.deleteUser(id);
    },

    /* 유저 삭제가 정상적으로 실행되었을 경우 처리되는 함수입니다. */
    onSuccess() {
      /* "user" 변수의 유효하지 않음 처리를 하여 새롭게 유저 정보를 가져올 수 있도록 함수를 호출합니다. */
      /* 유저 정보를 최신화하기 위해 호출합니다. */
      queryClient.invalidateQueries("users");
    },
  });

  /* 위에서 생성한 개겣를 반환합니다. */
  /* user : 유저 객체 */
  /* login : 로그인 */
  /* join : 회원가입 */ 
  /* logout : 로그아웃 */
  /* findAccount : 유저 아이디 찾기 */
  /* resetPassword : 비밀번호 초기화 */
  /* deleteUser : 유저 삭제 */
  /* updateProfile : 유저 정보 수정 */
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
