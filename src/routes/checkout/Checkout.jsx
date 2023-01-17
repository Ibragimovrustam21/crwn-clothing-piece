import { useSelector } from 'react-redux';
import CheckoutItem from '../../components/checkout-item/CheckoutItem';
import { CheckoutContainer, CheckoutHeader, HeaderBlock } from './checkout.styles';
import { selectCartItemsArray, selectCartTotal } from '../../store/cart/cart-selector'

const Checkout = () => {
  const cartItemsArray = useSelector(selectCartItemsArray)
  const cartTotal = useSelector(selectCartTotal)

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock className='header-block'>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock className='header-block'>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock className='header-block'>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock className='header-block'>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItemsArray.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <div className='total'>TOTAL: ${cartTotal}</div>
    </CheckoutContainer>
  );
};

export default Checkout;