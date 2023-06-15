import { useQuery } from "react-query";
import * as useApi from '../services/api/user.api';

/* 전체 유저에 대한 정보를 가져오기 위해서 사용하는 훅입니다. */
/* page : 현재 페이지 정보 */
const useUser = (page) => {
  /* 현재 페이지에 해당하는 유저 리스트를 서버로부터 요청 후 결과를 리액트 쿼리에 저장합니다. */
  const { data: users } = useQuery({
    /* 유저 리스트를 저장하기 위한 키로 'users'와 현재 페이지를 설정합니다. */
    queryKey: ['users', page],

    /* 데이터를 전달받기 위한 기능을 수행하는 함수입니다. */
    queryFn: async () => {
      /* 현재 페이지 정보를 서버로 전송하여 해당하는 유저 리스트를 전달받습니다. */
      const response = await useApi.fetchUsers({ page });

      /* 전달받은 유저 정보 반복 수행하여 유저객체의 키를 변경합니다. */
      const data = response.data.map((user) => (
        useApi.transformUser(user)
      ));

      /* 키가 변경된 유저 객체 배열을 반홥니다. */
      return data;
    }
  });

  return {
    users
  }
};

export default useUser;