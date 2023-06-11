import TablePagination from "../common/paging/TablePagination";
import { useState, useEffect } from "react";
import useBoard from "../../hooks/useBoard";
import styled from "./board.module.css";

const DEFAULT_POSITION = [37.402187224511, 127.10304698035];

const ShopList = ({ name }) => {
  const [position, setPosition] = useState([]);
  const board = useBoard({ type: "list", value: position, name });
  let map;
  const markers = [];

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
    var markerPosition  = new kakao.maps.LatLng(shop.longitude, shop.latitude); 

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        position: markerPosition
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
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

    map = new window.kakao.maps.Map(container, options);
  }, [position]);

  useEffect(() => {
    if (!Array.isArray(board?.board)) {
      return;
    }

    markers.forEach((marker) => marker.setMap(null));

    (board?.board || []).forEach((shop) => {
      createMarker(shop);
    })
  }, [board.board]);

  return (
    <div className={styled.map}>
      <div className={styled.mapContainer} id="map"></div>
    </div>
  );
};

export default ShopList;
