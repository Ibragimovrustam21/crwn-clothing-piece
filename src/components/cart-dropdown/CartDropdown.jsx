import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartItemsArray } from '../../store/cart/cart-selector';
import CartItem from '../cart-item/CartItem';

import Button from '../UI/button/Button';

import { CartDropdownContainer, CartItems, EmptyAlert } from './cartDropdown.styles';

const CartDropdown = () => {
  const cartItemsArray = useSelector(selectCartItemsArray)

  const navigate = useNavigate()
  const navigateHandler = () => {
    navigate('checkout')
  }

  return (
    <CartDropdownContainer>
      <CartItems>

        {
          cartItemsArray.length ? cartItemsArray.map(item => (
            <CartItem key={item.name} cartItem={item} />
          ))
            : <EmptyAlert>Your cart is empty</EmptyAlert>
        }
      </CartItems>
      <Button onClick={navigateHandler}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  )
}

export default CartDropdown;