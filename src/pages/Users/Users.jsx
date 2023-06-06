import { useState } from 'react';
import useUser from '../../hooks/useUser';
import styled from './users.module.css';
import usePagination from '../../hooks/usePagination';
import TablePagination from '../../components/common/paging/TablePagination';
import JoinModal from '../../components/modal/joinModal/JoinModal';
import useAuth from '../../hooks/useAuth';
import useMessage from '../../hooks/useMessage';
import { Button } from 'semantic-ui-react';

const PER_PAGE = 10;

const User = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [, setMessage] = useMessage();
  const auth = useAuth();
  const { users } = useUser(page);
  const { start, end, total, last } = usePagination({ 
    page, 
    perPage: PER_PAGE, 
    total: users?.total
  });

  const onSubmit = async (data) => {
    if (data.password !== data.passwordChk) {
      setError('passwordChk');
      return;
    }

    await auth.join(data);
    setPage(1);
    setOpen(false);
    setMessage({
      visible: true,
      message: '추가되었습니다.'
    });
  };

  const deleteUser = async (id) => {
    await auth.deleteUser(id);
    setMessage({
      visible: true,
      message: '삭제되었습니다.'
    });
  };

  return (
    <>
      <div className={styled.main}>
        <h2>회원리스트</h2>
        <table className="ui celled table">
          <thead>
            <tr>
              <th>아이디</th>
              <th>이름</th>
              <th>이메일</th>
              <th>생년월일</th>
              <th>연락처</th>
              <th>주소</th>
              <th>기능</th>
            </tr>
          </thead>
          <tbody>
            {
              users?.users?.length ? users.users.map((user) => (
                <tr key={user.id}>
                  <td data-label="아이디">{user.id}</td>
                  <td data-label="이름">{user.name}</td>
                  <td data-label="이메일">{user.email}</td>
                  <td data-label="생년월일">{user.birth}</td>
                  <td data-label="연락처">{user.phone}</td>
                  <td data-label="주소">{user.address}</td>
                  <td data-label="기능">
                    <Button onClick={() => deleteUser(user.id)} primary>삭제</Button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} style={{ height: '150px', textAlign: 'center' }}>회원이 존재하지 않습니다.</td>
                </tr>
              )
            }
          </tbody>
          <tfoot>
            <TablePagination page={page} total={total} start={start} end={end} last={last} move={setPage} colSpan={7} />
          </tfoot>
        </table>

        <div>
          <button className="ui primary button" onClick={() => setOpen(true)}>
            유저 추가
          </button>
        </div>

        <JoinModal open={open} setOpen={setOpen} onSubmit={onSubmit} />
      </div>
    </>
  )
};

export default User;