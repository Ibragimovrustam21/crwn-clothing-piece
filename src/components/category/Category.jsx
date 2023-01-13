import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CategoriesContext } from '../../context/CategoriesContext'
import ProductCard from '../product-card/ProductCard'

import { CategoryContainer, CategoryTitle } from './category.styles'

export const Category = () => {
  const { category } = useParams()
  const { categoriesMap } = useContext(CategoriesContext)
  const [product, setProduct] = useState(categoriesMap[category])

  useEffect(() => {
    setProduct(categoriesMap[category])
  }, [category, categoriesMap])

  return (
    <>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      <CategoryContainer>
        {
          product && product.map(product => (<ProductCard key={product.name} product={product} />))
        }
      </CategoryContainer>
    </>
  )
}
