import { useQuery } from "react-query";
import * as useApi from '../services/api/user.api';

const useUser = (page) => {
  const { data: users } = useQuery({
    queryKey: ['users', page],
    queryFn: async () => {
      const response = await useApi.fetchUsers({ page });
      return response.data;
    }
  });

  return {
    users
  }
};

export default useUser;