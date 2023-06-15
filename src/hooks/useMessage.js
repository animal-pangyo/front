import { useRecoilState } from "recoil";
import { messageState } from "../store/message";

/* 화면 상단에 메시지 정보를 출력하기 위해서 사용되는 훅입니다. */
const useMessage = () => {
  /* 리코일에서 저장하고 있는 메시지 정보를 가져옵니다. */
  const [message, setMessage] = useRecoilState(messageState);

  /* 메시지 변경 시 처리되는 함수입니다. */
  /* message : 전달받은 메시지 정보입니다. */
  const handleChange = (message) => {
    /* 메시지 정보를 리코일에 저장합니다. */
    setMessage({ ...message });

    /* 일정 시간 후에 화면에서 메시지를 보이지 않도록 하기 위해 setTimeout함수를 호출합니다. */
    setTimeout(() => {
      /* 일정 시간이 지난 후 메시지 정보를 빈값으로 초기화합니다. */
      setMessage({
        visible: false,
        message: ''
      });

    /* 2초 후에 호출됩니다. */
    }, 2000);
  };

  return [message, handleChange]
};

export default useMessage;