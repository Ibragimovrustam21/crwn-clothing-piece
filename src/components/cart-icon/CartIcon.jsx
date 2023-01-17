import { useDispatch, useSelector } from 'react-redux';
import { setIsCartOpen } from '../../store/cart/cart-action.js';
import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart-selector.js';

import { CartIconContainer, ItemCount, ShoppingIcon } from './cartIcon.styles.jsx';


const CartIcon = () => {
  const dispatch = useDispatch()

  const isCartOpen = useSelector(selectIsCartOpen)
  const cartCount = useSelector(selectCartCount)

  const toogleHandler = () => dispatch(setIsCartOpen(!isCartOpen))

  return (
    <CartIconContainer onClick={toogleHandler}>
      <ShoppingIcon className='shopping-icon' />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;