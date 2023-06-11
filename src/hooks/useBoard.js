import { useMutation, useQuery, useQueryClient } from "react-query";
import * as boardApi from "../services/api/board.api";
import * as storeApi from "../services/api/store.api";
import * as reviewApi from "../services/api/review.api";

const useBoard = ({ type, value, name, searchKeyword, address, storeId }) => {

  const queryClient = useQueryClient();
  let board;
  let api;

  switch (name) {
    case "free":
    case "notice":
    case "faq":
    case "inquiry":
      api = boardApi;
      break;
    case "review":
      api = reviewApi;
      break;
    default:
      api = storeApi;
  }

  if (type === "list") {
    board = useQuery({
      queryKey: [name, value],
      queryFn: async () => {
      const response = await api.fetchBoardList({
          page: value,
          name,
          searchKeyword,
          address
        });

        if (Array.isArray(response.data)) {
          return response.data;
        } else {
          const { posts, ...rest } = response.data;
          const data = (posts || []).map((board) => api.transformBoard(board));
  
          return {
            posts: data,
            ...rest,
          };
        }
      },
    });
  } else if (type === "detail") {
    board = useQuery({
      queryKey: [name, "detail", value],
      queryFn: async () => {
        const response = await api.fetchBoard({ id: value, name, storeId });
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
      return api.updateBoard({ form, name, storeId, reviewId: value });
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
