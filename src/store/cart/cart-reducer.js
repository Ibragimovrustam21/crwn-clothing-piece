import { SET_IS_CART_OPEN, SET_CART_ITEMS_ARRAY } from './cart-types'

const initialStates = {
  isCartOpen: false,
  cartItemsArray: [],
}

export const CartReducer = (state = initialStates, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload
      }
    case SET_CART_ITEMS_ARRAY:
      return {
        ...state,
        cartItemsArray: payload
      }

    default:
      return state
  }
}
