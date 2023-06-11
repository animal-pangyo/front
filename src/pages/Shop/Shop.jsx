import { useNavigate, useParams, NavLink } from "react-router-dom";
import ShopList from "../../components/shop/ShopList";
import styled from "./board.module.css";

export const SHOP_LIST = {
  hospital: "동물병원",
  cafe: "애견카페",
  hotel: "애견호텔",
  academy: "훈련소",
  beauty: "애견미용",
  funeral: "장례식장",
  playground: "운동장",
};

const Shop = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  
  
  if (!SHOP_LIST[category]) {
    navigate("/");
    return;
  }

  return (
    <>
      <div className={styled.main}>
        <h2>
          {SHOP_LIST[category]}
        </h2>
        <ShopList name={category} />
      </div>
    </>
  );
};

export default Shop;
