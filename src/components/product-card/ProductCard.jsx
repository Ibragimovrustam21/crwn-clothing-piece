import React, { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import Button, { BUTTON_TYPE_CLASSES } from '../UI/button/Button'

import { Footer, Image, ProductCardContainer } from './productCard.styles.jsx'

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product
  const { addToCardItem } = useContext(CartContext)

  return (
    <ProductCardContainer>
      <Image src={imageUrl} alt={`${name}`} />
      <Footer>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={() => addToCardItem(product)}
      >
        Add to card
      </Button>
    </ProductCardContainer>
  )
}

export default ProductCard