import { useState, useEffect, useMemo, useCallback } from "react";
import styled from "./board.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { debounce } from "../../utils/debounce";
import useAuth from "../../hooks/useAuth";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { SHOP_LIST } from "../../pages/Shop/Shop";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import  Select  from "../common/select/select"
const DEFAULT_POSITION = [37.402187224511, 127.10304698035];

/* 업체리스트를 지도 API를 사용하여 렌더링 해주는 컴포넌트입니다. */
/* name : 업체의 타입 */
const ShopList = ({ name }) => {
  /* 지도 API 줌값을 저장하는 상태 */
  const [level, setLevel] = useState(6);

  /* 주소 검색을 위한 상태 */
  const [address, setAddress] = useState('');

  /* 유저와 관련 된 처리를 하기 위한 훅입니다. */
  const auth = useAuth();

  /* 주소 이동을 위한 사용 */
  const navigate = useNavigate();

  /* 지도 위치가 변경되었을 때 position값에 저장 후 새로운 업체를 로드하기 위해서 사용 */
  const [position, setPosition] = useState([]);

  /* 지도 API map 객체 저장 */
  const [map, setMap] = useState(null);

  /* 업체 리스트 상태 */
  const [mapList, setMapList] = useState([]);

  /* 지도의 중앙 좌표를 저장하기 위한 상태 */
  const [center, setCenter] = useState(false);
  const clusterer = useMemo(() => {
    // 맵이 존재하지 않는 경우 실행 하지 않음
    if (!map) return null;

    // 마커를 한번에 여러개 추가할때 사용하는 MarkerClusterer를 생성
    // map의 상태가 변경되었을 경우에 실행
    // map : 지도 개게
    // averageCenter : 중앙위치
    // minLevel : 최소 줌값
    return new window.kakao.maps.MarkerClusterer({
      map,
      averageCenter: true,
      minLevel: 6,
    });

  // map의 상태가 변경되었을 경우에 실행
  }, [map]);
  
  // 좌표 값을 받아 지도에 저정 및 해당 위치에 해당하는 업체 리스트 호출하는 함수
  // _position : 현재 위치
  const showPosition = useCallback((_position) => {
    // latitude : 위도
    const latitude = _position.coords.latitude;

    // 경도
    const longitude = _position.coords.longitude;
  
    // 현재 위치와 이동한 위치가 동일하면 처리하지 않음
    if (position.length && position[0] === latitude && position[1] === longitude) {
      return false;
    }

    // 센터값이 존재하면 map 객체가 생성되었다는 의미로 지도 객체의 센터로 이동
    if (center) {

      // 일반적인 좌표 정보를 카카오지도API에서 사용하는 좌표값으로 변경
      const moveLatLon = new kakao.maps.LatLng(latitude, longitude);

      // 지도의 중앙을 현재 위치로 변경
      map.setCenter(moveLatLon); 

      // 중앙 상태 취소
      setCenter(false);

      // 업체리스트 호출하는 함수 호출
      placesSearchCB([latitude, longitude]);
    }

    // 좌표값 저장
    setPosition([latitude, longitude]);
    return [latitude, longitude];
  }, [position]);

  // GPS로부터 현재 위치 가져오는 것이 에러 발생시 위치 초기화 하는 함수
  function errorPosition() {
    // 미리 정의해놓은 좌표로 초기화
    showPosition({
      coords: {
        latitude: DEFAULT_POSITION[0],
        longitude: DEFAULT_POSITION[1]
      }
    });
  }

  // 지도에 업체 위치 마커를 추가
  // shop : 업체 정보
  function createMarker(shop) {
    // 카카오엣 제공하는 Marker 객체를 이용해 마커 추가
    // position : 업체 위치
    // clickable : 클릭 가능 여부
    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(shop.y, shop.x),
      clickable: true,
    });

    // 마커에 이벤트를 등록하여 업체 상세보기를 할 수 있도록 이벤트를 등록합니다.
    kakao.maps.event.addListener(marker, 'click', function() {
      // 업체의 상세보기 페이지로 이동합니다.
      navigate(`/shop/${name}/detail/${shop.id}?name=${encodeURIComponent(shop.place_name)}`);
      
    });
    return marker;
  }

  // GPS의 값을 통해서 좌표를 얻어옵니다.
  const setCurrentPosition = () => {
    // center 추가
    setCenter(true);

    // GPS를 사용할 수 있다면 GPS를 통해서 현재 위치를 가져옵니다.
    if (navigator.geolocation) {
      // GPS를 사용할 수 있다면 GPS를 통해서 현재 위치를 가져옵니다.
      navigator.geolocation.getCurrentPosition(showPosition, errorPosition);
    } else {
      // GPS를 사용할 수 없으면 콘솔에 에러를 출력합니다.
      console.log("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    // 해당 컴포넌트가 렌더링 되면 GPS를 불러오는 함수를 호출합니다.
    setCurrentPosition();
  }, []);

  useEffect(() => {
    // 현재 위치값이 없으면 종료
    if (!position.length) return;

    // id가 map인 element를 가져옵니다.
    let container = document.getElementById("map");

    // center : 현재 위치 값 또는 기본값을 통해 카카오 위치 객체로 저장합니다.
    // level : 초기 줌 값을 설정합니다. 
    let options = {
      center: new window.kakao.maps.LatLng(
        position[0] || DEFAULT_POSITION[0],
        position[1] || DEFAULT_POSITION[1]
      ),
      level,
    };

    // map이 존재하지 않는 경우 카카오 Map 객체를 생성합니다.
    if (!map) {
      setMap(new window.kakao.maps.Map(container, options));
    }
  }, [position]);

  useEffect(() => {
    // clusterer가 없으면 종료합니다.
    if (!clusterer) {
      return;
    }

    // 현재 지도에 존재하는 마커를 모두 제거합니다.
    clusterer.clear();

    // 현재 위치에 해당하는 업체리스트를 호출합니다.
    placesSearchCB(position);
  }, [clusterer]);

  // 지도에서 드래그를 통해 위치를 옮길때 호출되는 함수 입니다. 위치를 입력 받아 새로운 업체 리스트를 가져옵니다.
  // _position : 현재 위치
  const fn = useCallback(debounce((_position) => {
    // 지도가 존재하지 않는 경오 종료합니다.
    if (!map) return;

    // 줌값을 지도의 줌값으로 저장합니다.
    setLevel(map.getLevel());

    // 위치를 저장합니다.
    const result = showPosition(_position);

    // result(현재 위치)값이 존재하는 경우
    if (result) {
      // result에 해당하는 업체리스트를 보여줍니다.
      placesSearchCB(result);
    }
  }, 500), [map, position]);

  useEffect(() => {
    // 지도 객체 생성전이면 종료합니다.
    if (!map) return;

    // 지도에서 드래그시에 호출될 함수입니다.
    const move = () => {
      // 지도의 중앙 좌표를 가져옵니다. 이를 통해 해당하는 좌표의 업체리스를 가져오게 됩니다.
      const center = map.getCenter();

      // 주소 검색중이면 종료합니다.
      if (address) return;

      // 중앙 좌표를 가지고 fn 함수를 호출합니다.
      // 해당 좌표에 해당하는 업체리스트를 보여주게 됩니다.
      fn({
        coords: {
          latitude: center.Ma,
          longitude: center.La
        }
      });
    }

    // 카카오 지도에 드래그 이벤트 생성
    kakao.maps.event.addListener(map, 'drag', move);

    return () => {
      // 카카오 지도에 드래그 이벤트 제거
      kakao.maps.event.removeListener(map, 'drag', move)
    }
  }, [map, address]);

  //지도 검색 부분  //position 좌표 값 배열 첫번째 작은 값 두번쨰 큰 값 
  const placesSearchCB = (position, citygudong = '') => {
    // 지도에 존재하는 모든 마커 제거
    clusterer.clear();

    // 장소 검색 객체를 생성합니다
    const ps = new kakao.maps.services.Places(); 

    // 마커의 위치를 저장하는 배열
    const markers = [];

    // 업체 리스트를 저장하는 배열
    const list = [];

    // 업체리스트 상태값을 빈 배열로 초기화합니다.
    setMapList([]);
    // 카카오 지도 API에서 검색할 옵션을 설정합니다.
    // location : 위치값을 기반으로 검색
    // radius : 검색 위치를 기반으로 반경 설정(단위 : m)
    // useMapCenter : 검색 결과를 현재 map에 center 반영 여부
    // useMapBounds : 검색 결과를 현재 map의 bounds에 반영 여부
    // page : 검색 결과 중 페이지 1에 반영
    const option = {
      location: new window.kakao.maps.LatLng(
        position[0] || DEFAULT_POSITION[0],
        position[1] || DEFAULT_POSITION[1]
      ),
      radius: 10000,
      useMapCenter: false,
      useMapBounds: false,
      page: 1
    };

    // position 값이 존재하지 않으면 location 옵션 제거
    // 이는 위치 기반으로 검색하지 않기 위함입니다.
    if(!position.length) {
      delete option.location;
    }

    // 카카오 지도에 검색 요청 후 실행될 콜백함수입니다.
    // 이 함수에서 마커를 생성하고 업체 리스트에대한 정보를 저장하여 화면에 보여줍니다.
    // data : 검색된 데이터
    // stats : 카카오 API의 HTTP 통신 결과
    // last : 가장 마지막 페이지 번호
    // current : 현재 페이지 번호
    const placeSerach = (data, status, { last, current }) => {
      // API 통신 결과 정상이 아닌 경우 종료
      if (status !== kakao.maps.services.Status.OK) {
        return
      }
      
      // 받아온 data의 배열 크기 만큼 마커를 생성합니다.
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      // LatLngBounds 객체에 좌표를 추가합니다
      for (let i = 0; i < data.length; i++) {
        // 마커를 생성하고 결과를 마커 리스트에 추가합니다.
        markers.push(createMarker(data[i]));

        // 리스트에 업체 데이터를 저장합니다
        // id : 업체 아이디
        // address : 업체 주소
        // phone : 업체 연락처
        // name : 업체명
        // link : 업체 링크 주소
        list.push({
          id: data[i].id,
          address: data[i].address_name,
          phone: data[i].phone,
          name: data[i].place_name,
          link: data[i].place_url
        });
      }       
      
      // 현재 페이지가 마지막 페이지보다 작으면 다음 페이지의 업체리스트를 가져옵니다.
      if (current < last) {
        // 옵션의 페이지 정보를 다음페이지로 저장
        option.page = option.page + 1;

        // 옵션을 변경해서 새롭게 업체를 검색합니다.
        ps.keywordSearch(`${citygudong} ${SHOP_LIST[name]}`, placeSerach, option)
      }

      // 마지막 페이지라면 마커를 추가합니다.
      if (current === last && markers.length) {
        // 검색된 장소 위치를 기준으로 마커를 추가합니다.
        clusterer.addMarkers(markers);

        // 지도 하단 업체 리스트 정보를 슬라이더로 보여주기 위해 저장합니다.
        setMapList(list);

        // 만약 검색이 시군구를 통한 검색이라면 실행합니다.
        if (citygudong) {
          // 지도의 중앙 좌표를 시군구의 좌표로 저장합니다.
          const moveLatLon = new kakao.maps.LatLng(data[0].y, data[0].x);
          map.setCenter(moveLatLon); 
        }
      }
    };
     
    // 키워드로 장소를 검색합니다
     ps.keywordSearch(`${citygudong} ${SHOP_LIST[name]}`, placeSerach, option)

  }

  
  // 주소 검색 시 팝업 오픈 용도
  const open = useDaumPostcodePopup();
  // 주소 검색 완료시 호출될 함수
  // address : 주소 값
  const handleComplete = ({ address }) => {
    // 위치 정보 초기화
    setPosition([]);

    // 주소 저장
    setAddress(address);

    // 주소가 존재한다면 주소검색을 합니다.
    if (address) {
      // 주소 검색을 하기 위한 Geocoder객체 생성
      const geocoder = new kakao.maps.services.Geocoder();

      // Geocoder을 통해서 원하는 주소 위치를 검색할 수 있습니다.
      geocoder.addressSearch(address, function(result, status) {
        // API 통신 결과 정상이 아닌 경우 종료
        if (status === kakao.maps.services.Status.OK) {
          // 결과로 받은 위도/경로를 바탕으로 카카오 지도의 좌표값으로 변환합니다.
          const moveLatLon = new kakao.maps.LatLng(result[0].y, result[0].x);

          // 변환된 값을 지도의 중앙 좌표로 저장합니다.
          map.setCenter(moveLatLon); 

          // 현재 위치에 해당하는 업체리스트를 불러옵니다.
          placesSearchCB([result[0].y, result[0].x]);
        }
      });
    }
  };

  // 검색을 초기화하는 경우 호출될 함수입니다.
  const reset = () => {
    // 주속 검색 초기화
    setAddress('');

    // 현재 저장된 좌표를 저장합니다/
    setCurrentPosition();
  }

  // 시군구를 통한 검색시 호출될 함수입니다.
  // citygudong 정보
  const searchAddress = (citygudong) => {
    // 시군구로부터 시, 구, 동 정보를 구조분해할당합니다.
    const { city, gu, dong } = citygudong;
    // 시구동 정보로부터 업체리스트 정보를 가져옵니다.
    placesSearchCB([], `${city} ${gu} ${dong}`)
  }

  return (
    // className : className이름 설정
    <div className={styled.map}>
      {/* className : className이름 설정 */}
      <div className={styled.write_button}>
      {/* className : className이름 설정 */}
              <div className={styled.search}>
                {/* className : className이름 설정 */}
                <div className={styled.address}>
            {/* 주소 검색 중이라면 검색중인 주소를 출력합니다. */}
            {
              address && (
                    <span>{address}</span>
              )
            }

                  {/* className : className이름 설정 */}
                  {/* 주소검색 버튼을 클릭 시 다음 주소 검색 팝업을 호출합니다. */}
                  <button
                    className="ui button"
                    onClick={() => open({ onComplete: handleComplete })}
                  >
                    {/* className : className이름 설정 */}
                    <i className="search icon"></i>주소 검색
                  </button>
                  {/* className : className이름 설정 */}
                  {/* 초기화 버튼을 클릭 시 주소 검색을 초기화 합니다. */}
                  <button
                    className={`ui button ${styled.reset}`}
                    onClick={reset}
                  >
                    초기화
                  </button>
                </div>
              </div>
      </div>
      {/* className : className이름 설정 */}
      <div className={styled.map_box}>
                {/* className : className이름 설정 */}
                <div className={styled.citygudong}>
                  {/* 시군구동 검색을 위한 Select 컴포넌트를 렌더링합니다. */}
                  {/* searchAddress : 검색 버튼을 클릭 시에 호출 될 함수입니다.*/}
         <Select searchAddress={searchAddress}/>
                </div>
                {/* className : className이름 설정 */}
                {/* 카카오지도 API가 렌더링 될 컴포넌트 입니다. */}
                <div className={styled.mapContainer} id="map"></div>
                {/* className : className이름 설정 */}
                <div className={styled.map_list}>
                  {/* 검색 된 업체의 리스트를 슬라이드 하는 컴포넌트 입니다. */}
                  {/* spaceBetween: 리스트 사이 간격 */}
                  {/* slidesPerView: 한페이지에 보여줄 숫자입니다. */}
                  {/* breakpoints : 화면 해상도에 따라 달리 보여줄 옵션을 설정합니다. */}
              
                  <Swiper
                    spaceBetween={50}
                    slidesPerView={4}
                    breakpoints={{
                      // 해상도가 640 이상일때 적용 됩니다.
                      // slidesPerView : 한 화면에 보여줄 개수는 2입니다.
                      640: {
                        slidesPerView: 2
                      },
                      // 해상도가 250 이상일때 적용 됩니다.
                      // slidesPerView : 한 화면에 보여줄 개수는 1입니다.
                      250: {
                        slidesPerView: 1
                      },
                      // 해상도가 1200 이상일때 적용 됩니다.
                      // slidesPerView : 한 화면에 보여줄 개수는 4입니다.                      
                      1200: {
                        slidesPerView: 4
                      },
                    }}
                  >
            {
              // 업체리스트가 존재한다면 아래의 컴포넌트를 렌더링합니다.
              // mapList : 조회된 업체 리스트
              mapList.length && mapList.map((map) => (
                      // 슬라이될 아이템을 렌더링해주는 컴포넌트입니다.
                      // key : 각 슬라이드 아이템을 구별하기 위한 키입니다.
                      <SwiperSlide key={map.id}>
                        {/* 아이템 클릭 시 상세보기 페이지로 이동합니다. */}
                        <NavLink to={`/shop/${name}/detail/${map.id}?name=${encodeURIComponent(map.name)}`}>
                          {/* 업체 이름을 렌더링합니다. */}
                          <h2>{map.name}</h2>
                          {/* 업체 주소를 렌더링합니다. */}
                          <p>{map.address}</p>
                          {/* 업체 연락처 렌더링합니다. */}
                          <p>{map.phone}</p>
                        </NavLink>
                        {/* 업체에 할당 된 링크가 존재한다면 업체 사이트로 이동합니다. */}
                        <p><a target="_blank" href={map.link}>{map.link}</a></p>
                      </SwiperSlide>
              ))
            }
                  </Swiper>
                </div>
      </div>
    </div>
  );
};

export default ShopList;
