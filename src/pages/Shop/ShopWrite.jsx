import { Divider } from 'semantic-ui-react';
import styled from './board.module.css'
import { SHOP_LIST } from './Shop';
import { useNavigate, useParams } from 'react-router-dom';

const ShopWrite = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  if (!SHOP_LIST[category]) {
    navigate('/');
    return;
  }

  return (
    <>
      <div className={`${styled.main} ${styled.write}`}>
        <h2>{SHOP_LIST[category]}</h2>
        <Divider />
      </div>
    </>
  )
};

export default ShopWrite;