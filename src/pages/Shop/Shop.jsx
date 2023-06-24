import { useNavigate, useParams, NavLink } from "react-router-dom";
import ShopList from "../../components/shop/ShopList";
import styled from "./board.module.css";

/* 업체별 타입에 해당하는 이름을 저장합니다. */
export const SHOP_LIST = {
  hospital: "동물병원",
  cafe: "애견카페",
  hotel: "애견호텔",
  academy: "훈련소",
  beauty: "애견미용",
  funeral: "애견 장례식장",
  playground: "운동장",
};

/* 업체리스트를 보여주는 페이지 컴포넌트입니다. */
const Shop = () => {
  /* PATH에 담긴 카테고리 정보를 받아서 업체리스트로 전달합니다. */
  const { category } = useParams();

  /* 페이지 이동을 위한 훅입니다. */
  const navigate = useNavigate();
  
  /* 업체리스트에 존재하지 않는 카테고리로 접근을 하는 경우 메인페이지로 이동합니다. */
  if (!SHOP_LIST[category]) {
    navigate("/");
    return;
  }

  return (
    <>
      {/* className : className이름 설정 */}
      <div className={styled.main}>
        {/* 카테고리에 해당하는 업체리스트의 이름을 타이틀로 렌더링합니다. */}
        <h2>
          {SHOP_LIST[category]}
        </h2>
        {/* name : 카테고리에 정보를 업체리스트로 전달합니다. 해당 카테고리에 해당하는 업체 리스트를 보여줍니다. */}
        <ShopList name={category} />
      </div>
    </>
  );
};

export default Shop;
