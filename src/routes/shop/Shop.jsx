import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { Category } from '../../components/category/Category'
import { fetchingCategoriesStart } from '../../store/categories/categories-action'
import CategoriesPreview from '../categories-preview/CategoriesPreview'


const Shop = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    // bu yerda dispatchga async func yuborilayabti agar biz thunkni install qilmasak app error beradi
    dispatch(fetchingCategoriesStart())
    // action har doim object bulishi kerak ekan
  }, [dispatch])

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  )
}

export default Shop