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

const ShopList = ({ name }) => {
  const [level, setLevel] = useState(6);
  const [address, setAddress] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();
  const [position, setPosition] = useState([]);
  const [map, setMap] = useState(null);
  const [mapList, setMapList] = useState([]);
  const [center, setCenter] = useState(false);
  const clusterer = useMemo(() => {
    if (!map) return null;

    return new window.kakao.maps.MarkerClusterer({
      map,
      averageCenter: true,
      minLevel: 6,
    });
  }, [map]);
  
  const showPosition = useCallback((_position) => {
    const latitude = _position.coords.latitude;
    const longitude = _position.coords.longitude;
  
    if (position.length && position[0] === latitude && position[1] === longitude) {
      return false;
    }

    if (center) {
      const moveLatLon = new kakao.maps.LatLng(latitude, longitude);
      map.setCenter(moveLatLon); 
      setCenter(false);
      placesSearchCB([latitude, longitude]);
    }

    setPosition([latitude, longitude]);
    return [latitude, longitude];
  }, [position]);

  function errorPosition() {
    showPosition({
      coords: {
        latitude: DEFAULT_POSITION[0],
        longitude: DEFAULT_POSITION[1]
      }
    });
  }

  function createMarker(shop) {
    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(shop.y, shop.x),
      clickable: true
    });

    kakao.maps.event.addListener(marker, 'click', function() {
      navigate(`/shop/${name}/detail/${shop.id}`);
    });
    return marker;
  }

  const setCurrentPosition = () => {
    setCenter(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, errorPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    setCurrentPosition();
  }, []);

  useEffect(() => {
    if (!position.length) return;

    let container = document.getElementById("map");
    let options = {
      center: new window.kakao.maps.LatLng(
        position[0] || DEFAULT_POSITION[0],
        position[1] || DEFAULT_POSITION[1]
      ),
      level,
    };

    if (!map) {
      setMap(new window.kakao.maps.Map(container, options));
    }
  }, [position]);

  useEffect(() => {
    if (!clusterer) {
      return;
    }

    clusterer.clear();

    placesSearchCB(position);
  }, [clusterer]);

  const fn = useCallback(debounce((_position) => {
    if (!map) return;
    setLevel(map.getLevel());
    const result = showPosition(_position);

    if (result) {
      placesSearchCB(result);
    }
  }, 500), [map, position]);

  useEffect(() => {
    if (!map) return;

    const move = () => {
      const center = map.getCenter();
      if (address) return;

      fn({
        coords: {
          latitude: center.Ma,
          longitude: center.La
        }
      });
    }

    kakao.maps.event.addListener(map, 'drag', move);

    return () => {
      kakao.maps.event.removeListener(map, 'drag', move)
    }
  }, [map, address]);

  //지도 검색 부분  //position 좌표 값 배열 첫번째 작은 값 두번쨰 큰 값 
  const placesSearchCB = (position, citygudong = '') => {
    console.log("palcb",position, citygudong )
    clusterer.clear();
    console.log(position);
  

    // 장소 검색 객체를 생성합니다
    const ps = new kakao.maps.services.Places(); 
    const markers = [];
    const list = [];
    setMapList([]);
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

    if(!position.length) {
      delete option.location;
    }

    const placeSerach = (data, status, { last, current }) => {
      if (status !== kakao.maps.services.Status.OK) {
        return
      }
      
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      // LatLngBounds 객체에 좌표를 추가합니다
      for (let i = 0; i < data.length; i++) {
        markers.push(createMarker(data[i]));
        list.push({
          id: data[i].id,
          address: data[i].address_name,
          phone: data[i].phone,
          name: data[i].place_name,
          link: data[i].place_url
        });
      }       
      
      if (current < last) {
        option.page = option.page + 1;
        ps.keywordSearch(`${citygudong} ${SHOP_LIST[name]}`, placeSerach, option)
      }
  
      if (current === last && markers.length) {
        // 검색된 장소 위치를 기준으로 마커를 추가합니다.
        clusterer.addMarkers(markers);
        setMapList(list);

        if (citygudong) {
          const moveLatLon = new kakao.maps.LatLng(data[0].y, data[0].x);
          map.setCenter(moveLatLon); 
        }
      }
    };
     
    // 키워드로 장소를 검색합니다
     ps.keywordSearch(`${citygudong} ${SHOP_LIST[name]}`, placeSerach, option)

  }

  

  const open = useDaumPostcodePopup();
  const handleComplete = ({ address }) => {
    setPosition([]);
    setAddress(address);

    if (address) {
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
          const moveLatLon = new kakao.maps.LatLng(result[0].y, result[0].x);
          map.setCenter(moveLatLon); 
          placesSearchCB([result[0].y, result[0].x]);
        }
      });
    }
  };

  const reset = () => {
    setAddress('');
    setCurrentPosition();
  }

  const searchAddress = (citygudong) => {
    const { city, gu, dong } = citygudong;
    placesSearchCB([], `${city} ${gu} ${dong}`)
  }

  return (
    <div className={styled.map}>
      <div className={styled.write_button}>
        <div className={styled.search}>
          <div className={styled.address}>
            {
              address && (
                <span>{address}</span>
              )
            }
            
            <button
              className="ui button"
              onClick={() => open({ onComplete: handleComplete })}
            >
              <i className="search icon"></i>주소 검색
            </button>
            <button
              className={`ui button ${styled.reset}`}
              onClick={reset}
            >
                초기화
            </button>
          </div>
        </div>
      </div>
      <div className={styled.button}>
        {auth?.user?.roles === "admin" && (
          <NavLink color="#fff" to={`/shop/${name}/write`}>
            <button className="ui primary button">글쓰기</button>
          </NavLink>
        )}
      </div>
      <div className={styled.map_box}>
        <div className={styled.citygudong}>
         <Select searchAddress={searchAddress}/>
        </div>
        <div className={styled.mapContainer} id="map"></div>
        <div className={styled.map_list}>
          <Swiper 
            spaceBetween={50}
            slidesPerView={4}
          >
            {
              mapList.length && mapList.map((map) => (
                <SwiperSlide key={map.id}>
                  <NavLink to={`/shop/${name}/detail/${map.id}?name=${encodeURIComponent(map.name)}`}>
                    <h2>{map.name}</h2>
                    <p>{map.address}</p>
                    <p>{map.phone}</p>
                  </NavLink>
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
