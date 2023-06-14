import { useState, useEffect, useMemo, useCallback } from "react";
import styled from "./board.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { debounce } from "../../utils/debounce";
import useAuth from "../../hooks/useAuth";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { SHOP_LIST } from "../../pages/Shop/Shop";

const DEFAULT_POSITION = [37.402187224511, 127.10304698035];

const ShopList = ({ name }) => {
  const [level, setLevel] = useState(12);
  const [address, setAddress] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();
  const [position, setPosition] = useState([]);
  const [map, setMap] = useState(null);
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

    setPosition([latitude, longitude]);
    return true;
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
    console.log(shop);

    kakao.maps.event.addListener(marker, 'click', function() {
      navigate(`/shop/${name}/detail/${shop.id}`);
    });
    return marker;
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, errorPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
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

    if (map) {
      const moveLatLon = new kakao.maps.LatLng(position[0], position[1]);
      map.setCenter(moveLatLon); 
      return;
    }

    setMap(new window.kakao.maps.Map(container, options));
  }, [position]);

  useEffect(() => {
    if (!clusterer) {
      return;
    }

    clusterer.clear();

    placesSearchCB();
  }, [clusterer]);

  const fn = useCallback(debounce((_position) => {
    if (!map) return;
    setLevel(map.getLevel());
    const result = showPosition(_position);

    if (result) {
      placesSearchCB();
    }
  }, 1000), [map, position]);

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

  const placesSearchCB = () => {
    clusterer.clear();
    // 장소 검색 객체를 생성합니다
    const ps = new kakao.maps.services.Places(); 
    const bounds = new kakao.maps.LatLngBounds();
    const markers = [];
    const option = {
      location: new window.kakao.maps.LatLng(
        position[1] || DEFAULT_POSITION[0],
        position[0] || DEFAULT_POSITION[1]
      ),
      radius: 5000,
      useMapCenter: true,
      useMapBounds: true,
      page: 1
    };

    const placeSerach = (data, status, { last, current }) => {
      if (status !== kakao.maps.services.Status.OK) {
        return
      }
      
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      // LatLngBounds 객체에 좌표를 추가합니다
      for (let i = 0; i < data.length; i++) {
        markers.push(createMarker(data[i]));
        bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
      }       
      
      if (current < last) {
        option.page = option.page + 1;
        ps.keywordSearch(SHOP_LIST[name], placeSerach, option)
      }
  
      if (current === last && markers.length) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
        clusterer.addMarkers(markers);
      }
    };

    // 키워드로 장소를 검색합니다
    ps.keywordSearch(SHOP_LIST[name], placeSerach, option)
  }

  

  const open = useDaumPostcodePopup();
  const handleComplete = ({ jibunAddress }) => {
    setPosition([]);
    setAddress(jibunAddress);

    if (jibunAddress) {
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(jibunAddress, function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
          const moveLatLon = new kakao.maps.LatLng(result[0].y, result[0].x);
          map.setCenter(moveLatLon); 
        }
      });
    }
  };

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
      <div className={styled.mapContainer} id="map"></div>
    </div>
  );
};

export default ShopList;
