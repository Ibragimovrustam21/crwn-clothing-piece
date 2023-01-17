import { SET_CART_ITEMS_ARRAY, SET_IS_CART_OPEN } from "./cart-types"
import { createAction } from '../../utils/action/Action'

const addToCartItem = (cartItemsArray, productToAdd) => {
  // cartItemsArray ichida bizga kerak bolgan object bormi yuqmi shuni tekshirdik
  const existingCartItem = cartItemsArray.find(item => item.id === productToAdd.id) // object qaytaradi
  // agar bo`lsa uni map bn aylanib utdik va usha objectni topib ichiga quantityni 1taga oshirdik
  if (existingCartItem) {
    return cartItemsArray.map(item => item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item)
  }
  // agar bizga kere bulgani topilmasa biz uni add qildik 
  return [...cartItemsArray, { ...productToAdd, quantity: 1 }]
}

const removeFromCartItem = (cartItemsArray, cartItemToRemove) => {
  const existingCartItem = cartItemsArray.find(item => item.id === cartItemToRemove.id)
  if (existingCartItem.quantity === 1) {
    return cartItemsArray.filter(item => item.id !== cartItemToRemove.id)
  }
  return cartItemsArray.map(item => item.id === cartItemToRemove.id ? { ...item, quantity: item.quantity - 1 } : item)
}

const clearCartItem = (cartItemsArray, cartItemToClear) => cartItemsArray.filter((cartItem) => cartItem.id !== cartItemToClear.id);


export const setIsCartOpen = (payload) => createAction(SET_IS_CART_OPEN, payload)

export const addCardItem = (cartItemsArray, productToAdd) => {
  const newCartItemsArray = addToCartItem(cartItemsArray, productToAdd)
  return createAction(SET_CART_ITEMS_ARRAY, newCartItemsArray)
}
export const removeCartItem = (cartItemsArray, cartItemToRemove) => {
  const newCartItemsArray = removeFromCartItem(cartItemsArray, cartItemToRemove)
  return createAction(SET_CART_ITEMS_ARRAY, newCartItemsArray)
}
export const clearItemFromCart = (cartItemsArray, cartItemToClear) => {
  const newCartItemsArray = clearCartItem(cartItemsArray, cartItemToClear)
  return createAction(SET_CART_ITEMS_ARRAY, newCartItemsArray)
};