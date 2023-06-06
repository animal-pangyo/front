import { Button } from "semantic-ui-react";
import TablePagination from "../paging/TablePagination";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from '../../../hooks/useAuth';
import useBoard from '../../../hooks/useBoard';
import usePagination from '../../../hooks/usePagination';

const BoardList = ({ name }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const auth = useAuth();
  const board = useBoard({ type: 'list', value: page, name });
  const { start, end, total, last } = usePagination({ 
    page, 
    perPage: 10, 
    total: board?.total
  });
    
  const deleteBoard = async (id) => {
    await board.deleteBoard(id);
    setMessage({
      visible: true,
      message: '삭제되었습니다.'
    });
  };

  return (
    <>
      <table className="ui celled table">
        <thead>
          <tr>
            <th>No.</th>
            <th>글쓴이</th>
            <th>제목</th>
            <th>등록일</th>
            <th>기능</th>
          </tr>
        </thead>
        <tbody>
          {
            board?.board?.length ? board.board.map((board) => (
              <tr key={board.id}>
                <td data-label="번호">{board.no}</td>
                <td data-label="글쓴이">{board.writer}</td>
                <td data-label="제목" width={800}><NavLink to={`/${name}/detail/${board.id}`}>{board.subject}</NavLink></td>
                <td data-label="등록일">{board.createdAt}</td>
                <td data-label="기능">
                  {
                    auth.user && auth.user.id === board.writer && (
                      <>
                        <Button onClick={() => deleteBoard(board.id)} primary>삭제</Button>
                        <Button onClick={() => navigate(`/board/write/${board.id}`)} primary>수정</Button>
                      </>
                    )
                  }
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} style={{ height: '150px', textAlign: 'center' }}>회원이 존재하지 않습니다.</td>
              </tr>
            )
          }
        </tbody>
        <tfoot>
          <TablePagination page={page} total={total} start={start} end={end} last={last} move={setPage} colSpan={5} />
        </tfoot>
      </table>

      <div>
      {
        auth?.user?.id &&  (
          <NavLink color='#fff' to={`/${name}/write`}>
            <button className="ui primary button">
              글쓰기
            </button>
          </NavLink>
        )
      }
      </div>
    </>
  )
};

export default BoardList;