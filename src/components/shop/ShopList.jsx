import { useState, useEffect, useMemo } from "react";
import useBoard from "../../hooks/useBoard";
import styled from "./board.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { debounce } from "../../utils/debounce";
import useAuth from "../../hooks/useAuth";
import Search from "../common/search/search";
import { useDaumPostcodePopup } from "react-daum-postcode";

const DEFAULT_POSITION = [37.402187224511, 127.10304698035];

const ShopList = ({ name }) => {
  const [level, setLevel] = useState(3);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [address, setAddress] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();
  const [position, setPosition] = useState([]);
  const board = useBoard({ type: "list", value: position, name, searchKeyword, address, level });
  const [map, setMap] = useState(null);
  const clusterer = useMemo(() => {
    if (!map) return null;

    return new window.kakao.maps.MarkerClusterer({
      map,
      averageCenter: true,
      minLevel: 6,
    });
  }, [map]);
  
  function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setPosition([latitude, longitude]);
  }

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
      position: new kakao.maps.LatLng(shop.longitude, shop.latitude),
      clickable: true
    });

    kakao.maps.event.addListener(marker, 'click', function() {
      navigate(`/shop/${name}/detail/${shop.store_id}`);
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
    if (!Array.isArray(board?.board) || !clusterer) {
      return;
    }

    clusterer.clear();

    const markers = board.board.map((shop) => createMarker(shop));

    if (markers.length) {
      clusterer.addMarkers(markers);
    }
  }, [clusterer, board.board]);

  useEffect(() => {
    if (!map) return;

    const fn = debounce((position) => {
      setLevel(map.getLevel());
      showPosition(position);
    }, 1000);

    const move = () => {
      const center = map.getCenter();

      if (searchKeyword || address) return;

      fn({
        coords: {
          latitude: center.Ma,
          longitude: center.La
        }
      });
    }

    kakao.maps.event.addListener(map, 'center_changed', move);

    return () => {
      kakao.maps.event.removeListener(map, 'center_changed', move)
    }
  }, [map, searchKeyword, address]);

  const open = useDaumPostcodePopup();
  const handleComplete = ({ jibunAddress }) => {
    setSearchKeyword('');
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

  const searchName = (value) => {
    setSearchKeyword(value);
    setPosition([]);
    setAddress('');
  };

  return (
    <div className={styled.map}>
      <div className={styled.write_button}>
        <div className={styled.search}>
          <Search searchKeyword={searchName} />
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
