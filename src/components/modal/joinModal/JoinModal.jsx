import { Modal } from "semantic-ui-react";
import JoinForm from "../../common/admin/joinForm/JoinForm";

const JoinModal = ({ open, setOpen, onSubmit, user }) => {
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>
        {user ? '프로필 수정' : '유저 추가'}
      </Modal.Header>
      <Modal.Content>
        <JoinForm user={user} onSubmit={onSubmit} modal />
      </Modal.Content>
    </Modal>
  )
}

export default JoinModal;