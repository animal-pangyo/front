import { Divider } from 'semantic-ui-react';
import styled from './board.module.css'
import { SHOP_LIST } from './Shop';
import { useNavigate, useParams } from 'react-router-dom';
import ShopDetailComponent from '../../components/shop/ShopDetailComponent';

/* 업체 상세정보를 보여주는 페이지 컴포넌트입니다. */
const ShopDetail = () => {
  /* PATH에 담긴 카테고리 정보를 받아서 업체리스트로 전달합니다. */
  const { category } = useParams();

  /* 페이지 이동을 위한 훅입니다. */
  const navigate = useNavigate();

  /* 업체리스트에 존재하지 않는 카테고리로 접근을 하는 경우 메인페이지로 이동합니다. */
  if (!SHOP_LIST[category]) {
    navigate('/');
    return;
  }

  return (
    <>
      {/* className : className이름 설정 */}
      <div className={`${styled.main} ${styled.detail}`}>
        {/* 카테고리에 해당하는 업체리스트의 이름을 타이틀로 렌더링합니다. */}
        <h2>{SHOP_LIST[category]}</h2>
        <Divider />
        {/* name : 카테고리에 정보를 업체 상세페이지로 전달합니다. 해당 카테고리에 해당하는 업체 정보를 보여줍니다. */}
        <ShopDetailComponent name={category} />      
      </div>
    </>
  )
};

export default ShopDetail;