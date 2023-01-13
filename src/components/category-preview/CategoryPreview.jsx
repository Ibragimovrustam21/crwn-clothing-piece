import React from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../product-card/ProductCard'
import { CategoryPreviewContainer, Preview, Title } from './categoryPreview.styles'

const CategoryPreview = ({ title, productArray }) => {
  return (
    <CategoryPreviewContainer>
      <Link to={`/shop/${title}`}><Title>{title.toUpperCase()}</Title></Link>
      <Preview>
        {
          productArray
            .filter((_, index) => index < 4)
            .map(product => <ProductCard key={product.name} product={product} />)
        }
      </Preview>
    </CategoryPreviewContainer>

  )
}

export default CategoryPreview