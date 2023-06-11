import { useState, useEffect, useMemo } from "react";
import useBoard from "../../hooks/useBoard";
import styled from "./board.module.css";
import { useNavigate } from "react-router-dom";
import { debounce } from "../../utils/debounce";

const DEFAULT_POSITION = [37.402187224511, 127.10304698035];

const ShopList = ({ name }) => {
  const navigate = useNavigate();
  const [position, setPosition] = useState([]);
  const board = useBoard({ type: "list", value: position, name });
  const [map, setMap] = useState(null);
  const clusterer = useMemo(() => {
    if (!map) return null;
    const fn = debounce((position) => {
      showPosition(position);
    }, 1000);

    kakao.maps.event.addListener(map, 'center_changed', function() {
      const center = map.getCenter();
      fn({
        coords: {
          latitude: center.Ma,
          longitude: center.La
        }
      });
    });

    return new window.kakao.maps.MarkerClusterer({
      map: map,
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
    let container = document.getElementById("map");
    let options = {
      center: new window.kakao.maps.LatLng(
        position[0] || DEFAULT_POSITION[0],
        position[1] || DEFAULT_POSITION[1]
      ),
      level: 3,
    };

    if (map) return;
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

  return (
    <div className={styled.map}>
      <div className={styled.mapContainer} id="map"></div>
    </div>
  );
};

export default ShopList;
