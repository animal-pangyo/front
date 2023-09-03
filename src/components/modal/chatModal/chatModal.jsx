import { Modal, Icon } from "semantic-ui-react";
import Chat from "../../common/chat/Chat";
import { useState } from "react";
import SettingChat from "../../common/settingChat/SettingChat";

/* open : 모달을 켤지말지를 결정합니다 */
/* setOpen : 모달 종료 또는 표현을 결정하는 함수입니다. */
const ChatModal = ({ open, setOpen }) => {
    const [isSetting, setIsSetting] = useState(false)
    const handleHamburgerClick = () => {
        // 원하는 동작을 여기에 추가하십시오.
        // 예를 들어, 모달을 닫는다면:
        setIsSetting(!isSetting);
      };
  return (
    /* 모달 컴포넌트입니다. */
    /* onClose : 닫기 버튼 클릭 시 호출될 함수로 모달이 종료됩니다. */
    /* onOpen : 열기 버튼 클릭 시 호출될 함수로 모달이 생성됩니다. */
    /* open : 모달을 켤지말지를 결정합니다 */

       <Modal
       onClose={() => setOpen(false)}
       onOpen={() => setOpen(true)}
       open={open}
       size='mini'
       >
       {/* 모달의 헤더에 들어갈 글자를 렌더링합니다. */}
       <Modal.Header>
        {isSetting ? '채팅 설정' : '채팅 리스트'}
        <Icon
          name={isSetting ? 'x' : 'bars'}
          style={{ float: 'right', cursor: 'pointer' }}
          onClick={handleHamburgerClick}
        />
       </Modal.Header>
 
       {/* 모달의 컨텐츠가 들어갈 부분입니다. */}
 
         {/* isSetting 여부에 따라 채팅 폼 컴포넌트 또는 SettingChat 컴포넌트를 렌더링합니다. */}
         {isSetting ? <SettingChat /> : <Chat />}
 
        </Modal>
    
  )
}

export default ChatModal;