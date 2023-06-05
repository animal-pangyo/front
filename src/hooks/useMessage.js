import { useRecoilState } from "recoil";
import { messageState } from "../store/message";

const useMessage = () => {
  const [message, setMessage] = useRecoilState(messageState);

  const handleChange = (message) => {
    setMessage({ ...message });
    setTimeout(() => {
      setMessage({
        visible: false,
        message: ''
      });
    }, 2000);
  };

  return [message, handleChange]
};

export default useMessage;