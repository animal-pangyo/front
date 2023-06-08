import { useMutation, useQuery } from "react-query";
import * as boardApi from '../services/api/board.api';

const useBoard = ({ type, value, name }) => {
  let board;

  if (type === 'list') {
    board = useQuery({
      queryKey: [name, value],
      queryFn: async () => {
        const response = await boardApi.fetchBoardList({ page: value, name });
        const data = response.data.map((board) => (
          boardApi.transformBoard(board)
        ));
        
        return data;
      }
    });
  } else if (type === 'detail') {
    board = useQuery({
      queryKey: [name, 'detail', value],
      queryFn: async () => {
        const response = await boardApi.fetchBoard({ id: value, name });
        return boardApi.transformBoard(response.data);
      }
    }); 
  }

  const deleteMutation = useMutation({
    mutationFn(id) {
      return boardApi.deleteBoard({ id, name });
    },
    onSuccess() {
      queryClient.invalidateQueries(name)
    }
  });

  const createMutation = useMutation({
    mutationFn(form) {
      return boardApi.createBoard({ name, form });
    }
  });

  const updateMutation = useMutation({
    mutationFn(form) {
      return boardApi.updateBoard({ form, name });
    }
  });

  return {
    board: type === 'list' ? board?.data?.board || [] : board?.data || {},
    deleteBoard: deleteMutation.mutateAsync,
    createBoard: createMutation.mutateAsync,
    updateBoard: updateMutation.mutateAsync
  }
};

export default useBoard;