import { Button } from "semantic-ui-react";
import TablePagination from "../common/paging/TablePagination";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useBoard from "../../hooks/useBoard";
import usePagination from "../../hooks/usePagination";
import { useRecoilState } from "recoil";
import { reviewWriteState } from "../../store/review";
import styled from './board.module.css'

const ReviewList = ({ name, storeId, storeInfo }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const auth = useAuth();
  const board = useBoard({ type: "list", value: page, name: "review" });
  const { start, end, total, last } = usePagination({
    page,
    perPage: 10,
    total: board?.total,
  });
  const [_, setState] = useRecoilState(reviewWriteState);

  const deleteBoard = async (id) => {
    await board.deleteBoard(id);
    setMessage({
      visible: true,
      message: "삭제되었습니다.",
    });
  };

  const moveWrite = () => {
    setState({
      storeId,
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
          {board && storeInfo?.reviews?.length ? (
            storeInfo.reviews.map((board) => (
              <tr key={board.review_id}>
                <td data-label="번호">{board.review_id}</td>
                <td data-label="글쓴이">{board.user_id}</td>
                <td data-label="제목" width={500}>
                  <NavLink to={`/review/${name}/detail/${board.review_id}?storeId=${storeId}`}>
                    {board.content}
                  </NavLink>
                </td>
                <td data-label="등록일">{board.created_at}</td>
                <td data-label="기능">
                  {auth.user && auth.user.id === board.user_id && (
                    <>
                      <Button
                        onClick={() => deleteBoard(board.review_id)}
                        primary
                      >
                        삭제
                      </Button>
                      <Button
                        onClick={() =>
                          navigate(`/review/${name}/write/${board.review_id}?storeId=${storeId}`)
                        }
                        primary
                      >
                        수정
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} style={{ height: "150px", textAlign: "center" }}>
                존재하지 않습니다.
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <TablePagination
            page={page}
            total={total}
            start={start}
            end={end}
            last={last}
            move={setPage}
            colSpan={5}
          />
        </tfoot>
      </table>

      <div className={styled.write_button}>
        {auth?.user?.id && (
          <NavLink
            color="#fff"
            to={`/review/${name}/write?storeid=${storeId}&type=${name}`}
            onClick={moveWrite}
          >
            <button className="ui primary button">리뷰 작성</button>
          </NavLink>
        )}
      </div>
    </>
  );
};

export default ReviewList;
