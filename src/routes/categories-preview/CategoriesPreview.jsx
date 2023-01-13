import { useContext } from 'react'
import { CategoriesContext } from '../../context/CategoriesContext'
import CategoryPreview from '../../components/category-preview/CategoryPreview'

import { CategoriesPreviewContainer } from './categories-preview.styles'


const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext)
  return (
    <CategoriesPreviewContainer>
      {
        Object.keys(categoriesMap).map(title => {
          const productArray = categoriesMap[title]
          return <CategoryPreview key={title} productArray={productArray} title={title} />
        })
      }
    </CategoriesPreviewContainer>
  )
}

export default CategoriesPreview