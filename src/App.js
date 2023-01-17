import { useEffect } from "react"
import { useDispatch } from 'react-redux'
import { Route, Routes } from "react-router-dom"
import Authentication from "./routes/authentication/Authentication"
import Checkout from "./routes/checkout/Checkout"
import Home from "./routes/home/Home"
import Navigation from "./routes/navigation/Navigation"
import Shop from "./routes/shop/Shop"
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "./utils/firebase/firebase.component"
import { setCurrentUser } from './store/user/user-action'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    // onAuthStateChangedListener bu shunday listenerki biz sign in or sign out qilganimizda bu buni darhola sezib 
    // bizga malumot bera olarkan
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) createUserDocumentFromAuth(user) // bu googleSignIn qilish un (set firestore)

      dispatch(setCurrentUser(user))  // user => object(data) or null bo`lishi mn
    })

    return unsubscribe;
  }, [dispatch])

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  )
}

export default App