import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import CartItem from '../cart-item/CartItem';

import Button from '../UI/button/Button';

import { CartDropdownContainer, CartItems, EmptyAlert } from './cartDropdown.styles';

const CartDropdown = () => {
  const { cartItemsArray } = useContext(CartContext)
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