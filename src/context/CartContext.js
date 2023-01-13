import { createContext, useEffect, useState } from "react";

// helper functions
const addToCartItem = (cartItemsArray, productToAdd) => {
  // cartItemsArray ichida bizga kerak bolgan object bormi yuqmi shuni tekshirdik
  const existingCartItem = cartItemsArray.find(item => item.id === productToAdd.id) // object qaytaradi
  console.log(existingCartItem);
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

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => { },
  cartItemsArray: [],
  addToCardItem: () => { },
  removeCartItem: () => { },
  clearItemFromCart: () => { },
  cartCount: 0,
  cartTotal: 0,
})

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItemsArray, setCartItemsArray] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [cartTotal, setCartTotal] = useState(0);

  const addToCardItem = (productToAdd) => {
    setCartItemsArray(addToCartItem(cartItemsArray, productToAdd))
  }
  const removeCartItem = (cartItemToRemove) => {
    setCartItemsArray(removeFromCartItem(cartItemsArray, cartItemToRemove))
  }
  const clearItemFromCart = (cartItemToClear) => {
    setCartItemsArray(clearCartItem(cartItemsArray, cartItemToClear));
  };

  //cartItemsArray ni ichidagi barcha quantitylarni yig`indisini hisobladik 
  useEffect(() => {
    const newCartCount = cartItemsArray.reduce((total, cartItem) => total + cartItem.quantity, 0)
    // mana shunaqa counterlarni hisoblash un reduce( methodini ishlatamiz)
    setCartCount(newCartCount)
  }, [cartItemsArray])

  useEffect(() => {
    const newCartTotal = cartItemsArray.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItemsArray]);

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItemsArray,
    addToCardItem,
    removeCartItem,
    clearItemFromCart,
    cartCount,
    cartTotal
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}