import { useQuery } from "react-query";
import * as useApi from '../services/api/user.api';

const useUser = (page) => {
  const { data: users } = useQuery({
    queryKey: ['users', page],
    queryFn: async () => {
      const response = await useApi.fetchUsers({ page });
      const data = response.data.map((user) => (
        useApi.transformUser(user)
      ));
      return data;
    }
  });

  return {
    users
  }
};

export default useUser;