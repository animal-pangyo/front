import axios, { URL, getUserId } from ".";

export const fetchChatList = () => {
    const userId = getUserId();
    try {
      return axios.get(`${URL}/${userId}/chat`, {
        headers: {
          Accept: 'application/json', // JSON 응답을 요청합니다.
        },
      });; 
    } catch (error) {
      throw new Error('Error fetching chat list');
    }
};

export  const fetchBlockedChatList = () => {
    const userId = getUserId();
    try {
        return axios.get(`${URL}/block/user/${userId}`)
      } catch (error) {
        throw new Error('Error fetching block list');
      }
   
};
