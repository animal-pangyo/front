import { Modal } from "semantic-ui-react";
import JoinForm from "../../common/admin/joinForm/JoinForm";

/* 유저 정보를 수정 또는 추가하기 위한 모달 컴포넌트입니다. */
/* open : 모달을 켤지말지를 결정합니다 */
/* setOpen : 모달 종료 또는 표현을 결정하는 함수입니다. */
/* onSubmit : 저장 버튼 클릭 시 호출될 함수입니다. */
/* user : 유저 정보를 수정할 데이터입니다. */
const JoinModal = ({ open, setOpen, onSubmit, user }) => {
  return (
    /* 모달 컴포넌트입니다. */
    /* onClose : 닫기 버튼 클릭 시 호출될 함수로 모달이 종료됩니다. */
    /* onOpen : 열기 버튼 클릭 시 호출될 함수로 모달이 생성됩니다. */
    /* open : 모달을 켤지말지를 결정합니다 */
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      {/* 모달의 헤더에 들어갈 글자를 렌더링합니다. */}
      <Modal.Header>
        {/* 유저가 존재하는 경우 '프로필 수정', 존재하지 않는 경우 '유저 추가'를 렌더링합니다. */}
        {user ? '프로필 수정' : '유저 추가'}
      </Modal.Header>

      {/* 모달의 컨텐츠가 들어갈 부분입니다. */}
      <Modal.Content>
        {/* 회원가입 폼 컴포넌트를 렌더링합니다. */}
        {/* user : 유저를 수정하는 경우 유저정보를 전달합니다. */}
        {/* onSubmit : 저장버튼 클릭 시 호출될 함수입니다. */}
        {/* modal : 모달 유무를 전달합니다. */}
        <JoinForm user={user} onSubmit={onSubmit} modal />
      </Modal.Content>
    </Modal>
  )
}

export default JoinModal;