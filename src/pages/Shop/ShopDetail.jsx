import { Divider } from 'semantic-ui-react';
import styled from './board.module.css'
import { SHOP_LIST } from './Shop';
import { useNavigate, useParams } from 'react-router-dom';
import ShopDetailComponent from '../../components/shop/ShopDetailComponent';

const ShopDetail = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  if (!SHOP_LIST[category]) {
    navigate('/');
    return;
  }

  return (
    <>
      <div className={`${styled.main} ${styled.detail}`}>
        <h2>{SHOP_LIST[category]}</h2>
        <Divider />
        <ShopDetailComponent name={category} />      
      </div>
    </>
  )
};

export default ShopDetail;