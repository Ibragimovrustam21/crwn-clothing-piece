import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

import { CartIconContainer, ItemCount, ShoppingIcon } from './cartIcon.styles.jsx';


const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext)
  const toogleHandler = () => setIsCartOpen(!isCartOpen)

  return (
    <CartIconContainer onClick={toogleHandler}>
      <ShoppingIcon className='shopping-icon' />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;