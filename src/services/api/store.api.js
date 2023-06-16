import axios, { URL, getUserId } from ".";

/* 게시판의 종류에 따라서 사용한 컨텍스트를 달리 하기 위한 함수입니다. */
const getContext = (name) => {
  switch (name) {
    case "free":
    case "notice":
    case "faq":
    case "inquiry":
      return "posts";
    default:
      return "stores";
  }
};

/* 업체 리스트를 가져옵니다. */
/* position : 현재 위치(위도, 경도) */
/* name : 업체 타입 */
/* searchKeyword : 업체를 검색할 키워드 */
/* address : 업체를 검색할 키워드 */
/* level : 줌값에 따라 검색할 범위 결정 */
export const fetchBoardList = ({ name, page: position, searchKeyword, address, level }) => {
  /* 포지션 값이 존재하는 경우 포지션 값과 줌 값에 따라 업체 리스트를 검색합니다. */
  if (position.length) {
    return axios.get(
      `${URL}/${getContext(name)}/map?latitude=${position[0]}&longitude=${
        position[1]
      }&keyword=${name}&level=${level}`
    );
  } else if (address) {
  /* 주소가 존재하는 경우 주소 값 따라 업체 리스트를 검색합니다. */
    return axios.get(
      `${URL}/${getContext(name)}/map?address=${address}&keyword=${name}`
    );
  } else {
    /* 검색 키워드에 따라 업체리스트를 검색합니다.  */
    return axios.get(
      `${URL}/stores/find?&word=${searchKeyword}keyword=${name}`
    );
  }
};

/* id에 해당하는 업체를 삭제하는 서비스 */
/* id : 업체 아이디 */
/* name : 업체 타입 */
export const deleteBoard = ({ id, name }) =>
  axios.delete(`${URL}/${getContext(name)}/${id}`);

/* 유저가 작성한 폼을 토대로 업체를 생성하는 서비스 */
/* naem : 업체 타입 */
export const createBoard = ({ form, name }) => {
  /* 로컬 스토리지에 저장된 유저 아이디를 가져옵니다. */
  const user_id = getUserId();
  return axios.post(`${URL}/${getContext(name)}`, {
    /* store_type : 업체 타입 */
    /* name : 업체 이름 */
    /* details : 업체 상세정보 */
    /* address : 업체 주소 */
    /* detail_address : 업체 상세 주소 */
    /* user_id : 작성자 아이디 */
    /* business_hours : 업체 운영시간 */
    /* contact : 업체 오시는길 */
    /* address_id : 업체 아이디 */
    store_type: name,
    name: form.name,
    details: form.detail,
    address: form.address1,
    detail_address: form.address2,
    user_id,
    business_hours: form.time,
    contact: form.phone,
    address_id: ""
  });
};

/* 업체에 대한 사용자가 좋아요 정보를 수정하는 서비스 */
/* storeId : 업체 아이디 */
/* isLiked : 좋아요 유무 */
export const updateLike = ({ storeId, isLiked }) =>{
  /* 로컬 스토리지에 저장된 유저 아이디를 가져옵니다. */
  const user_id = getUserId();
  return axios.post(`${URL}/stores/likes`, {
    /* user_id : 작성자 아이디 */
    /* storeId : 업체 아이디 */
    /* isLiked : 좋아요 유무 */
    user_id,
    storeId: storeId,
    isLike: isLiked
  });
}

/* 업체 상세정보를 가져오는 서비스 */
/* id : 업체 아이디 */
/* name : 업체 타입 */
export const fetchBoard = ({ id, name }) => {
  /* 로컬 스토리지에 저장된 유저 아이디를 가져옵니다. */
  const userId = getUserId();

  /* 유저 아이디 존재유무에 따라 userId 쿼리를 생성합니다. */
  const queryString = userId ? `?userId=${userId}` : '';
  return axios.get(`${URL}/${getContext(name)}/detail/${id}${queryString}`);
}

/* 서버로 부터 전달받은 데이터 객체의 속성을 변경합니다. */
export const transformBoard = (server) => {

  return {
    ...server,
    /* subject : 업체 제목 */
    /* content : 업체 내용 */
    /* userId : 작성자 아이디 */
    /* storeInfo : 업체 상세 정보 */
    subject: server.title,
    content: server.content,
    userId: server.user_id,
    storeInfo: server
  };
};

export const getStoreInfo = ({ storeId, storeName, name}) => {
  return axios.get(`${URL}/${getContext(name)}/detail/${storeId}${storeName}`)
}
