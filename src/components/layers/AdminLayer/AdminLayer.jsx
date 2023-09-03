import AdminNav from '../../common/admin/nav/AdminNav';
import AdminTop from '../../common/admin/top/AdminTop';
import styled from './admin-layer.module.css';
import { useRecoilValue } from 'recoil';
import { chatingIdState } from '../../../store/chat';
import { useChatQuery } from '../../../hooks/useChat';
import Chat from '../../chat/Chat';


/* 로그인, 회원가입, 아이디찾기, 비밀번호 찾기 페이지를 제외한 공통적으로 사용하는 레이어 컴포넌트입니다. */
/* children : 해당 레이어에 렌더링한 컴포넌트를 전달받습니다. */
const AuthLayer = ({ children }) => {
  /* 현재 채팅중인지 여부를 가져오는 상태입니다. */
  const chatingId = useRecoilValue(chatingIdState);
  /* 채팅중인 경우 해당 채팅 내용을 가져오게 됩니다. */
  const list = useChatQuery(chatingId);
  return (
    /* className : className이름 설정 */
    <div className={styled.layer}>
      {/* 좌측 네비게이션 컴포넌트 렌더링 */}
      <AdminNav />
      {/* className : className이름 설정 */}
      <div className={styled.right}>
        {/* 상단 유저관련 컴포넌트 렌더링 */}
        <AdminTop />
        {/* className : className이름 설정 */}
        <main className={styled.content}>
          {/* 전달받은 자식 컴포넌트 렌더링 */}
          { children }
        </main>
        {/* 채팅중인 경우 채팅 컴포넌트를 렌더링합니다. */}
        {list.data && <Chat data={list.data} />}
      </div>
    </div>
  )
}

export default AuthLayer;