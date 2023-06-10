import { Button } from "semantic-ui-react";
import TablePagination from "../common/paging/TablePagination";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useBoard from "../../hooks/useBoard";
import usePagination from "../../hooks/usePagination";
import styled from "./board.module.css";

const ShopList = ({ name }) => {
  const navigate = useNavigate();
  const [position, setPosition] = useState([]);
  const board = useBoard({ type: "list", value: position, name });
  const { kakao } = window;

  function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setPosition([latitude, longitude]);
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    let container = document.getElementById("map");
    let options = {
      center: new window.kakao.maps.LatLng(
        position[0] || 37.402187224511,
        position[1] || 127.10304698035
      ),
      level: 3,
    };

    let map = new window.kakao.maps.Map(container, options);
  }, [position]);

  return (
    <div className={styled.map}>
      <div className={styled.mapContainer} id="map"></div>
    </div>
  );
};

export default ShopList;
