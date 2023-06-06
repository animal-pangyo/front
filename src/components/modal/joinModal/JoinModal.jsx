import { Modal } from "semantic-ui-react";
import JoinForm from "../../common/admin/joinForm/JoinForm";

const JoinModal = ({ open, setOpen, onSubmit }) => {
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>유저 추가</Modal.Header>
      <Modal.Content>
        <JoinForm onSubmit={onSubmit} modal />
      </Modal.Content>
    </Modal>
  )
}

export default JoinModal;