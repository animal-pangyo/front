import { useState } from 'react';
import useUser from '../../hooks/useUser';
import styled from './users.module.css';
import usePagination from '../../hooks/usePagination';
import TablePagination from '../../components/common/paging/TablePagination';
import JoinModal from '../../components/modal/joinModal/JoinModal';
import useAuth from '../../hooks/useAuth';
import useMessage from '../../hooks/useMessage';
import { Button } from 'semantic-ui-react';

/* 한페이지에 보여질 유저 리스트의 수를 결정 */
const PER_PAGE = 10;

/* 유저 리스트를 보여주는 페이지 컴포넌트 입니다. */
const User = () => {
  /* 유저 추가 또는 수정에 사용되는 팝업 노출 유무를 판단하는데 사용합니다. */
  const [open, setOpen] = useState(false);

  /* 유저 리스트의 현재 페이지를 나타냅니다. */
  const [page, setPage] = useState(1);

  /* 화면 상단 메시지를 출력하기 위한 setMessage 함수 */
  const [, setMessage] = useMessage();

  /* 유저와 관련 된 처리를 하기 위한 훅입니다. */
  const auth = useAuth();

  /* 현재 페이지에 해당하는 유저 리스트 데이터를 서버로부터 받아옵니다. */
  const { users } = useUser(page);

  /* 페이지네이션 컴포넌트를 생성하기 위한 정보를 얻어오는 데 사용하는 훅입니다. */
  /* start : 시작 페이지 번호 */
  /* end : 현재 보여질 마지막 페이지 번호 */
  /* total : 전체 게시판 수 */
  /* last : 해당 유저리스트의 마지막 페이지 번호 */
  /* page : 현재 페이지 */
  /* perPage : 한화면에 보여질 유저리스트의 수 */
  const { start, end, total, last } = usePagination({ 
    page, 
    perPage: PER_PAGE, 
    total: users?.total
  });

  /* 유저정보 저장 버튼을 클릭 시 호출되는 함수입니다. */
  /* data : 유저 정보 폼 데이터 */
  const onSubmit = async (data) => {
    /* 유저의 패스워드와 패스워드 확인이 일치하지 않는 경우 패스워드 오류를 저장합니다. */
    if (data.password !== data.passwordChk) {
      setError('passwordChk');
      return;
    }

    /* 유저 정보를 서버로 전송해 유저를 생성합니다. */
    await auth.join(data);

    /* 현재 페이지를 1로 초기화 합니다. */
    setPage(1);

    /* 유저 생성 팝업을 종료합니다. */
    setOpen(false);

    /* 수정되었습니다 메시지를 출력하기 위해 setMessage함수를 호출합니다. */
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
      {/* className : className이름 설정 */}
      <div className={styled.main}>
        <h2>회원리스트</h2>
        {/* className : className이름 설정 */}
        <table className="ui celled table">
          <thead>
            <tr>
              {/* 아이디 컬럼 */}
              <th>아이디</th>
              {/* 이름 컬럼 */}
              <th>이름</th>
              {/* 이메일 컬럼 */}
              <th>이메일</th>
              {/* 생년월일 컬럼 */}
              <th>생년월일</th>
              {/* 연락처 컬럼 */}
              <th>연락처</th>
              {/* 주소 컬럼 */}
              <th>주소</th>
              {/* 기능 컬럼 */}
              <th>기능</th>
            </tr>
          </thead>
          <tbody>
            {
              /* 유저 리스트가 존재하는 경우 유저 리스트를 보여줄 컴포넌트를 렌더링합니다. */
              users?.length ? users.map((user) => (
                /* key : tr 컴포넌트를 렌더링할때 구분하기 위한 키로 유저 아이디를 사용합니다. */
                <tr key={user.id}>
                  {/* data-label : 라벨 정보를 데이터로 저장 */}
                  {/* user.id : 유저 아이디 */}
                  <td data-label="아이디">{user.id}</td>
                  {/* data-label : 라벨 정보를 데이터로 저장 */}
                  {/* user.name : 유저 이름 */}
                  <td data-label="이름">{user.name}</td>
                  {/* data-label : 라벨 정보를 데이터로 저장 */}
                  {/* user.email : 유저 이메일 */}
                  <td data-label="이메일">{user.email}</td>
                  {/* data-label : 라벨 정보를 데이터로 저장 */}
                  {/* user.birth : 유저 생년월일 */}
                  <td data-label="생년월일">{user.birth}</td>
                  {/* data-label : 라벨 정보를 데이터로 저장 */}
                  {/* user.phone : 유저 전화번호 */}
                  <td data-label="연락처">{user.phone}</td>
                  {/* data-label : 라벨 정보를 데이터로 저장 */}
                  {/* user.address : 유저 주소 */}
                  <td data-label="주소">{user.address}</td>
                  {/* data-label : 라벨 정보를 데이터로 저장 */}
                  {/* 삭제와 같은 기능을 담당합니다. */}
                  <td data-label="기능">
                    {/* 버튼 클릭 시 해당 유저는 삭제됩니다. */}
                    {/* onClick : 버튼 클릭 시 호출 되는 함수입니다. */}
                    <Button onClick={() => deleteUser(user.id)} primary>삭제</Button>
                  </td>
                </tr>
              )) : (
                <tr>
                  {/* 회원이 존재하지 않는 경우 렌더링됩니다. */}
                  {/* colSpan : 컬럼 7개를 하나로 합칩니다. */}
                  {/* style : 스타일을 지정합니다. */}
                  <td colSpan={7} style={{ height: '150px', textAlign: 'center' }}>회원이 존재하지 않습니다.</td>
                </tr>
              )
            }
          </tbody>
          <tfoot>
            {/* 페이지네이션을 렌더링하는 컴포넌트 입니다. */}
            {/* page : 현제 페이지 정보 */}
            {/* start : 시작 페이지 번호 */}
            {/* end : 현재 보여질 마지막 페이지 번호 */}
            {/* total : 전체 유저리스트 수 */}
            {/* last : 해당 유저리스트의 마지막 페이지 번호 */}
            {/* move : 페이지 번호 클릭 시 실행될 함수입니다 */}
            {/* colSpan : 컬럼을 합칠 개수를 나타냅니다. */}
            <TablePagination page={page} total={total} start={start} end={end} last={last} move={setPage} colSpan={7} />
          </tfoot>
        </table>

        {/* 유저가 관리자인 경우 유저 추가 버튼을 렌더링합니다. */}
        {
          auth.user?.roles?.includes('admin') && (
            <div>
              {/* className : className이름 설정 */}
              {/* onClick : 유저 추가 버튼을 클릭 시 호출되는 함수로, 유저 추가 팝업을 호출합니다.  */}
              <button className="ui primary button" onClick={() => setOpen(true)}>
                유저 추가
              </button>
            </div>
          )
        }
        
        {/* 유저를 추가하기 위해 사용되는 모달 */}
        {/* open : 모달이 보여줄지 여부 결정하기 위한 상태 */}
        {/* setOpen : open 상태를 변경하기 위한 함수 */}
        {/* onSubmit : 유저 정보 수정 완료 후 호출될 함수 */}
        <JoinModal open={open} setOpen={setOpen} onSubmit={onSubmit} />
      </div>
    </>
  )
};

export default User;