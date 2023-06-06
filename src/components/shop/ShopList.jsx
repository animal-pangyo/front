import { Button } from "semantic-ui-react";
import TablePagination from "../common/paging/TablePagination";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from '../../hooks/useAuth';
import useBoard from '../../hooks/useBoard';
import usePagination from '../../hooks/usePagination';

const ShopList = ({ name }) => {
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
            <th>업체명</th>
            <th>영업시간</th>
            <th>연락처</th>
            <th>기능</th>
          </tr>
        </thead>
        <tbody>
          {
            board?.board?.length ? board.board.map((board) => (
              <tr key={board.id}>
                <td data-label="번호">{board.no}</td>
                <td data-label="업체명"><NavLink to={`/shop/${name}/detail/${board.id}`}>{board.name}</NavLink></td>
                <td data-label="영업시간">{board.time}</td>
                <td data-label="연락처">{board.phone}</td>
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
                <td colSpan={5} style={{ height: '150px', textAlign: 'center' }}>존재하지 않습니다.</td>
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
          <NavLink color='#fff' to={`/shop/${name}/write`}>
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

export default ShopList;