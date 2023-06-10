import { useMutation, useQuery, useQueryClient } from "react-query";
import * as boardApi from "../services/api/board.api";
import * as storeApi from "../services/api/store.api";

const getContext = (name) => {
  switch (name) {
    case "free":
    case "notice":
    case "faq":
    case "inquiry":
    case "review":
      return "posts";
    default:
      return "stores";
  }
};

const useBoard = ({ type, value, name, searchKeyword }) => {
  const queryClient = useQueryClient();
  let board;
  let api = getContext(name) === "posts" ? boardApi : storeApi;

  if (type === "list") {
    board = useQuery({
      queryKey: [name, value],
      queryFn: async () => {
        const response = await api.fetchBoardList({
          page: value,
          name,
          searchKeyword,
        });
        const { posts, ...rest } = response.data;
        const data = posts.map((board) => api.transformBoard(board));

        return {
          posts: data,
          ...rest,
        };
      },
    });
  } else if (type === "detail") {
    board = useQuery({
      queryKey: [name, "detail", value],
      queryFn: async () => {
        const response = await api.fetchBoard({ id: value, name });
        return api.transformBoard(response.data);
      },
    });
  }

  const deleteMutation = useMutation({
    mutationFn(id) {
      return api.deleteBoard({ id, name });
    },
    onSuccess() {
      queryClient.invalidateQueries(name);
    },
  });

  const createMutation = useMutation({
    mutationFn(form) {
      return api.createBoard({ name, form });
    },
  });

  const createAnswerMutation = useMutation({
    mutationFn(answer) {
      return api.createAnswer({ name, ...answer });
    },
  });

  const updateMutation = useMutation({
    mutationFn(form) {
      return api.updateBoard({ form, name });
    },
  });

  const fetchStores = useMutation({
    async mutationFn([latitude, longitude]) {
      const response = await storeApi.fetchBoardList({
        latitude,
        longitude,
        name,
      });

      // id, name, address
      return response.data;
    },
  });

  return {
    board: type === "list" ? board?.data || [] : board?.data || {},
    deleteBoard: deleteMutation.mutateAsync,
    createBoard: createMutation.mutateAsync,
    updateBoard: updateMutation.mutateAsync,
    createAnswer: createAnswerMutation.mutateAsync,
  };
};

export default useBoard;
