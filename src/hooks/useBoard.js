import { useMutation, useQuery } from "react-query";
import * as boardApi from '../services/api/board.api';

const useBoard = ({ type, value }) => {
  let board;

  if (type === 'list') {
    board = useQuery({
      queryKey: ['board', value],
      queryFn: async () => {
        const response = await boardApi.fetchBoardList({ page: value });
        return response.data;
      }
    });
  } else if (type === 'detail') {
    board = useQuery({
      queryKey: ['board', 'detail', value],
      queryFn: async () => {
        const response = await boardApi.fetchBoard(value);
        return response.data;
      }
    }); 
  }

  const deleteMutation = useMutation({
    mutationFn(id) {
      return boardApi.deleteBoard(id);
    },
    onSuccess() {
      queryClient.invalidateQueries('board')
    }
  });

  const createMutation = useMutation({
    mutationFn(form) {
      return boardApi.createBoard(form);
    }
  });

  const updateMutation = useMutation({
    mutationFn(form) {
      return boardApi.updateBoard(form);
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