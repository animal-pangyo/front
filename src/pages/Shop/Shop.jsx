import { useNavigate, useParams, NavLink } from "react-router-dom";
import ShopList from "../../components/shop/ShopList";
import styled from "./board.module.css";
import useAuth from "../../hooks/useAuth";

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
  const auth = useAuth();
  
  if (!SHOP_LIST[category]) {
    navigate("/");
    return;
  }

  return (
    <>
      <div className={styled.main}>
        <h2>
          {SHOP_LIST[category]}
          <div className={styled.write_button}>
            {auth?.user?.roles === "admin" && (
              <NavLink color="#fff" to={`/shop/${category}/write`}>
                <button className="ui primary button">글쓰기</button>
              </NavLink>
            )}
          </div>
        </h2>
        <ShopList name={category} />
      </div>
    </>
  );
};

export default Shop;
